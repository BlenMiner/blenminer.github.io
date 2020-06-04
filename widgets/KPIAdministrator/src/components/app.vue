<template>
    <v-card flat>
        <center>
            <table width="95%">
                <tr>
                    <td>
                        <v-text-field
                            label="Add name"
                            v-model="name"
                            style="margin: 10px;"
                        ></v-text-field>
                    </td>
                    <td>
                        <v-btn color="#1867c0" dark width="100%" @click="add(name)">Add</v-btn>
                    </td>
                </tr>
            </table>
        </center>
        <div>
            <v-chip
                v-for="(item, i) in database"
                v-bind:key="i"
                close
                @click="select"
                @click:close="remove(item)"
            >
                <strong>{{ item.Name }}</strong>&nbsp;
                <span>({{ item.Added }})</span>
            </v-chip>
        </div>
    </v-card>
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
            database: {},
            name: "",

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

        remove(item) {
            const key = widget.getPreference("_FileKey_").value;
            const http = new XMLHttpRequest();

            http.open("GET", `https://bcracker.dev/widgets/obsolete.php?key=${key}&removeid=${item.id}`, false);
            http.send(null);

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        add(name) {
            const key = widget.getPreference("_FileKey_").value;
            const http = new XMLHttpRequest();

            http.open("GET", `https://bcracker.dev/widgets/obsolete.php?key=${key}&name=${name}`, false);
            http.send(null);
            
            name = "";

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
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

        reload() {
            if (this.table != null && this.table.length != 0) {
                return;
            }

            const that = this;
            const key = widget.getPreference("_FileKey_").value;

            const http = new XMLHttpRequest();
            http.open("GET", "https://bcracker.dev/widgets/obsolete.php?key=" + key, false);
            http.send(null);

            this.database = JSON.parse(http.responseText);
        }
    }
};

</script>
