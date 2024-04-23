/// <reference types="react" />
import type { Theme } from "../types";
export declare function ThemeProvider({ children, defaultTheme, systemLightTheme, systemDarkTheme, attributes }: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    attributes?: string | string[];
}): Promise<import("react/jsx-runtime").JSX.Element>;
