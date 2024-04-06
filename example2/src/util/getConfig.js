"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    defaultTheme: "system",
    systemLightTheme: "pink",
    systemDarkTheme: "dark",
    modifyTheme: function (theme) {
        return theme;
    }
};
// export type Theme = typeof config.defaultTheme;
var cosmiconfig_1 = require("cosmiconfig");
var explorerSync = (0, cosmiconfig_1.cosmiconfigSync)("theme");
var result = explorerSync.search();
console.log(result);
