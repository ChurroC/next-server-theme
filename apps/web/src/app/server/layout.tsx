import { ThemeProvider } from "next-server-theme/dev/server";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ThemeProvider>{children}</ThemeProvider>;
}
