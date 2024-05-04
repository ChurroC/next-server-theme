import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import { type Config } from "tailwindcss";

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
