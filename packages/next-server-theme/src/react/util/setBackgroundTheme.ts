import type { Theme } from "../types";

export function setBackgroundTheme(
    theme: Theme,
    element: string = "html",
    attributes: string | string[] = "class"
) {
    [attributes].flat().forEach(attribute => {
        document.querySelector(element)?.setAttribute(attribute, theme);
    });
}
