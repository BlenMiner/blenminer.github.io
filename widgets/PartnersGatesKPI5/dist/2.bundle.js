(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{18:function(t,e,a){var s=a(58);"string"==typeof s&&(s=[[t.i,s,""]]);var i={insert:"head",singleton:!1};a(17)(s,i);s.locals&&(t.exports=s.locals)},3:function(t,e,a){"use strict";a.r(e);var s=a(0),i=a(4),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-card",{attrs:{flat:""}},[a("v-dialog",{attrs:{persistent:"","min-width":"400"},model:{value:t.permissionsDialog,callback:function(e){t.permissionsDialog=e},expression:"permissionsDialog"}},[a("v-card",[a("v-toolbar",{attrs:{color:"#4b839e",dark:""}},[a("v-toolbar-title",[t._v("Pick the partners you want to see")]),t._v(" "),a("v-spacer"),t._v(" "),a("v-btn",{attrs:{text:"",small:""},on:{click:function(e){return t.selectall()}}},[t._v("Select All")]),t._v(" /\n                    "),a("v-btn",{attrs:{text:"",small:""},on:{click:function(e){return t.deselectall()}}},[t._v("Deselect All")])],1),t._v(" "),a("v-card-text",[a("v-list",{staticClass:"overflow-y-auto",attrs:{height:"60vh",dense:""}},[a("v-list-item-group",{attrs:{multiple:"",color:"black"},model:{value:t.permissionsSelection,callback:function(e){t.permissionsSelection=e},expression:"permissionsSelection"}},t._l(t.sortedDatabase,(function(e,s){return a("v-list-item",{key:s},[a("v-list-item-content",[t.permissionsSelection&&t.permissionsSelection.includes(s)?a("v-list-item-title",{staticStyle:{color:"black"},domProps:{textContent:t._s(e)}}):a("v-list-item-title",{staticStyle:{color:"#BBB"},domProps:{textContent:t._s(e)}})],1)],1)})),1)],1)],1),t._v(" "),a("v-card-actions",[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{color:"green darken-1",dark:""},on:{click:function(e){t.permissionsDialog=!1,t.applyselection()}}},[t._v("Confirm Selection")])],1)],1)],1),t._v(" "),a("v-simple-table",{attrs:{dense:"","fixed-header":!0,height:"calc(100vh - 30px)"},scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v("Partner")]),t._v(" "),a("th",{staticClass:"text-left"},[t._v("Country")]),t._v(" "),a("th",{staticClass:"text-center"},[t._v("Range")]),t._v(" "),a("th",{staticClass:"text-center"},[t._v("Total Credits")]),t._v(" "),a("th",{staticClass:"text-center"},[t._v("Total KPI")])])]),t._v(" "),a("tbody",t._l(t.filteredDatabase,(function(e,s){return a("tr",{key:s,style:{"background-color":t.getColor(s)}},[a("td",[t._v(t._s(e))]),t._v(" "),a("td",[t._v(t._s(t.database[e].length>0?t.database[e][0].country:"?"))]),t._v(" "),a("td",{staticClass:"text-center"},[a("b",{staticStyle:{color:"#a74796"}},[t._v(t._s(t.rangesData[e].min))]),t._v(" - "),a("b",{staticStyle:{color:"#4cb786"}},[t._v(t._s(t.rangesData[e].max))])]),t._v(" "),a("td",{staticClass:"text-center",attrs:{width:"120"}},[a("v-chip",{attrs:{color:"#555555",dark:""}},[t._v("\n                            "+t._s(t.getTotalCredits(e).toFixed(1))+"\n                        ")])],1),t._v(" "),a("td",{staticClass:"text-center",attrs:{width:"120"}},[a("v-chip",{attrs:{color:t.getKPI5Color(t.rangesData[e].min,t.rangesData[e].max,t.getTotalCredits(e),t.getDistinc(e)),dark:""}},[t._v("\n                            "+t._s(t.getKPI5(t.rangesData[e].min,t.rangesData[e].max,t.getTotalCredits(e),t.getDistinc(e)))+"\n                        ")])],1)])})),0)]},proxy:!0}])}),t._v(" "),a("hr"),t._v(" "),a("table",{staticClass:"ma-0 pa-0",attrs:{width:"100%"}},[a("tr",[a("td",{staticClass:"text-left",staticStyle:{overflow:"hidden"}},[a("a",{staticStyle:{color:"#555"},on:{click:function(e){t.permissionsDialog=!0}}},[a("u",[t._v("Change selection")])])]),t._v(" "),a("td",{staticClass:"text-right",staticStyle:{color:"#555",overflow:"hidden"}},[t._v("Creator: VBU4, Last update: "+t._s(t.lastmodif))])])])],1)],1)};r._withStripped=!0;var o=a(118);a(39),a(46);i.a.use(o.a);var n=new i.a,l=new o.a({icons:{iconfont:"mdi"}});function c(t,e){e=e||",";for(var a=new RegExp("(\\"+e+'|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\'+e+"\\r\\n]*))","gi"),s=[[]],i=null,r=null;i=a.exec(t);){var o=i[1];o.length&&o!==e&&s.push([]),r=i[2]?i[2].replace(new RegExp('""',"g"),'"'):i[3],s[s.length-1].push(r)}return s}var d={name:"App",components:{},data:function(){return{value:"",dialog:null,table:null,categories:null,tab:null,lastmodif:"",permissionsDialog:!0,permissionsSelection:null,loadprefsdialog:!1,rangesData:{},database:{},sortedDatabase:[],filteredDatabase:[],databaseCategories:{},loadingbar:!0,snackbarMsg:"",snackbar:!1,tenantId:-1,tenants:[]}},computed:{message:function(){return this.$store.state.message}},mounted:function(){var t=this,e=this;e.loadingbar=!0,widget.setTitle(""),n.$on("onSearch",(function(t){e.search=t})),n.$on("reloadwidget",(function(){e.reload()})),void 0===widget.id?e.tenantDataLoaded([{id:-1}]):requirejs(["DS/i3DXCompassServices/i3DXCompassServices"],(function(e){e.getPlatformServices({platformId:void 0,onComplete:t.tenantDataLoaded})}))},methods:{log:function(t){this.snackbarMsg=t,this.snackbar=!0},selectall:function(){for(var t=0;t<this.sortedDatabase.length;++t)this.permissionsSelection.includes(t)||this.permissionsSelection.push(t)},deselectall:function(){this.permissionsSelection=[]},applyselection:function(){this.filteredDatabase=[];for(var t=0;t<this.permissionsSelection.length;++t)this.filteredDatabase.push(this.sortedDatabase[this.permissionsSelection[t]]);var e=JSON.stringify(this.permissionsSelection);widget.setValue("_SavedSelection_",e),function(t,e,a){var s=new Date;s.setTime(s.getTime()+24*a*60*60*1e3);var i="expires="+s.toUTCString();document.cookie=t+"="+e+";"+i+";path=/"}("selection",e,1)},filterCertificates:function(t){for(var e=0,a=0,s=0,i=function(e,a,s){for(var i=0;i<t.length;++i)if(t[i].Name.toLowerCase()===e.toLowerCase()+" "+a.toLowerCase()&&s<=new Date(t[i].Added))return!0;return!1},r=1;r<this.table.length;++r){var o=new Date,n=this.table[r][14].split(" ")[0].split("/"),l=new Date(n[2],n[0]-1,n[1]),c=this.table[r][13].split(" ")[0].split("/"),d=new Date(c[2],c[1]-1,c[0]);i(this.table[r][4],this.table[r][5],d)?a++:o>l?(++e,this.table.splice(r++,1)):"NO"===this.table[r][15]&&(++s,this.table.splice(r++,1))}console.log("Expired: "+e),console.log("Obsolete: "+a),console.log("Invalid: "+s)},tenantDataLoaded:function(t){this.tenants=[];for(var e=[],a=0,s=0;s<t.length;s++)void 0!==t[s]["3DSpace"]&&(e.push({value:"".concat(a++),label:"".concat(t[s].platformId," - ").concat(t[s].displayName)}),this.tenants.push(t[s]));widget.addPreference({name:"_CurrentTenantID_",type:"list",label:"Tenant",defaultValue:"0",options:e}),widget.addPreference({name:"_FileKey_",type:"text",label:"File Key",defaultValue:""}),widget.addPreference({name:"_SavedSelection_",type:"hidden",label:"Saved Selection",defaultValue:"[]"}),this.permissionsSelection=JSON.parse(widget.getValue("_SavedSelection_")),""===this.permissionsSelection&&(this.permissionsSelection=JSON.parse(function(t){for(var e=t+"=",a=decodeURIComponent(document.cookie).split(";"),s=0;s<a.length;s++){for(var i=a[s];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return""}("selection"))),n.$emit("reloadwidget")},getCSRF:function(t,e){var a,s,i=this,r=i.tenants[i.tenantId]["3DSpace"];a=r+"/resources/v1/application/CSRF",s={onComplete:function(e){var a=JSON.parse(e);t(a.csrf.value)},onFailure:function(t){i.log(t),e()}},requirejs(["DS/WAFData/WAFData"],(function(t){t.authenticatedRequest(a,s)}))},getColor:function(t){return t%2==1?"white":"#EFEFEF"},getTotalCredits:function(t){if(!this.databaseCategories||!this.databaseCategories[t])return 0;for(var e=0,a=0;a<this.databaseCategories[t].length;++a){var s=this.databaseCategories[t][a];e+=s.count*s.credits}return e},getDistinc:function(t){if(!this.databaseCategories||!this.databaseCategories[t]||0==this.databaseCategories[t].length)return 0;for(var e=this.databaseCategories[t][0].category,a=0,s=0,i=0;i<this.databaseCategories[t].length;++i){var r=this.databaseCategories[t][i];r.category!==e&&(s+=0!==a?1:0,e=r.category,a=0),a+=r.count&&0!=r.count?1:0}return s+=0!==a?1:0},getKPI5:function(t,e,a,s){return a>=t?a>=e&&s>=5?10:5:0},getKPI5Color:function(t,e,a,s){switch(this.getKPI5(t,e,a,s)){case 10:return"#4b9e6c";case 5:return"#4b839e";default:return"#9e4b4b"}},loadData:function(t){for(var e=0;e<this.databaseCategories.categories.length;++e){this.databaseCategories.categories[e].count=0}if(void 0!==this.databaseCategories[t])for(var a=0;a<this.databaseCategories[t].length;++a)for(var s=this.databaseCategories[t][a],i=0;i<this.databaseCategories.categories.length;++i){var r=this.databaseCategories.categories[i];r.category==s.category&&r.subcategory==s.subcategory&&(r.count=s.count)}},addCategoryItem:function(t,e,a,s){var i=!1,r="categories"===t;if(this.databaseCategories[t]){for(var o=0;o<this.databaseCategories[t].length;++o){var n=this.databaseCategories[t][o];if(n.category===e&&n.subcategory===a)return n.count+=r?0:1,void(i=!0)}i||this.databaseCategories[t].push({category:e,subcategory:a,credits:Number(s.replace(/,/g,".")),count:r?0:1,color:0})}else console.error(t+" doesn't have other licenses?")},getRanges:function(t,e){for(var a=0;a<e.length;++a)if(e[a][0]==t){var s=e[a][1].split(" ET ");return{min:s[0],max:s[1]}}return{min:"NAN",max:"NAN"}},reload:function(){var t=widget.getPreference("_FileKey_").value;t||(t=window.location.search.substring(1));var e=new XMLHttpRequest;e.open("GET","https://bcracker.dev/widgets/database_kpi.php?key="+t,!1),e.send(null),this.table=c(e.responseText,";"),e.open("GET","https://bcracker.dev/widgets/obsolete.php?key="+t,!1),e.send(null);var a=JSON.parse(e.responseText);this.filterCertificates(a),e.open("GET","https://bcracker.dev/widgets/cert_category.php?key="+t,!1),e.send(null),this.categories=c(e.responseText,";"),e.open("GET","https://bcracker.dev/widgets/smec.php?key="+t,!1),e.send(null);c(e.responseText,";");e.open("GET","https://bcracker.dev/widgets/ranges.php?key="+t,!1),e.send(null);var s=c(e.responseText,";");e.open("GET","https://bcracker.dev/widgets/getlastupdate.php",!1),e.send(null),this.lastmodif=e.responseText,this.sortedDatabase.splice(0,this.sortedDatabase.length),this.database={},this.databaseCategories={};for(var r=1;r<this.table.length;r++){var o=this.table[r][1];if(o){for(var n=this.table[r][3].split("[")[1].substring(0,15),l=this.table[r][9],d=!1,g="Brand_Essentials",h="Brand Articulate",u="0,5",p=1;p<this.categories.length;++p)if(this.categories[p][0]===l){g=this.categories[p][1],h=this.categories[p][2],u=this.categories[p][3],d=!0;break}void 0===this.database[o]&&(this.sortedDatabase.push(o),i.a.set(this.database,o,[]),i.a.set(this.databaseCategories,o,[])),d?this.addCategoryItem(o,g,h,u):l.startsWith("SMEC")?this.addCategoryItem(o,"Sales","Sales_SMEC","4"):console.error(l+" doesn't exist in the list.");var v={partnerId:n,certName:l,certExpiration:this.table[r][14],certProfile:this.table[r][11],certAxis:this.table[r][10],certCategory:this.table[r][12],country:this.table[r][7],category:g,subcategory:h,credits:u},f=this.getRanges(o,s);i.a.set(this.rangesData,o,f),this.database[o].push(v)}}console.log(this.database),i.a.set(this.databaseCategories,"categories",[]);for(var b=2;b<this.categories.length;b++){var m=this.categories[b][1],C=this.categories[b][2],_=this.categories[b][3];void 0!==_&&this.addCategoryItem("categories",m,C,_)}for(var y in this.sortedDatabase.sort((function(t,e){return e<t?1:e>t?-1:0})),this.databaseCategories)if(this.databaseCategories[y].sort((function(t,e){return t.category<e.category?-1:t.category>e.category?1:0})),this.databaseCategories[y].length>0)for(var S=this.databaseCategories[y][0],w=0,D=0;D<this.databaseCategories[y].length;++D)S.category!==this.databaseCategories[y][D].category&&++w,(S=this.databaseCategories[y][D]).color=w},parse_query_string:function(t){for(var e=t.split("&"),a={},s=0;s<e.length;s++){var i=e[s].split("="),r=decodeURIComponent(i[0]),o=decodeURIComponent(i[1]);if(void 0===a[r])a[r]=decodeURIComponent(o);else if("string"==typeof a[r]){var n=[a[r],decodeURIComponent(o)];a[r]=n}else a[r].push(decodeURIComponent(o))}}}},g=(a(57),a(59)),h=a(60),u=a.n(h),p=a(114),v=a(120),f=a(36),b=a(24),m=a(115),C=a(119),_=a(33),y=a(25),S=a(13),w=a(37),D=a(116),x=a(117),k=a(35),T=a(34),I=Object(g.a)(d,r,[],!1,null,null,null);u()(I,{VApp:p.a,VBtn:v.a,VCard:f.a,VCardActions:b.a,VCardText:b.b,VChip:m.a,VDialog:C.a,VList:_.a,VListItem:y.a,VListItemContent:S.a,VListItemGroup:w.a,VListItemTitle:S.b,VSimpleTable:D.a,VSpacer:x.a,VToolbar:k.a,VToolbarTitle:T.a}),I.options.__file="src/components/app.vue";var V=I.exports,E=a(105);i.a.use(E.a);var R=new E.a.Store({state:{},mutations:{},getters:{}});e.default=function(){widget.addEvent("onLoad",(function(){s.b.disableCSS(!0),window.title="Tablue Vue",widget.setTitle(window.title),new i.a({store:R,vuetify:l,render:function(t){return t(V)}}).$mount("app")})),widget.addEvent("onRefresh",(function(){n.$emit("reloadwidget")})),widget.addEvent("onSearch",(function(t){n.$emit("onSearch",t)})),widget.addEvent("onResetSearch",(function(){n.$emit("onSearch","")}))}},57:function(t,e,a){"use strict";var s=a(18);a.n(s).a},58:function(t,e,a){(t.exports=a(5)(!1)).push([t.i,"\nhtml, body {\r\n    overflow-y: auto !important;\r\n    width: 100%;\r\n    padding: 0;\r\n    margin: 0;\r\n    background-color:#ffffff;\n}\r\n",""])}}]);