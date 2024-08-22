import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.base.config";
import getPort from "./util/getPort";

// Was going to do just --port 0 but can't send that to playwright and next so this is the next best way
if (typeof process.env.port === "undefined") {
  process.env.port = getPort();
}

export default defineConfig({
  ...baseConfig,
  testDir: "./src/tests",
  retries: 2,
  webServer: {
    command: `$npm_execpath run start -p ${process.env.port}`,
    url: `http://localhost:${process.env.port}`,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe"
  },
  use: {
    baseURL: `http://localhost:${process.env.port}`
  }
});
