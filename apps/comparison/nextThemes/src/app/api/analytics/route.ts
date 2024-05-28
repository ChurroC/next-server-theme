import fs from "fs/promises";
import { Mutex } from 'async-mutex'

// check if in production
export async function POST(request: Request) {
    if (process.env.analytics || process.env.NODE_ENV === "production") {
        try {
            console.log("Analytics request received.");
            const body = await request.json();
            let parsedData;
            let newData;
            let time;
            
            const release = await mutex.acquire() // acquires access to the critical path
            try {
                try {
                    const data = await fs.readFile(
                        "analytics/analytics.json",
                        "utf8"
                    );
                    parsedData = JSON.parse(data);
                } catch (e) {
                    parsedData = [];
                }
                
                let found = false;
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
                if (!foundTime) {
                    newData.push({ name: "time", value: Date.now() });
                }
                
            await fs.mkdir("analytics", { recursive: true });
            await fs.writeFile(
                "analytics/analytics.json",
                JSON.stringify(newData),
                "utf8"
            );
            } finally {
            release() // completes the work on the critical path
            }

        } catch (e) {
            console.error(e);
        }
    } else {
        console.log("Not in production, skipping analytics.");
    }
    return new Response("OK");
}
