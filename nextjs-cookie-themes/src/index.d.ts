// For side effects with dom check if window !== "undefined" so you run on server since this function runs on server to get theme on server side
export interface ThemeConfig {
    themes: string[];
    defaultTheme?: string;
    systemLightTheme?: string;
    systemDarkTheme?: string;
}