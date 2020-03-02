<template>
    <v-expand-x-transition>
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

            <v-tabs
                v-model="tab"
                background-color="#005685"
                dark
            >
                <v-tab
                    v-for="(item, index) in items"
                    :key="index"
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="(item, index) in items"
                    :key="index"
                >
                    <v-card flat>
                        <iframe :src="url + item.url + objectid" width="100%" style="height: calc(100vh - 90.51px);" @load="doneLoading()"></iframe>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </v-expand-x-transition>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        project: Object,
        items: Array,
        url: String,
        objectid: String
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
        }
    }
};

</script>
