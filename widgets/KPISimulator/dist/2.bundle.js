(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{22:function(t,e,a){var s=a(71);"string"==typeof s&&(s=[[t.i,s,""]]);var i={insert:"head",singleton:!1};a(21)(s,i);s.locals&&(t.exports=s.locals)},3:function(t,e,a){"use strict";a.r(e);var s=a(0),i=a(7),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-footer",{attrs:{fixed:"",padless:!0}},[a("v-card",{staticClass:"text-center",attrs:{flat:"",tile:"",height:"80",width:"100%",color:"#efefef",elevation:"24",raised:""}},[a("v-card-text",{staticClass:"black--text pa-2"},[a("table",{attrs:{width:"100%"}},[a("tr",[a("td",{staticClass:"text-left",attrs:{width:"300"}},[t._v("Credits : "+t._s(t.getTotalCredits().toFixed(1)))]),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{width:"200px"},attrs:{color:"#00857c",dark:""}},[t._v("\n                                Sim KPI : "+t._s(t.getKPI5(t.min,t.max,t.getTotalCredits()+t.getSimulatedTotalCredits(),t.getSimulatedDistinc()))+"\n                            ")])],1),t._v(" "),a("td",{staticClass:"text-right",attrs:{width:"300"}},[t._v("Simulated Credits : "+t._s((t.getTotalCredits()+t.getSimulatedTotalCredits()).toFixed(1)))])]),t._v(" "),a("tr",[a("td",{staticClass:"text-left",attrs:{width:"300"}},[t._v("Distinct : "+t._s(t.getDistinc()))]),t._v(" "),a("td",{staticClass:"text-center"},[a("v-chip",{staticStyle:{width:"200px"},attrs:{color:"#00852c",dark:""}},[t._v("\n                                KPI : "+t._s(t.getKPI5(t.min,t.max,t.getTotalCredits(),t.getDistinc()))+"\n                            ")])],1),t._v(" "),a("td",{staticClass:"text-right",attrs:{width:"300"}},[t._v("Simulated Distinct : "+t._s(t.getSimulatedDistinc()))])])])])],1)],1),t._v(" "),a("v-dialog",{attrs:{width:"500"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[a("table",{attrs:{width:"100%"}},[a("tr",[a("td",[t._v("Ranges: ")]),t._v(" "),a("td",[a("v-text-field",{staticClass:"mx-4",attrs:{label:"Outlined",placeholder:"Min",dense:"","single-line":"",type:"Number","hide-details":"",clearable:""},model:{value:t.min,callback:function(e){t.min=e},expression:"min"}})],1),t._v(" "),a("td",[t._v("-")]),t._v(" "),a("td",[a("v-text-field",{staticClass:"mx-4",attrs:{label:"Outlined",placeholder:"Max",dense:"","single-line":"",type:"Number","hide-details":"",clearable:""},model:{value:t.max,callback:function(e){t.max=e},expression:"max"}})],1),t._v(" "),a("td",{staticClass:"text-right",attrs:{width:"200px"}},[a("v-btn",t._g({attrs:{color:"green darken-1",dark:"",text:"",width:"100%"}},s),[t._v("\n                            Load from partner\n                        ")])],1)])]),t._v(" "),a("hr")]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),a("v-card",[a("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v("\n                Load From Partner\n            ")]),t._v(" "),a("v-card-text",[a("br"),t._v('\n                Select a partner and click the "Load Data" button.\n                '),a("v-overflow-btn",{staticClass:"my-2",attrs:{items:t.sortedDatabase,label:"No selection",editable:""},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),t._v(" "),a("v-divider"),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.loadData(t.value),t.dialog=!1}}},[t._v("\n                    Load Data\n                ")])],1)],1)],1),t._v(" "),a("v-card",{attrs:{flat:""}},[a("v-simple-table",{attrs:{dense:"","fixed-header":!0,height:"calc(100vh - 120px)"},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Category")]),t._v(" "),a("th",{staticClass:"text-right"},[t._v("Sub-Category")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Credits")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{width:"200"}},[t._v("Count")]),t._v(" "),a("th",{staticClass:"text-center",attrs:{width:"200"}},[t._v("Simulation")])])]),t._v(" "),a("tbody",t._l(t.databaseCategories.categories,(function(e,s){return a("tr",{key:s,style:{"background-color":t.getColor(e.color)}},[a("td",[t._v(t._s(e.category))]),t._v(" "),a("td",{staticClass:"text-right"},[t._v(t._s(e.subcategory))]),t._v(" "),a("td",{attrs:{width:"200"}},[a("v-chip",{attrs:{color:"#555",dark:""}},[t._v("\n                            "+t._s(e.credits)+"\n                        ")])],1),t._v(" "),a("td",{attrs:{width:"120"}},[a("v-chip",{staticStyle:{width:"100%"},attrs:{color:"#005685",dark:""}},[t._v("\n                            "+t._s(e.count?e.count:0)+"\n                        ")])],1),t._v(" "),a("td",[a("v-text-field",{staticClass:"elevation-2",attrs:{label:"Outlined",placeholder:"Sim Count",rounded:"",dense:"","single-line":"",type:"Number","hide-details":"",clearable:""},model:{value:e.simcount,callback:function(a){t.$set(e,"simcount",a)},expression:"item.simcount"}})],1)])})),0)]},proxy:!0}])})],1)],1)};r._withStripped=!0;var o=a(150);a(52),a(59);i.a.use(o.a);var n=new i.a,l=new o.a({icons:{iconfont:"mdi"}});function c(t,e){e=e||",";for(var a=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),s=[[]],i=null,r=null;i=a.exec(t);){var o=i[1];o.length&&o!==e&&s.push([]),r=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],s[s.length-1].push(r)}return s}var d={name:"App",components:{},data:function(){return{min:void 0,max:void 0,value:"",dialog:null,table:null,categories:null,tab:null,headers:[{text:"Category",value:"category"},{text:"Sub-Category",value:"subcategory"},{text:"Credits",value:"credits"},{text:"Number of Certifications",value:"count"},{text:"Total Credits",value:"count"}],rangesData:{},database:{},sortedDatabase:[],databaseCategories:{},loadingbar:!0,snackbarMsg:"",snackbar:!1,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,e=this;e.loadingbar=!0,n.$on("onSearch",(function(t){e.search=t})),n.$on("reloadwidget",(function(){e.reload()})),void 0===widget.id?e.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{log:function(t){this.snackbarMsg=t,this.snackbar=!0},filterCertificates:function(){for(var t=0,e=0;e<this.table.length;++e){var a=new Date,s=this.table[e][9].split(" ")[0].split("/");a>new Date(s[2],s[1]-1,s[0])&&(++t,this.table.splice(e++,1))}console.log("Expired: "+t)},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,s=0;s<t.length;s++)void 0!==t[s]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[s].platformId," - ").concat(t[s].displayName)}),this.tenants.push(t[s]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),n.$emit("reloadwidget")},getCSRF:function(t,e){var a,s,i=this,r=i.tenants[i.tenantId]["3DSpace"];a=r+"/resources/v1/application/CSRF",s={onComplete:function(e){var a=JSON.parse(e);t(a.csrf.value)},onFailure:function(t){i.log(t),e()}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,s)}))},getColor:function(t){return t%2==1?"white":"#EFEFEF"},getKPI5:function(t,e,a,s){return a>=t?a>=e&&s>=5?10:5:0},getRanges:function(t,e){for(var a=0;a<e.length;++a)if(e[a][0]==t){var s=e[a][1].split(" ET ");return{min:s[0],max:s[1]}}},getTotalCredits:function(){if(!this.databaseCategories||!this.databaseCategories.categories)return 0;for(var t=0,e=0;e<this.databaseCategories.categories.length;++e){var a=this.databaseCategories.categories[e];t+=a.count*a.credits}return t},getSimulatedTotalCredits:function(){if(!this.databaseCategories||!this.databaseCategories.categories)return 0;for(var t=0,e=0;e<this.databaseCategories.categories.length;++e){var a=this.databaseCategories.categories[e];t+=(a.simcount?a.simcount:0)*a.credits}return t},getDistinc:function(){if(!this.databaseCategories||!this.databaseCategories.categories)return 0;for(var t=0,e=0;e<this.databaseCategories.categories.length;++e){var a=this.databaseCategories.categories[e];t+=a.count&&0!=a.count?1:0}return t},getSimulatedDistinc:function(){if(!this.databaseCategories||!this.databaseCategories.categories)return 0;for(var t=0,e=0;e<this.databaseCategories.categories.length;++e){var a=this.databaseCategories.categories[e];t+=Number(void 0===a.count?0:a.count)+Number(void 0===a.simcount?0:a.simcount)<=0?0:1}return t},loadData:function(t){for(var e=0;e<this.databaseCategories.categories.length;++e){this.databaseCategories.categories[e].count=0}if(void 0!==this.databaseCategories[t])for(var a=0;a<this.databaseCategories[t].length;++a)for(var s=this.databaseCategories[t][a],i=0;i<this.databaseCategories.categories.length;++i){var r=this.databaseCategories.categories[i];r.category==s.category&&r.subcategory==s.subcategory&&(r.count=s.count)}var o=this.rangesData[t];this.min=o.min,this.max=o.max},addCategoryItem:function(t,e,a,s){var i=!1,r="categories"===t;if(this.databaseCategories[t]){for(var o=0;o<this.databaseCategories[t].length;++o){var n=this.databaseCategories[t][o];if(n.category===e&&n.subcategory===a)return n.count+=r?0:1,void(i=!0)}i||this.databaseCategories[t].push({category:e,subcategory:a,credits:Number(s.replace(/,/g,".")),count:r?0:1,color:0})}else console.error(t+" doesn't have other licenses?")},reload:function(){if(null==this.table||0==this.table.length){var t=this,e=widget.getPreference("_FileKey_").value,a=new XMLHttpRequest;a.open("GET","https://bcracker.dev/widgets/database_kpi.php?key="+e,!1),a.send(null),this.table=c(a.responseText,";"),this.filterCertificates(),a.open("GET","https://bcracker.dev/widgets/cert_category.php?key="+e,!1),a.send(null),this.categories=c(a.responseText,";"),a.open("GET","https://bcracker.dev/widgets/smec.php?key="+e,!1),a.send(null);var s=c(a.responseText,";");a.open("GET","https://bcracker.dev/widgets/ranges.php?key="+e,!1),a.send(null);var r=c(a.responseText,";");this.sortedDatabase.splice(0,this.sortedDatabase.length),this.database={},this.databaseCategories={};for(var o=1;o<this.table.length;o++){var n=this.table[o][0];if(n){var l=n.split("[")[1].slice(0,-1);n=n.split("[")[0].slice(0,-1);for(var d=this.table[o][7],g=!1,h="Brand_Essentials",u="Brand Articulate",v="0,5",b=1;b<this.categories.length;++b)if(this.categories[b][0]===d){h=this.categories[b][1],u=this.categories[b][2],v=this.categories[b][3],g=!0;break}void 0===this.database[n]&&(this.sortedDatabase.push(n),i.a.set(this.database,n,[]),i.a.set(this.databaseCategories,n,[])),g||console.error(d+" doesn't exist in the list.");var f={partnerId:l,certName:d,certExpiration:this.table[o][9],certProfile:this.table[o][11],certAxis:this.table[o][12],certCategory:this.table[o][13],category:h,subcategory:u,credits:v},p=this.getRanges(n,r);i.a.set(this.rangesData,n,p),this.database[n].push(f),this.addCategoryItem(n,h,u,v)}}i.a.set(this.databaseCategories,"categories",[]);for(var C=2;C<this.categories.length;C++){var m=this.categories[C][1],_=this.categories[C][2],x=this.categories[C][3];void 0!==x&&this.addCategoryItem("categories",m,_,x)}for(var y=5;y<s.length;y++){var w=s[y][10],S=s[y][26];w&&(w=w.split("[")[0].slice(0,-1),"Finished"===S&&"3D"!==w&&this.addCategoryItem(w,"Sales","Sales_SMEC","4"))}for(var D in this.sortedDatabase.sort((function(e,a){var s=t.database[e].length,i=t.database[a].length;return s<i?1:s>i?-1:0})),this.databaseCategories)if(this.databaseCategories[D].sort((function(t,e){return t.category<e.category?-1:t.category>e.category?1:0})),this.databaseCategories[D].length>0)for(var k=this.databaseCategories[D][0],T=0,E=0;E<this.databaseCategories[D].length;++E)k.category!==this.databaseCategories[D][E].category&&++T,(k=this.databaseCategories[D][E]).color=T}}}},g=(a(70),a(72)),h=a(73),u=a.n(h),v=a(146),b=a(50),f=a(32),p=a(18),C=a(35),m=a(151),_=a(45),x=a(152),y=a(149),w=a(147),S=a(148),D=a(27),k=Object(g.a)(d,r,[],!1,null,null,null);u()(k,{VApp:v.a,VBtn:b.a,VCard:f.a,VCardActions:p.a,VCardText:p.b,VCardTitle:p.c,VChip:C.a,VDialog:m.a,VDivider:_.a,VFooter:x.a,VOverflowBtn:y.a,VSimpleTable:w.a,VSpacer:S.a,VTextField:D.a}),k.options.__file="src/components/app.vue";var T=k.exports,E=a(136);i.a.use(E.a);var F=new E.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){s.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new i.a({store:F,vuetify:l,render:function(t){return t(T)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){n.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){n.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){n.$emit("onSearch","")}))}},70:function(t,e,a){"use strict";var s=a(22);a.n(s).a},71:function(t,e,a){(t.exports=a(4)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])}}]);