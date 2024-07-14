"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useOnChange } from "../util/useOnChange";
import { setSystemTheme } from "../util/setSystemTheme";
import type { Theme } from "../types";

declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

const ThemeContext = createContext<Theme>("");
const SetThemeContext = createContext<
    React.Dispatch<React.SetStateAction<Theme>>
>(() => {});

export function ThemeProviderWithoutServerTheme({
    children,
    serverTheme = "system",
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class"
}: {
    children: React.ReactNode;
    serverTheme: Theme;
    systemLightTheme: Theme;
    systemDarkTheme: Theme;
    element: string;
    attributes: string | string[];
}) {
    const [theme, setTheme] = useState<Theme>(serverTheme);

    // When theme changes set class name
    useOnChange(() => {
        if (theme === "system") {
            const onSystemThemeChange = ({
                matches
            }: MediaQueryListEventInit) => {
                setSystemTheme(
                    matches ?? false,
                    systemLightTheme,
                    systemDarkTheme,
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
                {serverTheme === "system" && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(${setSystemTheme.toString()})(window.matchMedia("(prefers-color-scheme: dark)").matches, "${systemLightTheme}", "${systemDarkTheme}", "${element}", "${attributes}")`
                        }}
                    />
                )}
                {children}
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

export function useTheme(): readonly [
    Theme,
    React.Dispatch<React.SetStateAction<Theme>>
] {
    return [useContext(ThemeContext), useContext(SetThemeContext)] as const;
}

export function useGetTheme(): Theme {
    return useContext(ThemeContext);
}
export function useSetTheme(): React.Dispatch<React.SetStateAction<Theme>> {
    return useContext(SetThemeContext);
}
