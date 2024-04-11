import { type ThemeConfig } from "@/index.d";

const config: ThemeConfig<"dark" | "system" | "light" | "pink"> = {
    themes: ["dark", "light", "system", "pink"],
    defaultTheme: "system",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
};

export default config;

// const config = {
//     defaultTheme: "system",
//     systemLightTheme: "pink",
//     systemDarkTheme: "dark",
//     modifyTheme: theme => {
//         return theme;
//     }
// };

// export default config;

// export default config;

// const config = {
//     plugins: {
//         tailwindcss: {}
//     }
// };

// module.exports = config;

// const config = {
//     plugins: {
//         tailwindcss: {}
//     }
// };

// module.exports = config;

// const config = {
//     trailingComma: "none",
//     tabWidth: 4,
//     arrowParens: "avoid"
// };

// export default config;
