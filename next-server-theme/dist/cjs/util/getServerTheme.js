"use strict";var e,r=require("next/headers");exports.getServerTheme=function(t){var u,v;t&&(e=t);var i=null===(u=r.cookies().get("theme"))||void 0===u?void 0:u.value;return null!==(v=null!=i?i:e)&&void 0!==v?v:"system"};
//# sourceMappingURL=getServerTheme.js.map
