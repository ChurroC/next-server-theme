import { ThemeProviderWithoutProps } from "@/util/context/theme";
import { getTheme } from "@/util/helpers/getServerTheme";
import { config } from "theme.config";

export async function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const theme = await getTheme();
    console.log(theme);

    return (
        <ThemeProviderWithoutProps cookie={theme} {...config}>
            {children}
        </ThemeProviderWithoutProps>
    );
}
