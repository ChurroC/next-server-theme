import { ThemeProvider as ThemeProviderComponent } from "./themeProvider.context";
import { getServerTheme } from "../util/getServerTheme";
import type { ThemeProviderProps } from "../types";

export function ThemeProvider({
    children,
    defaultTheme = "system",
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
                staticRender ? defaultTheme : getServerTheme(defaultTheme)
            }
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
