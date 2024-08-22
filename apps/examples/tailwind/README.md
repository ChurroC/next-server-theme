Things to make sure:

```jsx
//app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-themes";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning className={getServerTheme()}>
            <body className="pink:bg-pink-100 bg-white dark:bg-black">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

```js
//tailwind.config.ts
import plugin from "tailwindcss/plugin";
import { type Config } from "tailwindcss";

export default {
    content: ["./src/**/*.tsx"],
    darkMode: "selector",
    plugins: [
        plugin(function ({ addVariant }) {
            // here is your CSS selector - could be anything
            // in this case it allows you to add modifier like
            // pink:classes_here
            addVariant("pink", ".pink &");
        })
    ]
} satisfies Config;
```
