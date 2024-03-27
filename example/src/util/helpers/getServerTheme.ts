import { cookies } from "next/headers";

import { config } from "@/util/helpers/getConfig";
import { modifyTheme } from "@/util/helpers/modifyTheme";

type Theme = typeof config.defaultTheme;

export function getThemeWithoutModification(): Theme {
    const themeUnJSONed =
        (cookies().get("theme")?.value as Theme) ?? config.defaultTheme;

    const theme = JSON.parse(themeUnJSONed) as Theme;

    return theme;
}

export function getServerTheme(): Theme {
    const theme = getThemeWithoutModification();

    return modifyTheme(theme);
}
