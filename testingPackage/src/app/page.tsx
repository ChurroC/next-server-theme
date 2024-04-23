"use client";

import { useGetTheme, useSetTheme } from "next-server-theme";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HomePage() {
    //const [theme, setTheme] = [useGetTheme(), useSetTheme()];
    // const [theme, setTheme] = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    });

    const { theme, setTheme } = useTheme();

    if (!isMounted) return null;

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
