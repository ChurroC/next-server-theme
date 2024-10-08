# next-server-theme

Simple way to add themeing to your nextjs app directory project. It's as simple as adding 2 lines which allows you to use the best theming package made specifically for next. Similar to other packages like next-themes but we you won't have to worry about the rehydration issues as you can see the users choice on the server. No need to check if we mount before reading the theme. This also allows us to prerender all the pages on the server and have a smaller client bundle which is faster.

**The reason this package is unique is that it allows you to use nextjs to its limit to prerender data using SSR of theming compared to Next-Themes that needs to wait till rehydration. In my use case I had a large scale svg in the background that changed depending on the theme. When I used Next-Themes I ended up having the svg's flicker since I essentially had to wait for rehydration. But with this package the svg could be prerendered correctly on the server with SSR creating a seamless experience for the user.**

This package was specifically to allow nextjs app dir (pages dir in the near future) user's to have the best theming possible. This allow us high compatibility and a seamless theming configuration with next. Especially since we rely on next's cookie features to allow us to know the user's theme choice on the server and have no rehydration problems. You also need to make sure have rendering using SSR and not anything since we need to parse cookies for every user.

We have also tested all the pages to make sure the newest release always works. We also have compared our package against competitors. Namely next-themes for which you can run your own tests to check but we beat theme in every web vital.

Our package also insures typesafety. It might be a bit complicated using a cli but other libraries espeically prisma have done similar implimentation. It also only opt-in and you can see more details below.

One reason users might be hesitant to use us is because they have to opt into dynamic rendering and can't use SSG or staticically render all their pages. But we do have a prop option of staticRender that works similar to next-themes and allows you to have those pages renderable through SSG.

# Why

Just wanted to talk about big reason this would be useful and why I built. I wrote since I needed a themeing system that went further than just no flash but also helped have images and data reliant on the theme load in better.

I had a button that would change the theme that had an icon of the current theme. But every time I loaded up the page it would have the system icon displayed first then switch to the proper theme due to hydration. I don't mean to call next-themes out since they were a source of inspiration and the tool that I first used but even on their example site [Next Themes Site](https://next-themes-example.vercel.app) you can see this issue apparent. If you switch themes from system and reload the page it causes a flash in the textbox. If it's apparent for me on my wifi with just a textbox imagine it on a larger image or any data. This is why having the theme on the server can allow us to just apply these changes before the user sees it to have a seemless experience.

This library allow has a substantial speed difference especially in first contentful paint and other web vitals. You can see how I tested it all in [Comparison README.md](/apps/comparison/README.md). It will not only stop all flickers for anything dependant on the theme but also increase page loads by a substantial amount that is easily retestable on you device.

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
import { ThemeProvider, getServerTheme } from "next-server-theme/server";

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

The suppressHydrationWarning is there for when the theme is set to system which causes us to preload a script to resolve the background theme to whatever the user's preference is. This preload script is only used when the theme is set to "system" and works similar to next-themes.

The `className={getServerTheme()}` will grab the users theme preference from the last time on the site and add it to the class of the html body. Both which element you bind it to and whether it changes the class or a different attribute can be changed.

Then the ThemeProvider is a context that allows children to use the current state value.

## Use

To get the current theme you would do:

