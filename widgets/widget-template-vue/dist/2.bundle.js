(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{149:function(t,e,a){"use strict";var n=a(43);a.n(n).a},150:function(t,e,a){(t.exports=a(4)(!1)).push([t.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(8),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("preferences",{attrs:{tabsopts:t.tabsOpts,tabcount:t.tabCount}}),t._v(" "),a("v-content",[a("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:t.loadingbar}}),t._v(" "),a("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarMsg)+"\n            "),a("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                Close\n            ")])],1),t._v(" "),a("v-list-item",{staticStyle:{padding:"0"}},[a("projectGrid",{style:"background-color:white;height: 100vh;"+(null!==t.currentProject?"max-width: 360px;":"max-width:100%;"),attrs:{projects:t.projects,selection:t.currentProject}}),t._v(" "),a("v-expand-x-transition",[a("projectView",{directives:[{name:"show",rawName:"v-show",value:null!==t.currentProject,expression:"currentProject !== null"}],staticStyle:{"max-width":"100%"},attrs:{tabcount:t.tabCount,tabs:t.myTabs,url:t.tenants&&t.tenants[t.tenantId]?"https://"+t.tenants[t.tenantId].platformId+"-"+t.enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",objectid:t.objectid,project:t.currentProject}})],1)],1)],1)],1)};s._withStripped=!0;var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticStyle:{padding:"0"}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",[a("v-row",{staticClass:"white",attrs:{align:"start",justify:"start","no-gutters":""}},t._l(t.projects,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1 pa-1",attrs:{width:"350px",height:"100px",color:t.selection==e?"grey lighten-3":"white",hover:""},on:{click:function(a){return t.select(n,t.selection,e)}}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{tile:"",size:"auto"}},[a("v-img",{attrs:{src:e.icon}})],1),t._v(" "),a("v-list-item-content",[a("v-list-item-title",t._g({staticClass:"mb-2",attrs:{title:e.name}},t.on),[t._v(t._s(e.name))]),t._v(" "),a("v-list-item-subtitle",{attrs:{title:e.description}},[t._v(t._s(e.description))]),t._v(" "),a("v-list-item-subtitle",{attrs:{title:e.deadline}},[t._v("Date: "+t._s(e.deadline))]),t._v(" "),a("v-progress-linear",{attrs:{value:e.progress,title:e.progress}})],1)],1)],1)})),1)],1)],1)],1)};o._withStripped=!0;var i=a(179);a(67),a(74);r.a.use(i.a);var c=new r.a,l=new i.a({icons:{iconfont:"mdi"}}),d={props:{projects:Array,selection:Object},methods:{select:function(t,e,a){e!==a&&c.$emit("selection_project",t)}}},u=a(21),p=a(22),b=a.n(p),m=a(45),v=a(171),g=a(183),f=a(159),_=a(37),h=a(65),w=a(14),j=a(48),V=a(172),S=Object(u.a)(d,o,[],!1,null,null,null);b()(S,{VCard:m.a,VCol:v.a,VContainer:g.a,VImg:f.a,VListItem:_.a,VListItemAvatar:h.a,VListItemContent:w.a,VListItemSubtitle:w.b,VListItemTitle:w.c,VProgressLinear:j.a,VRow:V.a}),S.options.__file="src/components/project-grid.vue";var y=S.exports,T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{width:"100%",padding:"0",height:"100vh"},attrs:{flat:""}},[a("v-progress-linear",{attrs:{color:"cyan accent-4",indeterminate:"",height:"5",active:t.loadingbar}}),t._v(" "),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[a("v-icon",[t._v("mdi-forwardburger")])],1),t._v(" "),a("b",[t._v(t._s(t.project?t.project.name:"Loading..."))]),t._v(" "),a("v-btn",{staticStyle:{float:"right"},attrs:{text:""},on:{click:function(e){return t.settings()}}},[a("v-icon",[t._v("mdi-settings")])],1),t._v(" "),a("v-tabs",{attrs:{"background-color":"#005685",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab",{key:e},[t._v("\n            "+t._s(t.tabs[e-1]?t.tabs[e-1].name:"Loading ...")+"\n        ")])})),1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab-item",{key:e},[a("v-card",{attrs:{flat:""}},[null!==t.project?a("iframe",{ref:"iframes",refInFor:!0,staticStyle:{height:"calc(100vh - 90.51px)"},attrs:{src:t.tabs[e-1]?t.url+t.tabs[e-1].url.replace(/{id}/g,t.objectid):"about:blank",width:"100%"},on:{load:function(e){return t.doneLoading()}}}):t._e()])],1)})),1)],1)};T._withStripped=!0;var x={props:{project:Object,tabs:Array,url:String,objectid:String,tabcount:Number},data:function(){return{tab:null,loadingbar:!0}},mounted:function(){var t=this;c.$on("selection_project",(function(){t.loadingbar=!0}))},methods:{back:function(){c.$emit("removeProjectSelection")},doneLoading:function(){this.loadingbar=!1},settings:function(){c.$emit("editPrefs",this.tabcount)}}},k=a(66),P=a(52),C=a(173),I=a(184),$=a(181),N=a(160),U=Object(u.a)(x,T,[],!1,null,null,null);b()(U,{VBtn:k.a,VCard:m.a,VIcon:P.a,VProgressLinear:j.a,VTab:C.a,VTabItem:I.a,VTabs:$.a,VTabsItems:N.a}),U.options.__file="src/components/project-view.vue";var D=U.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{"max-width":"600px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[a("v-toolbar-title",[t._v("Tab settings")])],1),t._v(" "),a("v-card-text",[a("br"),t._v(" "),a("v-form",[t._l(t.tabcount,(function(e){return[a("center",{key:e},[a("b",[t._v("Tab "+t._s(e))])]),t._v(" "),a("v-text-field",{key:e+"_name",attrs:{label:"Tab "+e+": Name",name:"tabname"},model:{value:t.tabNames[e-1],callback:function(a){t.$set(t.tabNames,e-1,a)},expression:"tabNames[i - 1]"}}),t._v(" "),a("v-select",{key:e+"_url",attrs:{items:t.tabsopts,label:"Tab "+e+": Url/Type",name:"taburl"},model:{value:t.tabUrls[e-1],callback:function(a){t.$set(t.tabUrls,e-1,a)},expression:"tabUrls[i - 1]"}})]})),t._v(" "),a("v-spacer"),t._v(" "),a("v-btn",{staticClass:"ma-2",attrs:{color:"success",width:"90%"},on:{click:function(e){return t.savesettings(t.tabcount)}}},[t._v("\n                    Save Settings\n                ")])],2)],1)],1)],1)};L._withStripped=!0;var A={props:{tabsopts:Array,tabcount:Number},data:function(){return{dialog:!1,tabNames:[],tabUrls:[]}},mounted:function(){var t=this;c.$on("editPrefs",(function(e){t.dialog=!0;for(var a=0;a<e;a++)t.tabNames[a]=widget.getValue("_Tab".concat(a,"_Name_"))||"New tab "+(a+1),t.tabUrls[a]=widget.getValue("_Tab".concat(a,"_Url_"))||"Schedule Status"}))},methods:{savesettings:function(t){if(widget.id)for(var e=0;e<t;e++)widget.addPreference({name:"_Tab".concat(e,"_Name_"),type:"hidden",defaultValue:"New tab "+(e+1)}),widget.addPreference({name:"_Tab".concat(e,"_Url_"),type:"hidden",defaultValue:"Schedule Status"}),widget.setValue("_Tab".concat(e,"_Name_"),this.tabNames[e]),widget.setValue("_Tab".concat(e,"_Url_"),this.tabUrls[e]);this.dialog=!1,c.$emit("myTabsUpdated")}}},E=a(28),O=a(182),B=a(174),R=a(180),F=a(175),G=a(158),M=a(63),q=a(64),J=Object(u.a)(A,L,[],!1,null,null,null);b()(J,{VBtn:k.a,VCard:m.a,VCardText:E.a,VDialog:O.a,VForm:B.a,VSelect:R.a,VSpacer:F.a,VTextField:G.a,VToolbar:M.a,VToolbarTitle:q.a}),J.options.__file="src/components/preferences.vue";var W={name:"App",components:{projectGrid:y,projectView:D,preferences:J.exports},data:function(){return{snackbar:!1,snackbarMsg:"Bro",tenants:[],tenantId:0,loadingbar:!0,objectid:"",currentProject:null,tabCount:4,enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",projects:[{id:"C745A4D6DB8A000080B84F5E43A50500",name:"Project Purple Planet",description:"efe",deadline:"20/09/1997",icon:"https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",progress:"50.2",state:"Active"},{id:"pfft",name:"Project Red Planet",description:"fef",deadline:"20/09/1997",icon:"https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",progress:"10",state:"Create"}],tabs:[{name:"Schedule Status",url:"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId={id}"},{name:"Bussiness Status",url:"/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId={id}"},{name:"Gantt",url:"/webapps/ENOGantt/gantt-widget.html?objectId={id}"},{name:"Phase View",url:"/common/emxIndentedTable.jsp?table=PMCPhaseGateView&objectId={id}"}],tabsOpts:[],myTabs:[]}},computed:{message:function(){return this.$store.state.message}},watch:{},mounted:function(){for(var t=this,e=this,a=0;a<this.tabs.length;a++)this.tabsOpts[a]=this.tabs[a].name;this.toast("Aloha from VBU4"),c.$on("toast",(function(t){e.toast(t)})),c.$on("selection_project",(function(t){e.objectid=e.projects[t].id,e.currentProject=e.projects[t]})),c.$on("removeProjectSelection",(function(t){e.currentProject=null,e.objectid=""})),c.$on("myTabsUpdated",(function(t){e.myTabs=[];for(var a=0;a<e.tabCount;a++){for(var n=widget.getValue("_Tab".concat(a,"_Url_")),r=e.tabs[0].url,s=0;s<e.tabs.length;s++)if(n===e.tabs[s].name){r=e.tabs[s].url;break}e.myTabs[a]={name:widget.getValue("_Tab".concat(a,"_Name_")),url:r}}e.$forceUpdate()})),c.$on("reloadwidget",(function(t){e.tenantId=widget.getValue("_CurrentTenantID_"),e.enoviaUrl=widget.getValue("_Enovia_"),e.tabCount=parseInt(widget.getValue("_TabCount_"),10),c.$emit("myTabsUpdated"),e.retrieveAllProjects()})),void 0===widget.id?(setTimeout((function(){e.tenantDataLoaded([{id:-1}])}),2e3),this.myTabs=this.tabs):(this.projects=[],requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})})))},methods:{toast:function(t){this.snackbarMsg=t,this.snackbar=!0},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_Enovia_",type:"text",label:"Enovia URL",defaultValue:"eu1-space.3dexperience.3ds.com/enovia"}),widget.addPreference({name:"_TabCount_",type:"range",label:"Tab Count",defaultValue:"2",step:"1",min:"1",max:"10"});for(var r=0;r<10;r++)widget.addPreference({name:"_Tab".concat(r,"_Name_"),type:"hidden",defaultValue:"New tab "+(r+1)}),widget.addPreference({name:"_Tab".concat(r,"_Url_"),type:"hidden",defaultValue:"Schedule Status"});void 0!==widget.id?c.$emit("reloadwidget"):this.loadingbar=!1},retrieveAllProjects:function(){var t=this,e=this;this.loadingbar=!0;var a,n,r=this.tenants[this.tenantId]["3DSpace"];a=r+"/resources/v1/modeler/projects",n={onComplete:function(a){var n=JSON.parse(a);e.projects=[],console.log(n),console.log(n.data);for(var r=0;r<n.data.length;r++){var s=n.data[r];e.projects.push({id:s.id,name:s.dataelements.name,description:s.dataelements.description,deadline:s.dataelements.estimatedFinishDate,icon:s.dataelements.typeicon,progress:s.dataelements.percentComplete,state:s.dataelements.state})}t.loadingbar=!1},onFailure:function(){t.loadingbar=!1}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,n)}))}}},X=(a(149),a(176)),z=a(177),H=a(19),K=a(178),Q=Object(u.a)(W,s,[],!1,null,null,null);b()(Q,{VApp:X.a,VBtn:k.a,VContent:z.a,VExpandXTransition:H.b,VListItem:_.a,VProgressLinear:j.a,VSnackbar:K.a}),Q.options.__file="src/components/app.vue";var Y=Q.exports,Z=a(157);r.a.use(Z.a);var tt=new Z.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new r.a({store:tt,vuetify:l,render:function(t){return t(Y)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){c.$emit("reloadwidget")}))}},43:function(t,e,a){var n=a(150);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};a(32)(n,r);n.locals&&(t.exports=n.locals)}}]);