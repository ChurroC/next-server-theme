# next-server-themes

Simple way to add themeing to your nextjs app directory project. It's as simple as adding 2 lines which allows you to use the best theming package made specifically for next.

This package was made for only one reason and purpose to give nextjs app dir (pages dir in the near future) user the best theming possible. Though it may seem like out package is very specific by doing this, it allows us high compatibility and a seamless theming configuration with next. This is what allows us to know the user's theme choice on the server and have no rehydration problems.

The other functionality out package solves is typesafety. This will make it much easier to know which themes are being used and help you not make any mistakes. This is the only package that allow your themes to be typesafe.

## Add To Project

```jsx
// app/layout.jsx
export default function Layout({ children }) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
```

Adding dark mode support takes 2 lines of code:

```jsx
// app/layout.jsx
import { ThemeProvider } from "next-themes";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning className={getServerTheme()}>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

The code above might seem abstract but it isn't anything to crazy.

The suppressHydrationWarning is there for when the theme is set to system which causes us to load preload a script to resolve the background theme to whatever the user's preference is. But other that case the state in server is the same as the clients selected theme.

The className={getServerTheme()} will grab the users theme preference from the last time on the site and add it to the class of the html body.

Then the ThemeProvider is a context that allows children to use the current state value.

## Use

To get the current theme you would do:

```jsx
"use client";

import { useTheme } from "next-server-theme";

