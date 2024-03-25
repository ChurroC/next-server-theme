"use client";

import { isClient } from "src/util/helpers/isClient";
import { useCookies } from "src/util/hooks/useCookies.hook";
import { useEventListener } from "src/util/hooks/useEventListener";
import { useOnChange } from "src/util/hooks/useOnChange.hook";
import { useReferenceState } from "src/util/hooks/useReferenceState.hook";
import { createContext, use } from "react";
import { onThemeChange } from "src/util/helpers/getOnThemeChange";

import { config } from "theme.config";
type Theme = typeof config.defaultTheme;

const ThemeContext = createContext<Theme>("" as Theme);
const SetThemeContext = createContext<
    React.Dispatch<React.SetStateAction<Theme>>
>(() => {});

export function ThemeProviderWithoutProps({
    children,
    cookie
}: {
    children: React.ReactNode;
    cookie: Theme;
}) {
    const [theme, setTheme] = useCookies<Theme>(
        "theme",
        cookie,
        config.debounce ?? 0
    );

    const themeReference = useReferenceState(theme);
    useEventListener(
        "change",
        ({ matches }: MediaQueryListEventInit) => {
            if (themeReference.current === "system") {
                if (matches)
                    document.documentElement.className = config.systemDarkTheme;
                else
                    document.documentElement.className =
                        config.systemLightTheme;
            }
        },
        isClient() ? window.matchMedia("(prefers-color-scheme: dark)") : null
    );

    useOnChange(() => {
        document.documentElement.className = onThemeChange(theme);
    }, [theme]);

    return (
        <SetThemeContext.Provider value={setTheme}>
            <ThemeContext.Provider value={theme}>
                {cookie === "system" && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                `
                                // IIFE to not pollute the global scope
                                (() => {
                                ` +
                                // eslint-disable-next-line
                                `const onThemeChange = ${onThemeChange};

                                if (
                                    window.matchMedia("(prefers-color-scheme: dark)")
                                        .matches
                                ) {
                                    document.documentElement.className = "${config.systemDarkTheme}";
                                } else {
                                    document.documentElement.className = "${config.systemLightTheme}";
                                }
                                })();
                            `
                        }}
                    />
                )}
                {children}
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

export function getTheme() {
    return [use(ThemeContext), use(SetThemeContext)];
}

export function getThemeValue() {
    return use(ThemeContext);
}
export function getSetTheme() {
    return use(SetThemeContext);
}
