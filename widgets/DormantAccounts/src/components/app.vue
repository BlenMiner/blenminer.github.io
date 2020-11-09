<template>
    <v-app>
        <v-tabs
            v-model="tab"
            centered
            dark
            icons-and-text
            height="55px"
        >
            <v-tabs-slider />

            <v-tab href="#tab-1">
                Accounts History
                <v-icon>mdi-phone</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
                Dormant Accounts
                <v-icon>mdi-sleep</v-icon>
            </v-tab>

            <div width="200px">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                />
            </div>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item value="tab-1">
                <costumer-table :table="table" :loadingbar="loadingbar" :search="search" />
            </v-tab-item>
            <v-tab-item value="tab-2">
                <dormant-table :table="dTable" :loadingbar="dormantLoading" :search="search" />
            </v-tab-item>
        </v-tabs-items>
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
import costumerTable from "./costumerTable.vue";
import dormantTable from "./dormantTable.vue";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",

    components: {
        costumerTable,
        dormantTable
    },

    data: function() {
        return {
            lastmodif: "",
            table: [],
            dTable: [],
            tab: null,
            search: "",

            // Help the user know something is loading
            loadingbar: true,
            dormantLoading: true,

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
        that.dormantLoading = true;

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

        substring (str, c) {
            if (str === undefined) {
                return "";
            }

            const s = str.substring(0, c);
            return s + (s.length < str.length ? "..." : "");
        },

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
            let key = widget.getValue("_FileKey_");

            if (!key) {
                key = window.location.search.substring(1);
            }

            that.loadingbar = true;
            that.dormantLoading = true;
            that.tenantId = widget.getValue("_CurrentTenantID_");

            that.table = [];
            that.dTable = [];

            const http2 = new XMLHttpRequest();
            http2.open("GET", "https://bcracker.dev/widgets/dormant/p_activities.php?key=" + key, true);
            http2.send(null);

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/dormant/activities.php?key=" + key, true);
            http.send(null);
            http.onload = () => {
                const t = CSVToArray(http.responseText, ";");
                const dictionaryNames = {};

                for (let i = 1; i < t.length; ++i) {
                    if (t[i][11] === undefined) continue;

                    const client = t[i][3];

                    const s = t[i][11].split("/");
                    const tdate = s[1] + "/" + s[0] + "/" + s[2];

                    const date = new Date(tdate);
                    const today = new Date();

                    const different = ((today.getTime() - date.getTime()) / 86400000).toFixed(0).toString() + " days ago";

                    const hist =
                    {
                        subject: t[i][6],
                        description: t[i][7],
                        dsCustomerNumber: t[i][5],
                        date: date
                    };

                    if (dictionaryNames[client] !== undefined) {
                        const j = dictionaryNames[client];
                        that.table[j].lastActivityDate = date;
                        that.table[j].lastActivity = different;
                        that.table[j].history.unshift(hist);
                    } else {
                        dictionaryNames[client] = that.table.length;
                        that.table.push({
                            client: client,
                            clientID: t[i][4],
                            partner: t[i][8],
                            lastActivityDate: date,
                            lastActivity: different,
                            history: [hist]
                        });
                    }
                }

                that.table.sort((a, b) => {
                    if (a.client < b.client) {
                        return -1;
                    } else if (a.client < b.client) {
                        return 1;
                    }
                    return 0;
                });

                that.loadingbar = false;

                console.log("http2.onload");

                if (http2.responseText) {
                    that.loadDormantAccounts(http2.responseText);
                } else {
                    http2.onload = () => {
                        that.loadDormantAccounts(http2.responseText);
                    };
                }
            };
        },

        findHistory(clientName, clientID) {
            clientName = clientName.toLowerCase().replaceAll(" ", "");
            clientID = clientID.toLowerCase().replaceAll(" ", "");

            for (let i = 0; i < this.table.length; ++i) {
                const client = this.table[i].client.toLowerCase().replaceAll(" ", "");
                const cID = this.table[i].clientID.toLowerCase().replaceAll(" ", "");

                if (cID.startsWith(clientID) ||
                    client.startsWith(clientName)) {
                    return this.table[i];
                }
            }

            return null;
        },

        loadDormantAccounts(responseText) {
            const that = this;
            const t = CSVToArray(responseText, ";");

            for (let i = 1; i < t.length; ++i) {
                if (t[i][7] || t[i][12]) continue;

                const client = {
                    clientID: t[i][0],
                    client: t[i][1],
                    industry: t[i][5],

                    ALC2019: t[i][6],
                    YLC2019: t[i][8],
                    RLC2019: t[i][9],

                    ALC2018: t[i][11],
                    YLC2018: t[i][13],
                    RLC2018: t[i][14],

                    hist: null
                };

                if (client.client === undefined) continue;

                const history = this.findHistory(client.client, client.clientID);

                client.hist = history;

                that.dTable.push(client);
            }

            that.dTable.sort((a, b) => {
                if (a.client < b.client) {
                    return -1;
                } else if (a.client < b.client) {
                    return 1;
                }
                return 0;
            });

            that.dormantLoading = false;
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

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        getColor: function(counter) {
            if (counter % 2 === 1) {
                return "white";
            } else {
                return "#EFEFEF";
            }
        }
    }
};

</script>
