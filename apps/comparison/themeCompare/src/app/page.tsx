// ICON ON BOTTOM left with popup for theme change
// have 3 bars left and right show analytics for both themes
// then have middle use a svg arrow that is either red or green depednign on alaytics
// use popuover api cause itssss cool
// make a readable analytics with just name and value
// add hover popover to show name and value

import fs from "fs/promises";
import path from "path";

interface Data {
    value: number;
}

interface Analytics {
    TTFB: Data;
    FCP: Data;
    LCP: Data;
    FID: Data;
    CLS: Data;
    INP: Data;
    time: Data;
}

export default async function HomePage() {
    let nextServerThemeAnalytics: Analytics | null = null;
    try {
        nextServerThemeAnalytics = JSON.parse(
            await fs.readFile(
                path.resolve(
                    process.cwd(),
                    "../nextServerThemeComparison/analyticsData/analytics.json"
                ),
                "utf-8"
            )
        ) as Analytics;
    } catch (e) {
        console.error(e);
    }

    let nextThemesAnalytics: Analytics | null = null;
    try {
        nextThemesAnalytics = JSON.parse(
            await fs.readFile(
                path.resolve(
                    process.cwd(),
                    "../nextThemesComparison/analyticsData/analytics.json"
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

const analyticsInfo: Record<keyof Analytics, string> = {
    TTFB: "Time to First Byte",
    FCP: "First Contentful Paint",
    LCP: "Largest Contentful Paint",
    FID: "First Input Delay",
    CLS: "Cumulative Layout Shift",
    INP: "Input Performance",
    time: "Last Updated"
};

function Item({
    object1,
    object2,
    objectKey
}: {
    object1: Analytics | null;
    object2: Analytics | null;
    objectKey: keyof Analytics;
}) {
    let textColor = "";
    if (object1?.[objectKey]?.value && object2?.[objectKey]?.value) {
        if (object1[objectKey].value < object2?.[objectKey].value) {
            textColor = "text-green-500";
        } else {
            textColor = "text-red-500";
        }
    }

    return (
        <p className={textColor} title={analyticsInfo[objectKey]}>
            {objectKey}: {object1?.[objectKey]?.value.toFixed(2) ?? "No Data"}
        </p>
    );
}
