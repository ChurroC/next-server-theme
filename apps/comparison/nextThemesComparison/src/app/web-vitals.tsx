"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
    useReportWebVitals(metric => {
        void fetch("/api/analytics", {
            body: JSON.stringify(metric),
            method: "POST",
            keepalive: true
        });
    });
    return null;
}
