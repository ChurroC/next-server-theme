import { defineConfig, devices } from "@playwright/test";
import next from "@repo/config-playwright/playwright.next.config.ts";

export default defineConfig({
  ...next,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
