import { cookies } from "next/headers";
import type { Theme } from "../types";

// This is basically a static variable
// But we warned while hot reloading this will stay the same
// Basically makes sure all the components are in sync
let defaultThemeStatic: string;

export function getServerTheme(defaultTheme?: Theme): Theme {
    if (defaultTheme) {
        defaultThemeStatic = defaultTheme;
    }
    const cookie = cookies().get("theme")?.value;

    // even if the theme is system before being displayed the right theme will be set
    return cookie ?? defaultThemeStatic ?? "system";
}
