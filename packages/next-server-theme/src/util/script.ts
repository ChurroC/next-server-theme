import type { Theme } from "../types";

export function setSystemDark(
    attributes: string | string[] = "class",
    systemLightTheme: Theme,
    systemDarkTheme: Theme
) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        [attributes].flat().forEach(attribute => {
            document.documentElement.setAttribute(attribute, systemDarkTheme);
        });
    } else {
        [attributes].flat().forEach(attribute => {
            document.documentElement.setAttribute(attribute, systemLightTheme);
        });
    }
}
