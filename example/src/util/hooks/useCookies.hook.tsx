"use client";

import { useState } from "react";
import { useOnChange } from "./useOnChange.hook";
import { useTabState } from "./useTabState.hook";

export function useCookies<CookieType>(
    key: string,
    cookieValue: CookieType,
    debounceTime: number = 0
): [CookieType, React.Dispatch<React.SetStateAction<CookieType>>] {
    // Use broadcast instead of change in cookie since this is cooler
    const [value, setValue] = useState<CookieType>(cookieValue);

    useOnChange(() => {
        const delayDebounceFn = setTimeout(() => {
            cookieStore.set(key, value);
        }, debounceTime);

        return () => clearTimeout(delayDebounceFn);
    }, [value]);

    return [value, setValue];
}
