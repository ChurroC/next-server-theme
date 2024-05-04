/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';

type Theme = string;

declare function ThemeProvider({ children, defaultTheme, systemLightTheme, systemDarkTheme, attributes }: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    attributes?: string | string[];
}): react_jsx_runtime.JSX.Element;

declare function getServerTheme(defaultTheme?: Theme): Theme;

export { ThemeProvider, getServerTheme };
