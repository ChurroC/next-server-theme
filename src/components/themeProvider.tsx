"use client";

import { ThemeProviderWithoutProps } from "@/util/context/theme";

export type Theme = "dark" | "system" | "light" | "pink";

export function ThemeProvider(props: {
    children: React.ReactNode;
    cookie: Theme;
}) {
    return <ThemeProviderWithoutProps<Theme> {...props} />;
}
