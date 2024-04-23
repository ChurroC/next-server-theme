/// <reference types="react" />
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';

type Theme = string;

declare function ThemeProvider({ children, defaultTheme, systemLightTheme, systemDarkTheme, attributes }: {
    children: React.ReactNode;
    defaultTheme?: Theme;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    attributes?: string | string[];
}): Promise<react_jsx_runtime.JSX.Element>;

declare function useTheme(): readonly [string, react.Dispatch<react.SetStateAction<string>>];
declare function useGetTheme(): string;
declare function useSetTheme(): react.Dispatch<react.SetStateAction<string>>;

declare function getServerTheme(defaultTheme?: Theme): Theme;

export { type Theme, ThemeProvider, getServerTheme, useGetTheme, useSetTheme, useTheme };
