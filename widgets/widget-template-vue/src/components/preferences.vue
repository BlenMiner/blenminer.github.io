<template>
    <v-dialog v-model="dialog" max-width="80%">
        <v-card>
            <v-dialog v-model="infodialog" max-width="700px">
                <v-toolbar
                    style="background-color: #005685;"
                    dark
                    flat
                >
                    <v-toolbar-title>URL Presets</v-toolbar-title>
                </v-toolbar>
                <v-card tile>
                    <v-content v-for="(tab, i) in tabs" :key="i" class="pa-5">
                        <h3>{{ tab.name }}</h3>
                        {{ tab.url }}
                    </v-content>
                </v-card>
            </v-dialog>
            <v-toolbar
                style="background-color: #005685;"
                dark
                flat
            >
                <v-toolbar-title>Tab settings</v-toolbar-title>
                <v-spacer />
                <v-btn icon @click="infodialog = true"><v-icon>mdi-information</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <br />
                <v-form>
                    <b>{id}</b> gets replaced by the project's ID<br />
                    <b>{context}</b> gets replaced by security context<br />
                    <template v-for="i in tabcount">
                        <center :key="i"><b>Tab {{ i }}</b></center>
                        <v-text-field
                            :key="i + '_name'"
                            v-model="tabNames[i - 1]"
                            :label="'Tab ' + i + ': Name'"
                            name="tabname"
                        />
                        <v-text-field
                            :key="i + '_url'"
                            v-model="tabUrls[i - 1]"
                            :label="'Tab ' + i + ': Url'"
                            title="{id} gets replaces by the project's ID"
                            name="taburl"
                        />
                    </template>
                    <center>
                        <v-btn
                            color="success"
                            class="pa-2"
                            width="50%"
                            @click="savesettings(tabcount)"
                        >
                            Save Settings
                        </v-btn>
                    </center>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        tabcount: Number,
        tabs: Array
    },

    data: function() {
        return {
            dialog: false,
            infodialog: false,
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
                that.tabUrls[i] = widget.getValue(`_Tab${i}_Url_`) || "/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId={id}";
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
