import { ThemeProviderWithoutProps } from "@/util/context/theme";
import { getThemeWithoutModification } from "@/util/helpers/getServerTheme";

export async function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProviderWithoutProps serverTheme={getThemeWithoutModification()}>
            {children}
        </ThemeProviderWithoutProps>
    );
}
