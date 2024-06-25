import fs from "fs/promises";
import path from "path";
import { SwitchDisplays } from "./SwitchDisplays";
import { DataDisplay } from "./DataDisplay";

export default async function HomePage() {
    const files = await fs.readdir(
        path.resolve(
            process.cwd(),
            "../nextServerThemeComparison/analyticsData"
        )
    );

    return (
        <SwitchDisplays files={files}>
            <DataDisplay fileName={files[0] ?? ""} />
        </SwitchDisplays>
    );
}
