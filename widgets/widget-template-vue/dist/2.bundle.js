(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{106:function(t,e,a){"use strict";var n=a(35);a.n(n).a},107:function(t,e,a){(t.exports=a(4)(!1)).push([t.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#eeeeee;\n}\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(5),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:t.loadingbar}}),t._v(" "),a("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarMsg)+"\n            "),a("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                Close\n            ")])],1),t._v(" "),a("v-list-item",{staticStyle:{padding:"0"}},[a("projectGrid",{style:"background-color:#eeeeee;height: 100vh;"+(null!==t.currentProject?"max-width: 360px;":"max-width:100%;"),attrs:{projects:t.projects,selection:t.currentProject}}),t._v(" "),[a("projectView",{staticStyle:{"max-width":"100%"},attrs:{items:t.tabs,url:t.tenants&&t.tenants[t.tenantId]?"https://"+t.tenants[t.tenantId].platformId+"-"+t.enoviaUrl:"about:blank",objectid:t.objectid,project:t.currentProject}})]],2)],1)],1)};i._withStripped=!0;var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticStyle:{padding:"0"}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",[a("v-row",{staticClass:"grey lighten-3",attrs:{align:"start",justify:"start","no-gutters":""}},t._l(t.projects,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1 pa-1",style:t.selection==e?"background-color:lightgray;":"",attrs:{outlined:"",tile:"","max-width":"350px",height:"100px",hover:""},on:{click:function(e){return t.select(n)}}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{tile:"",size:"60"}},[a("v-img",{staticClass:"white--text align-end",attrs:{src:"https://blenminer.github.io/widgets/widget-template-vue/dist/static/images/project.png"}})],1),t._v(" "),a("v-list-item-content",[a("v-list-item-title",{staticClass:"mb-2"},[t._v(t._s(e.name))]),t._v(" "),a("v-list-item-subtitle",[t._v(t._s(e.description))]),t._v(" "),a("v-list-item-subtitle",[t._v("Date: "+t._s(e.deadline))])],1)],1)],1)})),1)],1)],1)],1)};o._withStripped=!0;var s=a(128);a(49),a(56);r.a.use(s.a);var c=new r.a,l=new s.a({icons:{iconfont:"mdi"}}),d={props:{projects:Array,selection:Object},methods:{select:function(t){c.$emit("selection_project",t)}}},u=a(22),p=a(23),v=a.n(p),m=a(131),g=a(122),b=a(132),f=a(130),h=a(32),_=a(46),j=a(12),w=a(123),V=Object(u.a)(d,o,[],!1,null,null,null);v()(V,{VCard:m.a,VCol:g.a,VContainer:b.a,VImg:f.a,VListItem:h.a,VListItemAvatar:_.a,VListItemContent:j.a,VListItemSubtitle:j.b,VListItemTitle:j.c,VRow:w.a}),V.options.__file="src/components/project-grid.vue";var S=V.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-expand-x-transition",[null!==t.project?a("v-card",{staticStyle:{width:"100%",padding:"0",height:"100vh"},attrs:{flat:""}},[a("v-progress-linear",{attrs:{color:"cyan accent-4",indeterminate:"",height:"5",active:t.loadingbar}}),t._v(" "),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[a("v-icon",[t._v("mdi-forwardburger")])],1),t._v(" "),a("b",[t._v(t._s(t.project.name))]),t._v(" "),a("v-tabs",{attrs:{"background-color":"#005685",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.items,(function(e,n){return a("v-tab",{key:n},[t._v("\n                "+t._s(e.name)+"\n            ")])})),1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.items,(function(e,n){return a("v-tab-item",{key:n},[a("v-card",{attrs:{flat:""}},[a("iframe",{staticStyle:{height:"calc(100vh - 90.51px)"},attrs:{src:t.url+e.url+t.objectid,width:"100%"},on:{load:function(e){return t.doneLoading()}}})])],1)})),1)],1):t._e()],1)};k._withStripped=!0;var x={props:{project:Object,items:Array,url:String,objectid:String},data:function(){return{tab:null,loadingbar:!0}},mounted:function(){var t=this;c.$on("selection_project",(function(){t.loadingbar=!0}))},methods:{back:function(){c.$emit("removeProjectSelection")},doneLoading:function(){this.loadingbar=!1}}},P=a(47),y=a(19),C=a(43),I=a(39),T=a(124),D=a(133),L=a(129),A=a(115),$=Object(u.a)(x,k,[],!1,null,null,null);v()($,{VBtn:P.a,VCard:m.a,VExpandXTransition:y.b,VIcon:C.a,VProgressLinear:I.a,VTab:T.a,VTabItem:D.a,VTabs:L.a,VTabsItems:A.a}),$.options.__file="src/components/project-view.vue";var E={name:"App",components:{projectGrid:S,projectView:$.exports},data:function(){return{snackbar:!1,snackbarMsg:"Bro",tenants:[],tenantId:0,loadingbar:!0,objectid:"",currentProject:null,enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",projects:[{id:"C745A4D6DB8A000080B84F5E43A50500",name:"Project Purple Planet",description:"efe",deadline:"20/09/1997"},{id:"pfft",name:"Project Red Planet",description:"fef",deadline:"20/09/1997"}],tabs:[{name:"Schedule Status",url:"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId="},{name:"Bussiness Status",url:"/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId="}]}},computed:{message:function(){return this.$store.state.message}},watch:{},mounted:function(){var t=this,e=this;c.$on("toast",(function(t){e.toast(t)})),c.$on("selection_project",(function(t){e.objectid=e.projects[t].id,e.currentProject=e.projects[t]})),c.$on("removeProjectSelection",(function(t){e.currentProject=null,e.objectid=""})),c.$on("reloadwidget",(function(a){t.tenantId=widget.getValue("_CurrentTenantID_"),t.enoviaUrl=widget.getValue("_Enovia_"),e.retrieveAllProjects()})),void 0===widget.id?setTimeout((function(){e.tenantDataLoaded([{id:-1}])}),2e3):(this.projects=[],requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})})))},methods:{toast:function(t){this.snackbarMsg=t,this.snackbar=!0},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_Enovia_",type:"text",label:"Enovia URL",defaultValue:"eu1-space.3dexperience.3ds.com/enovia"}),widget.addPreference({name:"_TabCount_",type:"range",label:"Tab Count",defaultValue:"2",step:"1",min:"1",max:"10",onchange:function(){console.log("here");for(var t=parseInt(widget.getValue("_TabCount_")),e=0;e<t;e++)widget.addPreference({name:"_Tab".concat(e,"_Name_"),type:"text",label:"Tab".concat(e," Name"),defaultValue:"Business Status"}),widget.addPreference({name:"_Tab".concat(e,"_Url_"),type:"text",label:"Tab".concat(e," Url"),defaultValue:"/programcentral/ProgramCentralBusinessStatusReport.jsp"})}}),this.tenantId=widget.getValue("_CurrentTenantID_"),this.enoviaUrl=widget.getValue("_Enovia_"),void 0!==widget.id?this.retrieveAllProjects():this.loadingbar=!1},retrieveAllProjects:function(){var t=this,e=this;this.loadingbar=!0;var a,n,r=this.tenants[this.tenantId]["3DSpace"];a=r+"/resources/v1/modeler/projects",n={onComplete:function(a){var n=JSON.parse(a);e.projects=[];for(var r=0;r<n.data.length;r++){var i=n.data[r];e.projects.push({id:i.id,name:i.dataelements.name,description:i.dataelements.description,deadline:i.dataelements.estimatedFinishDate})}t.loadingbar=!1},onFailure:function(){t.loadingbar=!1}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,n)}))}}},B=(a(106),a(125)),R=a(126),U=a(127),O=Object(u.a)(E,i,[],!1,null,null,null);v()(O,{VApp:B.a,VBtn:P.a,VContent:R.a,VListItem:h.a,VProgressLinear:I.a,VSnackbar:U.a}),O.options.__file="src/components/app.vue";var F=O.exports,M=a(114);r.a.use(M.a);var N=new M.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new r.a({store:N,vuetify:l,render:function(t){return t(F)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){c.$emit("reloadwidget")}))}},35:function(t,e,a){var n=a(107);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};a(21)(n,r);n.locals&&(t.exports=n.locals)}}]);