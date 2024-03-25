"use client";

import { useState } from "react";
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

    useEventListener(
        "change",
        event => {
            console.log(event);
            console.log(event.changed.slice(-1)[0]);
            const { name, value } = event.changed.slice(-1)[0];
            console.log("cookie change", name, value);
            if (name === key) {
                setValue(value);
                console.log("set value", value);
            }
        },
        isClient() ? cookieStore : null
    );

    useOnChange(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log("set cookie", Date.now());
            cookieStore.set(key, value);
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [value]);

    return [value, setValue];
}
