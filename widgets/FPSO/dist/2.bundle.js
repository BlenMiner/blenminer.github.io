(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{100:function(e,t,n){"use strict";var a=n(29);n.n(a).a},101:function(e,t,n){(e.exports=n(5)(!1)).push([e.i,"\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n#drop {\n    width: 90vh;\n    height: 90vh;\n\n    border-style: dashed;\n    border-color: lightgray;\n    border-width: 4px;\n    border-radius: 20%;\n\n    background-image: url(https://blenminer.github.io/widgets/LiveTables/assets/cloud.png);\n    background-size: 60%;\n    background-repeat: no-repeat;\n    background-position: center;\n    background-color: #f7f7f7;\n\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    -ms-transform: translate(-50%, -50%);\n    transform: translate(-50%, -50%);\n}\n",""])},29:function(e,t,n){var a=n(101);"string"==typeof a&&(a=[[e.i,a,""]]);var i={insert:"head",singleton:!1};n(22)(a,i);a.locals&&(e.exports=a.locals)},3:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n(7),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-content",[n("preferences",{attrs:{headers:e.headers,rows:e.items}}),e._v(" "),n("v-progress-linear",{attrs:{color:"blue accent-4",indeterminate:"",height:"10",active:e.loadingbar,absolute:"",app:""}}),e._v(" "),n("v-snackbar",{model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n            "+e._s(e.snackbarMsg)+"\n            "),n("v-btn",{attrs:{color:"grey",text:""},on:{click:function(t){e.snackbar=!1}}},[e._v("\n                Close\n            ")])],1),e._v(" "),n("center",{directives:[{name:"show",rawName:"v-show",value:""===e.fileId,expression:"fileId === ''"}]},[n("v-content",{staticStyle:{height:"100vh",width:"100%"}},[n("div",{ref:"drop",attrs:{id:"drop",width:"90vh",height:"90vh"}})])],1),e._v(" "),""!==e.fileId?n("v-content",[n("v-card",{attrs:{height:"100vh"}},[n("v-card-title",[e._v("\n                    "+e._s(e.fileName)+"\n                    "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:"",small:""},on:{click:function(t){return e.showSettings()}}},[n("v-icon",[e._v("mdi-settings")])],1)],1),e._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.filteredheaders,items:e.filteredrows,search:e.search,height:"calc(100vh - 139px)",loading:"true"},scopedSlots:e._u([{key:"item.action",fn:function(t){var a=t.item;return[a?n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.hidetablerow(a)}}},[e._v("\n                            mdi-eye-off\n                        ")]):e._e()]}}],null,!1,2431930541)})],1)],1):e._e()],1)],1)};r._withStripped=!0;var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":"80%"},on:{"click:outside":function(t){return e.applySettings()}},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",{attrs:{"min-height":"90vh"}},[n("v-toolbar",{staticStyle:{"background-color":"#005685"},attrs:{dark:"",flat:""}},[n("v-toolbar-title",[e._v("Table Settings "+e._s(e.tmp))]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{icon:""}},[n("v-icon",[e._v("mdi-information")])],1)],1),e._v(" "),n("v-card-text",[n("v-card-title",[e._v("Columns")]),e._v(" "),e._l(e.headers,(function(t,a){return n("span",{key:a},[n("v-btn",{staticClass:"ma-1",attrs:{color:e.settings[a]?"red":"green",title:t.text},on:{click:function(t){return e.toggle(a)}}},[e._v("\n                    "+e._s(t.text)),n("v-spacer"),e._v(" "),e.settings[a]?n("v-icon",[e._v("mdi-eye-off")]):n("v-icon",[e._v("mdi-eye")])],1)],1)})),e._v(" "),n("v-card-title",[e._v("Rows")]),e._v(" "),n("v-container",{staticClass:"overflow-y-auto",staticStyle:{"max-height":"300px"},attrs:{id:"scroll-target"}},e._l(e.rows,(function(t,a){return n("span",{key:a},[e.rowvis[a]?n("v-card",{staticClass:"ma-2 pa-2",attrs:{color:"red"},on:{click:function(t){return e.removerow(a)}}},[n("v-icon",[e._v("mdi-eye-off")]),e._v(" "),e._l(t,(function(t){return n("span",{key:t},[e._v(e._s(t)+" ")])}))],2):e._e()],1)})),0)],2)],1)],1)};o._withStripped=!0;var s=n(162);n(56),n(63);i.a.use(s.a);var l=new i.a,d=new s.a({icons:{iconfont:"mdi"}}),c={props:{headers:Array,rows:Array},data:function(){return{dialog:!1,settings:[],rowvis:[],tmp:0}},mounted:function(){var e=this;l.$on("settingsShow",(function(){e.dialog=!0})),l.$on("removeandupdate",(function(t){e.removeandupdate(t)})),l.$on("loadedtable",(function(t,n){e.loadedtable(t,n)}))},methods:{loadedtable:function(e,t){for(var n=JSON.parse(widget.getValue("hidden_columns_list")),a=JSON.parse(widget.getValue("hidden_rows_list")),i=0;i<e.length;i++)this.$set(this.settings,i,void 0!==n[i.toString()]);for(var r=0;r<t.length;r++)this.$set(this.rowvis,r,void 0!==a[r.toString()]);l.$emit("changeheaders",n),l.$emit("changerowsvisibility",a)},toggle:function(e){this.$set(this.settings,e,!this.settings[e])},removerow:function(e){this.$set(this.rowvis,e,!this.rowvis[e])},removeandupdate:function(e){this.$set(this.rowvis,e,"hidden"),this.applySettings()},applySettings:function(){for(var e={},t={},n=0;n<this.settings.length;n++)this.settings[n]&&(e[n.toString()]="hidden");for(var a=0;a<this.rowvis.length;a++)this.rowvis[a]&&(t[a.toString()]="hidden");widget.setValue("hidden_columns_list",JSON.stringify(e)),widget.setValue("hidden_rows_list",JSON.stringify(t)),l.$emit("changeheaders",e),l.$emit("changerowsvisibility",t)}}},u=n(33),h=n(34),f=n.n(h),v=n(54),g=n(36),p=n(15),m=n(164),b=n(163),w=n(50),_=n(158),S=n(53),y=n(51),k=Object(u.a)(c,o,[],!1,null,null,null);function D(e,t){requirejs(["DS/WAFData/WAFData"],(function(n){n.authenticatedRequest(e,t)}))}f()(k,{VBtn:v.a,VCard:g.a,VCardText:p.a,VCardTitle:p.b,VContainer:m.a,VDialog:b.a,VIcon:w.a,VSpacer:_.a,VToolbar:S.a,VToolbarTitle:y.a}),k.options.__file="src/components/preferences.vue";var V={name:"App",components:{preferences:k.exports},data:function(){return{loadingbar:!0,sampleText:"",search:"",fileName:"",snackbarMsg:"",snackbar:!1,fileId:"",tenantId:-1,tenants:[],filteredheaders:[],filteredrows:[],headers:[],items:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var e=this,t=this;t.loadingbar=!0,l.$on("onSearch",(function(e){t.search=e})),l.$on("reloadwidget",(function(){t.reload()})),l.$on("changeheaders",(function(e){for(var n=[],a=0;a<t.headers.length;a++)void 0===e[a]&&n.push(t.headers[a]);t.filteredheaders=n})),l.$on("changerowsvisibility",(function(e){for(var n=[],a=0;a<t.items.length;a++)void 0===e[a]&&n.push(t.items[a]);t.filteredrows=n})),void 0===widget.id?setTimeout((function(){t.tenantDataLoaded([{id:-1}])}),500):(this.projects={},requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(t){t.getPlatformServices({platformId:void 0,onComplete:e.tenantDataLoaded})})),requirejs(["DS/PlatformAPI/PlatformAPI"],(function(e){e.subscribe("file_uploaded",(function(e){e===t.fileId&&t.reload()}))})),t.$refs.drop&&requirejs(["DS/DataDragAndDrop/DataDragAndDrop"],(function(e){e.droppable(t.$refs.drop,{drop:function(e,n,a){t.objectDroped(e,n,a)}})})))},methods:{showSettings:function(){l.$emit("settingsShow")},log:function(e){this.snackbarMsg=e,this.snackbar=!0},getCSRF:function(e,t){var n=this;D(n.tenants[n.tenantId]["3DSpace"]+"/resources/v1/application/CSRF",{onComplete:function(t){var n=JSON.parse(t);e(n.csrf.value)},onFailure:function(e){n.log(e),t()}})},reload:function(){var e=this;if(e.loadingbar=!0,e.tenantId=widget.getValue("_CurrentTenantID_"),e.fileId=widget.getValue("_FileID_"),e.fileName=widget.getValue("_FileName_"),void 0!==widget.id){var t=e.tenants[e.tenantId]["3DSpace"];""!==e.fileId?e.getCSRF((function(n){D(t+"/resources/v1/modeler/documents/".concat(e.fileId,"/files/DownloadTicket"),{method:"PUT",headers:{ENO_CSRF_TOKEN:n},onComplete:function(t){D(JSON.parse(t).data[0].dataelements.ticketURL,{onComplete:function(t){e.displayFileData(t),e.loadingbar=!1},onFailure:function(t){e.log(t),e.loadingbar=!1}})},onFailure:function(t){e.log(t),e.loadingbar=!1}})}),(function(){e.loadingbar=!1})):e.loadingbar=!1}else e.fileId="1",e.displayFileData("test 6,test 9,test2\n1,2,3\n4,5,6\naba,eba,ibi"),e.loadingbar=!1},objectDroped:function(e,t,n){var a=JSON.parse(e);"3DXContent"===a.protocol&&(this.fileId=a.data.items[0].objectId,this.fileName=a.data.items[0].displayName,widget.setValue("_FileID_",this.fileId),widget.setValue("_FileName_",this.fileName),this.reload())},displayFileData:function(e){var t=function(e,t){t=t||",";for(var n=new RegExp("(\\"+t+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+t+"\\r\\n]*))","gi"),a=[[]],i=null,r=null;i=n.exec(e);){var o=i[1];o.length&&o!==t&&a.push([]),r=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],a[a.length-1].push(r)}return a}(e,",");if(this.headers=[],this.filteredheaders=[],this.items=[],0!==t.length){for(var n=0;n<t[0].length;n++){var a={text:t[0][n],value:"col_".concat(n)};this.headers.push(a),this.filteredheaders.push(a)}this.headers.push({text:"Actions",value:"action",sortable:!1}),this.filteredheaders.push({text:"Actions",value:"action",sortable:!1});for(var i=1;i<t.length;i++){for(var r={},o=0;o<t[i].length;o++){var s=t[i][o];r["col_".concat(o)]=s}this.items.push(r),this.filteredrows.push(r)}l.$emit("loadedtable",this.headers,this.items)}},tenantDataLoaded:function(e){this.tenants=[];for(var t=[],n=0,a=0;a<e.length;a++)void 0!==e[a]["3DSpace"]&&(t.push({value:"".concat(n++),label:"".concat(e[a].platformId," - ").concat(e[a].displayName)}),this.tenants.push(e[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:t}),widget.addPreference({name:"_FileID_",type:"text",label:"File Object ID",defaultValue:""}),widget.addPreference({name:"_FileName_",type:"text",label:"File Name",defaultValue:""}),widget.addPreference({name:"hidden_columns_list",type:"hidden",defaultValue:"{}"}),widget.addPreference({name:"hidden_rows_list",type:"hidden",defaultValue:"{}"}),l.$emit("reloadwidget")},hidetablerow:function(e){var t=this.items.indexOf(e);l.$emit("removeandupdate",t)}}},$=(n(100),n(159)),C=n(165),I=n(161),x=n(39),N=n(160),F=Object(u.a)(V,r,[],!1,null,null,null);f()(F,{VApp:$.a,VBtn:v.a,VCard:g.a,VCardTitle:p.b,VContent:C.a,VDataTable:I.a,VIcon:w.a,VProgressLinear:x.a,VSnackbar:N.a,VSpacer:_.a}),F.options.__file="src/components/app.vue";var T=F.exports,O=n(149);i.a.use(O.a);var A=new O.a.Store({state:{},mutations:{},getters:{}});t.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new i.a({store:A,vuetify:d,render:function(e){return e(T)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){l.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(e){l.$emit("onSearch",e)})),widget.addEvent("onResetSearch",(function(){l.$emit("onSearch","")}))}}}]);