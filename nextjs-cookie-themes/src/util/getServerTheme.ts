import { cookies } from "next/headers";

// This is basically a static variable
// But we warned while hot reloading this will stay the same
let defaultThemeStatic: string;

export function getServerTheme(defaultTheme?: string): string {
    if (defaultTheme) {
        defaultThemeStatic = defaultTheme;
    }
    const cookie = cookies().get("theme")?.value;

    // even if the theme is system before being displayed the right theme will be set
    return cookie ?? defaultThemeStatic ?? "system";
}
