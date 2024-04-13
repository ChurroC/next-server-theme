export function setSystemDark(
    attributes: string | string[] = "class",
    systemLightTheme: string,
    systemDarkTheme: string
) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        [attributes].flat().forEach(attribute => {
            document.documentElement.setAttribute(attribute, systemDarkTheme);
        });
    } else {
        [attributes].flat().forEach(attribute => {
            document.documentElement.setAttribute(attribute, systemLightTheme);
        });
    }
}
