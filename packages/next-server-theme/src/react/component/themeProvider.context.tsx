// Try layout effect later
"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
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
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class",
    staticRender = false
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    element?: string;
    attributes?: string | string[];
    staticRender?: boolean;
}) {
    // Can't use CookieStore since it's async
    const [theme, setTheme] = useState<Theme>(() => {
        if (staticRender) {
            if (typeof document !== "undefined") {
                return (
                    document.cookie
                        .match("(^|;)\\s*" + "theme" + "\\s*=\\s*([^;]+)")
                        ?.pop() || defaultTheme
                );
            } else {
                return defaultTheme;
            }
        } else {
            return defaultTheme;
        }
    });

    console.log(theme);
    console.log(typeof document !== "undefined", theme === "system");
    const resolvedTheme = useRef<ResolvedTheme>(
        typeof document === "undefined" && theme === "system"
            ? systemLightTheme
            : theme
    );
    // if (theme !== "system") {
    //     resolvedTheme = theme;
    // } else {
    //     if (typeof document !== "undefined") {
    //         const systemDark = window.matchMedia(
    //             "(prefers-color-scheme: dark)"
    //         );
    //         resolvedTheme = systemDark.matches
    //             ? systemDarkTheme
    //             : systemLightTheme;
    //     } else {
    //         resolvedTheme = systemLightTheme;
    //     }
    // }

    // When theme changes set class name
    useEffect(() => {
        resolvedTheme.current = theme;

        if (theme === "system") {
            const onSystemThemeChange = ({
                matches
            }: MediaQueryListEventInit) => {
                setBackgroundTheme(
                    matches ? systemDarkTheme : systemLightTheme,
                    element,
                    attributes
                );
            };
            const systemDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

            resolvedTheme.current = systemDark.matches
                ? systemDarkTheme
                : systemLightTheme;

            // This checks for when the system theme changes and only run on the change
            systemDark.addEventListener("change", onSystemThemeChange);

            // This checks the current system theme and sets to it
            onSystemThemeChange(systemDark);

            return () =>
                systemDark.removeEventListener("change", onSystemThemeChange);
        } else {
            [attributes].flat().forEach(attribute => {
                document.querySelector(element)?.setAttribute(attribute, theme);
            });
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

    // This is when another tabs theme changes
    // Was going to use broadcast api but this is easier since it runs on other tabs and doesnt run if localstorage is set to the value
    useEffect(() => {
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
                <ResolvedThemeContext.Provider value={resolvedTheme.current}>
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
                                    __html: `(${setBackgroundTheme.toString()})(window.matchMedia("(prefers-color-scheme: dark)").matches ? "${systemDarkTheme}" : "${systemLightTheme}", "${element}", "${attributes}")`
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

export function useTheme({
    resolved
}?: {
    resolved?: false;
}): readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme({
    resolved
}?: {
    resolved?: true;
}): readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme({
    resolved = false
}: {
    resolved?: boolean;
} = {}):
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
