<template>
    <v-app>
        <v-card flat>

            <v-dialog v-model="permissionsDialog" persistent min-width="400">
                <v-card>
                    <v-toolbar
                        color="#4b839e"
                        dark
                    >
                        <v-toolbar-title>Pick the partners you want to see</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text small @click="selectall()">Select All</v-btn> /
                        <v-btn text small @click="deselectall()">Deselect All</v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-list height="60vh" class="overflow-y-auto" dense>
                            <v-list-item-group v-model="permissionsSelection" multiple color="black">
                                <v-list-item
                                    v-for="(item, i) in sortedDatabase"
                                    :key="i"
                                >
                                <v-list-item-content>
                                    <v-list-item-title v-if="permissionsSelection && permissionsSelection.includes(i)" v-text="item" style="color: black;"></v-list-item-title>
                                    <v-list-item-title v-else v-text="item" style="color: #BBB;"></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" dark @click="permissionsDialog = false; applyselection();">Confirm Selection</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-simple-table dense :fixed-header="true" height="calc(100vh - 30px)">
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Partner</th>
                        <th class="text-left">Country</th>
                        <th class="text-center">Range</th>
                        <th class="text-center">Total Credits</th>
                        <th class="text-center">Total KPI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in filteredDatabase" :key="i" :style="{'background-color': getColor(i)}">
                        <td>{{ item }}</td>
                        <td>{{ database[item].length > 0 ? database[item][0].country : "?" }}</td>
                        <td class="text-center"><b style="color:#a74796;">{{ rangesData[item].min }}</b> - <b style="color:#4cb786;">{{ rangesData[item].max }}</b></td>
                        <td width="120" class="text-center">
                            <v-chip color="#555555" dark>
                                {{ getTotalCredits(item).toFixed(1) }}
                            </v-chip>
                        </td>
                        <td width="120" class="text-center">
                            <v-chip :color="getKPI5Color(rangesData[item].min , rangesData[item].max, getTotalCredits(item), getDistinc(item))" dark>
                                {{ getKPI5(rangesData[item].min , rangesData[item].max, getTotalCredits(item), getDistinc(item)) }}
                            </v-chip>
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>

            <hr/>
            <table class="ma-0 pa-0" width="100%">
                <tr>
                    <td class="text-left" style="overflow: hidden;"><a @click="permissionsDialog = true" style="color: #555;"><u>Change selection</u></a></td>
                    <td class="text-right" style="color: #555;overflow: hidden;">Creator: VBU4, Last update: {{ lastmodif }}</td>
                </tr>
            </table>
        </v-card>
    </v-app>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html, body {
    overflow-y: auto !important;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color:#ffffff;
}
</style>

