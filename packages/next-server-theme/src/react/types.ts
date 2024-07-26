export type Theme = string;
export type ResolvedTheme = Exclude<Theme, "system">;

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    themes?: Theme[];
    themeKey?: string;
    resolvedThemeKey?: string;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    element?: string;
    attributes?: string | string[];
    staticRender?: boolean;
    nonce?: string | null;
}
