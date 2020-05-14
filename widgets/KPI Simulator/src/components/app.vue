<template>
    <v-app>
        <v-card flat>
            <v-tabs
                v-model="tab"
                background-color="#005685"
                dark
                show-arrows
            >
                <v-tabs-slider color="#5FEFE" />
                <v-tab
                    v-for="v in sortedDatabase"
                    :key="v"
                >
                    <small>{{ v }}</small>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="k in sortedDatabase"
                        :key="k"
                    >
                        <v-card flat>
                            <v-data-table
                                :headers="headers"
                                :items="databaseCategories[k]"
                                :items-per-page="15"
                                dense
                            >
                                <template v-slot:item="props">
                                    <tr :style="{'background-color': getColor(props.item.color)}">
                                        <td>{{ props.item.category }}</td>
                                        <td>{{ props.item.subcategory }}</td>
                                        <td>
                                            <v-chip
                                                :color="
                                                    (props.item.count * props.item.credits) >= 5 ? 'green' :
                                                    ((props.item.count * props.item.credits) >= 2 ? 'orange' : 'red')
                                                "
                                                dark
                                            >
                                                {{ props.item.count }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs-items>
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
            table: null,
            categories: null,
            tab: null,

            headers: [
            { text: "Category", value: "category" },
            { text: "Sub-Category", value: "subcategory" },
            { text: "Total", value: "count" }
            ],

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

        that.loadingbar = true;

        EventBus.$on("onSearch", (txt) => { that.search = txt; });
        EventBus.$on("reloadwidget", () => { that.reload(); });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 500);
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

        reload() {
            const that = this;

            that.loadingbar = true;
            that.tenantId = widget.getValue("_CurrentTenantID_");

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/database_kpi.php", false);
            http.send(null);

            this.table = CSVToArray(http.responseText, ";");

            http.open("GET", "https://bcracker.dev/widgets/cert_category.php", false);
            http.send(null);

            this.categories = CSVToArray(http.responseText, ";");

            http.open("GET", "https://bcracker.dev/widgets/smec.php", false);
            http.send(null);

            /* http.open("GET", "https://bcracker.dev/widgets/ranges.php", false);
            http.send(null); */

            const smecs = CSVToArray(http.responseText, ";");

            this.sortedDatabase.splice(0, this.sortedDatabase.length);
            this.database = {};
            this.databaseCategories = {};

            for (let i = 1; i < this.table.length; i++) {
                let partnerName = this.table[i][0];
                if (!partnerName) continue;

                const partnerId = partnerName.split("[")[1].slice(0, -1);
                partnerName = partnerName.split("[")[0].slice(0, -1);

                const certName = this.table[i][7];

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
                    console.error(certName + " doesn't exist in the list.");
                }

                const cert = {
                        partnerId: partnerId,
                        certName: certName,
                        certExpiration: this.table[i][9],
                        certProfile: this.table[i][11],
                        certAxis: this.table[i][12],
                        certCategory: this.table[i][13],
                        category: category,
                        subcategory: subcategory,
                        credits: credits
                };

                this.database[partnerName].push(cert);
                this.addCategoryItem(partnerName, category, subcategory, credits);
            }

            for (let i = 5; i < smecs.length; i++) {
                let partnerName = smecs[i][10];
                const valid = smecs[i][26];

                if (!partnerName) continue;

                // let partnerId = partnerName.split("[")[1].slice(0, -1);
                partnerName = partnerName.split("[")[0].slice(0, -1);
                if (valid === "Finished" && partnerName !== "3D") {
                    this.addCategoryItem(partnerName, "Sales", "Sales_SMEC", "4");
                }
            }

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

            that.loadingbar = false;
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

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        getColor: function(counter) {
            if (counter % 2 === 1) {
                return "white";
            } else {
                return "#EFEFEF";
            }
        },

        addCategoryItem: function(partnerName, category, subcategory, credits) {
            let foundSat = false;

            if (!this.databaseCategories[partnerName]) {
                console.error(partnerName + " doesn't have other licenses?");
                return;
            }

            for (let j = 0; j < this.databaseCategories[partnerName].length; ++j) {
                const v = this.databaseCategories[partnerName][j];
                if (v.category === category && v.subcategory === subcategory) {
                    v.count += 1;
                    foundSat = true;
                    return;
                }
            }

            if (!foundSat) {
                this.databaseCategories[partnerName].push({
                    category: category,
                    subcategory: subcategory,
                    credits: Number(credits.replace(/,/g, ".")),
                    count: 1,
                    color: 0
                });
            }
        }
    }
};

</script>
