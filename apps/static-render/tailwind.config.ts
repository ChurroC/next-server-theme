import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind.theme.config";

const config: Config = {
  content: ["./src/app/**/*.tsx"],
  presets: [sharedConfig]
};

export default config;