export default function HomePage() {
    const [theme, setTheme] = useTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

If you want to cut down on render on components that only use setTheme you could specifcally grab the proper contexts:

```jsx
"use client";

import { useGetTheme, useSetTheme } from "next-server-theme";

export default function HomePage() {
    const theme = useGetTheme();
    const setTheme = useSetTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3 dark:text-white">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

In both of these example you never need to worry about rehydration since the theme on the server is the theme on the client.

### Styling

In out examples we have 3 ways to do this method

[Tailwind](../examples/tailwind):

```jsx
// app/layout.jsx
import { ThemeProvider } from "next-themes";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning className={getServerTheme()}>
            <body className="bg-white dark:bg-black pink:bg-pink-100">
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

```jsx
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

[CSS](../examples/css/):

```css
.light {
    color: white;
    background-color: black;
}
.dark {
    color: black;
    background-color: white;
}
.pink {
    color: black;
    background-color: rgb(252 231 243);
}
```

[Attribute](../examples/attribute/) (We change classes to data-theme for getServerTheme):

```jsx
// app/layout.jsx
import { ThemeProvider } from "next-themes";

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

### Typesafety

Since it is very tough to provide a good experience with types with context we ended up going with the method prisma does. We end up having a cli that directly modifies the themes.

### useTheme

Your UI will need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```jsx
import { useTheme } from "next-themes";

const ThemeChanger = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div>
            The current theme is: {theme}
            <button onClick={() => setTheme("light")}>Light Mode</button>
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
        </div>
    );
};
```

> **Warning!** The above code is hydration _unsafe_ and will throw a hydration mismatch warning when rendering with SSG or SSR. This is because we cannot know the `theme` on the server, so it will always be `undefined` until mounted on the client.
>
> You should delay rendering any theme toggling UI until mounted on the client. See the [example](#avoid-hydration-mismatch).

## API

Let's dig into the details.

### ThemeProvider

All your theme configuration is passed to ThemeProvider.

-   `storageKey = 'theme'`: Key used to store theme setting in localStorage
-   `defaultTheme = 'system'`: Default theme name (for v0.0.12 and lower the default was `light`). If `enableSystem` is false, the default theme is `light`
-   `forcedTheme`: Forced theme name for the current page (does not modify saved theme settings)
-   `enableSystem = true`: Whether to switch between `dark` and `light` based on `prefers-color-scheme`
-   `enableColorScheme = true`: Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons
-   `disableTransitionOnChange = false`: Optionally disable all CSS transitions when switching themes ([example](#disable-transitions-on-theme-change))
-   `themes = ['light', 'dark']`: List of theme names
-   `attribute = 'data-theme'`: HTML attribute modified based on the active theme
    -   accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) ([example](#class-instead-of-data-attribute))
-   `value`: Optional mapping of theme name to attribute value
    -   value is an `object` where key is the theme name and value is the attribute value ([example](#differing-dom-attribute-and-theme-name))
-   `nonce`: Optional nonce passed to the injected `script` tag, used to allow-list the next-themes script in your CSP

## Examples

The [Live Example](https://next-themes-example.vercel.app/) shows next-themes in action, with dark, light, system themes and pages with forced themes.

### Use System preference by default

For versions above v0.0.12, the `defaultTheme` is automatically set to "system", so to use System preference you can simply use:

```jsx
<ThemeProvider>
```

### Ignore System preference

If you don't want a System theme, disable it via `enableSystem`:

```jsx
<ThemeProvider enableSystem={false}>
```

### Class instead of data attribute

If your Next.js app uses a class to style the page based on the theme, change the attribute prop to `class`:

```jsx
<ThemeProvider attribute="class">
```

Now, setting the theme to "dark" will set `class="dark"` on the `html` element.

### Force page to a theme

Let's say your cool new marketing page is dark mode only. The page should always use the dark theme, and changing the theme should have no effect. To force a theme on your Next.js pages, simply set a variable on the page component:

```js
// pages/awesome-page.js

const Page = () => { ... }
Page.theme = 'dark'
export default Page
```

In your `_app`, read the variable and pass it to ThemeProvider:

```jsx
function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider forcedTheme={Component.theme || null}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
```

Done! Your page is always dark theme (regardless of user preference), and calling `setTheme` from `useTheme` is now a no-op. However, you should make sure to disable any of your UI that would normally change the theme:

```js
const { forcedTheme } = useTheme();

// Theme is forced, we shouldn't allow user to change the theme
const disabled = !!forcedTheme;
```

### Disable transitions on theme change

I wrote about [this technique here](https://paco.sh/blog/disable-theme-transitions). We can forcefully disable all CSS transitions before the theme is changed, and re-enable them immediately afterwards. This ensures your UI with different transition durations won't feel inconsistent when changing the theme.

To enable this behavior, pass the `disableTransitionOnChange` prop:

```jsx
<ThemeProvider disableTransitionOnChange>
```

### Differing DOM attribute and theme name

The name of the active theme is used as both the localStorage value and the value of the DOM attribute. If the theme name is "pink", localStorage will contain `theme=pink` and the DOM will be `data-theme="pink"`. You **cannot** modify the localStorage value, but you **can** modify the DOM value.

If we want the DOM to instead render `data-theme="my-pink-theme"` when the theme is "pink", pass the `value` prop:

```jsx
<ThemeProvider value={{ pink: 'my-pink-theme' }}>
```

Done! To be extra clear, this affects only the DOM. Here's how all the values will look:

```js
const { theme } = useTheme();
// => "pink"

localStorage.getItem("theme");
// => "pink"

document.documentElement.getAttribute("data-theme");
// => "my-pink-theme"
```

### More than light and dark mode

next-themes is designed to support any number of themes! Simply pass a list of themes:

```jsx
<ThemeProvider themes={['pink', 'red', 'blue']}>
```

> **Note!** When you pass `themes`, the default set of themes ("light" and "dark") are overridden. Make sure you include those if you still want your light and dark themes:

```jsx
<ThemeProvider themes={['pink', 'red', 'blue', 'light', 'dark']}>
```

### Without CSS variables

This library does not rely on your theme styling using CSS variables. You can hard-code the values in your CSS, and everything will work as expected (without any flashing):

```css
html,
body {
    color: #000;
    background: #fff;
}

[data-theme="dark"],
[data-theme="dark"] body {
    color: #fff;
    background: #000;
}
```

### With Styled Components and any CSS-in-JS

Next Themes is completely CSS independent, it will work with any library. For example, with Styled Components you just need to `createGlobalStyle` in your custom App:

```jsx
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "next-themes";

// Your themeing variables
const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`;

function MyApp({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
```

### Avoid Hydration Mismatch

Because we cannot know the `theme` on the server, many of the values returned from `useTheme` will be `undefined` until mounted on the client. This means if you try to render UI based on the current theme before mounting on the client, you will see a hydration mismatch error.

The following code sample is **unsafe**:

```jsx
import { useTheme } from "next-themes";

// Do NOT use this! It will throw a hydration mismatch error.
const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    return (
        <select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
        </select>
    );
};

export default ThemeSwitch;
```

To fix this, make sure you only render UI that uses the current theme when the page is mounted on the client:

```jsx
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <select value={theme} onChange={e => setTheme(e.target.value)}>
            <option value="system">System</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
        </select>
    );
};

export default ThemeSwitch;
```

To avoid [Layout Shift](https://web.dev/cls/), consider rendering a skeleton/placeholder until mounted on the client side.

#### Images

Showing different images based on the current theme also suffers from the hydration mismatch problem. With [`next/image`](https://nextjs.org/docs/basic-features/image-optimization) you can use an empty image until the theme is resolved:

```jsx
import Image from "next/image";
import { useTheme } from "next-themes";

function ThemedImage() {
    const { resolvedTheme } = useTheme();
    let src;

    switch (resolvedTheme) {
        case "light":
            src = "/light.png";
            break;
        case "dark":
            src = "/dark.png";
            break;
        default:
            src =
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
            break;
    }

    return <Image src={src} width={400} height={400} />;
}

export default ThemedImage;
```

#### CSS

You can also use CSS to hide or show content based on the current theme. To avoid the hydration mismatch, you'll need to render _both_ versions of the UI, with CSS hiding the unused version. For example:

```jsx
function ThemedImage() {
    return (
        <>
            {/* When the theme is dark, hide this div */}
            <div data-hide-on-theme="dark">
                <Image src="light.png" width={400} height={400} />
            </div>

            {/* When the theme is light, hide this div */}
            <div data-hide-on-theme="light">
                <Image src="dark.png" width={400} height={400} />
            </div>
        </>
    );
}

export default ThemedImage;
```

```css
[data-theme="dark"] [data-hide-on-theme="dark"],
[data-theme="light"] [data-hide-on-theme="light"] {
    display: none;
}
```

### With Tailwind

[Visit the live example](https://next-themes-tailwind.vercel.app) • [View the example source code](https://github.com/pacocoursey/next-themes/tree/master/examples/tailwind)

> NOTE! Tailwind only supports dark mode in version >2.

In your `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
    darkMode: "class"
};
```

Set the attribute for your Theme Provider to class:

```jsx
// pages/_app.js
<ThemeProvider attribute="class">
```

If you're using the `value` prop to specify different attribute values, make sure your dark theme explicitly uses the "dark" value, as required by Tailwind.

That's it! Now you can use dark-mode specific classes:

```jsx
<h1 className="text-black dark:text-white">
```

## Discussion

### The Flash

ThemeProvider automatically injects a script into `next/head` to update the `html` element with the correct attributes before the rest of your page loads. This means the page will not flash under any circumstances, including forced themes, system theme, multiple themes, and incognito. No `noflash.js` required.

## FAQ

---

**Why is my page still flashing?**

In Next.js dev mode, the page may still flash. When you build your app in production mode, there will be no flashing.

---

**Why do I get server/client mismatch error?**

When using `useTheme`, you will use see a hydration mismatch error when rendering UI that relies on the current theme. This is because many of the values returned by `useTheme` are undefined on the server, since we can't read `localStorage` until mounting on the client. See the [example](#avoid-hydration-mismatch) for how to fix this error.

---

**Do I need to use CSS variables with this library?**

Nope. See the [example](#without-css-variables).

---

**Can I set the class or data attribute on the body or another element?**

Nope. If you have a good reason for supporting this feature, please open an issue.

---

**Can I use this package with Gatsby or CRA?**

Yes, starting from the 0.3.0 version.

---

**Is the injected script minified?**

Yes.

---

**Why is `resolvedTheme` necessary?**

When supporting the System theme preference, you want to make sure that's reflected in your UI. This means your buttons, selects, dropdowns, or whatever you use to indicate the current theme should say "System" when the System theme preference is active.

If we didn't distinguish between `theme` and `resolvedTheme`, the UI would show "Dark" or "Light", when it should really be "System".

`resolvedTheme` is then useful for modifying behavior or styles at runtime:

```jsx
const { resolvedTheme } = useTheme()

<div style={{ color: resolvedTheme === 'dark' ? 'white' : 'black' }}>
```

If we didn't have `resolvedTheme` and only used `theme`, you'd lose information about the state of your UI (you would only know the theme is "system", and not what it resolved to).
