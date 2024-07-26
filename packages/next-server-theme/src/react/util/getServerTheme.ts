import { cookie, defaultThemeStatic } from "./getServerThemeForProvider";
import type { ResolvedTheme } from "../types";

export function getServerTheme(): ResolvedTheme | "" {
    // In order to use the default theme from the provider without repeeating the prop twice
    // I use a static variable to store the default theme from the provider intially
    const theme = cookie ?? defaultThemeStatic;

    // This is cause whene the user renders the theme on the server we want just "" not "system"
    // Since if they have the theme prop we need to remove it too or we just don't have it
    if (theme === "system") {
        return "";
    } else {
        return theme;
    }
}
