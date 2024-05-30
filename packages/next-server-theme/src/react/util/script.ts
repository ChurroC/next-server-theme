import type { Theme } from "../types";

export function setSystemDark(
    systemLightTheme: Theme,
    systemDarkTheme: Theme,
    element: string = "html",
    attributes: string | string[] = "class"
) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
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
