"use client";

import { useRef, useState } from "react";
import { useOnChange } from "./useOnChange.hook";
import { useEventListener } from "./useEventListener";
import { isClient } from "../helpers/isClient";

export function useCookies<CookieType>(
    key: string,
    cookieValue: CookieType,
    debounceTime: number = 0
): [CookieType, React.Dispatch<React.SetStateAction<CookieType>>] {
    // Use broadcast instead of change in cookie since this is cooler
    const [value, setValue] = useState<CookieType>(cookieValue);

    // Checks if the origin of the message is the same as the current origin and if it then don't set the cookie aagi
    const origin = useRef(false);

    useEventListener(
        "change",
        ((
            event: {
                changed: [
                    {
                        name: string;
                        value: string;
                    }
                ];
            } & Event
        ) => {
            if (!origin.current) {
                // There will always be a change in the array
                const { name, value } = event.changed.slice(-1)[0]!;
                if (name === key) {
                    setValue(JSON.parse(value) as CookieType);
                }
            }
            origin.current = false;
        }) as EventListener,
        isClient() ? cookieStore : null
    );

    useOnChange(() => {
        const delayDebounceFn = setTimeout(async () => {
            // Cokiestore events are stupid and change runs even if the value is the same
            if ((await cookieStore.get(key)).value !== value) {
                console.log("set cookie", Date.now());
                console.log(JSON.stringify(value));
                cookieStore.set(key, JSON.stringify(value));
                origin.current = true;
            }
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [value]);

    return [value, setValue];
}
