<template>
    <v-app>
        <v-dialog
            v-if="selected !== null"
            v-model="dialog"
            scrollable
            max-width="60%"
        >
            <v-card>
                <v-card-title>History {{ selected.name }}</v-card-title>
                <v-card-text style="height: 80vh;">
                    <v-card v-for="(hist, i) in selected.history" :key="i" outlined class="ma-1" elevation="5">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline text-right" style="user-select: text;">
                                    DS Customer Number: {{ hist.dsCustomerNumber.replace(" ", "").replace(" ", "").replace(" ", "") }}
                                    <br />
                                    {{ hist.date.toLocaleString() }}
                                </div>
                                <v-list-item-title><h5 style="user-select: text;">{{ hist.subject }}</h5></v-list-item-title>
                                <v-list-item-content style="user-select: text;">{{ hist.description }}</v-list-item-content>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card flat>
            <v-data-table
                :headers="headers"
                :items="table"
                :items-per-page="-1"
                dense
                :fixed-header="true"
                :loading="loadingbar"
                height="calc(100vh - 60px)"
            >
                <template v-slot:item="{item}">
                    <tr>
                        <td> {{ item.partner }} </td>
                        <td> {{ item.name }} </td>
                        <td>
                            <v-btn value="recent" width="500" style="justify-content: left;user-select: text;" small @click="expand(item)">
                                <v-icon>mdi-history</v-icon>
                                <span>{{ substring(item.history[0].subject, 50) }}</span>
                            </v-btn>
                        </td>
                        <td>
                            {{ item.lastActivity }}
                        </td>
                    </tr>
                </template>
            </v-data-table>
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
            lastmodif: "",
            table: [],

            headers: [
                { text: "Partner" },
                { text: "Owner" },
                { text: "Subject" },
                { text: "Last Activity" }
            ],

            // Help the user know something is loading
            loadingbar: true,
            dialog: false,
            selected: null,

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

        expand(item) {
            this.dialog = true;
            this.selected = item;
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
            that.tenantId = widget.getValue("_CurrentTenantID_");

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/dormant/activities.php?key=" + key, true);
            http.send(null);
            that.table = [];
            http.onload = () => {
                const t = CSVToArray(http.responseText, ";");
                const dictionaryNames = {};

                for (let i = 1; i < t.length; ++i) {
                    if (t[i][11] === undefined) continue;

                    const namePrototype = t[i][0].split(",");
                    const name = namePrototype[0].toUpperCase() + " " + namePrototype[1];

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

                    if (dictionaryNames[name] !== undefined) {
                        const j = dictionaryNames[name];
                        that.table[j].lastActivityDate = date;
                        that.table[j].lastActivity = different;
                        that.table[j].history.unshift(hist);
                    } else {
                        dictionaryNames[name] = that.table.length;
                        that.table.push({
                            name: name,
                            partner: t[i][8],
                            lastActivityDate: date,
                            lastActivity: different,
                            history: [hist]
                        });
                    }
                }

                that.table.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    } else if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });

                that.loadingbar = false;
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
