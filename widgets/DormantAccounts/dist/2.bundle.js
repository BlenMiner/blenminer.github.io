(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{139:function(t,e,a){"use strict";var n=a(37);a.n(n).a},140:function(t,e,a){(t.exports=a(6)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])},3:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a(7),s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-tabs",{attrs:{centered:"",dark:"","icons-and-text":"",height:"55px"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tabs-slider"),t._v(" "),a("v-tab",{attrs:{href:"#tab-1"}},[t._v("\n            Accounts History\n            "),a("v-icon",[t._v("mdi-phone")])],1),t._v(" "),a("v-tab",{attrs:{href:"#tab-2"}},[t._v("\n            Dormant Accounts\n            "),a("v-icon",[t._v("mdi-sleep")])],1),t._v(" "),a("div",{attrs:{width:"200px"}},[a("v-text-field",{attrs:{"append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1),t._v(" "),a("v-tabs-items",{model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab-item",{attrs:{value:"tab-1"}},[a("costumer-table",{attrs:{table:t.table,loadingbar:t.loadingbar,search:t.search}})],1),t._v(" "),a("v-tab-item",{attrs:{value:"tab-2"}},[a("dormant-table",{attrs:{table:t.dTable,loadingbar:t.dormantLoading,search:t.search}})],1)],1)],1)};s._withStripped=!0;var l=a(161);a(63),a(70);i.a.use(l.a);var r=new i.a,o=new l.a({icons:{iconfont:"mdi"}});function c(t,e){e=e||",";for(var a=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),n=[[]],i=null,s=null;i=a.exec(t);){var l=i[1];l.length&&l!==e&&n.push([]),s=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],n[n.length-1].push(s)}return n}var d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"costumerTable"}},[null!==t.selected?a("v-dialog",{attrs:{id:"histDialog",scrollable:"","max-width":"60%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v("History "+t._s(t.selected.name))]),t._v(" "),a("v-card-text",{staticStyle:{height:"80vh"}},t._l(t.selected.history,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1",attrs:{outlined:"",elevation:"5"}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline text-right",staticStyle:{"user-select":"text"}},[t._v("\n                                DS Customer Number: "+t._s(e.dsCustomerNumber.replace(" ","").replace(" ","").replace(" ",""))+"\n                                "),a("br"),t._v("\n                                "+t._s(e.date.toLocaleString())+"\n                            ")]),t._v(" "),a("v-list-item-title",[a("h5",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.subject))])]),t._v(" "),a("v-list-item-content",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.description))])],1)],1)],1)})),1)],1)],1):t._e(),t._v(" "),a("v-card",{attrs:{flat:""}},[a("v-data-table",{attrs:{headers:t.headers,items:t.table,"items-per-page":15,dense:"","fixed-header":!0,loading:t.loadingbar,search:t.search,height:"calc(100vh - 114px)"},scopedSlots:t._u([{key:"item",fn:function(e){var n=e.item;return[a("tr",[a("td",[t._v(" "+t._s(n.clientID)+" ")]),t._v(" "),a("td",[t._v(" "+t._s(n.client)+" ")]),t._v(" "),a("td",[a("v-btn",{attrs:{width:"100%",value:"recent",small:""},on:{click:function(e){return t.expand(n)}}},[a("v-icon",[t._v("mdi-history")]),t._v(" "),a("span",[t._v("History")])],1)],1),t._v(" "),a("td",[t._v("\n                        "+t._s(n.lastActivity)+"\n                    ")])])]}}])})],1)],1)};d._withStripped=!0;var u={name:"CostumerTable",props:{table:Array,loadingbar:Boolean,search:String},data:function(){return{dialog:!1,selected:null,headers:[{text:"Client ID",value:"clientID"},{text:"Client",value:"client"},{text:"Subject"},{text:"Last Activity"}]}},methods:{expand:function(t){this.dialog=!1,this.dialog=!0,this.selected=t}}},v=a(26),h=a(27),p=a.n(h),m=a(58),b=a(43),g=a(16),f=a(160),_=a(163),C=a(47),x=a(33),y=a(15),w=Object(v.a)(u,d,[],!1,null,null,null);p()(w,{VBtn:m.a,VCard:b.a,VCardText:g.a,VCardTitle:g.b,VDataTable:f.a,VDialog:_.a,VIcon:C.a,VListItem:x.a,VListItemContent:y.a,VListItemTitle:y.b}),w.options.__file="src/components/costumerTable.vue";var L=w.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"dormantTable"}},[null!==t.selected?a("v-dialog",{attrs:{id:"histDialog",scrollable:"","max-width":"60%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v("History "+t._s(t.selected.name))]),t._v(" "),a("v-card-text",{staticStyle:{height:"80vh"}},t._l(t.selected.history,(function(e,n){return a("v-card",{key:n,staticClass:"ma-1",attrs:{outlined:"",elevation:"5"}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-content",[a("div",{staticClass:"overline text-right",staticStyle:{"user-select":"text"}},[t._v("\n                                DS Customer Number: "+t._s(e.dsCustomerNumber.replace(" ","").replace(" ","").replace(" ",""))+"\n                                "),a("br"),t._v("\n                                "+t._s(e.date.toLocaleString())+"\n                            ")]),t._v(" "),a("v-list-item-title",[a("h5",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.subject))])]),t._v(" "),a("v-list-item-content",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.description))])],1)],1)],1)})),1)],1)],1):t._e(),t._v(" "),a("v-card",{attrs:{flat:""}},[a("v-data-table",{attrs:{headers:t.headers,items:t.table,"items-per-page":15,dense:"","fixed-header":!0,loading:t.loadingbar,search:t.search,height:"calc(100vh - 114px)"},scopedSlots:t._u([{key:"item",fn:function(e){var n=e.item;return[a("tr",[a("td",[t._v(" "+t._s(n.clientID)+" ")]),t._v(" "),a("td",[t._v(" "+t._s(n.client)+" ")]),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:""}},[t._v(" "+t._s(n.ALC2019)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:""}},[t._v(" "+t._s(n.YLC2019)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:"",color:"yellow"}},[t._v(" "+t._s(n.RLC2019)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:""}},[t._v(" "+t._s(n.ALC2018)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:""}},[t._v(" "+t._s(n.YLC2018)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{height:"90%",width:"100%","justify-content":"center"},attrs:{small:"",color:"yellow"}},[t._v(" "+t._s(n.RLC2018)+" ")])],1),t._v(" "),a("td",{staticClass:"text-center"},[n.hist?a("v-btn",{attrs:{value:"recent",small:"",rounded:""},on:{click:function(e){return t.expand(n.hist)}}},[t._v("\n                            "+t._s(n.hist.lastActivity)+"\n                        ")]):a("div",[t._v("-")])],1)])]}}])})],1)],1)};S._withStripped=!0;var D={name:"DormantTable",props:{table:Array,loadingbar:Boolean,search:String},data:function(){return{dialog:!1,selected:null,headers:[{text:"Client ID",value:"clientID"},{text:"Client",value:"client"},{text:"ALC 2019",value:"ALC2019"},{text:"YLC 2019",value:"YLC2019"},{text:"RLC 2019",value:"RLC2019"},{text:"ALC 2018",value:"ALC2018"},{text:"YLC 2018",value:"YLC2018"},{text:"RLC 2018",value:"RLC2018"},{text:"History",value:"hist"}]}},methods:{expand:function(t){this.dialog=!1,this.dialog=!0,this.selected=t}}},T=a(50),V=Object(v.a)(D,S,[],!1,null,null,null);p()(V,{VBtn:m.a,VCard:b.a,VCardText:g.a,VCardTitle:g.b,VChip:T.a,VDataTable:f.a,VDialog:_.a,VListItem:x.a,VListItemContent:y.a,VListItemTitle:y.b}),V.options.__file="src/components/dormantTable.vue";var A={name:"App",components:{costumerTable:L,dormantTable:V.exports},data:function(){return{lastmodif:"",table:[],dTable:[],tab:null,search:"",loadingbar:!0,dormantLoading:!0,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,e=this;widget.name="",e.loadingbar=!0,e.dormantLoading=!0,r.$on("onSearch",(function(t){e.search=t})),r.$on("reloadwidget",(function(){e.reload()})),void 0===widget.id?e.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{substring:function(t,e){if(void 0===t)return"";var a=t.substring(0,e);return a+(a.length<t.length?"...":"")},log:function(t){this.snackbarMsg=t,this.snackbar=!0},getCSRF:function(t,e){var a,n,i=this,s=i.tenants[i.tenantId]["3DSpace"];a=s+"/resources/v1/application/CSRF",n={onComplete:function(e){var a=JSON.parse(e);t(a.csrf.value)},onFailure:function(t){i.log(t),e()}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,n)}))},reload:function(){var t=this,e=widget.getValue("_FileKey_");e||(e=window.location.search.substring(1)),t.loadingbar=!0,t.dormantLoading=!0,t.tenantId=widget.getValue("_CurrentTenantID_"),t.table=[],t.dTable=[];var a=new XMLHttpRequest;a.open("GET","https://bcracker.dev/widgets/dormant/p_activities.php?key="+e,!0),a.send(null);var n=new XMLHttpRequest;n.open("GET","https://bcracker.dev/widgets/dormant/activities.php?key="+e,!0),n.send(null),n.onload=function(){for(var e=c(n.responseText,";"),i={},s=1;s<e.length;++s)if(void 0!==e[s][11]){var l=e[s][3],r=e[s][11].split("/"),o=r[1]+"/"+r[0]+"/"+r[2],d=new Date(o),u=(((new Date).getTime()-d.getTime())/864e5).toFixed(0).toString()+" days ago",v={subject:e[s][6],description:e[s][7],dsCustomerNumber:e[s][5],date:d};if(void 0!==i[l]){var h=i[l];t.table[h].lastActivityDate=d,t.table[h].lastActivity=u,t.table[h].history.unshift(v)}else i[l]=t.table.length,t.table.push({client:l,clientID:e[s][4],partner:e[s][8],lastActivityDate:d,lastActivity:u,history:[v]})}t.table.sort((function(t,e){return t.client<e.client?-1:t.client<e.client?1:0})),t.loadingbar=!1,console.log("http2.onload"),a.responseText?t.loadDormantAccounts(a.responseText):a.onload=function(){t.loadDormantAccounts(a.responseText)}}},findHistory:function(t,e){t=t.toLowerCase().replaceAll(" ",""),e=e.toLowerCase().replaceAll(" ","");for(var a=0;a<this.table.length;++a){var n=this.table[a].client.toLowerCase().replaceAll(" ","");if(this.table[a].clientID.toLowerCase().replaceAll(" ","").startsWith(e)||n.startsWith(t))return this.table[a]}return null},loadDormantAccounts:function(t){for(var e=c(t,";"),a=1;a<e.length;++a)if(!e[a][7]&&!e[a][12]){var n={clientID:e[a][0],client:e[a][1],industry:e[a][5],ALC2019:e[a][6],YLC2019:e[a][8],RLC2019:e[a][9],ALC2018:e[a][11],YLC2018:e[a][13],RLC2018:e[a][14],hist:null};if(void 0!==n.client){var i=this.findHistory(n.client,n.clientID);n.hist=i,this.dTable.push(n)}}this.dTable.sort((function(t,e){return t.client<e.client?-1:t.client<e.client?1:0})),this.dormantLoading=!1},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,n=0;n<t.length;n++)void 0!==t[n]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[n].platformId," - ").concat(t[n].displayName)}),this.tenants.push(t[n]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),r.$emit("reloadwidget")},getColor:function(t){return t%2==1?"white":"#EFEFEF"}}},I=(a(139),a(158)),k=a(159),R=a(164),j=a(162),E=a(152),F=a(149),$=a(151),H=Object(v.a)(A,s,[],!1,null,null,null);p()(H,{VApp:I.a,VIcon:C.a,VTab:k.a,VTabItem:R.a,VTabs:j.a,VTabsItems:E.a,VTabsSlider:F.a,VTextField:$.a}),H.options.__file="src/components/app.vue";var Y=H.exports,N=a(150);i.a.use(N.a);var q=new N.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){n.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new i.a({store:q,vuetify:o,render:function(t){return t(Y)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){r.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){r.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){r.$emit("onSearch","")}))}},37:function(t,e,a){var n=a(140);"string"==typeof n&&(n=[[t.i,n,""]]);var i={insert:"head",singleton:!1};a(25)(n,i);n.locals&&(t.exports=n.locals)}}]);