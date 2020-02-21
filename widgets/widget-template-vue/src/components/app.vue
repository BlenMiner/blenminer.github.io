<template>
    <v-app>
        <div>
            <v-app-bar dark height="50px">
                <v-toolbar-title class="headline">
                    WPM - Widget Project Management
                </v-toolbar-title>
                <v-spacer />
                <v-btn class="mx-2" dark fab x-small color="green darken-1">
                    <v-icon dark>mdi-cached</v-icon>
                </v-btn>
                <v-btn class="mx-2" fab x-small color="cyan darken-1" @click="toast('Created by VBU4')">
                    <v-icon dark>mdi-information-variant</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <v-content>
            <!-- header progress bar -->
            <v-progress-linear
                color="blue accent-4"
                indeterminate
                height="10"
                :active="loadingbar"
            />

            <!-- widget notifaction module -->
            <v-snackbar v-model="snackbar">
                {{ snackbarMsg }}
                <v-btn
                    color="grey"
                    text
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>

            <!-- actual widget's content -->
            <projectGrid />
        </v-content>
    </v-app>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html,
body {
    overflow-y: auto !important;
    height: 100%;
}
</style>

<script>
/* eslint-disable no-console */
import projectGrid from "./project-grid.vue";
import { EventBus } from "../plugins/vuetify";

export default {
    name: "App",
    components: {
        projectGrid
    },
    data: function() {
        return {
            snackbar: false,
            snackbarMsg: "Bro",

            tenants: [],
            tenantId: 0,

            loadingbar: true
        };
    },
    computed: {
        message: function() {
            return this.$store.state.message;
        }
    },
    watch: {},

    // As soon as we get mounted start searching the tenant list
    mounted: function () {
        const that = this;

        EventBus.$on("toast", (value) => {
            that.toast(value);
        });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 2000);
        } else {
            const rqst = requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });

            console.log(rqst);
        }
    },
    methods: {

        // Displays a fun notification
        toast(text) {
            this.snackbarMsg = text;
            this.snackbar = true;
        },

        // Load the tenant data & its services URLs based on the ID
        tenantDataLoaded(data) {
            this.loadingbar = false;
            this.tenants = data;
            const _TenantOpts = [];

            // Load all the tenants
            for (let i = 0; i < this.tenants.length; i++) {
                _TenantOpts.push({
                    value: `${i}`,
                    label: `${this.tenants[i].platformId} - ${this.tenants[i].displayName}`
                });
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
            this.tenantId = widget.getValue("_CurrentTenantID_");

            console.log(this.tenantId);
        }
    }
};

</script>
