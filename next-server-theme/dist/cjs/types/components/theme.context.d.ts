/// <reference types="react" />
import type { Theme } from "../types";
export declare function useOnChange(callback: React.EffectCallback, dependancies: React.DependencyList): void;
export declare function ThemeProviderWithoutServerTheme({ children, serverTheme, systemLightTheme, systemDarkTheme, attributes }: {
    children: React.ReactNode;
    serverTheme: Theme;
    systemLightTheme: Theme;
    systemDarkTheme: Theme;
    attributes: string | string[];
}): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): readonly [string, import("react").Dispatch<import("react").SetStateAction<string>>];
export declare function useGetTheme(): string;
export declare function useSetTheme(): import("react").Dispatch<import("react").SetStateAction<string>>;
