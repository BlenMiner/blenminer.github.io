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
                        <v-spacer />
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
                                        <v-list-item-title v-if="permissionsSelection && permissionsSelection.includes(i)" style="color: black;" v-text="item" />
                                        <v-list-item-title v-else style="color: #BBB;" v-text="item" />
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn color="green darken-1" dark @click="permissionsDialog = false; applyselection();">Confirm Selection</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-tabs
                v-model="tab"
                background-color="#005685"
                dark
                show-arrows
            >
                <v-tabs-slider color="#5FEFE" />
                <v-tab
                    v-for="v in filteredDatabase"
                    :key="v"
                >
                    <small>{{ v }}</small>
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tabs-items v-model="tab">
                    <v-tab-item
                        v-for="k in filteredDatabase"
                        :key="k"
                    >
                        <v-card flat>
                            <v-data-table
                                :headers="headers"
                                :items="databaseCategories[k]"
                                :items-per-page="15"
                                dense
                                :fixed-header="true"
                                height="100vh"
                            >
                                <template v-slot:item="props">
                                    <tr :style="{'background-color': getColor(props.item.color)}">
                                        <td>{{ props.item.category }}</td>
                                        <td>{{ props.item.subcategory }}</td>
                                        <td class="text-center">
                                            <v-chip color="#555555" dark>
                                                {{ props.item.credits.toFixed(1) }}
                                            </v-chip>
                                        </td>
                                        <td class="text-center">
                                            <v-chip color="#777" dark>
                                                {{ props.item.count }}
                                            </v-chip>
                                        </td>
                                        <td class="text-center">
                                            <v-chip
                                                :color="
                                                    (props.item.count * props.item.credits) >= 5 ? 'green' :
                                                    ((props.item.count * props.item.credits) >= 2 ? 'orange' : 'red')
                                                "
                                                dark
                                            >
                                                {{ (props.item.count * props.item.credits) }}
                                            </v-chip>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                            <hr />
                            <table class="ma-0 pa-0" width="100%">
                                <tr>
                                    <td class="text-left" style="overflow: hidden;"><a style="color: #555;" @click="permissionsDialog = true"><u>Change selection</u></a></td>
                                    <td class="text-right" style="color: #555;overflow: hidden;">Creator: VBU4, Last update: {{ lastmodif }}</td>
                                </tr>
                            </table>
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

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
        c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
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
            table: null,
            categories: null,
            tab: null,
            lastmodif: "",

            headers: [
            { text: "Category", value: "category" },
            { text: "Sub-Category", value: "subcategory" },
            { text: "Credits", value: "credits" },
            { text: "Count", value: "count" },
            { text: "Total Credits", value: "credits" }
            ],

            permissionsDialog: true,
            permissionsSelection: null,

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
        widget.name = "";

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
                } else if (this.table[i][15] === "NO") {
                    // Invalid
                    ++invalid;
                    this.table.splice(i++, 1);
                }
            }

            console.log("Expired: " + count);
            console.log("Obsolete: " + obs);
            console.log("Invalid: " + invalid);
        },

        reloadAsync() {
            const that = this;
            if (this.table !== null && this.categories !== null) {
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

                    this.database[partnerName].push(cert);
                }

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

                that.loadingbar = false;
            }
        },

        reload() {
            const that = this;
            let key = widget.getValue("_FileKey_");

            if (!key) {
                key = window.location.search.substring(1);
            }

            that.loadingbar = true;
            that.tenantId = widget.getValue("_CurrentTenantID_");

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/database_kpi.php?&key=" + key, true);
            http.send(null);
            that.table = null;
            http.onload = () => {
                that.table = CSVToArray(http.responseText, ";");

                const _http = new XMLHttpRequest();
                _http.open("GET", "https://bcracker.dev/widgets/obsolete.php?key=" + key, true);
                _http.send(null);
                _http.onload = () => {
                    const obsolete = JSON.parse(_http.responseText);
                    this.filterCertificates(obsolete);
                    that.reloadAsync();
                };
            };

            const certRequest = new XMLHttpRequest();
            certRequest.open("GET", "https://bcracker.dev/widgets/cert_category.php?&key=" + key, true);
            certRequest.send(null);
            that.categories = null;
            certRequest.onload = () => {
                that.categories = CSVToArray(certRequest.responseText, ";");
                that.reloadAsync();
            };

            const lastupdateRequest = new XMLHttpRequest();
            lastupdateRequest.open("GET", "https://bcracker.dev/widgets/getlastupdate.php", true);
            lastupdateRequest.send(null);
            lastupdateRequest.onload = () => {
                that.lastmodif = lastupdateRequest.responseText;
            };
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
                defaultValue: ""
            });

            widget.addPreference({
                name: "_SavedSelection_",
                type: "hidden",
                label: "Saved Selection",
                defaultValue: "[]"
            });

            this.permissionsSelection = JSON.parse(widget.getValue("_SavedSelection_"));

            if (this.permissionsSelection === "[]") {
                this.permissionsSelection = JSON.parse(getCookie("selection"));
            }

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
