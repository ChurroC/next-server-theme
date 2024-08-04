import { fontFamily } from "tailwindcss/defaultTheme";
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      }
    }
  },
  darkMode: "selector",
  plugins: [
    plugin(function ({ addVariant }) {
      // here is your CSS selector - could be anything
      // in this case it is `.theme` element
      // with `.theme--red` class (both present)
      addVariant("pink", ".pink &");
    })
  ]
} satisfies Config;

// import type { Config } from "tailwindcss";
// import sharedConfig from "@repo/tailwind-config";

// const config: Pick<Config, "content" | "presets"> = {
//   content: ["./src/app/**/*.tsx"],
//   presets: [sharedConfig]
// };

// export default config;
