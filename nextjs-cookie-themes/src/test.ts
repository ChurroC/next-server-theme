import { cosmiconfig } from "cosmiconfig";
import { type ThemeConfig } from "@/index.d";

export async function getConfig() {
    let config = {
        defaultTheme: "system",
        systemLightTheme: "light",
        systemDarkTheme: "dark"
    };
    
    try {
        const customConfig = (await import("theme.config")).default
        type Theme = typeof customConfig.themes[number]
        const config:ThemeConfig<Theme> = {
            themes: customConfig.themes,
            defaultTheme: customConfig.defaultTheme,
            systemLightTheme: customConfig.systemLightTheme,
            systemDarkTheme: customConfig.systemDarkTheme
        }
        return config;
    } catch (e) {
        console.error(e);
    }
}
export async function noTypeGetConfig() {
    // No typing
    const explorerSync = await cosmiconfig("theme");
    const result = await explorerSync.search();
    return result.config;
}
export async function noTypeGetConfig2(): Promise<ThemeConfig<string>> {
    return noTypeGetConfig() ?? getConfig()
}

(async () => {
    const config = await getConfig();
    console.log(config)
    type Theme = typeof config
})()