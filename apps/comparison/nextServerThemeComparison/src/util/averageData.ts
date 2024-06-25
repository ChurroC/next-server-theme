import fs from "fs/promises";

(async () => {
    try {
        const analytics: Record<string, { value: number }> = {};

        const files = await fs.readdir("./analyticsData");
        if (files.length === 0) {
            throw Error("No files found in folder. Cannot average data.");
        }

        for (const file of files) {
            const data = JSON.parse(
                await fs.readFile(`./analyticsData/${file}`, "utf8")
            );

            Object.entries(data).forEach(([key, value]) => {
                analytics[key] = {
                    value:
                        (analytics[key]?.value ?? 0) +
                        (value as { value: number })?.value
                };
            });
        }

        Object.keys(analytics).forEach(key => {
            analytics[key]!.value /= files.length;
        });

        await fs.writeFile(
            `./analyticsData/analytics-avg.json`,
            JSON.stringify(analytics),
            "utf8"
        );
    } catch (e) {
        console.error(e);
    }
})();
