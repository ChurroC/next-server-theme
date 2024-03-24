export interface ThemeConfig<
    Theme extends string = "dark" | "light" | "system"
> {
    defaultTheme: Theme;
    systemLightTheme: Theme;
    systemDarkTheme: Theme;
    onThemeChange?: (theme: Theme) => Theme;
    debounce?: number;
}
