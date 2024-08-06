import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans]
      }
    }
  }
};

export default config;
