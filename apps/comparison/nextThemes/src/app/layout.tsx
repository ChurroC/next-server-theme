import { ThemeProvider } from "next-themes";

import "./globals.css";

import { GeistSans } from "geist/font/sans";
import { WebVitals } from "./web-vitals";

export const metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${GeistSans.className} bg-white dark:bg-black pink:bg-pink-100`}
            >
                <WebVitals />
                <ThemeProvider
                    attribute="class"
                    themes={["light", "dark", "pink"]}
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
