(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{149:function(t,e,a){"use strict";var n=a(43);a.n(n).a},150:function(t,e,a){(t.exports=a(4)(!1)).push([t.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#eeeeee;\n}\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(8),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("preferences",{attrs:{tabs:t.tabs,tabsopts:t.tabsOpts,tabcount:t.tabCount}}),t._v(" "),a("v-content",[a("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:t.loadingbar}}),t._v(" "),a("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarMsg)+"\n            "),a("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                Close\n            ")])],1),t._v(" "),a("v-list-item",{staticStyle:{padding:"0"}},[a("projectGrid",{style:"background-color:#eeeeee;height: 100vh;"+(null!==t.currentProject?"max-width: 360px;":"max-width:100%;"),attrs:{projects:t.projects,selection:t.currentProject}}),t._v(" "),[a("projectView",{staticStyle:{"max-width":"100%"},attrs:{tabcount:t.tabCount,tabs:t.myTabs,url:t.tenants&&t.tenants[t.tenantId]?"https://"+t.tenants[t.tenantId].platformId+"-"+t.enoviaUrl:"about:blank",objectid:t.objectid,project:t.currentProject}})]],2)],1)],1)};i._withStripped=!0;var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticStyle:{padding:"0"}},[a("v-row",{attrs:{"no-gutters":""}},[a("v-col",[a("v-row",{staticClass:"grey lighten-3",attrs:{align:"start",justify:"start","no-gutters":""}},t._l(t.projects,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1 pa-1",style:t.selection==e?"background-color:lightgray;":"",attrs:{outlined:"",tile:"","max-width":"350px",height:"100px",hover:""},on:{click:function(e){return t.select(n)}}},[a("v-list-item",[a("v-list-item-avatar",{attrs:{tile:"",size:"60"}},[a("v-img",{staticClass:"white--text align-end",attrs:{src:"https://blenminer.github.io/widgets/widget-template-vue/dist/static/images/project.png"}})],1),t._v(" "),a("v-list-item-content",[a("v-list-item-title",{staticClass:"mb-2"},[t._v(t._s(e.name))]),t._v(" "),a("v-list-item-subtitle",[t._v(t._s(e.description))]),t._v(" "),a("v-list-item-subtitle",[t._v("Date: "+t._s(e.deadline))])],1)],1)],1)})),1)],1)],1)],1)};o._withStripped=!0;var s=a(179);a(67),a(74);r.a.use(s.a);var c=new r.a,l=new s.a({icons:{iconfont:"mdi"}}),d={props:{projects:Array,selection:Object},methods:{select:function(t){c.$emit("selection_project",t)}}},u=a(20),b=a(21),p=a.n(b),v=a(45),m=a(171),g=a(183),f=a(159),_=a(37),h=a(65),w=a(14),j=a(172),V=Object(u.a)(d,o,[],!1,null,null,null);p()(V,{VCard:v.a,VCol:m.a,VContainer:g.a,VImg:f.a,VListItem:_.a,VListItemAvatar:h.a,VListItemContent:w.a,VListItemSubtitle:w.b,VListItemTitle:w.c,VRow:j.a}),V.options.__file="src/components/project-grid.vue";var y=V.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return null!==t.project?a("v-card",{staticStyle:{width:"100%",padding:"0",height:"100vh"},attrs:{flat:""}},[a("v-progress-linear",{attrs:{color:"cyan accent-4",indeterminate:"",height:"5",active:t.loadingbar}}),t._v(" "),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[a("v-icon",[t._v("mdi-forwardburger")])],1),t._v(" "),a("b",[t._v(t._s(t.project.name))]),t._v(" "),a("v-btn",{staticStyle:{float:"right"},attrs:{text:""},on:{click:function(e){return t.settings()}}},[a("v-icon",[t._v("mdi-settings")])],1),t._v(" "),a("v-tabs",{attrs:{"background-color":"#005685",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab",{key:e},[t._v("\n            "+t._s(t.tabs[e-1]?t.tabs[e-1].name:"Loading ...")+"\n        ")])})),1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab-item",{key:e},[a("v-card",{attrs:{flat:""}},[a("iframe",{staticStyle:{height:"calc(100vh - 90.51px)"},attrs:{src:t.tabs[e-1]?t.url+t.tabs[e-1].url+t.objectid:"about:blank",width:"100%"},on:{load:function(e){return t.doneLoading()}}})])],1)})),1)],1):t._e()};S._withStripped=!0;var T={props:{project:Object,tabs:Array,url:String,objectid:String,tabcount:Number},data:function(){return{tab:null,loadingbar:!0}},mounted:function(){var t=this;c.$on("selection_project",(function(){t.loadingbar=!0}))},methods:{back:function(){c.$emit("removeProjectSelection")},doneLoading:function(){this.loadingbar=!1},settings:function(){c.$emit("editPrefs")}}},k=a(66),C=a(52),x=a(48),P=a(173),I=a(184),$=a(181),U=a(160),N=Object(u.a)(T,S,[],!1,null,null,null);p()(N,{VBtn:k.a,VCard:v.a,VIcon:C.a,VProgressLinear:x.a,VTab:P.a,VTabItem:I.a,VTabs:$.a,VTabsItems:U.a}),N.options.__file="src/components/project-view.vue";var D=N.exports,L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{"max-width":"600px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[a("v-toolbar-title",[t._v("Tab settings")])],1),t._v(" "),a("v-card-text",[a("br"),t._v(" "),a("v-form",[t._l(t.tabcount,(function(e){return[a("center",{key:e},[a("b",[t._v("Tab "+t._s(e))])]),t._v(" "),a("v-text-field",{key:e+"_name",attrs:{label:"Tab "+e+": Name",name:"tabname"},model:{value:t.tabNames[e-1],callback:function(a){t.$set(t.tabNames,e-1,a)},expression:"tabNames[i - 1]"}}),t._v(" "),a("v-select",{key:e+"_url",attrs:{items:t.tabsopts,label:"Tab "+e+": Url/Type",name:"taburl"},model:{value:t.tabUrls[e-1],callback:function(a){t.$set(t.tabUrls,e-1,a)},expression:"tabUrls[i - 1]"}})]})),t._v(" "),a("v-spacer"),t._v(" "),a("v-btn",{staticClass:"ma-2",attrs:{color:"success",width:"90%"},on:{click:function(e){return t.savesettings()}}},[t._v("\n                    Save Settings\n                ")])],2)],1)],1)],1)};L._withStripped=!0;var A={props:{tabsopts:Array,tabs:Array,tabcount:Number},data:function(){return{dialog:!1,tabNames:[],tabUrls:[],tablength:this.tabcount}},mounted:function(){var t=this;c.$on("editPrefs",(function(){t.dialog=!0;for(var e=0;e<t.tablength;e++)t.tabNames[e]=widget.getValue("_Tab".concat(e,"_Name_"))||"New tab "+(e+1),t.tabUrls[e]=widget.getValue("_Tab".concat(e,"_Url_"))||"Schedule Status"}))},methods:{savesettings:function(){if(widget.id)for(var t=0;t<this.tablength;t++)widget.addPreference({name:"_Tab".concat(t,"_Name_"),type:"hidden",defaultValue:"New tab "+(t+1)}),widget.addPreference({name:"_Tab".concat(t,"_Url_"),type:"hidden",defaultValue:"Schedule Status"}),widget.setValue("_Tab".concat(t,"_Name_"),this.tabNames[t]),widget.setValue("_Tab".concat(t,"_Url_"),this.tabUrls[t]);this.dialog=!1,c.$emit("myTabsUpdated")}}},E=a(26),O=a(182),B=a(174),F=a(180),R=a(175),G=a(158),M=a(63),q=a(64),J=Object(u.a)(A,L,[],!1,null,null,null);p()(J,{VBtn:k.a,VCard:v.a,VCardText:E.a,VDialog:O.a,VForm:B.a,VSelect:F.a,VSpacer:R.a,VTextField:G.a,VToolbar:M.a,VToolbarTitle:q.a}),J.options.__file="src/components/preferences.vue";var W={name:"App",components:{projectGrid:y,projectView:D,preferences:J.exports},data:function(){return{snackbar:!1,snackbarMsg:"Bro",tenants:[],tenantId:0,loadingbar:!0,objectid:"",currentProject:null,tabCount:3,enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",projects:[{id:"C745A4D6DB8A000080B84F5E43A50500",name:"Project Purple Planet",description:"efe",deadline:"20/09/1997"},{id:"pfft",name:"Project Red Planet",description:"fef",deadline:"20/09/1997"}],tabs:[{name:"Schedule Status",url:"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId="},{name:"Bussiness Status",url:"/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId="},{name:"Gantt",url:"/webapps/ENOGantt/gantt-widget.html?objectId="}],tabsOpts:[],myTabs:[]}},computed:{message:function(){return this.$store.state.message}},watch:{},mounted:function(){for(var t=this,e=this,a=0;a<this.tabs.length;a++)this.tabsOpts[a]=this.tabs[a].name;c.$on("toast",(function(t){e.toast(t)})),c.$on("selection_project",(function(t){e.objectid=e.projects[t].id,e.currentProject=e.projects[t]})),c.$on("removeProjectSelection",(function(t){e.currentProject=null,e.objectid=""})),c.$on("myTabsUpdated",(function(t){e.myTabs=[];for(var a=0;a<e.tabCount;a++){for(var n=widget.getValue("_Tab".concat(a,"_Url_")),r=e.tabs[0].url,i=0;i<e.tabs.length;i++)if(n===e.tabs[i].name){r=e.tabs[i].url;break}e.myTabs[a]={name:widget.getValue("_Tab".concat(a,"_Name_")),url:r}}e.$forceUpdate()})),c.$on("reloadwidget",(function(t){e.tenantId=widget.getValue("_CurrentTenantID_"),e.enoviaUrl=widget.getValue("_Enovia_"),e.tabCount=parseInt(widget.getValue("_TabCount_"),10);for(var a=0;a<e.tabCount;a++)widget.addPreference({name:"_Tab".concat(a,"_Name_"),type:"hidden",defaultValue:"New tab "+(a+1)}),widget.addPreference({name:"_Tab".concat(a,"_Url_"),type:"hidden",defaultValue:"Schedule Status"});e.retrieveAllProjects()})),void 0===widget.id?(setTimeout((function(){e.tenantDataLoaded([{id:-1}])}),2e3),this.myTabs=this.tabs):(this.projects=[],c.$emit("myTabsUpdated"),requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})})))},methods:{toast:function(t){this.snackbarMsg=t,this.snackbar=!0},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_Enovia_",type:"text",label:"Enovia URL",defaultValue:"eu1-space.3dexperience.3ds.com/enovia"}),widget.addPreference({name:"_TabCount_",type:"range",label:"Tab Count",defaultValue:"2",step:"1",min:"1",max:"10"}),void 0!==widget.id?(this.tenantId=widget.getValue("_CurrentTenantID_"),this.enoviaUrl=widget.getValue("_Enovia_"),this.tabCount=parseInt(widget.getValue("_TabCount_"),10),this.retrieveAllProjects()):this.loadingbar=!1},retrieveAllProjects:function(){var t=this,e=this;this.loadingbar=!0;var a,n,r=this.tenants[this.tenantId]["3DSpace"];a=r+"/resources/v1/modeler/projects",n={onComplete:function(a){var n=JSON.parse(a);e.projects=[];for(var r=0;r<n.data.length;r++){var i=n.data[r];e.projects.push({id:i.id,name:i.dataelements.name,description:i.dataelements.description,deadline:i.dataelements.estimatedFinishDate})}t.loadingbar=!1},onFailure:function(){t.loadingbar=!1}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,n)}))}}},X=(a(149),a(176)),z=a(177),H=a(178),K=Object(u.a)(W,i,[],!1,null,null,null);p()(K,{VApp:X.a,VBtn:k.a,VContent:z.a,VListItem:_.a,VProgressLinear:x.a,VSnackbar:H.a}),K.options.__file="src/components/app.vue";var Q=K.exports,Y=a(157);r.a.use(Y.a);var Z=new Y.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new r.a({store:Z,vuetify:l,render:function(t){return t(Q)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){c.$emit("reloadwidget")}))}},43:function(t,e,a){var n=a(150);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};a(31)(n,r);n.locals&&(t.exports=n.locals)}}]);