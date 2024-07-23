// Try layout effect later
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setBackgroundTheme } from "../util/setBackgroundTheme";
import { useOnChange } from "../util/useOnChange";
import type { Theme, ResolvedTheme, ThemeProviderProps } from "../types";

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
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class",
    staticRender = false
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    // Late night thought but do I need to have people solve for hydration or could I solve it???
    // Basically instead of rendering systemLightTheme on the server then the actual theme on the client which only causes errors on dark mode
    // I could just render systemLightTheme initally on client too. Since either way the first render will be inaccurate. But this way it will be inaccurate on both server and client causing no reyhydration.
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(
        theme === "system" ? systemLightTheme : theme
    );

    useOnChange(() => {
        if (theme === "system") {
            const onSystemThemeChange = ({
                matches
            }: MediaQueryListEventInit) => {
                setBackgroundTheme(
                    matches ? systemDarkTheme : systemLightTheme,
                    element,
                    attributes
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
            setBackgroundTheme(theme, element, attributes);
        }
    }, [theme]);

    // When theme changes set cookie
    // cookieStore is async
    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set("theme", theme);
        } else {
            document.cookie = `theme=${theme};`;
        }

        // This is easier than broadcast channel to modify the theme
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        // I'll set the inital theme the same on server and client to not have hydration issues
        // But then it will swap to the document cookie value on client below or it will stay the same with no rerender
        if (staticRender) {
            console.log(
                "inital",
                theme,
                document.cookie
                    .match("(^|;)\\s*" + "theme" + "\\s*=\\s*([^;]+)")
                    ?.pop()
            );
            setTheme(
                document.cookie
                    .match("(^|;)\\s*" + "theme" + "\\s*=\\s*([^;]+)")
                    ?.pop() || defaultTheme
            );
        }

        // This is when another tabs theme changes
        // Was going to use broadcast api but this is easier since it runs on other tabs and doesnt run if localstorage is set to the value
        function onStorageChange({ key, newValue }: StorageEvent) {
            if (key === "theme") {
                setTheme(newValue as Theme);
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
                                __html: `(${setBackgroundTheme.toString()})((document.cookie.match("(^|;)\\\\s*" + "theme" + "\\\\s*=\\\\s*([^;]+)")?.pop() || "${defaultTheme}") === "system" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "${systemDarkTheme}" : "${systemLightTheme}" : document.cookie.match("(^|;)\\\\s*" + "theme" + "\\\\s*=\\\\s*([^;]+)")?.pop() || "${defaultTheme}" , "${element}", "${attributes}")`
                            }}
                        />
                    ) : (
                        defaultTheme === "system" && (
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `(${setBackgroundTheme.toString()})(window.matchMedia("(prefers-color-scheme: dark)").matches ? "${systemDarkTheme}" : "${systemLightTheme}", "${element}", "${attributes}", "true")`
                                }}
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
