<template>
    <v-app>
        <div>
            <v-app-bar dark>
                <v-toolbar-title class="headline">
                    WPM - Widget Project Management
                </v-toolbar-title>
                <v-spacer />
            </v-app-bar>
        </div>
        <v-content>
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

            <h1>{{ title }}</h1>
            <projectGrid />

            <v-btn
                @click="toast('pra 1')"
            >
                Test
            </v-btn>
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

// widget object is available everywhere !
console.debug(widget);

export default {
    name: "App",
    components: {
        projectGrid
    },
    data: function() {
        return {
            title: "3DExperience Widget :)",
            snackbar: false,
            snackbarMsg: "Bro",
            tenants: [],
            tenantId: 0
        };
    },
    computed: {
        message: function() {
            return this.$store.state.message;
        }
    },
    watch: {},
    mounted: function () {
        try {
            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });
        } catch (e) {
            console.log("failed to load DS api");
        }
    },
    methods: {

        toast(text) {
            this.snackbarMsg = text;
            this.snackbar = true;
        },

        tenantDataLoaded(data) {
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

            console.lof(this.tenantId);
        }
    }
};

</script>
