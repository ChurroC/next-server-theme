import { config } from "@/util/getConfig";
type Theme = typeof config.defaultTheme;

export function setSystemDark(systemDarkTheme: Theme) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.className = systemDarkTheme;
    }
}
