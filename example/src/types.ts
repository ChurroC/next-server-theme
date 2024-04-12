// For side effects with dom check if window !== "undefined" so you run on server since this function runs on server to get theme on server side
export interface ThemeConfig<Theme extends string> {
    themes?: Theme[];
    defaultTheme: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    modifyTheme?: (theme: Theme) => Theme;
}

export function themeConfig<T extends string>(themeConfig: ThemeConfig<T>) {
    console.log(themeConfig);
}

themeConfig({
    themes: ["light", "dark"],
    defaultTheme: "light",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    modifyTheme: theme => theme
});

// I could just have props on the actual componenet: no types
// I could use this intefrface ThemeConfig: no types
// I could this function themeConfig: types
// Seperate serverCookie component with other themeProviderwithnoprop to pass down function: no types
