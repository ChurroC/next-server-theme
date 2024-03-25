"use client";

import { useEffect, useRef, useState } from "react";
import { useOnChange } from "./useOnChange.hook";

export function useTabState<StateType>(
    initalState: StateType | (() => StateType),
    key: string
): [StateType, React.Dispatch<React.SetStateAction<StateType>>, boolean] {
    const [state, setState] = useState<StateType>(initalState);

    const channel = useRef(new BroadcastChannel(key));
    const receiveMessage = useRef(false);

    useEffect(() => {
        channel.current.onmessage = ({ data: { value } }: MessageEvent) => {
            setState(value as StateType);
            receiveMessage.current = true;
        };
    });

    useOnChange(() => {
        if (!receiveMessage.current) {
            channel.current.postMessage({ value: state });
        }
        receiveMessage.current = false;
    }, [state]);

    return [state, setState, receiveMessage.current];
}
