import { ThemeProvider } from "next-server-theme/dev/server.ts";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ThemeProvider staticRender>{children}</ThemeProvider>;
}
