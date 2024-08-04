import { cookies } from "next/headers";
import type { Theme, ResolvedTheme } from "../types";

// This is basically a static variable
// But we warned while hot reloading this will stay the same
// Basically makes sure all the components are in sync
// Basically allows me to know what the default theme is from the prop set on the Provider
let defaultThemeStatic: string;
let cookie: string | undefined;

export function getServerThemeForProvider(
    defaultTheme?: Theme,
    themeKey = "theme"
): Theme {
    if (defaultTheme) {
        defaultThemeStatic = defaultTheme;
    }
    cookie = cookies().get(themeKey)?.value;

    // even if the theme is system before being displayed the right theme will be set
    return cookie ?? defaultThemeStatic;
}

export function getServerTheme(): ResolvedTheme | "" {
    // In order to use the default theme from the provider without repeeating the prop twice
    // I use a static variable to store the default theme from the provider intially
    console.log("cookie", cookie, "defaultThemeStatic", defaultThemeStatic);
    const theme = cookie ?? defaultThemeStatic;

    // This is cause whene the user renders the theme on the server we want just "" not "system"
    // Since if they have the theme prop we need to remove it too or we just don't have it
    if (theme === "system") {
        return "";
    } else {
        return theme;
    }
}
