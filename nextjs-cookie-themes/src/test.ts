import { cosmiconfig } from "cosmiconfig";
import { type ThemeConfig } from "@/index.d";

export async function getConfig() {
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
    const config = result.config;
    type Theme = typeof config.themes[number]
    
    const config = {
        defaultTheme: "system",
        systemLightTheme: "light",
        systemDarkTheme: "dark"
    };
    console.log(config)
    if (!("defaultTheme" in config)) {
        config.defaultTheme = "system";
    }
    if (!("systemLightTheme" in config)) {
        config.systemLightTheme = "light";
    }
    if (!("systemDarkTheme" in config)) {
        config.systemDarkTheme = "dark";
    }
    return config as ThemeConfig
}
export async function noTypeGetConfig2(): Promise<ThemeConfig<"dark" | "system" | "light" | "pink">> {
    const typedConfig = await getConfig()
    if (typedConfig) {
        return typedConfig
    } else {
        return new Promise((resolve, reject) => {
            const config: ThemeConfig = {
                themes: ["dark", "light", "system", "pink"],
                defaultTheme: "system",
                systemLightTheme: "light",
                systemDarkTheme: "dark"
            };
            resolve(config)
        }
    }
}

(async () => {
    const config = await getConfig();
    console.log(config)
    type Theme = typeof config
})()