```jsx
"use client";

import { useTheme } from "next-server-theme";

export default function Page() {
    const [theme, setTheme] = useTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
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

export default function Page() {
    const theme = useGetTheme();
    const setTheme = useSetTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

In both of these example you don't need to worry about rehydration since the theme is on the server and this will run fine during SSR.

**When you setTheme the background color won't change but the attribute class on the HTML tag will. Then you can react to it using styles in the next section for further customizability**

## API

### getServerTheme

-   `getServerTheme(): ResolvedTheme | ""`: This function takes no arguments and return the theme based of the user's cookie on the server. This is only available on server components but can be passed as a prop from a server component to a client component. Make sure if this isn't set equal to the className in the html tag that you modify either the `element` or `attributes` on the ThemeProvider to provide a consistent experience. [example](#element)

### ThemeProvider Options

All your theme configuration is passed to ThemeProvider.

-   `defaultTheme?: Theme = "system"`: Default theme if it a user's first type to the site
-   `themes?: Theme[]`: You can set an array of all the theme values to this prop. This will allow the class to specifically removed instead of rewriting the entire class. [example](#themes)
-   `systemLightTheme?: Theme[] = "light"`: System theme with user preference of light mode will be set as this theme
-   `systemDarkTheme?: string = "dark"`: System theme with user preference of dark mode will be set as this theme
-   `themeKey?: string = "theme"`: Cookie and localstorage key to store theme
-   `resolvedThemeKey?: string = "resolvedTheme"`: Cookie and localstorage key to store resolved theme
-   `element?: string = "html"`: CSS selector to choose which element to update attribute with theme. Remember to move getServerTheme to this location [example](#element)
-   `attributes?: string | string[] = "class"`: CSS attribute to which theme is set to. It does replace all the data so make sure you don't use attribute for anything else. Remember to move getServerTheme to this location. [example](#styling)
-   `staticRender?: boolean = false`: If staticRender is true it lets you opt out of dyanmic rendering. [example](#static-rendering)
-   `nonce?: string | null`: This allows you to use nonces to better secure your webpage [example](#nonce)

### useTheme Options

This is how you would access the theme on your website. These are the arguments and return for useTheme.

#### Arguments

-   `resolved?: boolean = false`: Depending on whether this is true you will either receive the resolved theme or the normal theme which includes system. [example](#resolved-theme)

#### Return

-   `theme: Theme | ResolvedTheme`: Depending on whether this is true you will either receive the resolved theme or the normal theme which includes system. [example](#use)
-   `setTheme: React.Dispatch<React.SetStateAction<Theme>>`: You recieve the setTheme function which allows you to modify the theming. [example](#use)

#### Specific Functions

-   `useGetTheme(): Theme`: Only returns the theme. [example](#use)
-   `useGetResolvedTheme(): ResolvedTheme`: Only returns the resolved theme. [example](#resolved-theme)
-   `useSetTheme(): React.Dispatch<React.SetStateAction<Theme>>`: Only return setTheme function. [example](#use)

### Types

These are the main types used in the project.

-   `Theme = string`: This is the type for the majority of the project. It is just a string but you can modify the type using the [cli](cli) which allows you to type the Theme.
-   `ResolvedTheme = Exclude<Theme, "system">`: Resolved theme is the same as the Theme but doesn't return "system." It returns the resolved theme which is dependant on the user's theming preference.

### CLI

Since it is very tough to provide a good experience with types with context we ended up going with the method prisma does. We end up having a cli that directly modifies the themes.

-   `next-server-theme`: CLI info
-   `next-server-theme types`: Displays current theme type
-   `next-server-theme set: strings[]`: You can modify the theme type with a ts type. Ex: next-server-theme set dark light system. This causes theme to be typesafe and equal to a union of dark | light | system
-   `next-server-theme reset`: Switches theme type to the default which is all strings

The default is string and once you modify it when, get or set themes they will be typed.

### Styling

In our examples we have 3 ways to do this method

[Tailwind](/apps/examples/tailwind):

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning className={getServerTheme()}>
            <body className="pink:bg-pink-100 bg-white dark:bg-black dark:text-white">
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

[CSS](/apps/examples/css/):

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
    background-color: pink;
}
```

[Attribute](/apps/examples/attribute/) (We change classes to data-theme for getServerTheme):

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme/server";

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
    background-color: pink;
}
```

TBD this section is basically up to you since all this package does is change whatever css selector and element you pick to have the theme value.
Then you can choose your own way whether it be like the examples or even styled components.
You can even choose custom attributes,

### Themes

You can specify which themes you want to use for the project like so:

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning className={getServerTheme()}>
            <body>
                <ThemeProvider themes={["system", "dark", "light"]}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
```

The default functionality is to replace the entire class with the new theme. But no with the theming prop it now specifically remove the themes and adds the new theme in. This means it won't interfere with other classes.

### Element

