import type { Theme } from "../types";

export function setBackgroundTheme(
    theme: Theme,
    element: string = "html",
    attributes: string | string[] = "class",
    themes?: Theme[]
) {
    console.log(themes);
    [attributes].flat().forEach(attribute => {
        if (attribute === "class" && themes) {
            console.log("class with themes");
            document.querySelector(element)?.classList.remove(...themes);
            document.querySelector(element)?.classList.add(theme);
        } else {
            console.log("nah");
            document.querySelector(element)?.setAttribute(attribute, theme);
        }
    });
}
