import { config } from "@/util/getConfig";

import type { Theme } from "@/util/getConfig";

export function modifyTheme(theme: Theme): Theme {
    let renderedTheme = theme;

    if (theme === "system") {
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            renderedTheme = config.systemDarkTheme;
        } else {
            renderedTheme = config.systemLightTheme;
        }
    }

    if (config.modifyTheme) {
        renderedTheme = config.modifyTheme(renderedTheme);
    }

    return renderedTheme;
}
