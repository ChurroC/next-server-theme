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

            do {
                try {
                    const data = await fs.readFile(
                        "analytics/analytics.json",
                        "utf8"
                    );
                    parsedData = JSON.parse(data);
                } catch (e) {
                    parsedData = [];
                }
                // make sure the time or the data initally I changed is the same as
                // the data when I'm writing it else redo and use new data
                time = parsedData.find(
                    (item: any) => item.name === "time"
                ).value;

                let found = false;
                newData = parsedData.map((item: any) => {
                    if (item.name === body.name) {
                        found = true;
                        return body;
                    }
                    return item;
                });
                if (!found) {
                    newData.push(body);
                }
            } while (
                time ===
                parsedData.find((item: any) => item.name === "time").value
            );

            await fs.mkdir("analytics", { recursive: true });
            await fs.writeFile(
                "analytics/analytics.json",
                JSON.stringify(newData),
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
