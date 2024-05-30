declare module "@next/eslint-plugin-next" {
    import { Linter } from "eslint";
    // This aren't actual full types but I'm just using "core-web-vitals" so it works
    const config = {
        configs = {
            "core-web-vitals": Linter.Config
        }
    };
    export default config;
}
