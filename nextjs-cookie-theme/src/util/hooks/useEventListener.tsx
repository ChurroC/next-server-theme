"use client";

import { useEffect } from "react";

// Use globalThis which turns into window in the browser and global in node
export function useEventListener(
    eventType: string,
    listener: EventListenerOrEventListenerObject,
    element?: EventTarget | null
) {
    useEffect(() => {
        (element ?? window)?.addEventListener(eventType, listener);
        return () =>
            (element ?? window)?.removeEventListener(eventType, listener);
    }, []);
}
