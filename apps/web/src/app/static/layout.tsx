import { ThemeProvider } from "next-server-theme/server";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ThemeProvider staticRender>{children}</ThemeProvider>;
}
