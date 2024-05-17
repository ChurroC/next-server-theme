import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.base.config";
import net from "net";

const server = net.createServer();
// 0 assigns to a random available port
server.listen(0);
const address = server.address();
// For this whole process and all tests reuse the first port that is available
process.env.port =
  process.env.port ?? (address as net.AddressInfo).port.toString();
server.close();

export default defineConfig({
  ...baseConfig,
  testDir: "./src/tests",
  retries: 2,
  webServer: {
    command: `bun run start -p ${process.env.port}`,
    url: `http://localhost:${process.env.port}`,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe"
  },
  use: {
    baseURL: `http://localhost:${process.env.port}`
  }
});
