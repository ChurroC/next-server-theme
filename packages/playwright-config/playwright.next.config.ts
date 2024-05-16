import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.base.config";

export default defineConfig({
  ...baseConfig,
  use: {
    baseURL: `http://localhost:3000/${process.env.basePath ? `${process.env.basePath}` : ""}`
  }
});
