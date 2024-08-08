"use strict";var e=require("next/headers");let t,r;exports.getServerTheme=function(){console.log("cookie",r,"defaultThemeStatic",t);const e=r??t;return"system"===e?"":e},exports.getServerThemeForProvider=function(o,s="theme"){return o&&(t=o),r=e.cookies().get(s)?.value,r??t};
//# sourceMappingURL=getServerTheme.js.map
