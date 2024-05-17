import { defineConfig } from "@playwright/test";
import next from "@repo/playwright-config/playwright.next.config.ts";

export default defineConfig({
  ...next
});
