import type { Theme } from "../types";

export function setSystemTheme(
    isDarkMode: boolean,
    systemLightTheme: Theme,
    systemDarkTheme: Theme,
    element: string = "html",
    attributes: string | string[] = "class"
) {
    if (isDarkMode) {
        [attributes].flat().forEach(attribute => {
            document
                .querySelector(element)
                ?.setAttribute(attribute, systemDarkTheme);
        });
    } else {
        [attributes].flat().forEach(attribute => {
            document
                .querySelector(element)
                ?.setAttribute(attribute, systemLightTheme);
        });
    }
}
