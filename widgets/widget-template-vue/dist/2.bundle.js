(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{129:function(t,e,a){"use strict";var n=a(40);a.n(n).a},130:function(t,e,a){(t.exports=a(4)(!1)).push([t.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a(8),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("preferences",{attrs:{tabcount:t.tabCount,tabs:t.tabs}}),t._v(" "),a("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:t.loadingbar}}),t._v(" "),a("v-snackbar",{model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n            "+t._s(t.snackbarMsg)+"\n            "),a("v-btn",{attrs:{color:"grey",text:""},on:{click:function(e){t.snackbar=!1}}},[t._v("\n                Close\n            ")])],1),t._v(" "),a("v-list-item",{staticStyle:{padding:"0"}},[a("projectGrid",{style:"background-color:white;height: 100vh;"+(null!==t.currentProject?"max-width: 360px;":"max-width:100%;"),attrs:{projects:t.projects,selection:t.currentProject,owner:t.owner}}),t._v(" "),a("v-slide-x-transition",[a("projectView",{directives:[{name:"show",rawName:"v-show",value:null!==t.currentProject,expression:"currentProject !== null"}],staticStyle:{"max-width":"100%"},attrs:{tabcount:t.tabCount,tabs:t.myTabs,url:t.tenants&&t.tenants[t.tenantId]?"https://"+t.tenants[t.tenantId].platformId+"-"+t.enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",objectid:t.objectid,project:t.currentProject,securitycontext:t.securityContext}})],1)],1)],1)],1)};o._withStripped=!0;var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"overflow-y-auto",staticStyle:{padding:"0"}},[a("v-row",{staticStyle:{padding:"0"},attrs:{"no-gutters":""}},[a("v-col",[a("v-row",{staticClass:"white",attrs:{align:"start",justify:"start","no-gutters":""}},t._l(t.filtertedlist(),(function(e,n){return a("v-card",{key:n,staticClass:"ma-1 pa-1",attrs:{width:"350px",height:"120px",color:t.selection==e?"grey lighten-3":"white",hover:""},on:{click:function(a){return t.select(t.selection,e)}}},[a("v-expand-x-transition",[a("v-list-item",[a("v-list-item-avatar",{attrs:{tile:"",size:"auto"}},[a("v-img",{attrs:{src:e.icon}})],1),t._v(" "),a("v-list-item-content",{staticStyle:{padding:"0"},attrs:{height:"120px"}},[a("v-list-item-title",{staticClass:"my-2",attrs:{title:e.name}},[t._v(t._s(e.name))]),t._v(" "),a("v-list-item-subtitle",{attrs:{title:e.state}},[t._v("State: "+t._s(e.state))]),t._v(" "),a("v-list-item-subtitle",{attrs:{title:e.description}},[t._v("Desc: "+t._s(e.description))]),t._v(" "),a("v-list-item-subtitle",{attrs:{title:t.owner}},[t._v("Owner: "+t._s(e.owner))]),t._v(" "),a("v-progress-linear",{staticClass:"my-2",attrs:{value:e.progress,title:e.progress,height:"8px"}})],1)],1)],1)],1)})),1)],1)],1)],1)};i._withStripped=!0;var s=a(154);a(55),a(62);r.a.use(s.a);var c=new r.a,l=new s.a({icons:{iconfont:"mdi"}}),d={props:{projects:Object,selection:Object,owner:String},data:function(){return{searchtext:""}},mounted:function(){var t=this;c.$on("search",(function(e){t.searchtext=e.toLowerCase()}))},methods:{select:function(t,e){t!==e&&c.$emit("selection_project",e)},filtertedlist:function(){if(""===this.searchtext)return this.projects;for(var t=[],e=0;e<this.projects.length;e++)-1!==this.projects[e].name.toLowerCase().indexOf(this.searchtext)&&t.push(this.projects[e]);return t}}},u=a(19),b=a(20),p=a.n(b),v=a(42),m=a(146),g=a(158),f=a(17),_=a(136),h=a(37),w=a(52),x=a(14),y=a(44),j=a(147),C=Object(u.a)(d,i,[],!1,null,null,null);p()(C,{VCard:v.a,VCol:m.a,VContainer:g.a,VExpandXTransition:f.b,VImg:_.a,VListItem:h.a,VListItemAvatar:w.a,VListItemContent:x.a,VListItemSubtitle:x.b,VListItemTitle:x.c,VProgressLinear:y.a,VRow:j.a}),C.options.__file="src/components/project-grid.vue";var V=C.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticStyle:{width:"100%",padding:"0",height:"100vh"},attrs:{flat:""}},[a("v-progress-linear",{attrs:{color:"cyan accent-4",indeterminate:"",height:"5",active:t.loadingbar}}),t._v(" "),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.back()}}},[a("v-icon",[t._v("mdi-forwardburger")])],1),t._v(" "),a("b",[t._v(t._s(t.project?t.project.name:"Loading..."))]),t._v(" "),a("v-btn",{staticStyle:{float:"right"},attrs:{text:""},on:{click:function(e){return t.settings()}}},[a("v-icon",[t._v("mdi-settings")])],1),t._v(" "),a("v-tabs",{attrs:{"background-color":"#005685",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab",{key:e},[t._v("\n            "+t._s(t.tabs[e-1]?t.tabs[e-1].name:"Loading ...")+"\n        ")])})),1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabcount,(function(e){return a("v-tab-item",{key:e},[a("v-card",{attrs:{flat:""}},[null!==t.project?a("iframe",{ref:"iframes",refInFor:!0,staticStyle:{height:"calc(100vh - 90.51px)"},attrs:{src:t.tabs[e-1]?t.url+t.tabs[e-1].url.replace(/{id}/g,t.objectid).replace(/{context}/g,t.securitycontext):"about:blank",width:"100%"},on:{load:function(e){return t.doneLoading()}}}):t._e()])],1)})),1)],1)};S._withStripped=!0;var T={props:{project:Object,tabs:Array,url:String,objectid:String,tabcount:Number,securitycontext:String},data:function(){return{tab:null,loadingbar:!0}},mounted:function(){var t=this;c.$on("selection_project",(function(){t.loadingbar=!0}))},methods:{back:function(){c.$emit("removeProjectSelection")},doneLoading:function(){this.loadingbar=!1},settings:function(){c.$emit("editPrefs",this.tabcount)}}},k=a(53),P=a(47),I=a(148),N=a(159),U=a(157),$=a(137),D=Object(u.a)(T,S,[],!1,null,null,null);p()(D,{VBtn:k.a,VCard:v.a,VIcon:P.a,VProgressLinear:y.a,VTab:I.a,VTabItem:N.a,VTabs:U.a,VTabsItems:$.a}),D.options.__file="src/components/project-view.vue";var L=D.exports,A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{"max-width":"80%"},on:{"click:outside":function(e){return t.savesettings(t.tabcount)}},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",{attrs:{"min-height":"90vh"}},[a("v-dialog",{attrs:{"max-width":"700px"},model:{value:t.infodialog,callback:function(e){t.infodialog=e},expression:"infodialog"}},[a("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[a("v-toolbar-title",[t._v("URL Presets")])],1),t._v(" "),a("v-card",{attrs:{tile:""}},t._l(t.tabs,(function(e,n){return a("v-content",{key:n,staticClass:"pa-5"},[a("h3",[t._v(t._s(e.name))]),t._v("\n                    "+t._s(e.url)+"\n                ")])})),1)],1),t._v(" "),a("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[a("v-toolbar-title",[t._v("Tab settings")]),t._v(" "),a("v-spacer"),t._v(" "),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.infodialog=!0}}},[a("v-icon",[t._v("mdi-information")])],1)],1),t._v(" "),a("v-card-text",[a("br"),t._v(" "),a("v-form",[a("b",[t._v("{id}")]),t._v(" gets replaced by the project's ID"),a("br"),t._v(" "),a("b",[t._v("{context}")]),t._v(" gets replaced by security context"),a("br"),t._v(" "),t._l(t.tabcount,(function(e){return[a("v-card",{key:e+"_card",staticClass:"my-2",staticStyle:{cursor:"default"},attrs:{hover:""}},[a("v-card-actions",[a("h3",[t._v("Tab "+t._s(e)+":")]),t._v(" "),a("v-spacer"),t._v(" "),t.tabcount<10?a("v-btn",{attrs:{icon:"",color:"success"},on:{click:function(a){t.insert(e-1,t.tabcount)}}},[a("v-icon",[t._v("mdi-plus")])],1):t._e(),t._v(" "),t.tabcount>1?a("v-btn",{attrs:{icon:"",color:"error"},on:{click:function(a){t.remove(e-1,t.tabcount)}}},[a("v-icon",[t._v("mdi-delete")])],1):t._e()],1),t._v(" "),a("v-card-text",[a("v-text-field",{key:e+"_name",attrs:{label:"Tab "+e+": Name",name:"tabname"},model:{value:t.tabNames[e-1],callback:function(a){t.$set(t.tabNames,e-1,a)},expression:"tabNames[i - 1]"}}),t._v(" "),a("v-text-field",{key:e+"_url",attrs:{label:"Tab "+e+": Url",title:"{id}= project's ID; {context} = security context;",name:"taburl"},model:{value:t.tabUrls[e-1],callback:function(a){t.$set(t.tabUrls,e-1,a)},expression:"tabUrls[i - 1]"}})],1)],1)]})),t._v(" "),a("v-btn",{attrs:{color:"success"},on:{click:function(e){return t.insert(t.tabcount,t.tabcount)}}},[a("v-icon",[t._v("mdi-plus")]),t._v(" Add new tab")],1)],2)],1)],1)],1)};A._withStripped=!0;var E={props:{tabcount:Number,tabs:Array},data:function(){return{dialog:!1,infodialog:!1,tabNames:[],tabUrls:[]}},mounted:function(){var t=this;c.$on("editPrefs",(function(e){t.dialog=!0;for(var a=0;a<e;a++)t.tabNames[a]=widget.getValue("_Tab".concat(a,"_Name_"))||"New tab "+(a+1),t.tabUrls[a]=widget.getValue("_Tab".concat(a,"_Url_"))||"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId={id}"}))},methods:{savesettings:function(t){var e=!1;if(widget.id)for(var a=0;a<t;a++)widget.getValue("_Tab".concat(a,"_Name_"))===this.tabNames[a]&&widget.getValue("_Tab".concat(a,"_Url_"))===this.tabUrls[a]||(widget.setValue("_Tab".concat(a,"_Name_"),this.tabNames[a]),widget.setValue("_Tab".concat(a,"_Url_"),this.tabUrls[a]),e=!0);this.dialog=!1,e&&c.$emit("myTabsUpdated")},changeTabCount:function(t){c.$emit("change_tab_count",t)},remove:function(t,e){for(var a=t;a<e-1;a++)this.tabNames[a]=this.tabNames[a+1],this.tabUrls[a]=this.tabUrls[a+1];this.changeTabCount(e-1)},insert:function(t,e){for(var a=e-1;a>=t;a--)this.tabNames[a+1]=this.tabNames[a],this.tabUrls[a+1]=this.tabUrls[a];this.tabNames[t]="New tab "+(t+1),this.tabUrls[t]=widget.getValue("_Tab".concat(t+1,"_Url_")),this.changeTabCount(e+1)}}},O=a(16),F=a(149),R=a(155),B=a(150),M=a(151),J=a(156),W=a(50),G=a(51),X=Object(u.a)(E,A,[],!1,null,null,null);function q(t,e){requirejs(["DS/WAFData/WAFData"],(function(a){a.authenticatedRequest(t,e)}))}p()(X,{VBtn:k.a,VCard:v.a,VCardActions:O.a,VCardText:O.b,VContent:F.a,VDialog:R.a,VForm:B.a,VIcon:P.a,VSpacer:M.a,VTextField:J.a,VToolbar:W.a,VToolbarTitle:G.a}),X.options.__file="src/components/preferences.vue";var z={name:"App",components:{projectGrid:V,projectView:L,preferences:X.exports},data:function(){return{snackbar:!1,snackbarMsg:"Bro",tenants:[],tenantId:0,loadingbar:!0,objectid:"",currentProject:null,tabCount:4,owner:"Loading ...",enoviaUrl:"https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",projects:{C745A4D6DB8A000080B84F5E43A50500:{id:"C745A4D6DB8A000080B84F5E43A50500",name:"Project Purple Planet",description:"efe",deadline:"20/09/1997",icon:"https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",progress:"50.2",state:"Active",owner:"Me :D"},pfft:{id:"pfft",name:"Project Red Planet",description:"fef",deadline:"20/09/1997",icon:"https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",progress:"10",state:"Create",owner:"Me :D"}},tabs:[{name:"Schedule Status",url:"/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId={id}&SecurityContext={context}"},{name:"Bussiness Status",url:"/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId={id}&SecurityContext={context}"},{name:"Gantt",url:"/webapps/ENOGantt/gantt-widget.html?objectId={id}&SecurityContext={context}"}],myTabs:[],securityContext:""}},computed:{message:function(){return this.$store.state.message}},watch:{},mounted:function(){var t=this,e=this;c.$on("change_tab_count",(function(t){widget.setValue("_TabCount_",t),e.tabCount=t})),c.$on("toast",(function(t){e.toast(t)})),c.$on("selection_project",(function(t){e.objectid=t.id,e.currentProject=t})),c.$on("removeProjectSelection",(function(t){e.currentProject=null,e.objectid=""})),c.$on("myTabsUpdated",(function(t){e.myTabs=[];for(var a=0;a<e.tabCount;a++)e.myTabs[a]={name:widget.getValue("_Tab".concat(a,"_Name_")),url:widget.getValue("_Tab".concat(a,"_Url_"))};e.$forceUpdate()})),c.$on("reloadwidget",(function(t){e.tenantId=widget.getValue("_CurrentTenantID_"),e.enoviaUrl=widget.getValue("_Enovia_"),e.tabCount=parseInt(widget.getValue("_TabCount_"),10),e.securityContext=widget.getValue("_CurrentSecurityContext_"),widget.setTitle(widget.getValue("_Title_")),window.title=widget.getValue("_Title_"),c.$emit("myTabsUpdated"),e.retrieveSecurityContexts()})),void 0===widget.id?(setTimeout((function(){e.tenantDataLoaded([{id:-1}])}),2e3),this.myTabs=this.tabs):(this.projects={},requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})})))},methods:{toast:function(t){this.snackbarMsg=t,this.snackbar=!0},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_Title_",type:"text",label:"Widget Title",defaultValue:"Widget Project Management"}),widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_Enovia_",type:"text",label:"Enovia URL",defaultValue:"eu1-space.3dexperience.3ds.com/enovia"}),widget.addPreference({name:"_TabCount_",type:"hidden",label:"Tab Count",defaultValue:"2",step:"1",min:"1",max:"10"}),widget.addPreference({name:"_CurrentSecurityContext_",type:"list",label:"Security Context",defaultValue:"",options:[{value:"",label:"None"}]});for(var r=0;r<10;r++)widget.addPreference({name:"_Tab".concat(r,"_Name_"),type:"hidden",defaultValue:"New tab "+(r+1)}),widget.addPreference({name:"_Tab".concat(r,"_Url_"),type:"hidden",defaultValue:this.tabs[r>this.tabs.length-1?this.tabs.length-1:r].url});void 0!==widget.id?c.$emit("reloadwidget"):this.loadingbar=!1},retrieveAllProjects:function(){var t=this;this.loadingbar=!0;var e=this.tenants[this.tenantId]["3DSpace"],a=this.securityContext.split(".")[2];t.projects={},q(e+"/resources/enocsmrest/collabspaces/".concat(a,"/contents?SecurityContext=")+this.securityContext,{onComplete:function(e){var a=JSON.parse(e).items;console.log(a);for(var n=0;n<a.length;n++){var r=a[n].businessobj;if(r){var o=a[n].id;"Project Space"===r.type.name&&(t.projects[o]={id:o,name:r.name,description:r.description,deadline:"Loading ...",icon:r.thumbnail,progress:0,state:r.maturity.name,owner:r.fullnameowner})}}},onFailure:function(e){t.toast(e)}}),q(e+"/resources/v1/modeler/projects?SecurityContext="+this.securityContext,{onComplete:function(e){for(var a=JSON.parse(e),n=0;n<a.data.length;n++){var r=a.data[n];t.projects[r.id]?t.projects[r.id]={id:r.id,name:r.dataelements.name,description:r.dataelements.description,deadline:r.dataelements.estimatedFinishDate,icon:r.dataelements.typeicon,progress:r.dataelements.percentComplete,state:r.dataelements.state,owner:r.relateddata&&r.relateddata.ownerInfo&&r.relateddata.ownerInfo.dataelements?r.relateddata.ownerInfo.dataelements.firstname+r.relateddata.ownerInfo.dataelements.lastname:t.owner}:(t.projects[r.id].deadline=r.dataelements.estimatedFinishDate,t.projects[r.id].progress=r.dataelements.percentComplete)}t.loadingbar=!1},onFailure:function(e){t.projects=[],t.toast(e),t.loadingbar=!1}})},retrieveSecurityContexts:function(){var t=this;this.loadingbar=!0,q(this.tenants[this.tenantId]["3DSpace"]+"/resources/modeler/pno/person?&current=true&select=collabspaces&select=firstname&select=lastname",{onComplete:function(e){t.projects=[];var a=JSON.parse(e),n=[];console.log(a),n.push({value:"",label:"None"}),t.owner=a.firstname+" "+a.lastname;for(var r=0;r<a.collabspaces.length;r++)for(var o=a.collabspaces[r],i=a.collabspaces[r].name,s=0;s<o.couples.length;s++){var c=o.couples[s],l=c.organization.name,d="ctx::"+c.role.name+"."+l+"."+i,u=c.role.nls+"."+l+"."+i;n.push({value:d,label:u})}widget.addPreference({name:"_CurrentSecurityContext_",type:"list",label:"Security Context",defaultValue:n[0],options:n}),t.securityContext=widget.getValue("_CurrentSecurityContext_"),t.retrieveAllProjects()},onFailure:function(e){t.retrieveAllProjects()}})}}},H=(a(129),a(152)),K=a(153),Q=Object(u.a)(z,o,[],!1,null,null,null);p()(Q,{VApp:H.a,VBtn:k.a,VContent:F.a,VListItem:h.a,VProgressLinear:y.a,VSlideXTransition:f.d,VSnackbar:K.a}),Q.options.__file="src/components/app.vue";var Y=Q.exports,Z=a(135);r.a.use(Z.a);var tt=new Z.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="Widget Project Management",widget.setTitle(window.title),new r.a({store:tt,vuetify:l,render:function(t){return t(Y)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){c.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){c.$emit("search",t)})),widget.addEvent("onResetSearch",(function(){c.$emit("search","")}))}},40:function(t,e,a){var n=a(130);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};a(31)(n,r);n.locals&&(t.exports=n.locals)}}]);