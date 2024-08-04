// Try layout effect later
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setBackgroundTheme } from "../util/setBackgroundTheme";
import { useOnChange } from "../util/useOnChange";
import type { Theme, ResolvedTheme } from "../types";

declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

const ThemeContext = createContext<Theme>("");
const ResolvedThemeContext = createContext<ResolvedTheme>("");
const SetThemeContext = createContext<
    React.Dispatch<React.SetStateAction<Theme>>
>(() => {});

export function ThemeProvider({
    children,
    defaultTheme = "system",
    defaultResolvedTheme,
    themes,
    themeKey,
    resolvedThemeKey,
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class",
    staticRender = false,
    nonce
}: {
    children: React.ReactNode;
    defaultTheme: Theme;
    defaultResolvedTheme?: ResolvedTheme;
    themes?: Theme[];
    themeKey: string;
    resolvedThemeKey: string;
    systemLightTheme: Theme;
    systemDarkTheme: Theme;
    element: string;
    attributes: string | string[];
    staticRender: boolean;
    nonce?: string | null;
}) {
    // Default theme on the server is cookie value else with static it's just the default theme
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    // This requires a second rerender if it is set to system and the preference is dark mode
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
        defaultResolvedTheme ?? (theme === "system" ? systemLightTheme : theme)
    );

    useOnChange(() => {
        if (theme === "system") {
            const onSystemThemeChange = ({
                matches
            }: MediaQueryListEventInit) => {
                setBackgroundTheme(
                    matches ? systemDarkTheme : systemLightTheme,
                    element,
                    attributes,
                    themes
                );
                setResolvedTheme(matches ? systemDarkTheme : systemLightTheme);
            };
            const systemDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

            // This checks for when the system theme changes and only run on the change
            systemDark.addEventListener("change", onSystemThemeChange);

            // This checks the current system theme and sets to it
            onSystemThemeChange(systemDark);

            return () =>
                systemDark.removeEventListener("change", onSystemThemeChange);
        } else {
            setBackgroundTheme(theme, element, attributes, themes);
        }
    }, [theme]);

    // When theme changes set cookie
    // cookieStore is async
    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set(themeKey, theme);
        } else {
            document.cookie = `theme=${theme};`;
        }

        // This is easier than broadcast channel to modify the theme
        localStorage.setItem(themeKey, theme);
    }, [theme]);

    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set(resolvedThemeKey, resolvedTheme);
        } else {
            document.cookie = `resolvedTheme=${resolvedTheme};`;
        }

        localStorage.setItem(resolvedThemeKey, resolvedTheme);
    }, [resolvedTheme]);

    useEffect(() => {
        // I'll set the inital theme the same on server and client to not have hydration issues
        // But then it will swap to the document cookie value on client below or it will stay the same with no rerender
        if (staticRender) {
            setTheme(
                document.cookie
                    .match("(^|;)\\s*" + themeKey + "\\s*=\\s*([^;]+)")
                    ?.pop() || defaultTheme
            );
        }
        if (theme === "system") {
            setResolvedTheme(
                window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? systemDarkTheme
                    : systemLightTheme
            );
        }

        // This is when another tabs theme changes
        // Was going to use broadcast api but this is easier since it runs on other tabs and doesnt run if localstorage is set to the value
        function onStorageChange({ key, newValue }: StorageEvent) {
            if (key === themeKey) {
                setTheme(newValue as Theme);
            } else if (key === resolvedThemeKey) {
                setResolvedTheme(newValue as ResolvedTheme);
            }
        }
        window.addEventListener("storage", onStorageChange);

        return () => window.removeEventListener("storage", onStorageChange);
    }, []);

    return (
        <SetThemeContext.Provider value={setTheme}>
            <ThemeContext.Provider value={theme}>
                <ResolvedThemeContext.Provider
                    value={theme === "system" ? resolvedTheme : theme}
                >
                    {staticRender ? (
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `(${setBackgroundTheme.toString()})((document.cookie.match("(^|;)\\\\s*" + "${themeKey}" + "\\\\s*=\\\\s*([^;]+)")?.pop() || "${defaultTheme}") === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "${systemDarkTheme}" : "${systemLightTheme}" : document.cookie.match("(^|;)\\\\s*" + "theme" + "\\\\s*=\\\\s*([^;]+)")?.pop() || "${defaultTheme}" , "${element}", "${attributes}", ${JSON.stringify(themes)})`
                            }}
                            nonce={
                                nonce
                                    ? typeof window === "undefined"
                                        ? nonce
                                        : ""
                                    : undefined
                            }
                        />
                    ) : (
                        defaultTheme === "system" && (
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `(${setBackgroundTheme.toString()})(window.matchMedia("(prefers-color-scheme: dark)").matches ? "${systemDarkTheme}" : "${systemLightTheme}", "${element}", "${attributes}", ${JSON.stringify(themes)})`
                                }}
                                nonce={
                                    nonce
                                        ? typeof window === "undefined"
                                            ? nonce
                                            : ""
                                        : undefined
                                }
                            />
                        )
                    )}
                    {children}
                </ResolvedThemeContext.Provider>
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

export function useTheme<B extends boolean = false>({
    resolved
}?: {
    resolved: B;
}): B extends true
    ? readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>]
    : readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme({ resolved = false }: { resolved?: boolean } = {}):
    | readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>]
    | readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
    if (resolved) {
        return [
            useContext(ResolvedThemeContext),
            useContext(SetThemeContext)
        ] as const;
    } else {
        return [useContext(ThemeContext), useContext(SetThemeContext)] as const;
    }
}

export function useGetTheme(): Theme {
    return useContext(ThemeContext);
}

export function useGetResolvedTheme(): ResolvedTheme {
    return useContext(ResolvedThemeContext);
}

export function useSetTheme(): React.Dispatch<React.SetStateAction<Theme>> {
    return useContext(SetThemeContext);
}
