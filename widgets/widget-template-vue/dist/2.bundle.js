(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(t,e,n){"use strict";var a=n(35);n.n(a).a},107:function(t,e,n){(t.exports=n(4)(!1)).push([t.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#eeeeee;\n}\n",""])},3:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n(5),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:t.loadingbar}}),t._v(" "),n("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarMsg)+"\n            "),n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                Close\n            ")])],1),t._v(" "),n("v-list-item",{staticStyle:{padding:"0"}},[n("projectGrid",{style:"background-color:#eeeeee;height: 100vh;"+(null!==t.currentProject?"max-width: 360px;":"max-width:100%;"),attrs:{projects:t.projects,selection:t.currentProject}}),t._v(" "),[n("projectView",{staticStyle:{"max-width":"100%"},attrs:{items:t.tabs,url:t.enoviaUrl,objectid:t.objectid,project:t.currentProject}})]],2)],1)],1)};r._withStripped=!0;var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticStyle:{padding:"0"}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",[n("v-row",{staticClass:"grey lighten-3",attrs:{align:"start",justify:"start","no-gutters":""}},t._l(t.projects,(function(e,a){return n("v-card",{key:a,staticClass:"ma-1 pa-1",style:t.selection==e?"background-color:lightgray;":"",attrs:{outlined:"",tile:"","max-width":"350px",height:"100px",hover:""},on:{click:function(e){return t.select(a)}}},[n("v-list-item",[n("v-list-item-avatar",{attrs:{tile:"",size:"60"}},[n("v-img",{staticClass:"white--text align-end",attrs:{src:"https://blenminer.github.io/widgets/widget-template-vue/dist/static/images/project.png"}})],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"mb-2"},[t._v(t._s(e.name))]),t._v(" "),n("v-list-item-subtitle",[t._v("Owner: "+t._s(e.description))]),t._v(" "),n("v-list-item-subtitle",[t._v("Date: "+t._s(e.deadline))])],1)],1)],1)})),1)],1)],1)],1)};o._withStripped=!0;var s=n(128);n(49),n(56);i.a.use(s.a);var c=new i.a,l=new s.a({icons:{iconfont:"mdi"}}),d={props:{projects:Array,selection:Object},methods:{select:function(t){c.$emit("selection_project",t)}}},u=n(22),p=n(23),v=n.n(p),m=n(131),b=n(122),g=n(132),f=n(130),h=n(32),j=n(46),_=n(12),w=n(123),V=Object(u.a)(d,o,[],!1,null,null,null);v()(V,{VCard:m.a,VCol:b.a,VContainer:g.a,VImg:f.a,VListItem:h.a,VListItemAvatar:j.a,VListItemContent:_.a,VListItemSubtitle:_.b,VListItemTitle:_.c,VRow:w.a}),V.options.__file="src/components/project-grid.vue";var S=V.exports,k=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-expand-x-transition",[null!==t.project?n("v-card",{staticStyle:{width:"100%",padding:"0",height:"100vh"},attrs:{flat:""}},[n("v-progress-linear",{attrs:{color:"cyan accent-4",indeterminate:"",height:"5",active:t.loadingbar}}),t._v(" "),n("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[n("v-icon",[t._v("mdi-forwardburger")])],1),t._v(" "),n("b",[t._v(t._s(t.project.name))]),t._v(" "),n("v-tabs",{attrs:{"background-color":"#005685",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.items,(function(e,a){return n("v-tab",{key:a},[t._v("\n                "+t._s(e.name)+"\n            ")])})),1),t._v(" "),n("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.items,(function(e,a){return n("v-tab-item",{key:a},[n("v-card",{attrs:{flat:""}},[n("iframe",{staticStyle:{height:"calc(100vh - 90.51px)"},attrs:{src:t.url+e.url+t.objectid,width:"100%"},on:{load:function(e){return t.doneLoading()}}})])],1)})),1)],1):t._e()],1)};k._withStripped=!0;var x={props:{project:Object,items:Array,url:String,objectid:String},data:function(){return{tab:null,loadingbar:!0}},mounted:function(){var t=this;c.$on("selection_project",(function(){t.loadingbar=!0}))},methods:{back:function(){c.$emit("removeProjectSelection")},doneLoading:function(){this.loadingbar=!1}}},y=n(47),P=n(19),C=n(43),I=n(39),D=n(124),L=n(133),$=n(129),A=n(115),E=Object(u.a)(x,k,[],!1,null,null,null);v()(E,{VBtn:y.a,VCard:m.a,VExpandXTransition:P.b,VIcon:C.a,VProgressLinear:I.a,VTab:D.a,VTabItem:L.a,VTabs:$.a,VTabsItems:A.a}),E.options.__file="src/components/project-view.vue";var T={name:"App",components:{projectGrid:S,projectView:E.exports},data:function(){return{snackbar:!1,snackbarMsg:"Bro",tenants:[],tenantId:0,loadingbar:!0,objectid:"",currentProject:null,enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",projects:[{id:"C745A4D6DB8A000080B84F5E43A50500",name:"Project Purple Planet",description:"efe",deadline:"20/09/1997"},{id:"pfft",name:"Project Red Planet",description:"fef",deadline:"20/09/1997"}],tabs:[{name:"Schedule Status",url:"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId="},{name:"Bussiness Status",url:"/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId="}]}},computed:{message:function(){return this.$store.state.message}},watch:{},mounted:function(){var t=this,e=this;c.$on("toast",(function(t){e.toast(t)})),c.$on("selection_project",(function(t){e.objectid=e.projects[t].id,e.currentProject=e.projects[t]})),c.$on("removeProjectSelection",(function(t){e.currentProject=null,e.objectid=""})),c.$on("reloadwidget",(function(t){e.retrieveAllProjects()})),void 0===widget.id?setTimeout((function(){e.tenantDataLoaded([{id:-1}])}),2e3):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{toast:function(t){this.snackbarMsg=t,this.snackbar=!0},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],n=0,a=0;a<t.length;a++)void 0!==t[a]["3DSpace"]&&(e.push({value:"".concat(n++),label:"".concat(t[a].platformId," - ").concat(t[a].displayName)}),this.tenants.push(t[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_Enovia_",type:"text",label:"Enovia URL",defaultValue:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia"}),this.tenantId=widget.getValue("_CurrentTenantID_"),this.enoviaUrl=widget.getValue("_Enovia_"),c.$emit("toast","Hello world!"),void 0!==widget.id?this.retrieveAllProjects():this.loadingbar=!1},retrieveAllProjects:function(){var t=this,e=this;this.projects=[];var n,a,i=this.tenants[this.tenantId]["3DSpace"];n=i+"/resources/v1/modeler/projects",a={onComplete:function(n){for(var a=JSON.parse(n),i=0;i<a.data.length;i++){var r=a.data[i];e.projects.push({id:r.id,name:r.dataelements.name,description:r.dataelements.description,deadline:r.dataelements.estimatedFinishDate})}t.loadingbar=!1},onFailure:function(){t.loadingbar=!1}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(n,a)}))}}},B=(n(106),n(125)),O=n(126),R=n(127),F=Object(u.a)(T,r,[],!1,null,null,null);v()(F,{VApp:B.a,VBtn:y.a,VContent:O.a,VListItem:h.a,VProgressLinear:I.a,VSnackbar:R.a}),F.options.__file="src/components/app.vue";var M=F.exports,U=n(114);i.a.use(U.a);var q=new U.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new i.a({store:q,vuetify:l,render:function(t){return t(M)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){c.$emit("reloadwidget")}))}},35:function(t,e,n){var a=n(107);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};n(21)(a,i);a.locals&&(t.exports=a.locals)}}]);