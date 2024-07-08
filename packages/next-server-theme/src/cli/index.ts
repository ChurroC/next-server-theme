#! /usr/bin/env node
import { program } from "commander";
import { version, name } from "../../package.json";
import chalk from "chalk";
import fs from "fs/promises";

const fileNameClient = `./node_modules/${name}/types/client.d.ts`;
const fileNameServer = `./node_modules/${name}/types/server.d.ts`;

console.log(chalk);
Object.keys(chalk).forEach(prop => console.log(prop));
console.log("red" in chalk);

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
            themeType
                ?.replaceAll('"', "")
                .split(" | ")
                .forEach((type: string) => {
                    if (
                        type in chalk &&
                        typeof chalk[type as keyof typeof chalk] === "function"
                    ) {
                        console.log(chalk.red("red"));
                        console.log(chalk.red);
                        // This is kinda sketch but we do know if this is a property of chalk and it is a callable function
                        console.log(
                            (
                                chalk[type as keyof typeof chalk] as (
                                    arg: string
                                ) => string
                            )(type)
                        );
                    } else {
                        console.log(type);
                    }
                });
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
            const dataClient = await fs.readFile(fileNameClient, {
                encoding: "utf8"
            });
            const themeType = dataClient
                .split("type Theme = ")[1]
                ?.split(";")[0];

            const formattedTypeClient = dataClient.replace(
                `type Theme = ${themeType};`,
                `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
            );
            await fs.writeFile(fileNameClient, formattedTypeClient, "utf8");

            const dataServer = await fs.readFile(fileNameServer, {
                encoding: "utf8"
            });
            const formattedTypeServer = dataServer.replace(
                `type Theme = ${themeType};`,
                `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
            );
            await fs.writeFile(fileNameServer, formattedTypeServer, "utf8");

            console.log(`Theme type changed to ${newThemeType.join(" | ")}`);
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
            const dataClient = await fs.readFile(fileNameClient, {
                encoding: "utf8"
            });
            const themeType = dataClient
                .split("type Theme = ")[1]
                ?.split(";")[0];

            const formattedTypeClient = dataClient.replace(
                `type Theme = ${themeType};`,
                `type Theme = string;`
            );
            await fs.writeFile(fileNameClient, formattedTypeClient, "utf8");

            const dataServer = await fs.readFile(fileNameServer, {
                encoding: "utf8"
            });
            const formattedTypeServer = dataServer.replace(
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
