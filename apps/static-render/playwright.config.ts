import { defineConfig } from "@playwright/test";
import next from "../../packages/config-playwright/playwright.next.config";

export default defineConfig({
  ...next
});
