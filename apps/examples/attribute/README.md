Things to make sure:

```jsx
//app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-themes";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning data-theme={getServerTheme()}>
            <body>
                <ThemeProvider attributes="data-theme">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
```

```css
[data-theme="light"] {
    color: white;
    background-color: black;
}
[data-theme="dark"] {
    color: black;
    background-color: white;
}
[data-theme="pink"] {
    color: black;
    background-color: rgb(252 231 243);
}
```
