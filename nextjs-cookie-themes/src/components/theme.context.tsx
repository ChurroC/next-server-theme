"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { modifyTheme } from "@/util/modifyTheme";
import { setSystemDark } from "@/util/script";

import { config } from "@/util/getConfig";
type Theme = typeof config.defaultTheme;

declare const cookieStore: {
    get: (name: string) => Promise<{ value: string }>;
    set: (name: string, value: string) => void;
} & EventTarget;

const ThemeContext = createContext<Theme>(config.defaultTheme);
const SetThemeContext = createContext<
    React.Dispatch<React.SetStateAction<Theme>>
>(() => {});

export function useOnChange(
    callback: React.EffectCallback,
    dependancies: React.DependencyList
) {
    const [hasMounted, setHasMounted] = useState(false);

    // Page loads and sets hasMounted to true then next time dependacies change it will run the callback
    useEffect(() => {
        if (hasMounted) {
            return callback();
        } else {
            setHasMounted(true);
        }
    }, dependancies);
}

export function ThemeProviderWithoutServerTheme({
    children,
    serverTheme
}: {
    children: React.ReactNode;
    serverTheme: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(serverTheme);

    // When theme changes set class name
    useOnChange(() => {
        document.documentElement.className = modifyTheme(theme);
    }, [theme]);

    // When theme changes set cookie
    // cookieStore is async
    useOnChange(() => {
        if (typeof cookieStore !== "undefined") {
            cookieStore.set("theme", theme);
        } else {
            document.cookie = `theme=${theme};`;
        }

        // This is easier than broadcast channel to modify the theme
        localStorage.setItem("theme", theme);
    }, [theme]);

    // This is for when the system theme changes
    useEffect(() => {
        if (theme === "system") {
            function onSystemThemeChange({ matches }: MediaQueryListEventInit) {
                console.log(theme, matches);
                if (matches)
                    document.documentElement.className = config.systemDarkTheme;
                else
                    document.documentElement.className =
                        config.systemLightTheme;
            }
            const systemDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            );

            systemDark.addEventListener("change", onSystemThemeChange);

            return () =>
                systemDark.removeEventListener("change", onSystemThemeChange);
        }
    }, [theme]);

    // This is when another tabs theme changes
    // Was going to use broadcast api but this is easier since it runs on other tabs and doesnt run if localstorage is set to the value
    useEffect(() => {
        function onStorageChange({ key, newValue }: StorageEvent) {
            if (key === "theme") {
                setTheme(newValue as Theme);
            }
        }
        window.addEventListener("storage", onStorageChange);

        return () => window.removeEventListener("storage", onStorageChange);
    }, []);

    return (
        <SetThemeContext.Provider value={setTheme}>
            <ThemeContext.Provider value={theme}>
                {serverTheme === "system" && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(${setSystemDark.toString()})("${config.systemDarkTheme}")`
                        }}
                    />
                )}
                {children}
            </ThemeContext.Provider>
        </SetThemeContext.Provider>
    );
}

export function useTheme() {
    return [useContext(ThemeContext), useContext(SetThemeContext)];
}

export function useGetTheme() {
    return useContext(ThemeContext);
}
export function useSetTheme() {
    return useContext(SetThemeContext);
}
