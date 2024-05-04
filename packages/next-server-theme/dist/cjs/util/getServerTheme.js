"use strict";var e=require("next/headers");let t;exports.getServerTheme=function(r){r&&(t=r);const s=e.cookies().get("theme")?.value;return s??t??"system"};
//# sourceMappingURL=getServerTheme.js.map
