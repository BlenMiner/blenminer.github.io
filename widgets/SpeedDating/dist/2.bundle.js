(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{29:function(t,n,e){"use strict";var a=e(8);e.n(a).a},3:function(t,n,e){"use strict";e.r(n);var a=e(0),o=e(4),i=function(){var t=this.$createElement;return(this._self._c||t)("v-app",[this._v("\n    "+this._s(this.msg)+"\n")])};i._withStripped=!0;var r=e(39);e(11),e(18);o.a.use(r.a);var s=new o.a,d=new r.a({icons:{iconfont:"mdi"}});var u={name:"App",data:function(){return{search:null,msg:"[NULL]",tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,n=this;widget.name="",s.$on("onSearch",(function(t){n.search=t})),s.$on("reloadwidget",(function(){n.reload()})),void 0===widget.id?n.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(n){n.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{tenantDataLoaded:function(t){this.tenants=[];for(var n=[],e=0,a=0;a<t.length;a++)void 0!==t[a]["3DSwym"]&&(n.push({value:"".concat(e++),label:"".concat(t[a].platformId," - ").concat(t[a].displayName)}),this.tenants.push(t[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:n}),s.$emit("reloadwidget")},swymCommunities:function(t){var n,e,a=this,o=a.tenants[a.tenantId]["3DSwym"];n=o+"/api/community/listmycommunities",e={onComplete:function(t){var n=JSON.parse(t);console.log(n),a.onCompleted(t)},onFailure:function(t){console.error(t)}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(n,e)}))},reload:function(){var t=this;t.tenantId=widget.getValue("_CurrentTenantID_"),this.swymCommunities((function(n){t.msg=n}))}}},c=(e(29),e(31)),l=e(32),m=e.n(l),f=e(40),p=Object(c.a)(u,i,[],!1,null,null,null);m()(p,{VApp:f.a}),p.options.__file="src/components/app.vue";var w=p.exports,h=e(35);o.a.use(h.a);var v=new h.a.Store({state:{},mutations:{},getters:{}});n.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="KEONYS",widget.setTitle(window.title),new o.a({store:v,vuetify:d,render:function(t){return t(w)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){s.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){s.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){s.$emit("onSearch","")}))}},30:function(t,n,e){(t.exports=e(5)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])},8:function(t,n,e){var a=e(30);"string"==typeof a&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1};e(7)(a,o);a.locals&&(t.exports=a.locals)}}]);