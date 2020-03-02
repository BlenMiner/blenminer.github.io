<template>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-toolbar
                style="background-color: #005685;"
                dark
                flat
            >
                <v-toolbar-title>Tab settings</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <br />
                <v-form>
                    <template v-for="i in tabcount">
                        <center :key="i"><b>Tab {{ i }}</b></center>
                        <v-text-field
                            :key="i + '_name'"
                            v-model="tabNames[i - 1]"
                            :label="'Tab ' + i + ': Name'"
                            name="tabname"
                        />
                        <v-select
                            :key="i + '_url'"
                            v-model="tabUrls[i - 1]"
                            :items="tabsopts"
                            :label="'Tab ' + i + ': Url/Type'"
                            name="taburl"
                        />
                    </template>
                    <v-spacer />
                    <v-btn
                        color="success"
                        class="ma-2"
                        width="90%"
                        @click="savesettings(tabcount)"
                    >
                        Save Settings
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        tabsopts: Array,
        tabcount: Number
    },

    data: function() {
        return {
            dialog: false,
            tabNames: [],
            tabUrls: []
        };
    },

    mounted: function() {
        const that = this;

        EventBus.$on("editPrefs", (tabscount) => {
            that.dialog = true;
            for (let i = 0; i < tabscount; i++) {
                that.tabNames[i] = widget.getValue(`_Tab${i}_Name_`) || "New tab " + (i + 1);
                that.tabUrls[i] = widget.getValue(`_Tab${i}_Url_`) || "Schedule Status";
            }
        });
    },

    methods: {
        savesettings: function (tabscount) {
            if (widget.id) {
                for (let i = 0; i < tabscount; i++) {
                    widget.addPreference({
                        name: `_Tab${i}_Name_`,
                        type: "hidden",
                        defaultValue: "New tab " + (i + 1)
                    });
                    widget.addPreference({
                        name: `_Tab${i}_Url_`,
                        type: "hidden",
                        defaultValue: "Schedule Status"
                    });

                    widget.setValue(`_Tab${i}_Name_`, this.tabNames[i]);
                    widget.setValue(`_Tab${i}_Url_`, this.tabUrls[i]);
                }
            }
            this.dialog = false;
            EventBus.$emit("myTabsUpdated");
        }
    }
};

</script>
