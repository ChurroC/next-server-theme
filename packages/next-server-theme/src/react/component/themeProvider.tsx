import { ThemeProvider as ThemeProviderComponent } from "./themeProvider.context";
import { getServerTheme } from "../util/getServerTheme";
import type { Theme } from "../types";

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
        >
            {children}
        </ThemeProviderComponent>
    );
}
