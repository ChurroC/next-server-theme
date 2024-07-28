#! /usr/bin/env node
import { program } from "commander";
import { version, name } from "../../package.json";
import { Chalk } from "chalk";
import fs from "fs/promises";
import path from "path";
import { parse } from "@typescript-eslint/parser";

// When running this script, types will be in the root of the project
const fileNameClient = `./node_modules/${name}/types/client.d.ts`;
const fileNameServer = `./node_modules/${name}/types/server.d.ts`;

const chalk = new Chalk({ level: 3 });

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
        } catch {
            console.log(
                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
            );
        }
    });

program
    .command("set")
    .description("Modify theme type")
    .argument("[strings...]", "modified theme types")
    .option(
        "-p <path>",
        "path to file with ThemeProvider if no argument is provided",
        "src/app/layout.tsx | src/layout.tsx"
    )
    .action(
        async (
            newThemeType: string[],
            options: {
                path?: string[];
                p?: string[];
            }
        ) => {
            console.log(options);
            const pathParams = options.p ?? options.path ?? [];
            if (newThemeType.length === 0) {
                let filePath: string;
                try {
                    if (pathParams.length > 0) {
                        await fs.stat(path.join(process.cwd(), ...pathParams));
                        filePath = path.join(process.cwd(), ...pathParams);
                    } else {
                        throw new Error();
                    }
                } catch {
                    try {
                        await fs.stat(
                            path.join(process.cwd(), "src", "app", "layout.tsx")
                        );
                        filePath = path.join(
                            process.cwd(),
                            "src",
                            "app",
                            "layout.tsx"
                        );
                    } catch {
                        try {
                            await fs.stat(
                                path.join(process.cwd(), "src", "layout.tsx")
                            );
                            filePath = path.join(
                                process.cwd(),
                                "src",
                                "layout.tsx"
                            );
                        } catch {
                            console.log(
                                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
                            );
                            return;
                        }
                    }
                }

                console.log(filePath);
                console.log(parse(filePath));

                return;
            } else {
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
                    await fs.writeFile(
                        fileNameClient,
                        formattedTypeClient,
                        "utf8"
                    );

                    const dataServer = await fs.readFile(fileNameServer, {
                        encoding: "utf8"
                    });
                    const formattedTypeServer = dataServer.replace(
                        `type Theme = ${themeType};`,
                        `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
                    );
                    await fs.writeFile(
                        fileNameServer,
                        formattedTypeServer,
                        "utf8"
                    );

                    console.log(
                        `Theme type changed to ${newThemeType.join(" | ")}`
                    );
                } catch {
                    console.log(
                        "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
                    );
                }
            }
        }
    );

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
        } catch {
            console.log(
                "Theme type not found. Make sure cli is run in the root of the project next to node_modules folder."
            );
        }
    });

program.parse();
