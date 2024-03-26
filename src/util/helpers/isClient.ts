// Never use this for rendering since hydration issues will occur
export function isClient() {
    return typeof window !== "undefined";
}
