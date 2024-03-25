import { cookies } from "next/headers";
import { config } from "theme.config";
import { modifyTheme } from "src/util/helpers/modifyTheme";

type Theme = typeof config.defaultTheme;

export function getThemeWithoutModification(): Theme {
    const theme =
        (cookies().get("theme")?.value as Theme) ?? config.defaultTheme;

    return theme;
}

export async function getTheme(): Promise<Theme> {
    const theme = getThemeWithoutModification();

    return modifyTheme(theme);
}
