(this.webpackJsonp2048=this.webpackJsonp2048||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),o=n(5),a=n.n(o),u=(n(12),n(6)),s=(n(13),n(7));function i(e){return Math.floor(Math.random()*e)}function d(e){var t=e.length,n=[i(t),i(t),i(2)],r=n[0],c=n[1],o=n[2];0!==e[r][c]&&d(e),e[r][c]=[2,4][o]}function h(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,t=Object(s.a)(Array(e)).map((function(t){return Array(e).fill(0)})),n=0;n<2;n++)d(t);return t}var f=n(0);var l=function(){var e=Object(r.useState)(h()),t=Object(u.a)(e,2),n=t[0],c=t[1],o=Object(r.useCallback)((function(e){var t=function(e,t){var n=t.length,r=t.map((function(e){return e.map((function(e){return parseInt(e,10)}))})),c=0,o=0;switch(e){case"up":c=-1;break;case"left":o=-1;break;case"down":c=1;break;case"right":o=1;break;default:return t}for(var a=0;a<n;a++)for(var u=0;u<n;u++){var s=r[a][u];if(0!==s){r[a][u]=0;var i=a,h=u,f=void 0;try{do{h+=o,f=r[i+=c][h]}while(0===f);if(f!==s)throw new Error("go back one");r[i][h]=s<<1}catch(l){r[i-c][h-o]=s}}}return d(r),r}(function(e){switch(e){case"j":case"ArrowDown":case"up":return"down";case"k":case"ArrowUp":case"down":return"up";case"h":case"ArrowLeft":case"left":return"left";case"l":case"ArrowRight":case"right":return"right";default:console.log("Ignoring ".concat(e," since it is not a valid input"))}}(e.key),n);c(t)}),[n,c]);return Object(r.useEffect)((function(){document.addEventListener("keydown",o);var e=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:90,r={sX:0,sY:0,eX:0,eY:0},c=Object.freeze({UP:"up",DOWN:"down",RIGHT:"right",LEFT:"left"}),o=null,a=document;function u(e){var t=e.touches[0];r.sX=t.screenX,r.sY=t.screenY}function s(e){e.preventDefault();var t=e.touches[0];r.eX=t.screenX,r.eY=t.screenY}function i(e){var u=r.eX-r.sX,s=r.eY-r.sY;Math.pow(u,2)+Math.pow(s,2)<Math.pow(n,2)||((o=0===s||Math.abs(u/s)>1?u>0?c.RIGHT:c.LEFT:s>0?c.UP:c.DOWN)&&"function"===typeof t&&t(a,o),o=null)}return a.addEventListener("touchstart",u,!1),a.addEventListener("touchmove",s,!1),a.addEventListener("touchend",i,!1),{touchstart:u,touchend:i,touchmove:s}}(document,(function(e,t){return o({key:t})})),t=e.touchstart,n=e.touchend,r=e.touchmove;return function(){document.removeEventListener("keydown",o),document.removeEventListener("touchstart",t),document.removeEventListener("touchend",n),document.removeEventListener("touchmove",r)}}),[o]),Object(f.jsxs)("div",{className:"App",onKeyPress:alert,children:[Object(f.jsxs)("header",{className:"App-header",children:["2048",Object(f.jsx)("button",{onClick:function(){return c(h())},children:"Reset"})]}),Object(f.jsx)("table",{className:"App-board",children:Object(f.jsx)("tbody",{children:n.map((function(e,t){return Object(f.jsx)("tr",{children:e.map((function(e,t){return Object(f.jsx)("td",{children:0!==e&&e},t)}))},t)}))})})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),o(e),a(e)}))};a.a.render(Object(f.jsx)(c.a.StrictMode,{children:Object(f.jsx)(l,{})}),document.getElementById("root")),v()}},[[15,1,2]]]);
//# sourceMappingURL=main.1e5dba4c.chunk.js.map