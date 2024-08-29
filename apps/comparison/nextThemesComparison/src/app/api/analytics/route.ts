import fs from "fs/promises";
import fsSync from "fs";
import { Mutex } from "async-mutex";

// use mutex to only allow one write and read operation at a time
const mutex = new Mutex();

let i = 1;
while (fsSync.existsSync(`analyticsData/analytics-${i}.json`)) {
    i++;
}

// check if in production
export async function POST(request: Request) {
    if (process.env.analytics || process.env.NODE_ENV === "production") {
        try {
            console.log("Analytics request received.");
            const body = await request.json();

            const release = await mutex.acquire(); // acquires access to the critical path

            let data;
            try {
                data = JSON.parse(
                    await fs.readFile(
                        `analyticsData/analytics-${i}.json`,
                        "utf8"
                    )
                );
            } catch (e) {
                data = {};
            }

            const { name, ...receivedData } = body;
            data[name] = receivedData;

            data.time = { value: Date.now() };

            await fs.mkdir("analyticsData", { recursive: true });
            await fs.writeFile(
                `analyticsData/analytics-${i}.json`,
                JSON.stringify(data),
                "utf8"
            );

            release(); // completes the work on the critical path
        } catch (e) {
            console.error(e);
        }
    } else {
        console.log("Not in production, skipping analytics.");
    }
    return new Response("OK");
}
