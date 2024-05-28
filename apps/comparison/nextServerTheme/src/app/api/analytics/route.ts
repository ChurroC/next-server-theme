import fs from "fs/promises";

// check if in production
export async function POST(request: Request) {
    if (process.env.analytics || process.env.NODE_ENV === "production") {
        try {
            console.log("Analytics request received.");
            const body = await request.json();
            let parsedData;
            let time;
            let newData;

            try {
                const data = await fs.readFile(
                    "analytics/analytics.json",
                    "utf8"
                );
                parsedData = JSON.parse(data);
            } catch (e) {
                parsedData = [];
            }
            while (
                time !==
                parsedData.find((item: any) => item.name === "time")?.value
            ) {
                // make sure the time or the data initally I changed is the same as
                // the data when I'm writing it else redo and use new data
                time = parsedData.find(
                    (item: any) => item.name === "time"
                )?.value;

                let found = false;
                let foundTime = false;
                newData = parsedData.map((item: any) => {
                    if (item.name === body.name) {
                        found = true;
                        return body;
                    } else if (item.name === "time") {
                        foundTime = true;
                        return { name: "time", value: Date.now() };
                    }
                    return item;
                });
                if (!found) {
                    newData.push(body);
                }
                if (!foundTime) {
                    newData.push({ name: "time", value: Date.now() });
                }
                try {
                    const data = await fs.readFile(
                        "analytics/analytics.json",
                        "utf8"
                    );
                    parsedData = JSON.parse(data);
                } catch (e) {
                    parsedData = [];
                }
            }

            // write file
            await fs.mkdir("analytics", { recursive: true });
            await fs.writeFile(
                "analytics/analytics.json",
                JSON.stringify(newData),
                "utf8"
            );

            let theParsedData: any;
            try {
                const data = await fs.readFile(
                    "analytics/analytics.json",
                    "utf8"
                );
                theParsedData = JSON.parse(data);
            } catch (e) {
                theParsedData = [];
            }
            while (
                time !==
                theParsedData.find((item: any) => item.name === "time")?.value
            ) {
                // make sure the time or the data initally I changed is the same as
                // the data when I'm writing it else redo and use new data
                time = parsedData.find(
                    (item: any) => item.name === "time"
                )?.value;

                parsedData.forEach((item: any) => {
                    theParsedData[item.name] = item.value;
                });
                try {
                    const data = await fs.readFile(
                        "analytics/analytics.json",
                        "utf8"
                    );
                    theParsedData = JSON.parse(data);
                } catch (e) {
                    theParsedData = [];
                }
            }

            await fs.writeFile(
                "analytics/parsedAnalytics.json",
                JSON.stringify(theParsedData),
                "utf8"
            );
        } catch (e) {
            console.error(e);
        }
    } else {
        console.log("Not in production, skipping analytics.");
    }
    return new Response("OK");
}
