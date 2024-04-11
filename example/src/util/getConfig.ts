import { type ThemeConfig } from "@/index.d";

console.log("confgi");

export const config: ThemeConfig<"dark" | "system" | "light"> = {
    defaultTheme: "system",
    systemLightTheme: "light",
    systemDarkTheme: "dark",
    modifyTheme: theme => {
        return theme;
    }
};

export type Theme = typeof config.defaultTheme;
