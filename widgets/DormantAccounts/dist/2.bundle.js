(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{20:function(t,e,n){var a=n(72);"string"==typeof a&&(a=[[t.i,a,""]]);var i={insert:"head",singleton:!1};n(19)(a,i);a.locals&&(t.exports=a.locals)},3:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n(5),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[null!==t.selected?n("v-dialog",{attrs:{scrollable:"","max-width":"60%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",[t._v("History "+t._s(t.selected.name))]),t._v(" "),n("v-card-text",{staticStyle:{height:"80vh"}},t._l(t.selected.history,(function(e,a){return n("v-card",{key:a,staticClass:"ma-1",attrs:{outlined:"",elevation:"5"}},[n("v-list-item",{attrs:{"three-line":""}},[n("v-list-item-content",[n("div",{staticClass:"overline text-right",staticStyle:{"user-select":"text"}},[t._v("\n                                DS Customer Number: "+t._s(e.dsCustomerNumber.replace(" ","").replace(" ","").replace(" ",""))+"\n                                "),n("br"),t._v("\n                                "+t._s(e.date.toLocaleString())+"\n                            ")]),t._v(" "),n("v-list-item-title",[n("h5",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.subject))])]),t._v(" "),n("v-list-item-content",{staticStyle:{"user-select":"text"}},[t._v(t._s(e.description))])],1)],1)],1)})),1)],1)],1):t._e(),t._v(" "),n("v-card",{attrs:{flat:""}},[n("v-data-table",{attrs:{headers:t.headers,items:t.table,"items-per-page":-1,dense:"","fixed-header":!0,loading:t.loadingbar,height:"calc(100vh - 60px)"},scopedSlots:t._u([{key:"item",fn:function(e){var a=e.item;return[n("tr",[n("td",[t._v(" "+t._s(a.partner)+" ")]),t._v(" "),n("td",[t._v(" "+t._s(a.name)+" ")]),t._v(" "),n("td",[n("v-btn",{staticStyle:{"justify-content":"left","user-select":"text"},attrs:{value:"recent",width:"400",small:""},on:{click:function(e){return t.expand(a)}}},[n("v-icon",[t._v("mdi-history")]),t._v(" "),n("span",[t._v(t._s(t.substring(a.history[0].subject,43)))])],1)],1),t._v(" "),n("td",[t._v("\n                        "+t._s(a.lastActivity)+"\n                    ")])])]}}])})],1)],1)};r._withStripped=!0;var s=n(144);n(53),n(60);i.a.use(s.a);var o=new i.a,l=new s.a({icons:{iconfont:"mdi"}});var c={name:"App",components:{},data:function(){return{lastmodif:"",table:[],headers:[{text:"Partner"},{text:"Owner"},{text:"Subject"},{text:"Last Activity"}],loadingbar:!0,dialog:!1,selected:null,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,e=this;widget.name="",e.loadingbar=!0,o.$on("onSearch",(function(t){e.search=t})),o.$on("reloadwidget",(function(){e.reload()})),void 0===widget.id?e.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{substring:function(t,e){if(void 0===t)return"";var n=t.substring(0,e);return n+(n.length<t.length?"...":"")},expand:function(t){this.dialog=!0,this.selected=t},log:function(t){this.snackbarMsg=t,this.snackbar=!0},getCSRF:function(t,e){var n,a,i=this,r=i.tenants[i.tenantId]["3DSpace"];n=r+"/resources/v1/application/CSRF",a={onComplete:function(e){var n=JSON.parse(e);t(n.csrf.value)},onFailure:function(t){i.log(t),e()}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(n,a)}))},reload:function(){var t=this,e=widget.getValue("_FileKey_");e||(e=window.location.search.substring(1)),t.loadingbar=!0,t.tenantId=widget.getValue("_CurrentTenantID_");var n=new XMLHttpRequest;n.open("GET","https://bcracker.dev/widgets/dormant/activities.php?key="+e,!0),n.send(null),t.table=[],n.onload=function(){for(var e=function(t,e){e=e||",";for(var n=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),a=[[]],i=null,r=null;i=n.exec(t);){var s=i[1];s.length&&s!==e&&a.push([]),r=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],a[a.length-1].push(r)}return a}(n.responseText,";"),a={},i=1;i<e.length;++i)if(void 0!==e[i][11]){var r=e[i][0].split(","),s=r[0].toUpperCase()+" "+r[1],o=e[i][11].split("/"),l=o[1]+"/"+o[0]+"/"+o[2],c=new Date(l),d=(((new Date).getTime()-c.getTime())/864e5).toFixed(0).toString()+" days ago",u={subject:e[i][6],description:e[i][7],dsCustomerNumber:e[i][5],date:c};if(void 0!==a[s]){var v=a[s];t.table[v].lastActivityDate=c,t.table[v].lastActivity=d,t.table[v].history.unshift(u)}else a[s]=t.table.length,t.table.push({name:s,partner:e[i][8],lastActivityDate:c,lastActivity:d,history:[u]})}t.table.sort((function(t,e){return t.name<e.name?-1:t.name<e.name?1:0})),t.loadingbar=!1}},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],n=0,a=0;a<t.length;a++)void 0!==t[a]["3DSpace"]&&(e.push({value:"".concat(n++),label:"".concat(t[a].platformId," - ").concat(t[a].displayName)}),this.tenants.push(t[a]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),o.$emit("reloadwidget")},getColor:function(t){return t%2==1?"white":"#EFEFEF"}}},d=(n(71),n(73)),u=n(74),v=n.n(u),p=n(142),f=n(50),g=n(34),h=n(25),m=n(143),b=n(145),w=n(39),_=n(27),y=n(18),S=Object(d.a)(c,r,[],!1,null,null,null);v()(S,{VApp:p.a,VBtn:f.a,VCard:g.a,VCardText:h.a,VCardTitle:h.b,VDataTable:m.a,VDialog:b.a,VIcon:w.a,VListItem:_.a,VListItemContent:y.a,VListItemTitle:y.b}),S.options.__file="src/components/app.vue";var x=S.exports,C=n(135);i.a.use(C.a);var D=new C.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){a.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new i.a({store:D,vuetify:l,render:function(t){return t(x)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){o.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){o.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){o.$emit("onSearch","")}))}},71:function(t,e,n){"use strict";var a=n(20);n.n(a).a},72:function(t,e,n){(t.exports=n(6)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])}}]);