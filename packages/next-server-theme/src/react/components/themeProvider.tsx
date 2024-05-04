import { ThemeProviderWithoutServerTheme } from "@/components/theme.context";
import { getServerTheme } from "@/util/getServerTheme";
import type { Theme } from "../types";

export function ThemeProvider({
    children,
    defaultTheme = "system",
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    attributes = "class"
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    attributes?: string | string[];
}) {
    return (
        // To have cookie from getServerTheme we need this to be a server component
        <ThemeProviderWithoutServerTheme
            serverTheme={getServerTheme(defaultTheme)}
            systemLightTheme={systemLightTheme}
            systemDarkTheme={systemDarkTheme}
            attributes={attributes}
        >
            {children}
        </ThemeProviderWithoutServerTheme>
    );
}
