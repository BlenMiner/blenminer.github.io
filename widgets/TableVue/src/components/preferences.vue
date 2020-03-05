<template>
    <v-dialog v-model="dialog" max-width="80%">
        <v-card min-height="90vh">
            <v-toolbar
                style="background-color: #005685;"
                dark
                flat
            >
                <v-toolbar-title>Tab settings</v-toolbar-title>
                <v-spacer />
                <v-btn icon><v-icon>mdi-information</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                Some text
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

// import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        // tabcount: Number
    },

    data: function() {
        return {
            dialog: false
        };
    },

    mounted: function() {
    },

    methods: {
    }
};

</script>
