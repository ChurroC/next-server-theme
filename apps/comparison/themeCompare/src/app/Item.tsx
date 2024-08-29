enum analyticsInfo {
    TTFB = "Time to First Byte",
    FCP = "First Contentful Paint",
    LCP = "Largest Contentful Paint",
    FID = "First Input Delay",
    CLS = "Cumulative Layout Shift",
    INP = "Input Performance",
    time = "Last Updated"
}

export function Item({
    object1,
    object2,
    objectKey
}: {
    object1: Analytics | null;
    object2: Analytics | null;
    objectKey: keyof Analytics;
}) {
    let textColor = "";
    if (object1?.[objectKey]?.value && object2?.[objectKey]?.value) {
        if (object1[objectKey].value < object2?.[objectKey].value) {
            textColor = "text-green-500";
        } else {
            textColor = "text-red-500";
        }
    }

    return (
        <p className={textColor} title={analyticsInfo[objectKey]}>
            {objectKey}: {object1?.[objectKey]?.value.toFixed(2) ?? "No Data"}
        </p>
    );
}
