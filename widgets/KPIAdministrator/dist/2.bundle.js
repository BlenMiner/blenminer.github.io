(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{14:function(e,t,n){var a=n(47);"string"==typeof a&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};n(13)(a,o);a.locals&&(e.exports=a.locals)},3:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(4),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{attrs:{flat:""}},[n("center",[n("table",{attrs:{width:"95%"}},[n("tr",[n("td",[n("v-text-field",{staticStyle:{margin:"10px"},attrs:{label:"Add name"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),n("td",[n("v-btn",{attrs:{color:"#1867c0",dark:"",width:"100%"},on:{click:function(t){return e.add(e.name)}}},[e._v("Add")])],1)])])]),e._v(" "),n("div",e._l(e.database,(function(t,a){return n("v-chip",{key:a,attrs:{close:""},on:{click:e.select,"click:close":function(n){return e.remove(t)}}},[n("strong",[e._v(e._s(t.Name))]),e._v(" \n            "),n("span",[e._v("("+e._s(t.Added)+")")])])})),1)],1)};i._withStripped=!0;var r=n(85);n(28),n(35);o.a.use(r.a);var s=new o.a,d=new r.a({icons:{iconfont:"mdi"}});var c={name:"App",components:{},data:function(){return{database:{},name:"",loadingbar:!0,snackbarMsg:"",snackbar:!1,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var e=this,t=this;t.loadingbar=!0,s.$on("onSearch",(function(e){t.search=e})),s.$on("reloadwidget",(function(){t.reload()})),void 0===widget.id?t.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:void 0,onComplete:e.tenantDataLoaded})}))},methods:{log:function(e){this.snackbarMsg=e,this.snackbar=!0},remove:function(e){var t=widget.getPreference("_FileKey_").value,n=new XMLHttpRequest;n.open("GET","https://bcracker.dev/widgets/obsolete.php?key=".concat(t,"&removeid=").concat(e.id),!1),n.send(null),s.$emit("reloadwidget")},add:function(e){var t=widget.getPreference("_FileKey_").value,n=new XMLHttpRequest;n.open("GET","https://bcracker.dev/widgets/obsolete.php?key=".concat(t,"&name=").concat(e),!1),n.send(null),e="",s.$emit("reloadwidget")},tenantDataLoaded:function(e){this.tenants=[];for(var t=[],n=0,a=0;a<e.length;a++)void 0!==e[a]["3DSpace"]&&(t.push({value:"".concat(n++),label:"".concat(e[a].platformId," - ").concat(e[a].displayName)}),this.tenants.push(e[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:t}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),s.$emit("reloadwidget")},getCSRF:function(e,t){var n,a,o=this,i=o.tenants[o.tenantId]["3DSpace"];n=i+"/resources/v1/application/CSRF",a={onComplete:function(t){var n=JSON.parse(t);e(n.csrf.value)},onFailure:function(e){o.log(e),t()}},requirejs(["DS/WAFData/WAFData"],(function(e){e.authenticatedRequest(n,a)}))},reload:function(){if(null==this.table||0==this.table.length){var e=widget.getPreference("_FileKey_").value,t=new XMLHttpRequest;t.open("GET","https://bcracker.dev/widgets/obsolete.php?key="+e,!1),t.send(null),this.database=JSON.parse(t.responseText)}}}},l=(n(46),n(48)),u=n(49),p=n.n(u),f=n(87),v=n(83),m=n(84),g=n(86),h=Object(l.a)(c,i,[],!1,null,null,null);p()(h,{VBtn:f.a,VCard:v.a,VChip:m.a,VTextField:g.a}),h.options.__file="src/components/app.vue";var w=h.exports,b=n(76);o.a.use(b.a);var _=new b.a.Store({state:{},mutations:{},getters:{}});t.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new o.a({store:_,vuetify:d,render:function(e){return e(w)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){s.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(e){s.$emit("onSearch",e)})),widget.addEvent("onResetSearch",(function(){s.$emit("onSearch","")}))}},46:function(e,t,n){"use strict";var a=n(14);n.n(a).a},47:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])}}]);