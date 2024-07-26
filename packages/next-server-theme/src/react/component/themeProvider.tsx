import { ThemeProvider as ThemeProviderComponent } from "./themeProvider.context";
import { getServerThemeFromProvider } from "../util/getServerTheme";
import { cookies } from "next/headers";
import type { ThemeProviderProps } from "../types";

export function ThemeProvider({
    children,
    defaultTheme = "system",
    themes,
    themeKey = "theme",
    resolvedThemeKey = "resolvedTheme",
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class",
    staticRender = false,
    nonce
}: ThemeProviderProps) {
    return (
        // To have cookie from getServerTheme we need this to be a server component
        <ThemeProviderComponent
            defaultTheme={
                staticRender
                    ? defaultTheme
                    : getServerThemeFromProvider(defaultTheme, themeKey)
            }
            defaultResolvedTheme={
                staticRender
                    ? undefined
                    : cookies().get(resolvedThemeKey)?.value
            }
            themes={themes}
            themeKey={themeKey}
            resolvedThemeKey={resolvedThemeKey}
            systemLightTheme={systemLightTheme}
            systemDarkTheme={systemDarkTheme}
            element={element}
            attributes={attributes}
            staticRender={staticRender}
            nonce={nonce}
        >
            {children}
        </ThemeProviderComponent>
    );
}
