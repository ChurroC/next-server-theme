import{cookies as e}from"next/headers";let t,o;function n(n,r="theme"){return n&&(t=n),o=e().get(r)?.value,o??t}function r(){console.log("cookie",o,"defaultThemeStatic",t);const e=o??t;return"system"===e?"":e}export{r as getServerTheme,n as getServerThemeForProvider};
//# sourceMappingURL=getServerTheme.js.map
