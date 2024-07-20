// Try layout effect later
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setBackgroundTheme } from "../util/setBackgroundTheme";
import type { Theme } from "../types";
import { useOnChange } from "../util/useOnChange";

type ResolvedTheme = Exclude<Theme, "system"> | undefined;

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
    console.log(staticRender);
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

    const resolvedTheme: ResolvedTheme =
        typeof document !== "undefined" ? theme : undefined;

    // When theme changes set class name
    useEffect(() => {
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
                <ResolvedThemeContext.Provider value={resolvedTheme}>
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

export function useTheme(
    resolved?: true
): readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme(
    resolved?: false
): readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme(
    resolved?: boolean
):
    | readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>]
    | readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
export function useTheme(
    resolved: boolean = false
):
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

useTheme(false);

export function useGetTheme(): Theme {
    return useContext(ThemeContext);
}
export function useSetTheme(): React.Dispatch<React.SetStateAction<Theme>> {
    return useContext(SetThemeContext);
}

function dependsOnParameter(
    x?: true
): readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>];
function dependsOnParameter(
    x?: false
): readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
function dependsOnParameter(
    x?: boolean
):
    | readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>]
    | readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
function dependsOnParameter(
    x: boolean = false
):
    | readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>]
    | readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
    if (x) {
        return 3;
    } else {
        return "string";
    }
}

function calling(x: boolean) {
    dependsOnParameter(x); // returns number| string
    dependsOnParameter(true); // returns number
    dependsOnParameter(false); // returns string
    const t = dependsOnParameter(); // returns string

    useTheme(x); // returns number| string
    useTheme(true); // returns number
    useTheme(false); // returns string
    const t = useTheme(); // returns string
}
