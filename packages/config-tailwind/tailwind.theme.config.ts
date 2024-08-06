import baseConfig from "./tailwind.base.config";
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Omit<Config, "content"> = {
  presets: [baseConfig],
  darkMode: "selector",
  plugins: [
    plugin(function ({ addVariant }) {
      // here is your CSS selector - could be anything
      // in this case it is `.theme` element
      // with `.theme--red` class (both present)
      addVariant("pink", ".pink &");
    })
  ]
};

export default config;
