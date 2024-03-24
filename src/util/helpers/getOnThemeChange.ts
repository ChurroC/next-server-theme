import { config } from "theme.config";

type Theme = typeof config.defaultTheme;

export function onThemeChange(theme: Theme): Theme {
    if (config.onThemeChange) {
        return config.onThemeChange(theme);
    } else {
        console.log("Theme changed to", theme);
        if (theme === "system") {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return config.systemDarkTheme;
            } else {
                return config.systemLightTheme;
            }
        } else {
            return theme;
        }
    }
}
