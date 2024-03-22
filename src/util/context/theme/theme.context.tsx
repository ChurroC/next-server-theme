"use client";

import { isClient } from "@/util/helpers/isClient";
import { useCookies } from "@/util/hooks/useCookies.hook";
import { useEventListener } from "@/util/hooks/useEventListener";
import { useOnChange } from "@/util/hooks/useOnChange.hook";
import { useReferenceState } from "@/util/hooks/useReferenceState.hook";
import { createContext, use } from "react";

const createThemeContext = <T extends string>() => createContext<T>("" as T);
const createSetThemeContext = <T extends string>() =>
    createContext<React.Dispatch<React.SetStateAction<T>>>(() => {});

export function ThemeProviderWithoutProps<
    Theme extends string = "light" | "dark" | "system"
>({
    children,
    cookie,
    onThemeChange,
    debounce = 0
}: {
    children: React.ReactNode;
    cookie: Theme;
    onThemeChange?: (theme: Theme) => void;
    debounce?: number;
}) {
    const [theme, setTheme] = useCookies<Theme>("theme", cookie, debounce);

    const ThemeContext = createThemeContext<Theme>();
    const SetThemeContext = createSetThemeContext<Theme>();

    const themeReference = useReferenceState(theme);
    useEventListener(
        "change",
        ({ matches }: MediaQueryListEventInit) => {
            if (themeReference.current === "system") {
                if (matches) document.documentElement.classList.add("dark");
                else document.documentElement.classList.remove("dark");
            }
        },
        isClient() ? window.matchMedia("(prefers-color-scheme: dark)") : null
    );

    useOnChange(() => {
        if (onThemeChange) {
            onThemeChange(theme);
        } else {
            console.log("Theme changed to", theme);
            if (
                theme === "dark" ||
                (theme === "system" &&
                    (isClient()
                        ? window.matchMedia("(prefers-color-scheme: dark)")
                              .matches
                        : false))
            ) {
                document.documentElement.className = "dark";
            } else if (theme === "light") {
                document.documentElement.className = "";
            } else {
                document.documentElement.className = theme;
            }
        }
    }, [theme]);

    return (
        <SetThemeContext.Provider value={setTheme}>
            <ThemeContext.Provider value={theme}>
                <script
                    dangerouslySetInnerHTML={{
                        __html:
                            `
                            // IIFE to not pollute the global scope
                            (() => {
                                const theme = "${cookie}"
                            ` +
                            // eslint-disable-next-line
                            `const onThemeChange = ${onThemeChange};

                                if (onThemeChange) {
                                    onThemeChange(theme);
                                } else {
                                    console.log("Theme changed to", theme);
                                    if (
                                        theme === "dark" ||
                                        (theme === "system" &&
                                            window.matchMedia("(prefers-color-scheme: dark)").matches)
                                    ) {
                                        document.documentElement.className = "dark";
                                    } else if (theme === "light") {
                                        document.documentElement.className = "";
                                    } else {
                                        document.documentElement.className = theme;
                                    }
                                }
                            })();
                            `
                    }}
                />
                {children}
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

// export function getTheme<T extends string>() {
//     console.log("jbh");
//     return use(createThemeContext<T>());
// }
export const getTheme = <T,>() => use(createThemeContext<T>());
export function getSetTheme<T extends string>(): React.Dispatch<
    React.SetStateAction<T>
> {
    return use(createSetThemeContext<T>());
}
