/// <reference types="react" />
import * as react from 'react';

type Theme = string;

declare function useTheme(): readonly [string, react.Dispatch<react.SetStateAction<string>>];
declare function useGetTheme(): string;
declare function useSetTheme(): react.Dispatch<react.SetStateAction<string>>;

export { type Theme, useGetTheme, useSetTheme, useTheme };
