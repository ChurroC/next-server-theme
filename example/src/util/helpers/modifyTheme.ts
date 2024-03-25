import { config } from "theme.config";
import { isClient } from "./isClient";

type Theme = typeof config.defaultTheme;

export function modifyTheme(theme: Theme): Theme {
    console.log("Theme changed to", theme);
    let renderedTheme = theme;

    if (theme === "system") {
        if (
            isClient() &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            renderedTheme = config.systemDarkTheme;
        } else {
            renderedTheme = config.systemLightTheme;
        }
    }

    renderedTheme = config?.modifyTheme
        ? config.modifyTheme(renderedTheme)
        : renderedTheme;

    return renderedTheme;
}
