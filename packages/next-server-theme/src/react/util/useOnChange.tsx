"use client";
import { useEffect, useRef } from "react";

function useOnChange(
    callback: React.EffectCallback,
    dependancies: React.DependencyList
) {
    const hasMounted = useRef(false)

    // Page loads and sets hasMounted to true then next time dependacies change it will run the callback
    useEffect(() => {
        if (hasMounted.current) {
            return callback();
        } else {
            hasMounted.current = true
        }
    }, dependancies);
}