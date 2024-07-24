import { ThemeProvider } from "next-server-theme/dev/server.ts";
import { headers } from "next/headers";

export default function Layout({ children }: { children: React.ReactNode }) {
    const nonce = headers().get("x-nonce");
    console.log("nonce", nonce);

    return <ThemeProvider nonce={nonce}>{children}</ThemeProvider>;
}
