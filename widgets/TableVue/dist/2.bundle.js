(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{17:function(e,t,n){var a=n(79);"string"==typeof a&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};n(16)(a,o);a.locals&&(e.exports=a.locals)},3:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(4),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-content",[n("preferences"),e._v(" "),n("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:e.loadingbar,absolute:"",app:""}}),e._v(" "),n("v-snackbar",{model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n            "+e._s(e.snackbarMsg)+"\n            "),n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("\n                Close\n            ")])],1),e._v(" "),n("v-slide-x-transition",[""===e.fileId?n("center",[n("v-content",{staticStyle:{height:"100vh",width:"100%"}},[n("v-card",{ref:"drop",attrs:{id:"drop",width:"90vh",height:"90vh"}})],1)],1):n("v-content",[n("span",[e._v(e._s(e.sampleText))])])],1)],1)],1)};r._withStripped=!0;var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":"80%"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",{attrs:{"min-height":"90vh"}},[n("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[n("v-toolbar-title",[e._v("Tab settings")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[e._v("mdi-information")])],1)],1),e._v(" "),n("v-card-text",[e._v("\n            Some text\n        ")])],1)],1)};i._withStripped=!0;var s={props:{},data:function(){return{dialog:!1}},mounted:function(){},methods:{}},l=n(19),d=n(20),c=n.n(d),u=n(101),p=n(30),f=n(15),v=n(100),g=n(95),b=n(96),m=n(28),h=n(26),w=Object(l.a)(s,i,[],!1,null,null,null);c()(w,{VBtn:u.a,VCard:p.a,VCardText:f.a,VDialog:v.a,VIcon:g.a,VSpacer:b.a,VToolbar:m.a,VToolbarTitle:h.a}),w.options.__file="src/components/preferences.vue";var _=w.exports,D=n(99);n(63),n(70);o.a.use(D.a);var S=new o.a,k=new D.a({icons:{iconfont:"mdi"}});function T(e,t){requirejs(["DS/WAFData/WAFData"],(function(n){n.authenticatedRequest(e,t)}))}var V={name:"App",components:{preferences:_},data:function(){return{loadingbar:!0,sampleText:"",snackbarMsg:"",snackbar:!1,fileId:"",tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var e=this,t=this;t.loadingbar=!0,S.$on("reloadwidget",(function(){t.reload()})),void 0===widget.id?setTimeout((function(){t.tenantDataLoaded([{id:-1}])}),2e3):(this.projects={},requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:void 0,onComplete:e.tenantDataLoaded})})),requirejs(["DS/DataDragAndDrop/DataDragAndDrop"],(function(e){e.droppable(t.$refs.drop,{drop:function(e,n,a){t.objectDroped(e,n,a)}})})))},methods:{log:function(e){this.snackbarMsg=e,this.snackbar=!0},getCSRF:function(e,t){var n=this;T(n.tenants[n.tenantId]["3DSpace"]+"/resources/v1/application/CSRF",{onComplete:function(t){var n=JSON.parse(t);e(n.csrf.value)},onFailure:function(e){n.log(e),t()}})},reload:function(){var e=this;if(e.tenantId=widget.getValue("_CurrentTenantID_"),e.fileId=widget.getValue("_FileID_"),void 0!==widget.id){var t=e.tenants[e.tenantId]["3DSpace"];""!==e.fileId&&e.getCSRF((function(n){T(t+"/resources/v1/modeler/documents/".concat(e.fileId,"/files/DownloadTicket"),{method:"PUT",headers:{ENO_CSRF_TOKEN:n},onComplete:function(t){T(JSON.parse(t).data[0].dataelements.ticketURL,{onComplete:function(t){e.displayFileData(t),e.loadingbar=!1},onFailure:function(t){e.log(t),e.loadingbar=!1}})},onFailure:function(t){e.log(t),e.loadingbar=!1}})}),(function(){e.loadingbar=!1}))}else e.fileId="1",e.sampleText="test,t,pra",e.loadingbar=!1},objectDroped:function(e,t,n){var a=JSON.parse(e);console.log(e),console.log(a)},displayFileData:function(e){this.sampleText=e},tenantDataLoaded:function(e){this.tenants=[];for(var t=[],n=0,a=0;a<e.length;a++)void 0!==e[a]["3DSpace"]&&(t.push({value:"".concat(n++),label:"".concat(e[a].platformId," - ").concat(e[a].displayName)}),this.tenants.push(e[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:t}),widget.addPreference({name:"_FileID_",type:"text",label:"File Object ID",defaultValue:""}),S.$emit("reloadwidget")}}},x=(n(78),n(97)),C=n(102),I=n(31),y=n(29),F=n(98),j=Object(l.a)(V,r,[],!1,null,null,null);c()(j,{VApp:x.a,VBtn:u.a,VCard:p.a,VContent:C.a,VProgressLinear:I.a,VSlideXTransition:y.b,VSnackbar:F.a}),j.options.__file="src/components/app.vue";var O=j.exports,$=n(86);o.a.use($.a);var L=new $.a.Store({state:{},mutations:{},getters:{}});t.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new o.a({store:L,vuetify:k,render:function(e){return e(O)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){S.$emit("reloadwidget")}))}},78:function(e,t,n){"use strict";var a=n(17);n.n(a).a},79:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n#drop {\n    width: 20em;\n    height: 20em;\n\n    border-style: dashed;\n    border-color: lightgray;\n    border-width: 4px;\n    border-radius: 20%;\n\n    background-image: url(https://blenminer.github.io/widgets/LiveTables/assets/cloud.png);\n    background-size: 60%;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: #f7f7f7;\n\n    top: 50%;\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%);\n}\n",""])}}]);