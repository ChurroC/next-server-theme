#! /usr/bin/env node
import { program } from "commander";
import { version, name } from "../../package.json";
import fs from "fs/promises";

const fileNameClient = `./node_modules/${name}/dist/types/client.d.ts`;
const fileNameServer = `./node_modules/${name}/dist/types/server.d.ts`;

program
    .name("next-server-theme")
    .description(`Cli to modify theme types`)
    .version(version);

program
    .command("types")
    .description("Displays current theme type")
    .action(async () => {
        try {
            const data = await fs.readFile(fileNameClient, {
                encoding: "utf8"
            });
            const themeType = data.split("type Theme = ")[1]?.split(";")[0];
            console.log(themeType);
        } catch (e) {
            console.log(
                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
            );
        }
    });

program
    .command("set")
    .description("Modify theme type")
    .argument("<strings...>", "modified theme types")
    .action(async (newThemeType: string[]) => {
        try {
            console.log(newThemeType);
            const data = await fs.readFile(fileNameClient, {
                encoding: "utf8"
            });
            const themeType = data.split("type Theme = ")[1]?.split(";")[0];

            const formattedTypeClient = data.replace(
                `type Theme = ${themeType};`,
                `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
            );
            await fs.writeFile(fileNameClient, formattedTypeClient, "utf8");

            const formattedTypeServer = data.replace(
                `type Theme = ${themeType};`,
                `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
            );
            await fs.writeFile(fileNameServer, formattedTypeServer, "utf8");

            console.log("Theme type changed");
        } catch (e) {
            console.log(
                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
            );
        }
    });

program
    .command("reset")
    .description("reset theme to string type")
    .action(async () => {
        try {
            const data = await fs.readFile(fileNameClient, {
                encoding: "utf8"
            });
            const themeType = data.split("type Theme = ")[1]?.split(";")[0];

            const formattedTypeClient = data.replace(
                `type Theme = ${themeType};`,
                `type Theme = string;`
            );
            await fs.writeFile(fileNameClient, formattedTypeClient, "utf8");

            const formattedTypeServer = data.replace(
                `type Theme = ${themeType};`,
                `type Theme = string;`
            );
            await fs.writeFile(fileNameServer, formattedTypeServer, "utf8");

            console.log("reset theme type");
        } catch (e) {
            console.log(
                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
            );
        }
    });

program.parse();
