import type { Theme } from "@/util/getConfig";

export function setSystemDark(systemDarkTheme: Theme) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.className = systemDarkTheme;
    }
}
