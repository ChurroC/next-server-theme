import { defineConfig } from "@playwright/test";
import next from "@repo/config-playwright/playwright.next.config.ts";

export default defineConfig({
  ...next
});
