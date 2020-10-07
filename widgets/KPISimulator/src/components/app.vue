<template>
    <v-app>
        <v-footer
            fixed
            :padless="true"
        >
            <v-card
                flat
                tile
                height="80"
                width="100%"
                color="#efefef"
                class="text-center"
                elevation="24"
                raised
            >
                <v-card-text class="black--text pa-2">
                    <table width="100%">
                        <tr>
                            <td class="text-left">
                                <v-chip
                                    color="#00857c"
                                    dark
                                    style="width:200px;"
                                >
                                    Simulated KPI : {{ getKPI5(min , max, getTotalCredits() + getSimulatedTotalCredits(), getDistinc(true)) }}
                                </v-chip>
                            </td>
                            <td class="text-center">Simulated Credits : {{ (getTotalCredits() + getSimulatedTotalCredits()).toFixed(1) }}</td>
                            <td class="text-right">Simulated Disinct Categories : {{ getDistinc(true) }}</td>
                        </tr>
                        <tr>
                            <td class="text-left">
                                <v-chip
                                    color="#00852c"
                                    dark
                                    style="width:200px;"
                                >
                                    Actual KPI : {{ getKPI5(min , max, getTotalCredits(), getDistinc(false)) }}
                                </v-chip>
                            </td>
                            <td class="text-center">Actual Credits : {{ getTotalCredits().toFixed(1) }}</td>
                            <td class="text-right">Actual Disinct Categories : {{ getDistinc(false) }}</td>
                        </tr>
                    </table>
                </v-card-text>
            </v-card>
        </v-footer>

        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on }">
                <table width="100%">
                    <tr>
                        <td>Ranges: </td>
                        <td>
                            <v-text-field
                                label="Outlined"
                                placeholder="Min"
                                dense
                                single-line
                                type="Number"
                                v-model="min"
                                hide-details
                                clearable
                                class="mx-4"
                            />
                        </td>
                        <td>-</td>
                        <td>
                            <v-text-field
                                label="Outlined"
                                placeholder="Max"
                                dense
                                single-line
                                type="Number"
                                v-model="max"
                                hide-details
                                clearable
                                class="mx-4"
                            />
                        </td>
                        <td class="text-right" width="200px">
                            <v-btn
                                color="green darken-1"
                                dark
                                v-on="on"
                                text
                                width="100%"
                            >
                                Load from partner
                            </v-btn>
                        </td>
                    </tr>
                </table>
                <hr />
            </template>

            <v-card>
                <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                >
                    Load From Partner
                </v-card-title>

                <v-card-text>
                    <br />
                    Select a partner and click the "Load Data" button.
                    <br />
                    Last data update: {{ lastmodif }}
                    <v-overflow-btn
                        class="my-2"
                        :items="sortedDatabase"
                        label="No selection"
                        editable
                        v-model="value"
                    />
                </v-card-text>

                <v-divider />

                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        color="primary"
                        text
                        @click="loadData(value);dialog = false;"
                    >
                        Load Data
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card flat>
            <v-simple-table dense :fixed-header="true" height="calc(100vh - 120px)">
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Category</th>
                    <th class="text-right">Sub-Category</th>
                    <th class="text-left">Credits</th>
                    <th class="text-center">Count</th>
                    <th class="text-center" width="300">Simulation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in databaseCategories['categories']" :key="i" :style="{'background-color': getColor(item.color)}">
                        <td>{{ item.category }}</td>
                        <td class="text-right">{{ item.subcategory }}</td>
                        <td>
                            <v-chip
                                class="text-center"
                                color="#555"
                                dark
                            >
                                {{ item.credits.toFixed(1) }}
                            </v-chip>
                        </td>
                        <td class="text-center">
                            <v-chip
                                class="text-center"
                                color="#005685"
                                dark
                            >
                                {{ !item.count ? 0 : item.count }}
                            </v-chip>
                        </td>
                        <td>
                            <v-text-field
                                label="Outlined"
                                placeholder="Count"
                                rounded
                                dense
                                single-line
                                type="Number"
                                v-model="item.simcount"
                                hide-details
                                clearable
                                class="elevation-2"
                            />
                        </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
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

export default {
    name: "App",

    components: {
    },

    data: function() {
        return {
            min: undefined,
            max: undefined,
            value: "",
            dialog: null,
            table: null,
            categories: null,
            tab: null,
            lastmodif: "",

            headers: [
            { text: "Category", value: "category" },
            { text: "Sub-Category", value: "subcategory" },
            { text: "Credits", value: "credits" },
            { text: "Number of Certifications", value: "count" },
            { text: "Total Credits", value: "count" }
            ],

            rangesData: {},
            database: {},
            sortedDatabase: [],
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
        widget.name = "";ç

        that.loadingbar = true;

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

        getTotalCredits() {
            if (!this.databaseCategories || !this.databaseCategories["categories"]) {
                return 0;
            }

            let total = 0;
            for (let j = 0; j < this.databaseCategories["categories"].length; ++j) {
                const v = this.databaseCategories["categories"][j];
                total += v.count * v.credits;
            }
            return total;
        },

        getSimulatedTotalCredits() {
            if (!this.databaseCategories || !this.databaseCategories["categories"]) {
                return 0;
            }

            let total = 0;
            for (let j = 0; j < this.databaseCategories["categories"].length; ++j) {
                const v = this.databaseCategories["categories"][j];
                total += (!v.simcount ? 0 : v.simcount) * v.credits;
            }
            return total;
        },

        getDistinc(simulated) {
            if (!this.databaseCategories || !this.databaseCategories["categories"] ||
                this.databaseCategories["categories"].length == 0) {
                return 0;
            }

            let categoryName = this.databaseCategories["categories"][0].category;
            let count = 0;
            let total = 0;

            for (let j = 0; j < this.databaseCategories["categories"].length; ++j) {
                const v = this.databaseCategories["categories"][j];

                if (v.category !== categoryName) {
                    total += (count !== 0 ? 1 : 0);
                    categoryName = v.category;
                    count = 0;
                }

                if (simulated !== true) {
                    count += (!v.count || v.count == 0) ? 0 : 1;
                } else {
                    const vc = Number(v.count === undefined ? 0 : v.count);
                    const vsc = Number(v.simcount === undefined ? 0 : v.simcount);
                    count += (vc + vsc <= 0) ? 0 : 1;
                }
            }

            total += (count !== 0 ? 1 : 0);
            return total;
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
                            break;
                        }
                    }
                }
            }

            const range = this.rangesData[partnerName];
            this.min = range.min;
            this.max = range.max;
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

        reload() {
            if (this.table != null && this.table.length != 0) {
                return;
            }

            const that = this;
            let key = widget.getValue("_FileKey_");

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
                const partnerName = this.table[i][1];
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
                        category: category,
                        subcategory: subcategory,
                        credits: credits
                };

                const res = this.getRanges(partnerName, ranges);
                Vue.set(this.rangesData, partnerName, res);

                this.database[partnerName].push(cert);
            }

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

            /* for (let i = 5; i < smecs.length; i++) {
                let partnerName = smecs[i][10];
                const valid = smecs[i][26];

                if (!partnerName) continue;

                // let partnerId = partnerName.split("[")[1].slice(0, -1);
                partnerName = partnerName.split("[")[0].slice(0, -1);
                if (valid === "Finished" && partnerName !== "3D") {
                    this.addCategoryItem(partnerName, "Sales", "Sales_SMEC", "4");
                }
            } */

            this.sortedDatabase.sort(
                (aA, bB) => {
                    const a = that.database[aA].length;
                    const b = that.database[bB].length;
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
        }
    }
};

</script>
