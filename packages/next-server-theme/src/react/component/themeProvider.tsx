import { ServerThemeProvider } from "./themeServer.context";
import { getServerTheme } from "../util/getServerTheme";
import { StaticThemeProvider } from "./themeStatic.context";
import type { Theme } from "../types";

export function ThemeProvider({
    children,
    defaultTheme = "system",
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    element = "html",
    attributes = "class",
    staticRender = true
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    element?: string;
    attributes?: string | string[];
    staticRender?: boolean;
}) {
    if (!staticRender) {
        return (
            // To have cookie from getServerTheme we need this to be a server component
            <ServerThemeProvider
                defaultTheme={getServerTheme(defaultTheme)}
                systemLightTheme={systemLightTheme}
                systemDarkTheme={systemDarkTheme}
                element={element}
                attributes={attributes}
            >
                {children}
            </ServerThemeProvider>
        );
    } else {
        return (
            <StaticThemeProvider
                defaultTheme={defaultTheme}
                systemLightTheme={systemLightTheme}
                systemDarkTheme={systemDarkTheme}
                element={element}
                attributes={attributes}
            >
                {children}
            </StaticThemeProvider>
        );
    }
}
