// import { config } from "theme.config";

// export { config };

import { type ThemeConfig } from "@/index.d";

export const config: ThemeConfig<"dark" | "system" | "light" | "pink"> = {
    defaultTheme: "system",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    debounce: 0,
    modifyTheme: theme => {
        return theme;
    }
};

/* 

(async () => {
  const { default: vulcheck } = await import('vulcheck');

  vulcheck.checkAll();
})();

*/

// export default (async () => {
//     const { config } = await import("theme.config");
//     return config;
// })();
