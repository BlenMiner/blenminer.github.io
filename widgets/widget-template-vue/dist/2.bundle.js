(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{10:function(t,e){console.debug(widget)},11:function(t,e,n){var a=n(16);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};n(12)(a,i);a.locals&&(t.exports=a.locals)},14:function(t,e,n){"use strict";var a=n(46),i=n(9),o=(n(15),n(17)),r=n(18),s=n.n(r),u=n(53),c=n(54),l=n(55),d=Object(o.a)(i.default,a.a,a.b,!1,null,null,null);s()(d,{VApp:u.a,VContainer:c.a,VContent:l.a}),d.options.__file="src/components/app.vue",e.default=d.exports},15:function(t,e,n){"use strict";var a=n(11);n.n(a).a},16:function(t,e,n){(t.exports=n(5)(!1)).push([t.i,"\nhtml,\nbody {\n    overflow-y: auto !important;\n    height: 100%;\n}\n",""])},3:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n(4),o=n(14),r=n(52);n(30),n(37);i.a.use(r.a);var s=new r.a({icons:{iconfont:"mdi"}}),u=n(45);i.a.use(u.a);var c=new u.a.Store({state:{},mutations:{},getters:{}}),l=[];function d(t){l=t;for(var e=[],n=0;n<l.length;n++)e.push({value:"".concat(n),label:"".concat(l[n].platformId," - ").concat(l[n].displayName)});widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.getValue("_CurrentTenantID_")}e.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new i.a({store:c,vuetify:s,data:{name:"Valentin"},render:function(t){return t(o.default)}}).$mount("app"),requirejs(["DS/PlatformAPI/PlatformAPI"],(function(t){})),requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:widget.getValue("PlatFormInstanceId"),onComplete:d,onFailure:function(){console.log("Failed to get compass services.")}})}))})),widget.addEvent("onRefresh",(function(){}))}},46:function(t,e,n){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("v-app",[e("v-content",[e("v-container",{staticClass:"fill-height"},[e("h1",[this._v(this._s(this.name))])])],1)],1)},i=[];a._withStripped=!0,n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return i}))},9:function(t,e,n){"use strict";var a=n(10),i=n.n(a);e.default=i.a}}]);