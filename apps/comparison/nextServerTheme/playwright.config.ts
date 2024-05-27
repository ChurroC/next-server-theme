import { defineConfig } from "@playwright/test";
import next from "@repo/playwright-config/playwright.next.config.js";

export default defineConfig({
  ...next
});
