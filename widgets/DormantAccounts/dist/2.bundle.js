(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{139:function(t,e,a){"use strict";var n=a(37);a.n(n).a},140:function(t,e,a){(t.exports=a(6)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a(7),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-tabs",{attrs:{dark:"",height:"40px"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab",{attrs:{href:"#tab-1"}},[a("v-icon",{staticClass:"ma-2"},[t._v("mdi-sleep")]),t._v(" Dormant Accounts ")],1),t._v(" "),a("v-tab",{attrs:{href:"#tab-2"}},[a("v-icon",{staticClass:"ma-2"},[t._v("mdi-phone")]),t._v(" Account History ")],1)],1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab-item",{attrs:{value:"tab-1"}},[a("dormant-table",{attrs:{table:t.dTable,loadingbar:t.dormantLoading,search:t.search,date:t.dateDa}})],1),t._v(" "),a("v-tab-item",{attrs:{value:"tab-2"}},[a("costumer-table",{attrs:{table:t.table,loadingbar:t.loadingbar,search:t.search,date:t.dateAa}})],1)],1)],1)};s._withStripped=!0;var r=a(158);a(63),a(70);i.a.use(r.a);var l=new i.a,o=new r.a({icons:{iconfont:"mdi"}});function c(t,e){e=e||",";for(var a=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),n=[[]],i=null,s=null;i=a.exec(t);){var r=i[1];r.length&&r!==e&&n.push([]),s=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],n[n.length-1].push(s)}return n}var d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"costumerTable"}},[null!==t.selected?a("v-dialog",{attrs:{id:"histDialog",scrollable:"","max-width":"60%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v("History "+t._s(t.selected.name))]),t._v(" "),a("v-card-text",{staticStyle:{height:"80vh"}},t._l(t.selected.history,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1",attrs:{outlined:"",elevation:"5"}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline text-right",staticStyle:{"user-select":"text"}},[t._v("\n                                DS Customer Number: "+t._s(e.dsCustomerNumber.replace(" ","").replace(" ","").replace(" ",""))+"\n                                "),a("br"),t._v("\n                                "+t._s(e.date.toLocaleString())+"\n                            ")]),t._v(" "),a("v-list-item-title",[a("h5",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.subject))])]),t._v(" "),a("v-list-item-content",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.description))])],1)],1)],1)})),1)],1)],1):t._e(),t._v(" "),a("v-card",{attrs:{flat:""}},[a("v-data-table",{attrs:{headers:t.headers,items:t.table,"items-per-page":15,dense:"","fixed-header":!0,loading:t.loadingbar,search:t.search,height:"calc(100vh - 123px)"},scopedSlots:t._u([{key:"footer",fn:function(){return[t._v("\n                Last update: "+t._s(t.date)+"\n            ")]},proxy:!0},{key:"item",fn:function(e){var n=e.item;return[a("tr",[a("td",[t._v(" "+t._s(n.clientID)+" ")]),t._v(" "),a("td",[t._v(" "+t._s(n.client)+" ")]),t._v(" "),a("td",[a("v-btn",{attrs:{width:"100%",value:"recent",small:""},on:{click:function(e){return t.expand(n)}}},[a("v-icon",[t._v("mdi-history")]),t._v(" "),a("span",[t._v("History")])],1)],1),t._v(" "),a("td",[t._v("\n                        "+t._s(n.lastActivity)+" days ago\n                    ")])])]}}])})],1)],1)};d._withStripped=!0;var u={name:"CostumerTable",props:{table:Array,loadingbar:Boolean,search:String,date:String},data:function(){return{dialog:!1,selected:null,headers:[{text:"Client ID",value:"clientID"},{text:"Client",value:"client"},{text:"Subject"},{text:"Last Activity"}]}},methods:{expand:function(t){this.dialog=!1,this.dialog=!0,this.selected=t}}},v=a(26),h=a(27),p=a.n(h),m=a(58),_=a(43),f=a(16),b=a(157),g=a(160),C=a(47),L=a(33),x=a(15),w=Object(v.a)(u,d,[],!1,null,null,null);p()(w,{VBtn:m.a,VCard:_.a,VCardText:f.a,VCardTitle:f.b,VDataTable:b.a,VDialog:g.a,VIcon:C.a,VListItem:L.a,VListItemContent:x.a,VListItemTitle:x.b}),w.options.__file="src/components/costumerTable.vue";var y=w.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"dormantTable"}},[null!==t.selected?a("v-dialog",{attrs:{id:"histDialog",scrollable:"","max-width":"60%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v("History "+t._s(t.selected.name))]),t._v(" "),a("v-card-text",{staticStyle:{height:"80vh"}},t._l(t.selected.history,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1",attrs:{outlined:"",elevation:"5"}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline text-right",staticStyle:{"user-select":"text"}},[t._v("\n                                DS Customer Number: "+t._s(e.dsCustomerNumber.replace(" ","").replace(" ","").replace(" ",""))+"\n                                "),a("br"),t._v("\n                                "+t._s(e.date.toLocaleString())+"\n                            ")]),t._v(" "),a("v-list-item-title",[a("h5",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.subject))])]),t._v(" "),a("v-list-item-content",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.description))])],1)],1)],1)})),1)],1)],1):t._e(),t._v(" "),a("v-card",{attrs:{flat:""}},[a("v-data-table",{attrs:{headers:t.headers,items:t.table,"items-per-page":15,dense:"","fixed-header":!0,loading:t.loadingbar,search:t.search,height:"calc(100vh - 123px)"},scopedSlots:t._u([{key:"footer",fn:function(){return[t._v("\n                Last update: "+t._s(t.date)+"\n            ")]},proxy:!0},{key:"item",fn:function(e){var n=e.item;return[a("tr",[a("td",[t._v(" "+t._s(n.clientID)+" ")]),t._v(" "),a("td",[t._v(" "+t._s(n.client)+" ")]),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:"",color:"#ffe500"}},[t._v(" "+t._s(n.ALC2021)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:"",color:"#ffee57"}},[t._v(" "+t._s(n.ALC2020)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:"",color:"#fff495"}},[t._v(" "+t._s(n.ALC2019)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[n.hist?a("v-btn",{attrs:{value:"recent",small:"",rounded:""},on:{click:function(e){return t.expand(n.hist)}}},[t._v("\n                            "+t._s(n.hist.lastActivity)+" DAYS AGO\n                        ")]):a("div",[t._v("-")])],1)])]}}])})],1)],1)};S._withStripped=!0;var D={name:"DormantTable",props:{table:Array,loadingbar:Boolean,search:String,date:String},data:function(){return{dialog:!1,selected:null,headers:[{text:"Client ID",value:"clientID"},{text:"Client",value:"client"},{text:"ALC 2021",value:"N_ALC2021"},{text:"ALC 2020",value:"N_ALC2020"},{text:"ALC 2019",value:"N_ALC2019"},{text:"History",value:"hist.lastActivity"}]}},methods:{expand:function(t){this.dialog=!1,this.dialog=!0,this.selected=t}}},A=a(50),T=Object(v.a)(D,S,[],!1,null,null,null);p()(T,{VBtn:m.a,VCard:_.a,VCardText:f.a,VCardTitle:f.b,VChip:A.a,VDataTable:b.a,VDialog:g.a,VListItem:L.a,VListItemContent:x.a,VListItemTitle:x.b}),T.options.__file="src/components/dormantTable.vue";var I={name:"App",components:{costumerTable:y,dormantTable:T.exports},data:function(){return{lastmodif:"",table:[],dTable:[],tab:null,search:"",dateAa:"",dateDa:"",loadingbar:!0,dormantLoading:!0,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,e=this;widget.name="",e.loadingbar=!0,e.dormantLoading=!0,l.$on("onSearch",(function(t){e.search=t})),l.$on("reloadwidget",(function(){e.reload()})),void 0===widget.id?e.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{substring:function(t,e){if(void 0===t)return"";var a=t.substring(0,e);return a+(a.length<t.length?"...":"")},log:function(t){this.snackbarMsg=t,this.snackbar=!0},getCSRF:function(t,e){var a,n,i=this,s=i.tenants[i.tenantId]["3DSpace"];a=s+"/resources/v1/application/CSRF",n={onComplete:function(e){var a=JSON.parse(e);t(a.csrf.value)},onFailure:function(t){i.log(t),e()}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,n)}))},reload:function(){var t=this,e=widget.getValue("_FileKey_");e||(e=window.location.search.substring(1)),t.loadingbar=!0,t.dormantLoading=!0,t.tenantId=widget.getValue("_CurrentTenantID_"),t.table=[],t.dTable=[];var a=new XMLHttpRequest;a.open("GET","https://bcracker.dev/widgets/dormant/lastupdate_aa.php",!0),a.send(null),a.onload=function(){t.dateAa=a.responseText};var n=new XMLHttpRequest;n.open("GET","https://bcracker.dev/widgets/dormant/lastupdate_da.php",!0),n.send(null),n.onload=function(){t.dateDa=n.responseText};var i=new XMLHttpRequest;i.open("GET","https://bcracker.dev/widgets/dormant/p_activities.php?key="+e,!0),i.send(null);var s=new XMLHttpRequest;s.open("GET","https://bcracker.dev/widgets/dormant/activities.php?key="+e,!0),s.send(null),s.onload=function(){for(var e=c(s.responseText,";"),a={},n=1;n<e.length;++n)if(void 0!==e[n][11]){var r=e[n][3],l=e[n][11].split("/"),o=l[1]+"/"+l[0]+"/"+l[2],d=new Date(o),u=(((new Date).getTime()-d.getTime())/864e5).toFixed(0).toString(),v={subject:e[n][6],description:e[n][7],dsCustomerNumber:e[n][5],date:d};if(void 0!==a[r]){var h=a[r];t.table[h].lastActivityDate=d,t.table[h].lastActivity=u,t.table[h].history.unshift(v)}else a[r]=t.table.length,t.table.push({client:r,clientID:e[n][4],partner:e[n][8],lastActivityDate:d,lastActivity:u,history:[v]})}t.table.sort((function(t,e){return t.client<e.client?-1:t.client<e.client?1:0})),t.loadingbar=!1,i.responseText?t.loadDormantAccounts(i.responseText):i.onload=function(){t.loadDormantAccounts(i.responseText)}}},findHistory:function(t,e){t=t.toLowerCase().replaceAll(" ",""),e=e.toLowerCase().replaceAll(" ","");for(var a=0;a<this.table.length;++a){var n=this.table[a].client.toLowerCase().replaceAll(" ","");if(this.table[a].clientID.toLowerCase().replaceAll(" ","").startsWith(e)||n.startsWith(t))return this.table[a]}return null},toInt:function(t,e,a){return t[e][a]?parseInt(t[e][a].replace(/ /g,"")):0},loadDormantAccounts:function(t){for(var e=c(t,";"),a=2;a<e.length;++a){var n={clientID:e[a][0],client:e[a][1],industry:e[a][3],N_ALC2019:this.toInt(e,a,4),ALC2019:e[a][4],N_PLC2019:this.toInt(e,a,5),PLC2019:e[a][5],N_YLC2019:this.toInt(e,a,6),YLC2019:e[a][6],N_ALC2020:this.toInt(e,a,7),ALC2020:e[a][7],N_PLC2020:this.toInt(e,a,8),PLC2020:e[a][8],N_YLC2020:this.toInt(e,a,9),YLC2020:e[a][9],N_ALC2021:this.toInt(e,a,10),ALC2021:e[a][10],N_PLC2021:this.toInt(e,a,11),PLC2021:e[a][11],N_YLC2021:this.toInt(e,a,12),YLC2021:e[a][12],hist:null};if(!(n.N_PLC2021>0||n.N_PLC2020>0||n.N_PLC2019>0||n.N_YLC2021>0||n.N_YLC2020>0||n.N_YLC2019>0)&&void 0!==n.client){var i=this.findHistory(n.client,n.clientID);n.hist=i,this.dTable.push(n)}}this.dTable.sort((function(t,e){return t.client<e.client?-1:t.client<e.client?1:0})),this.dormantLoading=!1},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),l.$emit("reloadwidget")},getColor:function(t){return t%2==1?"white":"#EFEFEF"}}},V=(a(139),a(155)),N=a(156),k=a(161),E=a(159),j=a(150),F=Object(v.a)(I,s,[],!1,null,null,null);p()(F,{VApp:V.a,VIcon:C.a,VTab:N.a,VTabItem:k.a,VTabs:E.a,VTabsItems:j.a}),F.options.__file="src/components/app.vue";var P=F.exports,H=a(149);i.a.use(H.a);var R=new H.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="KEONYS",widget.setTitle(window.title),new i.a({store:R,vuetify:o,render:function(t){return t(P)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){l.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){l.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){l.$emit("onSearch","")}))}},37:function(t,e,a){var n=a(140);"string"==typeof n&&(n=[[t.i,n,""]]);var i={insert:"head",singleton:!1};a(25)(n,i);n.locals&&(t.exports=n.locals)}}]);