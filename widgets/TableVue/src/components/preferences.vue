<template>
    <v-dialog v-model="dialog" max-width="80%" @click:outside="applySettings()">
        <v-card min-height="90vh">
            <v-toolbar
                style="background-color: #005685;"
                dark
                flat
            >
                <v-toolbar-title>Table Settings</v-toolbar-title>
                <v-spacer />
                <v-btn icon><v-icon>mdi-information</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <v-card-title>Columns</v-card-title>
                <span v-for="(item, i) in headers" :key="i">
                    <v-btn class="ma-1" :color="settings[i] ? 'green' : 'red'" :title="item.text" @click="toggle(i)">
                        {{ item.text }}<v-spacer />
                        <v-icon v-if="settings[i]">mdi-eye</v-icon>
                        <v-icon v-else>mdi-eye-off</v-icon>
                    </v-btn>
                </span>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        headers: Array
    },

    data: function() {
        return {
            dialog: false,
            settings: []
        };
    },

    mounted: function() {
        const that = this;

        this.$forceUpdate();

        EventBus.$on("settingsShow", () => {
            that.dialog = true;
        });

        EventBus.$on("loadedtable", () => {
            for (let i = 0; i < this.headers.length; i++) {
                this.$set(this.settings, i, widget.getValue(`col_${i}`) === "1");
            }
        });
    },

    methods: {
        toggle(i) {
            this.$set(this.settings, i, !this.settings[i]);
        },

        applySettings() {
            for (let i = 0; i < this.settings.length; i++) {
                widget.setValue(`col_${i}`, this.settings[i] ? "1" : "0");
            }
            EventBus.$emit("changeheaders", this.settings);
        }
    }
};

</script>
