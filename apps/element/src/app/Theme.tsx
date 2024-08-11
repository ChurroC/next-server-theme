"use client";

import { useTheme } from "next-server-theme";

export default function Theme({ serverTheme }: { serverTheme: string }) {
    const [theme, setTheme] = useTheme();

    return (
        <div
            className={`${serverTheme} pink:bg-pink-100 bg-white dark:bg-black`}
            id="themeElement"
        >
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