You can also choose a custom element to apply themes to instead of the HTML element:

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme";

export default function Layout({ children }) {
    return (
        <html suppressHydrationWarning>
            <body className={getServerTheme()}>
                <ThemeProvider element="body">{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

In the example we move getServerTheme to give the className in the server to the body.
Then we added the css selector of "body" to the element attribute to ThemeProvider so we know what element to change css for in case of changes to theme.
We can combine the last section of custom attributes to allow us to apply the theme to any eleent with any attribute.
Make sure you modfiy the css to account for the new element you picked.

### Static Rendering

This works similar to next-themes and it let next not read cookies on the server like the rest of the package.
It might seem backwards to what this package does but this option allows you to statically render your pages using SSG or other rendering methods instead of dynamic rendering.
This could put less stress on your server and makes it easier for users who don't need the page rendered on the server.

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme/server";

export default function Layout({ children }) {
    return (
        <html>
            <body suppressHydrationWarning>
                <ThemeProvider staticRender>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

I also did make it possible for you to not hydrate the theme but it will lead you to have the default theme intially before swapping to the proper theme on the client. So you could build your own solution like below if you don't like mine.

```jsx
"use client";

import { useTheme } from "next-server-theme/client";
import { useEffect, useState } from "react";

export default function Page() {
    const [theme, setTheme] = useTheme();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

### Resolved Theme

If you want the resolved theme you could modify the useTheme function or useGetResolvedTheme. Instead of having the "system" theme it instead shows the proper resolved theme according to the users prefered colored scheme of dark or light.

```jsx
"use client";

import { useTheme } from "next-server-theme";

export default function Page() {
    const [theme, setTheme] = useTheme({ resolved: true });

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

Or you could use useGetResolvedTheme instead

```jsx
"use client";

import { useGetResolvedTheme, useSetTheme } from "next-server-theme";

export default function Page() {
    const theme = useGetResolvedTheme();
    const setTheme = useSetTheme();

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

You would need to hydrate this result because the users preference can only be found on the client like so:

```jsx
"use client";

import { useTheme } from "next-server-theme/client";
import { useEffect, useState } from "react";

export default function Page() {
    const [theme, setTheme] = useTheme({ resolved: true });

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div>Theme: {theme}</div>
            <button onClick={() => setTheme("dark")}>Dark</button>
            <button onClick={() => setTheme("light")}>Light</button>
            <button onClick={() => setTheme("pink")}>Pink</button>
            <button onClick={() => setTheme("system")}>System</button>
        </div>
    );
}
```

But like in the static rendering I already have my custom solution where system defaults to light mode. Then if the user prefers dark mode then it switches to the dark theme. This is already a good solution because there will only be an extra render when the theme is system and the client prefers dark mode.

### Nonce

If you wish to use nonces which “whitelist” certain inline script and style elements, while avoiding use of the CSP unsafe-inline directive. It basically tells the inline contents of the browser the inline contents of a particular script or style element weren’t injected into the document by some (malicious) third party, but were instead put in the document intentionally by whoever controls the server the document is served from.

In order to first use this you have to modify nextjs middleware to send some custom headers like so:
[NextJs Example Offical Docs](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)

```jsx
// middleware.ts (Make sure it is as the app dir or inside src)
import { NextResponse } from "next/server";

export function middleware(request) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
        .replace(/\s{2,}/g, " ")
        .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    );

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });
    response.headers.set(
        "Content-Security-Policy",
        contentSecurityPolicyHeaderValue
    );

    return response;
}
```

Then to use the nonce you would do:

```jsx
// app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-theme";
import { headers } from "next/headers";

export default function Layout({ children }) {
    const nonce = headers().get("x-nonce");

    return (
        <html>
            <body suppressHydrationWarning className={getServerTheme()}>
                <ThemeProvider nonce={nonce}>{children}</ThemeProvider>
            </body>
        </html>
    );
}
```

In the example above I used the server cookies but you could render using the static rendering too.

But this option allows you to use nonces to secure your code. If you don't use static rendering then during dynamic rendering a script is only sent when the theming is on "system."
