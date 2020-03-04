<template>
    <v-container
        style="padding: 0;"
        class="overflow-y-auto"
    >
        <v-row
            no-gutters
            style="padding: 0;"
        >
            <v-col>
                <v-row
                    align="start"
                    justify="start"
                    class="white"
                    no-gutters
                >
                    <v-card
                        v-for="(project, index) in filtertedlist()"
                        :key="index"
                        width="350px"
                        height="120px"
                        class="ma-1 pa-1"
                        :color="selection == project ? 'grey lighten-3' : 'white'"
                        hover
                        @click="select(selection, project);"
                    >
                        <v-expand-x-transition>
                            <v-list-item>
                                <v-list-item-avatar tile size="auto">
                                    <v-img :src="project.icon" />
                                </v-list-item-avatar>
                                <v-list-item-content style="padding:0;" height="120px">
                                    <v-list-item-title :title="project.name" class="my-2">{{ project.name }}</v-list-item-title>
                                    <v-list-item-subtitle :title="project.state">State: {{ project.state }}</v-list-item-subtitle>
                                    <v-list-item-subtitle :title="project.description">Desc: {{ project.description }}</v-list-item-subtitle>
                                    <v-list-item-subtitle :title="owner">Owner: {{ project.owner }}</v-list-item-subtitle>
                                    <v-progress-linear
                                        :value="project.progress"
                                        :title="project.progress"
                                        height="8px"
                                        class="my-2"
                                    />
                                </v-list-item-content>
                            </v-list-item>
                        </v-expand-x-transition>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import { EventBus } from "../plugins/vuetify";

export default {
    props: {
        projects: Array,
        selection: Object,
        owner: String
    },

    data: () => {
        return {
            searchtext: ""
        };
    },

    mounted() {
        const that = this;

        EventBus.$on("search", (msg) => {
            that.searchtext = msg.toLowerCase();
        });
    },

    methods: {
        select(selection, project) {
            if (selection !== project) {
                EventBus.$emit("selection_project", project);
            }
        },

        filtertedlist() {
            if (this.searchtext === "") {
                return this.projects;
            }
            const ret = [];

            for (let i = 0; i < this.projects.length; i++) {
                if (this.projects[i].name.toLowerCase().indexOf(this.searchtext) !== -1) {
                    ret.push(this.projects[i]);
                }
            }
            return ret;
        }
    }
};

</script>
