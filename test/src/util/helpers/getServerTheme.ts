import { cookies } from "next/headers";
import { config } from "theme.config";
import { onThemeChange } from "src/util/helpers/getOnThemeChange";

type Theme = typeof config.defaultTheme;

export async function getTheme(): Promise<Theme> {
    const theme =
        (cookies().get("theme")?.value as Theme) ?? config.defaultTheme;

    return onThemeChange(theme);
}
