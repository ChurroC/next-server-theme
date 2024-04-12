import { cosmiconfigSync } from "cosmiconfig";
import type { ThemeConfig } from "@/types";

export function getConfig() {
    // No typing
    const explorerSync = cosmiconfigSync("theme");
    const test = explorerSync.search();
    console.log(test);

    const config: ThemeConfig = {
        themes: ["dark", "light", "system"],
        defaultTheme: "system",
        systemLightTheme: "light",
        systemDarkTheme: "dark",
        ...customConfig
    };
    return config;
}
