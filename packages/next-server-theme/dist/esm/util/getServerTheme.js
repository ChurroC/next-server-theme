import{cookies as e}from"next/headers";let t;function r(r){r&&(t=r);const n=e().get("theme")?.value;return n??t??"system"}export{r as getServerTheme};
//# sourceMappingURL=getServerTheme.js.map
