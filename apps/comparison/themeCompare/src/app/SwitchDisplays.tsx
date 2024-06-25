"use client";

import { Suspense, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { DataDisplay } from "./DataDisplay";

export function SwitchDisplays({
    files,
    children
}: {
    files: string[];
    children: React.ReactNode;
}) {
    const [fileNameIndex, setFileNameIndex] = useState(0);

    return (
        <>
            <ChevronLeftIcon
                className="mt-[calc(100vh/6)] size-6 self-start"
                onClick={() =>
                    setFileNameIndex((fileNameIndex - 1) % files.length)
                }
            />
            {children}
            <ChevronRightIcon
                className="mt-[calc(100vh/6)] size-6 self-start"
                onClick={() =>
                    setFileNameIndex((fileNameIndex + 1) % files.length)
                }
            />
        </>
    );
}
