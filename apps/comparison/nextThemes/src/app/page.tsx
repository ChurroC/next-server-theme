"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function HomePage() {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const [open, setOpen] = useState(false);

    if (!isMounted) return null;

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
                <div>Theme: {theme}</div>
                <button onClick={() => setTheme("dark")}>Dark</button>
                <button onClick={() => setTheme("light")}>Light</button>
                <button onClick={() => setTheme("pink")}>Pink</button>
                <button onClick={() => setTheme("system")}>System</button>
            </div>
            <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
                <button onClick={() => setOpen(true)}>Open</button>
                <button onClick={() => setOpen(false)}>Close</button>
                {open && <div>Opened</div>}
            </div>
        </>
    );
}
