import { ThemeProviderWithoutServerTheme } from "@/components/theme.context";
import { getServerTheme } from "@/util/getServerTheme";
import type { Theme } from "@/types";

export async function ThemeProvider({
    children,
    defaultTheme = "system",
    systemLightTheme = "light",
    systemDarkTheme = "dark",
    attributes = "class"
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: string;
    systemDarkTheme?: string;
    attributes?: string | string[];
}) {
    return (
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
