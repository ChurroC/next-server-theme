import { cosmiconfig } from "cosmiconfig";
import { type ThemeConfig } from "@/index.d";

export async function getConfig() {
    let config: ThemeConfig<"dark" | "system" | "light" | "pink"> | ThemeConfig<string> | undefined;
    try {
        const customConfig = (await import("theme.config")).default;
        type Theme = (typeof customConfig.themes)[number];
        const configF: ThemeConfig<Theme> = {
            themes: ["dark", "light", "system"],
            defaultTheme: "system",
            systemLightTheme: "light",
            systemDarkTheme: "dark",
            ...customConfig
        };
        config = configF;
    } catch (e) {
        console.error(e);
    }
}
export async function noTypeGetConfig() {
    // No typing
    const explorerSync = await cosmiconfig("theme");
    const result = await explorerSync.search();
    const configUnTyped = result.config;

    const config: ThemeConfig = {
        themes: ["dark", "light", "system"],
        defaultTheme: "system",
        systemLightTheme: "light",
        systemDarkTheme: "dark",
        ...configUnTyped
    };
    return config;
}
export async function noTypeGetConfig2() {
    const typedConfig: ThemeConfig<"dark" | "system" | "light" | "pink"> | ThemeConfig<string> | undefined = await getConfig();
    if (typedConfig) {
        return typedConfig;
    } else {
        return await noTypeGetConfig();
    }
}

(async () => {
    let config = await noTypeGetConfig2()
    
    console.log(config);
    type Theme = typeof config;
})();
