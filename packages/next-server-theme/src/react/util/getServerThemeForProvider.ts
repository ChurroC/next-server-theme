import { cookies } from "next/headers";
import type { Theme } from "../types";

// This is basically a static variable
// But we warned while hot reloading this will stay the same
// Basically makes sure all the components are in sync
// Basically allows me to know what the default theme is from the prop set on the Provider
export let defaultThemeStatic: string;
export let cookie: string | undefined;

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
