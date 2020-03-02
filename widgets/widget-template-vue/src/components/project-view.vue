<template>
    <!-- header progress bar -->
    <v-card v-if="project !== null" style="width: 100%; padding: 0;height: 100vh;" flat>
        <v-progress-linear
            color="cyan accent-4"
            indeterminate
            height="5"
            :active="loadingbar"
        />
        <v-btn text @click="back()"> <v-icon>mdi-forwardburger</v-icon> </v-btn>
        <b>{{ project.name }}</b>
        <v-btn text style="float:right;" @click="settings()"> <v-icon>mdi-settings</v-icon> </v-btn>

        <v-tabs
            v-model="tab"
            background-color="#005685"
            dark
        >
            <v-tab
                v-for="i in tabcount"
                :key="i"
            >
                {{ tabs[i - 1] ? tabs[i - 1].name : 'Loading ...' }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="i in tabcount"
                :key="i"
            >
                <v-card flat>
                    <iframe :src="tabs[i - 1] ? (url + tabs[i - 1].url + objectid) : 'about:blank'" width="100%" style="height: calc(100vh - 90.51px);" @load="doneLoading()"></iframe>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        project: Object,
        tabs: Array,
        url: String,
        objectid: String,
        tabcount: Number
    },

    data: function() {
        return {
            tab: null,
            loadingbar: true
        };
    },

    mounted: function() {
        EventBus.$on("selection_project", () => {
            this.loadingbar = true;
        });
    },

    methods: {
        back: function() {
            EventBus.$emit("removeProjectSelection");
        },

        doneLoading: function () {
            this.loadingbar = false;
        },

        settings: function () {
            EventBus.$emit("editPrefs", this.tabcount);
        }
    }
};

</script>
