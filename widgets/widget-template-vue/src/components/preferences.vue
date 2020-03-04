<template>
    <v-dialog v-model="dialog" max-width="80%" @click:outside="savesettings(tabcount)">
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
                        <v-card :key="i + '_card'" class="my-2" hover style="cursor:default;">
                            <v-card-actions>
                                <h3>Tab {{ i }}:</h3>
                                <v-spacer />
                                <v-btn v-if="tabcount < 10" icon color="success" @click="insert((i - 1), tabcount)"><v-icon>mdi-plus</v-icon></v-btn>
                                <v-btn v-if="tabcount > 1" icon color="error" @click="remove((i - 1), tabcount)"><v-icon>mdi-delete</v-icon></v-btn>
                            </v-card-actions>
                            <v-card-text>
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
                                    title="{id}= project's ID; {context} = security context;"
                                    name="taburl"
                                />
                            </v-card-text>
                        </v-card>
                    </template>
                    <v-btn color="success" @click="insert(tabcount, tabcount)"><v-icon>mdi-plus</v-icon> Add new tab</v-btn>
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
            let changes = false;
            if (widget.id) {
                for (let i = 0; i < tabscount; i++) {
                    if (widget.getValue(`_Tab${i}_Name_`) !== this.tabNames[i] ||
                        widget.getValue(`_Tab${i}_Url_`) !== this.tabUrls[i]) {
                        widget.setValue(`_Tab${i}_Name_`, this.tabNames[i]);
                        widget.setValue(`_Tab${i}_Url_`, this.tabUrls[i]);
                        changes = true;
                    }
                }
            }
            this.dialog = false;

            if (changes) {
                EventBus.$emit("myTabsUpdated");
            }
        },

        changeTabCount (value) {
            EventBus.$emit("change_tab_count", value);
        },

        remove (i, length) {
            for (let j = i; j < length - 1; j++) {
                this.tabNames[j] = this.tabNames[j + 1];
                this.tabUrls[j] = this.tabUrls[j + 1];
            }
            this.changeTabCount(length - 1);
        },

        insert (i, length) {
            for (let j = length - 1; j >= i; j--) {
                this.tabNames[j + 1] = this.tabNames[j];
                this.tabUrls[j + 1] = this.tabUrls[j];
            }

            this.tabNames[i] = "New tab " + (i + 1);
            this.tabUrls[i] = widget.getValue(`_Tab${i + 1}_Url_`);

            this.changeTabCount(length + 1);
        }
    }
};

</script>
