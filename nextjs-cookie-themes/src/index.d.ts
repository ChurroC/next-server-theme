export declare var cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

// For side effects with dom check if window !== "undefined" so you run on server since this function runs on server to get theme on server side
export interface ThemeConfig<
    Theme extends string = "dark" | "light" | "system"
> {
    defaultTheme: Theme;
    systemLightTheme: Theme;
    systemDarkTheme: Theme;
    debounce?: number;
    modifyTheme?: (theme: Theme) => Theme;
}
