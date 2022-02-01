/**
 * react-location-simple-cache
 *
 * Copyright (c) TanStack
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).ReactLocationSimpleCache={})}(this,(function(e){"use strict";function t(e,t,r,n,a,o,i){try{var u=e[o](i),c=u.value}catch(e){return void r(e)}u.done?t(c):Promise.resolve(c).then(n,a)}function r(e){return function(){var r=this,n=arguments;return new Promise((function(a,o){var i=e.apply(r,n);function u(e){t(i,a,o,u,c,"next",e)}function c(e){t(i,a,o,u,c,"throw",e)}u(void 0)}))}}var n=function(){function e(){this.records={}}var t=e.prototype;return t.createLoader=function(e,t){var n,a,o=this,i=null!=(n=null==t?void 0:t.maxAge)?n:0,u=null!=(a=null==t?void 0:t.policy)?a:"cache-and-network",c=function(){var n=r(regeneratorRuntime.mark((function n(a,c){var s,f,d;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(s=null!=t&&t.key?t.key(a):a.pathname,o.records[s]||(o.records[s]={key:s,updatedAt:0,ready:!1,match:a}),f=o.records[s],Object.assign(f,{match:a,loaderOptions:c}),d=function(){var t=r(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c.dispatch({type:"loading"}),t.prev=1,t.next=4,e(a,c);case 4:return r=t.sent,f.updatedAt=Date.now(),f.ready=!0,f.data=r,c.dispatch({type:"resolve",data:r}),t.abrupt("return",r);case 12:throw t.prev=12,t.t0=t.catch(1),c.dispatch({type:"reject",error:t.t0}),t.t0;case 16:case"end":return t.stop()}}),t,null,[[1,12]])})));return function(){return t.apply(this,arguments)}}(),"network-only"!==u){n.next=9;break}return n.next=8,d();case 8:return n.abrupt("return",n.sent);case 9:if(f.updatedAt){n.next=12;break}return n.next=12,d();case 12:if("cache-first"!==u){n.next=14;break}return n.abrupt("return",f.data);case 14:return Date.now()-f.updatedAt>i&&d(),n.abrupt("return",f.data);case 16:case"end":return n.stop()}}),n)})));return function(e,t){return n.apply(this,arguments)}}();return c},t.filter=function(e){var t=this;return Object.keys(this.records).filter((function(r){return e(t.records[r])})).map((function(e){return t.records[e]}))},t.find=function(e){return this.filter(e)[0]},t.invalidate=function(e){this.filter(e).forEach((function(e){e.invalid=!0}))},t.removeAll=function(){this.records={}},t.remove=function(e){var t=this;this.filter(e).forEach((function(e){delete t.records[e.key]}))},e}();e.ReactLocationSimpleCache=n,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=index.production.js.map
