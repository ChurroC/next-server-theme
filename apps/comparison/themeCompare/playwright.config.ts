import { defineConfig } from "@playwright/test";
import next from "@repo/config-playwright/playwright.next.config.ts";
import getPort from "@repo/config-playwright/util/getPort";

if (typeof process.env.port === "undefined") {
  process.env.port = `${getPort()},${getPort()}`;
}

export default defineConfig({
  ...next,
  webServer: [
    {
      command: `cd ../nextServerTheme && $npm_execpath run start -p ${process.env.port.split(",")[0]}`,
      url: `http://localhost:${process.env.port.split(",")[0]}`,
      reuseExistingServer: !process.env.CI,
      stdout: "ignore",
      stderr: "pipe"
    },
    {
      command: `cd ../nextThemes && $npm_execpath run start -p ${process.env.port.split(",")[1]}`,
      url: `http://localhost:${process.env.port.split(",")[1]}`,
      reuseExistingServer: !process.env.CI,
      stdout: "ignore",
      stderr: "pipe"
    }
  ],
  use: {
    baseURL: ""
  }
});
