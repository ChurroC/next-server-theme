export type Theme = string;
export type ResolvedTheme = Exclude<Theme, "system"> | undefined;

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    element?: string;
    attributes?: string | string[];
    staticRender?: boolean;
    nonce?: string;
}
