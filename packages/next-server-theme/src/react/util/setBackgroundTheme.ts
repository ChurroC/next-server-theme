import type { Theme } from "../types";

export function setBackgroundTheme(
    theme: Theme,
    elementId: string = "html",
    attributes: string | string[] = "class",
    themes?: Theme[]
) {
    const element = document.querySelector(elementId);
    [attributes].flat().forEach(attribute => {
        if (attribute === "class" && themes) {
            element?.classList.remove(...themes);
            element?.classList.add(theme);
        } else {
            element?.setAttribute(attribute, theme);
        }
    });
}
