import { ThemeProviderWithoutServerTheme } from "@/components/theme.context";
import { getUnmodifiedServerTheme } from "@/util/getServerTheme";

export async function ThemeProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProviderWithoutServerTheme
            serverTheme={getUnmodifiedServerTheme()}
        >
            {children}
        </ThemeProviderWithoutServerTheme>
    );
}
