"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DataDisplay } from "./DataDisplay";

export function SwitchDisplays({
    fileCount,
    nextServerThemeAnalyticsData,
    nextThemesAnalyticsData
}: {
    fileCount: number;
    nextServerThemeAnalyticsData: Analytics;
    nextThemesAnalyticsData: Analytics;
}) {
    const [dataTestNumber, setDataTestNumber] = useState(0);
    console.log(dataTestNumber);

    return (
        <>
            <ChevronLeftIcon
                className="mt-[calc(100vh/6)] size-6 self-start"
                onClick={() =>
                    setDataTestNumber(
                        (((dataTestNumber - 1) % fileCount) + fileCount) %
                            fileCount
                    )
                }
            />
            <DataDisplay
                nextServerThemeAnalyticsData={nextServerThemeAnalyticsData}
                nextThemesAnalyticsData={nextThemesAnalyticsData}
                dataTestNumber={dataTestNumber}
            />
            <ChevronRightIcon
                className="mt-[calc(100vh/6)] size-6 self-start"
                onClick={() =>
                    setDataTestNumber(
                        (((dataTestNumber + 1) % fileCount) + fileCount) %
                            fileCount
                    )
                }
            />
        </>
    );
}
