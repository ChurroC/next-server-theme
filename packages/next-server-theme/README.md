# next-server-themes

Simple way to add themeing to your nextjs app directory project. It's as simple as adding 2 lines which allows you to use the best theming package made specifically for next. Similar to other packages like next-themes but we you won't have to worry about the rehydration issues as you can see the users choice on the server. No need to check if we mount before reading the theme. This also allows us to prerender all the pages on the server and have a smaller client bundle which is faster.

This package was specifically to allow nextjs app dir (pages dir in the near future) user's to have the best theming possible. This allow us high compatibility and a seamless theming configuration with next. Especially since we rely on next's cookie features to allow us to know the user's theme choice on the server and have no rehydration problems. You also need to make sure have rendering using SSR and not anything since we need to parse cookies for every user.

We have also tested all the pages to make sure the newest release always works. We also have compared our package against competitiros. Namely next-themes for which you can run your own tests to check but we beat theme in every web vital.

Our package also insures typesafety. It might be a bit complicated using a cli but other libraries espeically prisma have done similar implimentation. It also only opt-in and you can see more details below.

# Why

Just wanted to talk about big reason this would be useful and why I built. I wrote since I needed a themeing system that went further than just no flash but also helped have images and data reliant on the theme load in better.

I had a button that would change the theme that had an icon of the current theme. But every time I loaded up the page it would have the system icon displayed first then switch to the proper theme due to hydration. I don't mean to call next-themes out since they were a source of inspiration and the tool that I first used but even on their example site [Next Themes Site](https://next-themes-example.vercel.app) you can see this issue apparent. If you switch themes from system and reload the page it causes a flash in the textbox. If it's apparent for me on my wifi with just a textbox imagine it on a larger image or any data. This is why having the theme on the server can allow us to just apply these changes before the user sees it to have a seemless experience.

This library allow has a substantial speed difference especially in first contentful paint and other web vitals. You can see how I tested it all in [Comparison README.md](/apps/comparison/README.md). It will not stop all flickers for anything dependant on the theme but also increase page loads by a substantial amount that is easily retestable on you device.

## Add To Project

```jsx
//app/layout.jsx
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
//app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-themes/server";

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

In both of these example you don't need to worry about rehydration since the theme is on the server and this will run fine during SSR.

### Styling

In our examples we have 3 ways to do this method

[Tailwind](/apps/examples/tailwind):

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
    background-color: rgb(252 231 243);
}
```

[Attribute](/apps/examples/attribute/) (We change classes to data-theme for getServerTheme):

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

TBD this section is basically up to you since all this package does is change whatever css selector and element you pick to have the theme value.
Then you can choose your own way whether it be like the examples or even styled components.
You can even choose custom attributes,

### Element

You can also choose a custom element to apply themes to instead of the HTML element:

```jsx
//app/layout.jsx
import { ThemeProvider, getServerTheme } from "next-server-themes";

export default function Layout({ children }) {
    return (
        <html>
            <body suppressHydrationWarning className={getServerTheme()}>
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

## Typesafety

Since it is very tough to provide a good experience with types with context we ended up going with the method prisma does. We end up having a cli that directly modifies the themes.

-   `next-server-theme`: CLI info
-   `next-server-theme types`: Displays current theme type
-   `next-server-theme set`: You can modify the theme type with a ts type
-   `next-server-theme reset`: Switches theme type to the default which is all strings

The default is string and once you modify it when you try to get or set themes they will be typed.

## ThemeProvider Options

All your theme configuration is passed to ThemeProvider.

-   `defaultTheme = "system"`: Default theme if it a user's first type to the site
-   `systemLightTheme = "light"`: If you use the system theme then light mode will be set as this variable
-   `systemDarkTheme = "dark"`: If you use the system theme then dark mode will be set as this variable
-   `element = "html"`: CSS selector to choose which element to update attribute with theme. Remember to move getServerTheme to this location
-   `attributes = "class"`: CSS attribute to which theme is set to. It does replace all the data so make sure you don't use attribute for anything else. Remeber to move getServerTheme to this location.
