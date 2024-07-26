"use client";

import { useTheme } from "next-server-theme/dev/client.ts";
import { getServerTheme } from "next-server-theme/dev/server";
import { useRef } from "react";

export default function HomePage() {
    const [theme, setTheme] = useTheme();
    // console.log(theme, "theme");
    const ref = useRef<HTMLDivElement>(null);
    console.log(getServerTheme());

    return (
        <div className={getServerTheme()} id="wow" ref={ref}>
            <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
                <div>Theme: {theme || ""}</div>
                <button onClick={() => setTheme("dark")}>Dark</button>
                <button onClick={() => setTheme("light")}>Light</button>
                <button onClick={() => setTheme("pink")}>Pink</button>
                <button onClick={() => setTheme("system")}>System</button>
            </div>
        </div>
    );
}
