import * as react_jsx_runtime from 'react/jsx-runtime';

type Theme = string;
type ResolvedTheme = Exclude<Theme, "system">;
interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    themes?: Theme[];
    themeKey?: string;
    resolvedThemeKey?: string;
    systemLightTheme?: Theme;
    systemDarkTheme?: Theme;
    element?: string;
    attributes?: string | string[];
    staticRender?: boolean;
    nonce?: string | null;
}

declare function ThemeProvider({ children, defaultTheme, themes, themeKey, resolvedThemeKey, systemLightTheme, systemDarkTheme, element, attributes, staticRender, nonce }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

declare function getServerTheme(): ResolvedTheme | "";

export { type Theme, ThemeProvider, getServerTheme };
