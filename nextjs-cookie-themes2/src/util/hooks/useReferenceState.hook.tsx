"use client";

import { useEffect, useRef } from "react";

// One problem I could see is that it check current before it changes so it actually has past values
export function useReferenceState<T>(state: T) {
    const ref = useRef(state);

    useEffect(() => {
        ref.current = state;
    }, [state]);

    return ref;
}
