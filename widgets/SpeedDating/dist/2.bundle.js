(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{12:function(e,t,n){var o=n(43);"string"==typeof o&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};n(10)(o,a);o.locals&&(e.exports=o.locals)},14:function(e,t,n){var o=n(53);"string"==typeof o&&(o=[[e.i,o,""]]);var a={insert:"head",singleton:!1};n(10)(o,a);o.locals&&(e.exports=o.locals)},3:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n(4),i=function(){var e=this.$createElement,t=this._self._c||e;return t("v-app",[t("loading",{attrs:{value:this.loading,message:"Loading",progresscolor:"#005685"}}),this._v("\n    "+this._s(this.msg)+"\n")],1)};i._withStripped=!0;var r=n(67);n(24),n(31);a.a.use(r.a);var s=new a.a,l=new r.a({icons:{iconfont:"mdi"}});var d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{staticStyle:{position:"absolute"},attrs:{row:"","justify-center":""}},[n("v-dialog",{attrs:{persistent:"",content:"","content-class":"centered-dialog"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},[n("v-container",{attrs:{"fill-height":""}},[n("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[n("v-progress-circular",{attrs:{indeterminate:"",size:70,width:7,color:e.progresscolor}}),e._v(" "),null!=e.message?n("h1",[e._v(e._s(e.message))]):e._e()],1)],1)],1)],1)};d._withStripped=!0;var u={name:"Loading",props:{value:{type:Boolean,default:!1},message:{type:String,default:null},progresscolor:{type:String,default:"purple"}},data:function(){return{}}},c=(n(42),n(17)),p=n(18),f=n.n(p),g=n(62),m=n(68),v=n(63),h=n(64),w=n(65),S=Object(c.a)(u,d,[],!1,null,null,null);function y(e,t){requirejs(["DS/WAFData/WAFData"],(function(n){n.authenticatedRequest(e,t)}))}f()(S,{VContainer:g.a,VDialog:m.a,VLayout:v.a,VProgressCircular:h.a,VRow:w.a}),S.options.__file="src/components/loading.vue";var _={name:"App",components:{loading:S.exports},data:function(){return{search:null,msg:"[NULL]",loading:!1,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var e=this,t=this;widget.name="",s.$on("onSearch",(function(e){t.search=e})),s.$on("reloadwidget",(function(){t.reload()})),t.loading=!0,void 0===widget.id?setTimeout((function(){t.tenantDataLoaded([{id:-1}])}),1e3):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:void 0,onComplete:e.tenantDataLoaded})}))},methods:{tenantDataLoaded:function(e){this.tenants=[];for(var t=[],n=0,o=0;o<e.length;o++)void 0!==e[o]["3DSwym"]&&(t.push({value:"".concat(n++),label:"".concat(e[o].platformId," - ").concat(e[o].displayName)}),this.tenants.push(e[o]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:t}),s.$emit("reloadwidget")},swymCommunities:function(e){if(void 0!==widget.id){var t=this.tenants[this.tenantId]["3DSwym"];y(t+"/api/index/tk",{method:"GET",onComplete:function(n){var o=JSON.parse(n).result.ServerToken;y(t+"/api/community/listmycommunities/creation_granted_for/post",{method:"GET",headers:{"X-DS-SWYM-CSRFTOKEN":o},onComplete:function(t){var n=JSON.parse(t);e(n)},onFailure:function(e){console.error(e)}})},onFailure:function(e){console.error(e)}})}else e({result:[{id:"1245152",title:"hello"},{id:"1291515",title:"world"}]})},reload:function(){var e=this;e.tenantId=widget.getValue("_CurrentTenantID_"),this.loading=!0,this.swymCommunities((function(t){for(var n=[],o=0;o<t.result.length;++o)n.push({value:"".concat(t.result[o].id),label:"".concat(t.result[o].title)});widget.addPreference({name:"_ComunityId_",type:"list",label:"Community",defaultValue:"0",options:n}),e.loading=!1}))}}},b=(n(52),n(66)),C=Object(c.a)(_,i,[],!1,null,null,null);f()(C,{VApp:b.a}),C.options.__file="src/components/app.vue";var D=C.exports,x=n(56);a.a.use(x.a);var E=new x.a.Store({state:{},mutations:{},getters:{}});t.default=function(){widget.addEvent("onLoad",(function(){o.b.disableCSS(!0),window.title="KEONYS",widget.setTitle(window.title),new a.a({store:E,vuetify:l,render:function(e){return e(D)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){s.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(e){s.$emit("onSearch",e)})),widget.addEvent("onResetSearch",(function(){s.$emit("onSearch","")}))}},42:function(e,t,n){"use strict";var o=n(12);n.n(o).a},43:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\n.dialog.centered-dialog,\r\n.v-dialog.centered-dialog\r\n{\r\n    background: whitesmoke;\r\n    box-shadow: none;\r\n    border-radius: 6px;\r\n    width: auto;\r\n    color: #222;\n}\r\n",""])},52:function(e,t,n){"use strict";var o=n(14);n.n(o).a},53:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\n.loading-dialog {\r\n   background-color: #303030;\n}\r\n",""])}}]);