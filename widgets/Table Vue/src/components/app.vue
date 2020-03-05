<template>
    <v-app>
        <v-content>
            <preferences :tabcount="tabCount" :tabs="tabs" />

            <!-- header progress bar -->
            <v-progress-linear
                color="blue accent-4"
                indeterminate
                height="10"
                :active="loadingbar"
            />
        </v-content>
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
import preferences from "./preferences.vue";
//import { EventBus } from "../plugins/vuetify";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",
    components: {
        preferences
    },
    data: function() {
        return {
            loadingbar: true,
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
    },

    methods: {
    }
};

</script>
