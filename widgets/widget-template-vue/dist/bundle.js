!function(e){function t(t){for(var n,o,i=t[0],a=t[1],u=0,s=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&s.push(r[o][0]),r[o]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(c&&c(t);s.length;)s.shift()()}var n={},r={0:0};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=i);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(e){return o.p+""+e+".bundle.js"}(e);var c=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(s);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,n[1](c)}r[e]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=a;o(o.s=1)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return a}));var r=function(){var e={},t="",n=function(){var e=localStorage.getItem("_prefs_4_Widget_");if(e)try{e=JSON.parse(e)}catch(t){e={},localStorage.setItem("_prefs_4_Widget_",JSON.stringify(e))}else e={},localStorage.setItem("_prefs_4_Widget_",JSON.stringify(e));return e}(),r=function(){localStorage.setItem("_prefs_4_Widget_",JSON.stringify(n))};this.uwaUrl="./",this.addEvent=function(t,n){e[t]=n,"onLoad"===t&&("loading"===document.readyState?window.addEventListener("DOMContentLoaded",n):n())},this.addPreference=function(e){e.value=e.defaultValue,n[e.name]=e,r()},this.getPreference=function(e){return n[e]},this.getValue=function(e){return void 0===n[e]?void 0:n[e].value},this.setValue=function(e,t){n[e].value=t,r()},this.setTitle=function(e){t=e,document.title=t},this.dispatchEvent=function(){}},o=function(){this.log=function(e){console.log(e)}};function i(e,t){var i=function e(t,n,r){if(void 0!==window[t])r();else{if(0===n)throw document.body.innerHTML="Error while trying to load widget. See console for details",new Error(t+" didn't load");setTimeout(e,200,t,--n,r)}},a=function(){n.p=widget.uwaUrl.substring(0,widget.uwaUrl.lastIndexOf("/")+1)};if(window.widget)a(),e(widget);else if(window.UWA)try{i("widget",10,(function(){a(),e(widget)}))}catch(e){console.error(e),t(e)}else window.widget=new r,window.UWA=new o,new Promise((function(e,t){var n=new XMLHttpRequest;n.addEventListener("load",(function(t){var n=document.createElement("script");n.innerHTML=t.target.response,document.head.appendChild(n),e()}));try{n.open("GET","static/lib/require.js"),n.send()}catch(e){t(e)}})).then((function(){define("DS/TagNavigatorProxy/TagNavigatorProxy",[],(function(){return new function(){this.createProxy=function(){return{addEvent:function(e,t){},setSubjectsTags:function(e){}}}}})),define("DS/PlatformAPI/PlatformAPI",[],(function(){return new function(){this.getUser=function(){return{address:"An address for test purpose",city:"VelizyLand",email:"rogrigo@hotmail.com",enabled:!0,firstname:"Rodrigo",id:7,language:"en",lastName:"Sanchez",login:"RG0",superUser:!1,telephone:"",type:3,properties:{}}},this.subscribe=function(e,t){return{topic:e,callback:t}}}}))})),i("requirejs",10,(function(){e(window.widget)}))}var a=new function(){var e=["UWA/assets/css/iframe.css"];this.disableCSS=function(t){var n=!0;"boolean"==typeof t&&!1===t&&(n=!1);for(var r=document.styleSheets,o=0;o<r.length;o++){var i=r.item(o),a=!0,u=!1,c=void 0;try{for(var s,f=e[Symbol.iterator]();!(a=(s=f.next()).done);a=!0){var l=s.value;i.href&&-1!==i.href.indexOf(l)&&(i.disabled=n)}}catch(e){u=!0,c=e}finally{try{a||null==f.return||f.return()}finally{if(u)throw c}}}}}},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";n.r(t);var r=n(0);Object(r.a)((function(e){Promise.all([n.e(1),n.e(2)]).then(n.bind(null,3)).then((function(e){e.default()}))}))}]);