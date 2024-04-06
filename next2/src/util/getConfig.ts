import { type ThemeConfig } from "@/index.d";

export const config: ThemeConfig<"dark" | "system" | "light" | "pink"> = {
    defaultTheme: "system",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    modifyTheme: theme => {
        return theme;
    }
};

// export type Theme = typeof config.defaultTheme;

// import { cosmiconfigSync } from "cosmiconfig";

// const explorerSync = cosmiconfigSync("theme");

// const result = explorerSync.search();

// console.log(result);