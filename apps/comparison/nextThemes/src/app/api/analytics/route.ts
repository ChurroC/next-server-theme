/* eslint-disable */

import fs from "fs/promises";

// check if in production
export async function POST(request: Request) {
    if (process.env.NODE_ENV === "production") {
        try {
            console.log("Analytics request received.");
            const body = await request.json();
            let parsed;
            try {
                const data = await fs.readFile("analytics.json", "utf8");
                parsed = JSON.parse(data);
            } catch (e) {
                parsed = [];
            }

            let found = false;
            const newData = parsed.map((item: any) => {
                if (item.name === body.name) {
                    found = true;
                    return body;
                }
                return item;
            });
            if (!found) {
                newData.push(body);
            }

            await fs.writeFile(
                "analytics.json",
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
