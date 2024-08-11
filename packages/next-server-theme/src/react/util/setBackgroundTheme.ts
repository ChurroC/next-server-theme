import type { Theme } from "../types";

export async function setBackgroundTheme(
    theme: Theme,
    elementId: string = "html",
    attributes: string | string[] = "class",
    themes?: Theme[]
) {
    let element = document.querySelector(elementId);
    if (element) {
        [attributes].flat().forEach(attribute => {
            if (attribute === "class" && themes) {
                element?.classList.add(theme);
                element?.classList.remove(...themes);
            } else {
                element?.setAttribute(attribute, theme);
            }
        });
    } else {
        element = document.querySelector("html");

        [attributes].flat().forEach(attribute => {
            if (attribute === "class" && themes) {
                element?.classList.add(theme);
                element?.classList.remove(...themes);
            } else {
                element?.setAttribute(attribute, theme);
            }
        });

        // Wait for the element to be added to the DOM
        // Then removes from HTML and adds to the element
        element = await new Promise<Element | null>(resolve => {
            if (document.querySelector(elementId)) {
                return resolve(document.querySelector(elementId));
            }

            const observer = new MutationObserver(() => {
                if (document.querySelector(elementId)) {
                    observer.disconnect();
                    resolve(document.querySelector(elementId));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
        [attributes].flat().forEach(attribute => {
            if (attribute === "class" && themes) {
                element?.classList.add(theme);
                element?.classList.remove(...themes);
                document.querySelector("html")?.classList.remove(...themes);
            } else {
                element?.setAttribute(attribute, theme);
            }
        });
    }
}
