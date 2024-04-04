import { cookies } from "next/headers";

import { config } from "@/util/helpers/getConfig";
import { modifyTheme } from "@/util/helpers/modifyTheme";

type Theme = typeof config.defaultTheme;

export function getThemeWithoutModification(): Theme {
    const themeUnJSONed = cookies().get("theme")?.value as Theme;

    if (themeUnJSONed) {
        return JSON.parse(themeUnJSONed) as Theme;
    }

    return config.defaultTheme;
}

export function getServerTheme(): Theme {
    const theme = getThemeWithoutModification();

    return modifyTheme(theme);
}
