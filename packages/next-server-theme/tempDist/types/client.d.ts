type Theme = string;
type ResolvedTheme = Exclude<Theme, "system">;

declare function useTheme<B extends boolean = false>({ resolved }?: {
    resolved: B;
}): B extends true ? readonly [ResolvedTheme, React.Dispatch<React.SetStateAction<Theme>>] : readonly [Theme, React.Dispatch<React.SetStateAction<Theme>>];
declare function useGetTheme(): Theme;
declare function useGetResolvedTheme(): ResolvedTheme;
declare function useSetTheme(): React.Dispatch<React.SetStateAction<Theme>>;

export { type Theme, useGetResolvedTheme, useGetTheme, useSetTheme, useTheme };
