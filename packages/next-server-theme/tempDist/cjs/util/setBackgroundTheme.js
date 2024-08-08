"use strict";exports.setBackgroundTheme=function(s,t="html",e="class",c){const a=document.querySelector(t);[e].flat().forEach((t=>{"class"===t&&c?(a?.classList.remove(...c),a?.classList.add(s)):a?.setAttribute(t,s)}))};
//# sourceMappingURL=setBackgroundTheme.js.map
