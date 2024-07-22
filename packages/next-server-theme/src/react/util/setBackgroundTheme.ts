import type { Theme } from "../types";

export function setBackgroundTheme(
    theme: Theme,
    element: string = "html",
    attributes: string | string[] = "class",
    test = false
) {
    console.log("setBackgroundTheme", theme, element, attributes);
    [attributes].flat().forEach(attribute => {
        document.querySelector(element)?.setAttribute(attribute, theme);
    });
    if (test) {
    }
}

export function changeText(theme: string) {
    walkText(
        document.body as HTMLElement & {
            data: string;
        },
        theme
    );
    document.querySelector("[data-test]")?.setAttribute("data-test", theme);
}

function walkText(
    node: HTMLElement & {
        data: string;
    },
    replacement: string
) {
    if (node.nodeType == 3) {
        node.data = node.data.replace(/bob/g, replacement);
    }
    if (node.nodeType == 1 && node.nodeName != "SCRIPT") {
        for (var i = 0; i < node.childNodes.length; i++) {
            walkText(
                node.childNodes[i] as HTMLElement & {
                    data: string;
                },
                replacement
            );
        }
    }
}
