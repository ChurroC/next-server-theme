"use client";
import { Item } from "./Item";
import { useQuery } from "@tanstack/react-query";

export function DataDisplay({
    nextServerThemeAnalyticsData,
    nextThemesAnalyticsData,
    dataTestNumber
}: {
    nextServerThemeAnalyticsData: Analytics;
    nextThemesAnalyticsData: Analytics;
    dataTestNumber: number;
}) {
    const {
        data: { nextServerThemeAnalytics, nextThemesAnalytics }
    } = useQuery<{
        nextServerThemeAnalytics: Analytics;
        nextThemesAnalytics: Analytics;
    }>({
        queryKey: ["analyticData", dataTestNumber],
        queryFn: async () => {
            const data = await fetch(
                `http://localhost:3000/api/analyticsData/${dataTestNumber}`
            );
            return await data.json();
        },
        initialData: {
            nextServerThemeAnalytics: nextServerThemeAnalyticsData,
            nextThemesAnalytics: nextThemesAnalyticsData
        }
    });

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
            <div className="w-24 self-start text-center">
                Test {dataTestNumber === 0 ? "Avg" : dataTestNumber}
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
