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
                    <v-btn class="ma-1" :color="!settings[i] ? 'green' : 'red'" :title="item.text" @click="toggle(i)">
                        {{ item.text }}<v-spacer />
                        <v-icon v-if="!settings[i]">mdi-eye</v-icon>
                        <v-icon v-else>mdi-eye-off</v-icon>
                    </v-btn>
                </span>
                <v-card-title>Rows</v-card-title>
                <v-container
                    id="scroll-target"
                    style="max-height: 300px"
                    class="overflow-y-auto"
                >
                    <span v-for="(item, i) in rows" :key="i">
                        <v-card v-if="rowvis[i]" class="ma-2 pa-2" color="red" @click="removerow(i)">
                            <v-icon>mdi-eye-off</v-icon>
                            <span v-for="col in item" :key="col">{{ col }} </span>
                        </v-card>
                    </span>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        headers: Array,
        rows: Array
    },

    data: function() {
        return {
            dialog: false,
            settings: [],
            rowvis: []
        };
    },

    mounted: function() {
        const that = this;

        EventBus.$on("settingsShow", () => {
            that.dialog = true;
        });

        EventBus.$on("removeandupdate", (i) => {
            that.removeandupdate(i);
        });

        EventBus.$on("loadedtable", () => {
            const hiddencols = JSON.parse(widget.getValue("hidden_columns_list"));
            const hiddenrows = JSON.parse(widget.getValue("hidden_rows_list"));

            for (let i = 0; i < that.headers.length; i++) {
                that.$set(that.settings, i, !hiddencols[i.toString()]);
            }

            for (let i = 0; i < that.rows.length; i++) {
                that.$set(that.rowvis, i, !hiddenrows[i.toString()]);
            }

            EventBus.$emit("changeheaders", hiddencols);
            EventBus.$emit("changerowsvisibility", hiddenrows);
        });
    },

    methods: {
        toggle(i) {
            this.$set(this.settings, i, !this.settings[i]);
        },

        removerow(i) {
            this.$set(this.rowvis, i, !this.rowvis[i]);
        },

        removeandupdate(i) {
            this.$set(this.rowvis, i, "hidden");
            this.applySettings();
        },

        applySettings() {
            const hiddencols = {};
            const hiddenrows = {};

            for (let i = 0; i < this.settings.length; i++) {
                if (this.settings[i]) {
                    hiddencols[i.toString()] = "hidden";
                }
            }

            for (let i = 0; i < this.rowvis.length; i++) {
                if (this.rowvis[i]) {
                    hiddenrows[i.toString()] = "hidden";
                }
            }

            widget.setValue("hidden_columns_list", JSON.stringify(hiddencols));
            widget.setValue("hidden_rows_list", JSON.stringify(hiddenrows));

            EventBus.$emit("changeheaders", hiddencols);
            EventBus.$emit("changerowsvisibility", hiddenrows);
        },

        resetRow(i) {

        }
    }
};

</script>
