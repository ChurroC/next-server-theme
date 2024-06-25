import fs from "fs/promises";
import path from "path";
import { Item } from "./Item";

export async function DataDisplay({ fileName }: { fileName: string }) {
    let nextServerThemeAnalytics: Analytics | null = null;
    try {
        nextServerThemeAnalytics = JSON.parse(
            await fs.readFile(
                path.resolve(
                    process.cwd(),
                    `../nextServerThemeComparison/analyticsData/${fileName}`
                ),
                "utf-8"
            )
        ) as Analytics;
    } catch (e) {
        console.error(e);
    }
    console.log(nextServerThemeAnalytics);

    let nextThemesAnalytics: Analytics | null = null;
    try {
        nextThemesAnalytics = JSON.parse(
            await fs.readFile(
                path.resolve(
                    process.cwd(),
                    `../nextThemesComparison/analyticsData/${fileName}`
                ),
                "utf-8"
            )
        ) as Analytics;
    } catch (e) {
        console.error(e);
    }

    return (
        <div className="flex h-2/3 w-2/3 max-w-3xl items-center justify-around">
            <div className="flex size-full flex-1 flex-col items-center justify-between">
                <p>Next Server Theme</p>
                {(
                    [
                        "TTFB",
                        "FCP",
                        "LCP",
                        "FID",
                        "CLS",
                        "INP"
                    ] as (keyof Analytics)[]
                ).map(item => {
                    return (
                        <Item
                            object1={nextServerThemeAnalytics}
                            object2={nextThemesAnalytics}
                            objectKey={item}
                            key={item}
                        />
                    );
                })}
                <p title="Last Updated">
                    Date:{" "}
                    {nextServerThemeAnalytics?.time
                        ? new Date(
                              nextServerThemeAnalytics?.time.value
                          ).toLocaleString()
                        : "No Data"}
                </p>
            </div>
            <div className="flex size-full flex-1 flex-col items-center justify-between">
                <p>Next Themes</p>
                {(
                    [
                        "TTFB",
                        "FCP",
                        "LCP",
                        "FID",
                        "CLS",
                        "INP"
                    ] as (keyof Analytics)[]
                ).map(item => {
                    return (
                        <Item
                            object1={nextThemesAnalytics}
                            object2={nextServerThemeAnalytics}
                            objectKey={item}
                            key={item}
                        />
                    );
                })}
                <p title="Last Updated">
                    Date:{" "}
                    {nextThemesAnalytics?.time
                        ? new Date(
                              nextThemesAnalytics?.time.value
                          ).toLocaleString()
                        : "No Data"}
                </p>
            </div>
        </div>
    );
}
