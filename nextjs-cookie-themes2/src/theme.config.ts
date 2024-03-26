import { type ThemeConfig } from "@/index.d";

export const config: ThemeConfig<"dark" | "system" | "light" | "pink"> = {
    defaultTheme: "dark",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    debounce: 0,
    modifyTheme: theme => {
        if (theme === "pink") {
            return "light";
        }
        // console.log("Theme changed to", theme);
        return theme;
    }
};
