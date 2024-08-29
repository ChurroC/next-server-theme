import fs from "fs/promises";
import { SwitchDisplays } from "./SwitchDisplays";

export default async function HomePage() {
    const { nextServerThemeAnalytics, nextThemesAnalytics } = (await (
        await fetch("http://localhost:3000/api/analyticsData/0")
    ).json()) as {
        nextServerThemeAnalytics: Analytics;
        nextThemesAnalytics: Analytics;
    };

    const filesCount = Math.max(
        (await fs.readdir("../nextServerThemeComparison/analyticsData")).length,
        (await fs.readdir("../nextThemesComparison/analyticsData")).length
    );
    return (
        <SwitchDisplays
            fileCount={filesCount}
            nextServerThemeAnalyticsData={nextServerThemeAnalytics}
            nextThemesAnalyticsData={nextThemesAnalytics}
        ></SwitchDisplays>
    );
}
