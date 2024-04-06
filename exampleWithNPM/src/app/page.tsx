"use client";

import { useTheme } from "next-themes";
import { useGetTheme, useSetTheme } from "nextjs-cookie-theme";

export default function HomePage() {
    const [theme, setTheme] = [useGetTheme(), useSetTheme()];
    const { setTheme: setTheme2 } = useTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
