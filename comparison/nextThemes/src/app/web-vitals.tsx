"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
    useReportWebVitals(metric => {
        console.log(metric);
        const body = JSON.stringify(metric);

        fetch("/api/analytics", { body, method: "POST", keepalive: true });
    });
    return null;
}
