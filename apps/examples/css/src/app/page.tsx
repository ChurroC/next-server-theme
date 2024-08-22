"use client";

import { useTheme } from "next-server-theme";

import "./theme.css";

import styles from "./styles.module.css";

export default function HomePage() {
    const [theme, setTheme] = useTheme();

    return (
        <div className={styles.themeSelector}>
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
