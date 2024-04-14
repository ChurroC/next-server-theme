"use client";

import { useGetTheme, useSetTheme, useTheme } from "nextjs-cookie-theme";

export default function HomePage() {
    const [theme, setTheme] = [useGetTheme(), useSetTheme()];
    // const [theme, setTheme] = useTheme();

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