<script>
/* eslint-disable no-console */
import { EventBus, CSVToArray } from "../plugins/vuetify";
import Vue from "vue";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default {
    name: "App",

    components: {
    },

    data: function() {
        return {
            value: "",
            dialog: null,
            table: null,
            categories: null,
            tab: null,
            lastmodif: "",

            permissionsDialog: true,
            permissionsSelection: null,

            rangesData: {},
            database: {},
            sortedDatabase: [],
            filteredDatabase: [],
            databaseCategories: {},

            // Help the user know something is loading
            loadingbar: true,

            // Used to log information
            snackbarMsg: "",
            snackbar: false,

            // Data loaded from DS and from preferences
            tenantId: -1,
            tenants: []
        };
    },

    computed: {
        message: function() {
            return this.$store.state.message;
        }
    },

    // As soon as we get mounted start searching the tenant list
    mounted: function () {
        const that = this;
        that.loadingbar = true;

        widget.setTitle("");

        EventBus.$on("onSearch", (txt) => { that.search = txt; });
        EventBus.$on("reloadwidget", () => { that.reload(); });

        // Start loading bar aswell
        if (widget.id === undefined) {
            that.tenantDataLoaded([{ id: -1 }]);
        } else {
            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });
        }
    },

    methods: {
        log(msg) {
            this.snackbarMsg = msg;
            this.snackbar = true;
        },

        selectall() {
            for (let i = 0; i < this.sortedDatabase.length; ++i) {
                if (!this.permissionsSelection.includes(i)) {
                    this.permissionsSelection.push(i);
                }
            }
        },

        deselectall() {
            this.permissionsSelection = [];
        },

        applyselection() {
            this.filteredDatabase = [];
            this.permissionsSelection.sort();
            for (let i = 0; i < this.permissionsSelection.length; ++i) {
                this.filteredDatabase.push(this.sortedDatabase[this.permissionsSelection[i]]);
            }
            const seljson = JSON.stringify(this.permissionsSelection);
            widget.setValue("_SavedSelection_", seljson);
            setCookie("selection", seljson, 1);
        },

        filterCertificates(obsolete) {
            let count = 0;
            let obs = 0;
            let invalid = 0;
            
            const isObsolete = (firstname, lastname, date) => {
                for (let i = 0; i < obsolete.length; ++i) {
                    if (obsolete[i].Name.toLowerCase() ===
                        firstname.toLowerCase() + " " + lastname.toLowerCase()) {
                        if (date <= new Date(obsolete[i].Added)) {
                            return true;
                        }
                    }
                }
                return false;
            };
            
            for (let i = 1; i < this.table.length; ++i) {
                const currentTime = new Date();

                const str = (this.table[i][14]).split(" ")[0].split("/");
                const mydate = new Date(str[2], str[0] - 1, str[1]);

                const str2 = (this.table[i][13]).split(" ")[0].split("/");
                const mydate2 = new Date(str2[2], str2[1] - 1, str2[0]);

                if (isObsolete(this.table[i][4], this.table[i][5], mydate2)) {
                    obs++;
                    continue;
                }

                if (currentTime > mydate) {
                    // Expired
                    ++count;
                    this.table.splice(i++, 1);
                }
                else if (this.table[i][15] === "NO") {
                    // Invalid
                    ++invalid;
                    this.table.splice(i++, 1);
                }
            }

            console.log("Expired: " + count);
            console.log("Obsolete: " + obs);
            console.log("Invalid: " + invalid);
        },

        // Load the tenant data & its services URLs based on the ID
        tenantDataLoaded(data) {
            this.tenants = [];
            const _TenantOpts = [];

            let j = 0;

            // Load all the tenants
            for (let i = 0; i < data.length; i++) {
                if (data[i]["3DSpace"] === undefined) continue;

                _TenantOpts.push({
                    value: `${j++}`,
                    label: `${data[i].platformId} - ${data[i].displayName}`
                });

                this.tenants.push(data[i]);
            }

            // Setup your preferences...
            widget.addPreference({
                name: "_CurrentTenantID_",
                type: "list",
                label: "Tenant",
                defaultValue: "0",
                options: _TenantOpts
            });

            widget.addPreference({
                name: "_FileKey_",
                type: "text",
                label: "File Key",
                defaultValue: "",
            });

            widget.addPreference({
                name: "_SavedSelection_",
                type: "hidden",
                label: "Saved Selection",
                defaultValue: "[]",
            });

            this.permissionsSelection = JSON.parse(widget.getValue("_SavedSelection_"));

            if (this.permissionsSelection === "") {
                this.permissionsSelection = JSON.parse(getCookie("selection"));
            }

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        getCSRF(onComplete, onFailure) {
            const that = this;

            // Retrive CSRF ticket
            const _3dspace = that.tenants[that.tenantId]["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/v1/application/CSRF",
            {
                onComplete: (response) => {
                    const res = JSON.parse(response);
                    onComplete(res.csrf.value);
                },

                onFailure: (response) => {
                    that.log(response);
                    onFailure();
                }
            });
        },

        
        getColor: function(counter) {
            if (counter % 2 === 1) {
                return "white";
            } else {
                return "#EFEFEF";
            }
        },

        getTotalCredits(partnerName) {
            if (!this.databaseCategories || !this.databaseCategories[partnerName]) {
                return 0;
            }

            let total = 0;
            for (let j = 0; j < this.databaseCategories[partnerName].length; ++j) {
                const v = this.databaseCategories[partnerName][j];
                total += v.count * v.credits;
            }
            return total;
        },

        getDistinc(partnerName) {
            if (!this.databaseCategories || !this.databaseCategories[partnerName] ||
                this.databaseCategories[partnerName].length == 0) {
                return 0;
            }

            let categoryName = this.databaseCategories[partnerName][0].category;
            let count = 0;
            let total = 0;

            for (let j = 0; j < this.databaseCategories[partnerName].length; ++j) {
                const v = this.databaseCategories[partnerName][j];

                if (v.category !== categoryName) {
                    total += (count !== 0 ? 1 : 0);
                    categoryName = v.category;
                    count = 0;
                }

                count += (!v.count || v.count == 0) ? 0 : 1;
            }

            total += (count !== 0 ? 1 : 0);
            return total;
        },

        getKPI5(min, max, credits, distinct) {
            if (credits >= min) {
                const maxGate = credits >= max;
                const distinctCount = distinct >= 5;

                if (maxGate && distinctCount) {
                    return 10;
                } else {
                    return 5;
                }
            }
            else return 0;
        },

        getKPI5Color(min, max, credits, distinct) {
            const kpi = this.getKPI5(min, max, credits, distinct);

            switch(kpi) {
                case 10:
                    return "#4b9e6c";
                case 5:
                    return "#4b839e";
                default:
                    return "#9e4b4b";
            }
        },

        loadData(partnerName) {
            for (let j = 0; j < this.databaseCategories["categories"].length; ++j) {
                const v = this.databaseCategories["categories"][j];
                v.count = 0;
            }

            if (this.databaseCategories[partnerName] !== undefined) {
                for (let i = 0; i < this.databaseCategories[partnerName].length; ++i) {
                    const element = this.databaseCategories[partnerName][i];

                    for (let j = 0; j < this.databaseCategories["categories"].length; ++j) {
                        const v = this.databaseCategories["categories"][j];
                        
                        if (v.category == element.category && v.subcategory == element.subcategory) {
                            v.count = element.count;
                        }
                    }
                }
            }
        },

        addCategoryItem: function(partnerName, category, subcategory, credits) {
            let foundSat = false;
            const baseline = (partnerName === "categories");

            if (!this.databaseCategories[partnerName]) {
                console.error(partnerName + " doesn't have other licenses?");
                return;
            }

            for (let j = 0; j < this.databaseCategories[partnerName].length; ++j) {
                const v = this.databaseCategories[partnerName][j];
                if (v.category === category && v.subcategory === subcategory) {
                    v.count += baseline ? 0 : 1;
                    foundSat = true;
                    return;
                }
            }

            if (!foundSat) {
                this.databaseCategories[partnerName].push({
                    category: category,
                    subcategory: subcategory,
                    credits: Number(credits.replace(/,/g, ".")),
                    count: baseline ? 0 : 1,
                    color: 0
                });
            }
        },

        getRanges(partnerName, ranges) {
            for (let i = 0; i < ranges.length; ++i) {
                if (ranges[i][0] == partnerName) {
                    const s = ranges[i][1].split(" ET ");
                    return {
                        min: s[0],
                        max: s[1]
                    };
                }
            }

            return {
                min: "NAN",
                max: "NAN"
            };
        },

        reload() {
            const that = this;
            let key = widget.getPreference("_FileKey_").value;

            if (!key) {
                key = window.location.search.substring(1);
            }

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/database_kpi.php?key=" + key, false);
            http.send(null);

            this.table = CSVToArray(http.responseText, ";");
            
            http.open("GET", "https://bcracker.dev/widgets/obsolete.php?key=" + key, false);
            http.send(null);

            const obsolete = JSON.parse(http.responseText);
            this.filterCertificates(obsolete);

            http.open("GET", "https://bcracker.dev/widgets/cert_category.php?key=" + key, false);
            http.send(null);

            this.categories = CSVToArray(http.responseText, ";");

            http.open("GET", "https://bcracker.dev/widgets/smec.php?key=" + key, false);
            http.send(null);

            const smecs = CSVToArray(http.responseText, ";");

            http.open("GET", "https://bcracker.dev/widgets/ranges.php?key=" + key, false);
            http.send(null);

            const ranges = CSVToArray(http.responseText, ";");

            http.open("GET", "https://bcracker.dev/widgets/getlastupdate.php", false);
            http.send(null);

            this.lastmodif = http.responseText;

            this.sortedDatabase.splice(0, this.sortedDatabase.length);
            this.database = {};
            this.databaseCategories = {};

            for (let i = 1; i < this.table.length; i++) {
                let partnerName = this.table[i][1];
                if (!partnerName) continue;

                const partnerId = this.table[i][3].split("[")[1].substring(0, 15);
                const certName = this.table[i][9];

                let found = false;
                let category = "Brand_Essentials";
                let subcategory = "Brand Articulate";
                let credits = "0,5";

                for (let j = 1; j < this.categories.length; ++j) {
                    if (this.categories[j][0] === certName) {
                        category = this.categories[j][1];
                        subcategory = this.categories[j][2];
                        credits = this.categories[j][3];
                        found = true;
                        break;
                    }
                }

                if (this.database[partnerName] === undefined) {
                    this.sortedDatabase.push(partnerName);
                    Vue.set(this.database, partnerName, []);
                    Vue.set(this.databaseCategories, partnerName, []);
                }

                if (!found) {
                    if (certName.startsWith("SMEC")) {
                        this.addCategoryItem(partnerName, "Sales", "Sales_SMEC", "4");
                    } else {
                        console.error(certName + " doesn't exist in the list.");
                    }
                } else {
                    this.addCategoryItem(partnerName, category, subcategory, credits);
                }

                const cert = {
                        partnerId: partnerId,
                        certName: certName,
                        certExpiration: this.table[i][14],
                        certProfile: this.table[i][11],
                        certAxis: this.table[i][10],
                        certCategory: this.table[i][12],
                        country: this.table[i][7],
                        category: category,
                        subcategory: subcategory,
                        credits: credits
                };

                const res = this.getRanges(partnerName, ranges);
                Vue.set(this.rangesData, partnerName, res);
                this.database[partnerName].push(cert);
            }

            console.log(this.database);

            Vue.set(this.databaseCategories, "categories", []);
            for (let i = 2; i < this.categories.length; i++) {
                const category = this.categories[i][1];
                const subcategory = this.categories[i][2];
                const credits = this.categories[i][3];

                if (credits === undefined) {
                    continue;
                }

                this.addCategoryItem("categories", category, subcategory, credits);
            }

            /*for (let i = 5; i < smecs.length; i++) {
                let partnerName = smecs[i][10];
                const valid = smecs[i][26];

                if (!partnerName) continue;

                if (valid === "Finished" && partnerName !== "3D") {
                    this.addCategoryItem(partnerName, "Sales", "Sales_SMEC", "4");
                }
            }*/

            this.sortedDatabase.sort(
                (b, a) => {
                    return (a < b ? 1 : (a > b ? -1 : 0));
                }
            );

            for (const val in this.databaseCategories) {
                this.databaseCategories[val].sort((a, b) => { return (a.category < b.category ? -1 : (a.category > b.category ? 1 : 0)); });

                if (this.databaseCategories[val].length > 0) {
                    let last = this.databaseCategories[val][0];
                    let counter = 0;

                    for (let i = 0; i < this.databaseCategories[val].length; ++i) {
                        if (last.category !== this.databaseCategories[val][i].category) {
                            ++counter;
                        }
                        last = this.databaseCategories[val][i];
                        last.color = counter;
                    }
                }
            }
        },

        parse_query_string(query) {
            const vars = query.split("&");
            const query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                var key = decodeURIComponent(pair[0]);
                var value = decodeURIComponent(pair[1]);
                // If first entry with this name
                if (typeof query_string[key] === "undefined") {
                    query_string[key] = decodeURIComponent(value);
                    // If second entry with this name
                } else if (typeof query_string[key] === "string") {
                    var arr = [query_string[key], decodeURIComponent(value)];
                    query_string[key] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[key].push(decodeURIComponent(value));
                }
            }
        }
        
    }
};

</script>
