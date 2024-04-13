"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setSystemDark } from "@/util/script";

declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

const ThemeContext = createContext<string>("");
const SetThemeContext = createContext<
    React.Dispatch<React.SetStateAction<string>>
>(() => {});

export function useOnChange(
    callback: React.EffectCallback,
    dependancies: React.DependencyList
) {
    const [hasMounted, setHasMounted] = useState(false);

    // Page loads and sets hasMounted to true then next time dependacies change it will run the callback
    useEffect(() => {
        if (hasMounted) {
            return callback();
        } else {
            setHasMounted(true);
        }
    }, dependancies);
}

export function ThemeProviderWithoutServerTheme({
    children,
    serverTheme,
    systemLightTheme,
    systemDarkTheme,
    attributes
}: {
    children: React.ReactNode;
    serverTheme: string;
    systemLightTheme: string;
    systemDarkTheme: string;
    attributes: string | string[];
}) {
    const [theme, setTheme] = useState<string>(serverTheme);

    // When theme changes set class name
    useEffect(() => {
        if (theme === "system") {
            const onSystemThemeChange = ({
                matches
            }: MediaQueryListEventInit) => {
                if (matches)
                    [attributes].flat().forEach(attribute => {
                        document.documentElement.setAttribute(
                            attribute,
                            systemDarkTheme
                        );
                    });
                else
                    [attributes].flat().forEach(attribute => {
                        document.documentElement.setAttribute(
                            attribute,
                            systemLightTheme
                        );
                    });
            };
            const systemDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );
            systemDark.addEventListener("change", onSystemThemeChange);

            if (
                typeof window !== "undefined" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            ) {
                [attributes].flat().forEach(attribute => {
                    document.documentElement.setAttribute(
                        attribute,
                        systemDarkTheme
                    );
                });
            } else {
                [attributes].flat().forEach(attribute => {
                    document.documentElement.setAttribute(
                        attribute,
                        systemLightTheme
                    );
                });
            }

            return () =>
                systemDark.removeEventListener("change", onSystemThemeChange);
        } else {
            [attributes].flat().forEach(attribute => {
                document.documentElement.setAttribute(attribute, theme);
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
                setTheme(newValue!);
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
                            __html: `(${setSystemDark.toString()})("${attributes}", "${systemLightTheme}", "${systemDarkTheme}")`
                        }}
                    />
                )}
                {children}
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

export function useTheme() {
    return [useContext(ThemeContext), useContext(SetThemeContext)];
}

export function useGetTheme() {
    return useContext(ThemeContext);
}
export function useSetTheme() {
    return useContext(SetThemeContext);
}
