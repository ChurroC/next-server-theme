#! /usr/bin/env node
import { program } from "commander";
import { version, name } from "../../package.json";
import fs from "fs/promises";

const fileName = `./node_modules/${name}/dist/index.d.ts`;

program
    .name("next-server-theme")
    .description(`Cli to modify theme types`)
    .version(version);

program
    .command("types")
    .description("Displayes current theme type")
    .action(async () => {
        const data = await fs.readFile(fileName, { encoding: "utf8" });
        const themeType = data.split("type Theme = ")[1]?.split(";")[0];
        console.log(themeType);
    });

program
    .command("change")
    .description("Modify theme type")
    .argument("<strings...>", "modified theme types")
    .action(async (newThemeType: string[]) => {
        console.log(newThemeType);
        const data = await fs.readFile(fileName, { encoding: "utf8" });
        const themeType = data.split("type Theme = ")[1]?.split(";")[0];
        if (themeType === "type Theme = undefined;") {
            console.log("No theme type found");
            return;
        }

        const formattedType = data.replace(
            `type Theme = ${themeType};`,
            `type Theme = ${newThemeType.map(type => `"${type.trim()}"`).join(" | ")};`
        );
        await fs.writeFile(fileName, formattedType, "utf8");
        console.log("Theme type changed");
    });

program
    .command("reset")
    .description("rest theme to string type")
    .action(() => console.log("reset theme type"));
