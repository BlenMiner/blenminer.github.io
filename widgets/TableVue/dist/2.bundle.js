(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{3:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(7),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-content",[n("preferences"),e._v(" "),n("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:e.loadingbar,absolute:"",app:""}}),e._v(" "),n("v-snackbar",{model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n            "+e._s(e.snackbarMsg)+"\n            "),n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("\n                Close\n            ")])],1),e._v(" "),n("v-slide-x-transition",[""===e.fileId?n("center",[n("v-content",{staticStyle:{height:"100vh",width:"100%"}},[n("div",{ref:"drop",attrs:{id:"drop",width:"90vh",height:"90vh"}})])],1):n("v-content",[n("v-card",{attrs:{height:"100vh"}},[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.items,height:"calc(100vh - 60px)"}},[e._v("\n                        t\n                    ")])],1)],1)],1)],1)],1)};r._withStripped=!0;var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":"80%"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",{attrs:{"min-height":"90vh"}},[n("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[n("v-toolbar-title",[e._v("Tab settings")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[e._v("mdi-information")])],1)],1),e._v(" "),n("v-card-text",[e._v("\n            Some text\n        ")])],1)],1)};i._withStripped=!0;var s={props:{},data:function(){return{dialog:!1}},mounted:function(){},methods:{}},l=n(31),d=n(32),c=n.n(d),u=n(52),p=n(34),f=n(27),v=n(161),g=n(47),h=n(156),b=n(51),m=n(48),w=Object(l.a)(s,i,[],!1,null,null,null);c()(w,{VBtn:u.a,VCard:p.a,VCardText:f.a,VDialog:v.a,VIcon:g.a,VSpacer:h.a,VToolbar:b.a,VToolbarTitle:m.a}),w.options.__file="src/components/preferences.vue";var _=w.exports,D=n(160);n(82),n(89);o.a.use(D.a);var S=new o.a,k=new D.a({icons:{iconfont:"mdi"}});function I(e,t){requirejs(["DS/WAFData/WAFData"],(function(n){n.authenticatedRequest(e,t)}))}var V={name:"App",components:{preferences:_},data:function(){return{loadingbar:!0,sampleText:"",snackbarMsg:"",snackbar:!1,fileId:"",tenantId:-1,tenants:[],headers:[],items:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var e=this,t=this;t.loadingbar=!0,S.$on("reloadwidget",(function(){t.reload()})),void 0===widget.id?setTimeout((function(){t.tenantDataLoaded([{id:-1}])}),2e3):(this.projects={},requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:void 0,onComplete:e.tenantDataLoaded})})),t.$refs.drop&&requirejs(["DS/DataDragAndDrop/DataDragAndDrop"],(function(e){e.droppable(t.$refs.drop,{drop:function(e,n,a){t.objectDroped(e,n,a)}})})))},methods:{log:function(e){this.snackbarMsg=e,this.snackbar=!0},getCSRF:function(e,t){var n=this;I(n.tenants[n.tenantId]["3DSpace"]+"/resources/v1/application/CSRF",{onComplete:function(t){var n=JSON.parse(t);e(n.csrf.value)},onFailure:function(e){n.log(e),t()}})},reload:function(){var e=this;if(e.loadingbar=!0,e.tenantId=widget.getValue("_CurrentTenantID_"),e.fileId=widget.getValue("_FileID_"),void 0!==widget.id){var t=e.tenants[e.tenantId]["3DSpace"];""!==e.fileId?e.getCSRF((function(n){I(t+"/resources/v1/modeler/documents/".concat(e.fileId,"/files/DownloadTicket"),{method:"PUT",headers:{ENO_CSRF_TOKEN:n},onComplete:function(t){I(JSON.parse(t).data[0].dataelements.ticketURL,{onComplete:function(t){e.displayFileData(t),e.loadingbar=!1},onFailure:function(t){e.log(t),e.loadingbar=!1}})},onFailure:function(t){e.log(t),e.loadingbar=!1}})}),(function(){e.loadingbar=!1})):e.loadingbar=!1}else e.fileId="1",e.displayFileData("test,test1,test2\n1,2,3\n4,5,6"),e.loadingbar=!1},objectDroped:function(e,t,n){var a=JSON.parse(e);"3DXContent"===a.protocol&&(this.fileId=a.data.items[0].objectId,widget.setValue("_FileID_",this.fileId))},displayFileData:function(e){var t=function(e,t){t=t||",";for(var n=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),a=[[]],o=null,r=null;o=n.exec(e);){var i=o[1];i.length&&i!==t&&a.push([]),r=o[2]?o[2].replace(new RegExp('""',"g"),'"'):o[3],a[a.length-1].push(r)}return a}(e,",");if(this.headers=[],0!==t.length){for(var n=0;n<t[0].length;n++){var a=t[0][n];this.headers.push({text:a,value:"col_".concat(n,'"')})}for(var o=1;o<t.length;o++){for(var r={},i=0;i<t[o].length;i++){var s=t[o][i];r["col_".concat(i,'"')]=s}this.items.push(r)}}},tenantDataLoaded:function(e){this.tenants=[];for(var t=[],n=0,a=0;a<e.length;a++)void 0!==e[a]["3DSpace"]&&(t.push({value:"".concat(n++),label:"".concat(e[a].platformId," - ").concat(e[a].displayName)}),this.tenants.push(e[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:t}),widget.addPreference({name:"_FileID_",type:"text",label:"File Object ID",defaultValue:""}),S.$emit("reloadwidget")}}},x=(n(97),n(157)),C=n(162),T=n(159),F=n(37),y=n(20),j=n(158),R=Object(l.a)(V,r,[],!1,null,null,null);c()(R,{VApp:x.a,VBtn:u.a,VCard:p.a,VContent:C.a,VDataTable:T.a,VProgressLinear:F.a,VSlideXTransition:y.d,VSnackbar:j.a}),R.options.__file="src/components/app.vue";var $=R.exports,E=n(146);o.a.use(E.a);var O=new E.a.Store({state:{},mutations:{},getters:{}});t.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new o.a({store:O,vuetify:k,render:function(e){return e($)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){S.$emit("reloadwidget")}))}},30:function(e,t,n){var a=n(98);"string"==typeof a&&(a=[[e.i,a,""]]);var o={insert:"head",singleton:!1};n(29)(a,o);a.locals&&(e.exports=a.locals)},97:function(e,t,n){"use strict";var a=n(30);n.n(a).a},98:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n#drop {\n    width: 90vh;\n    height: 90vh;\n\n    border-style: dashed;\n    border-color: lightgray;\n    border-width: 4px;\n    border-radius: 20%;\n\n    background-image: url(https://blenminer.github.io/widgets/LiveTables/assets/cloud.png);\n    background-size: 60%;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: #f7f7f7;\n\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -ms-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n}\n",""])}}]);