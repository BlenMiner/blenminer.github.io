<template>
    <v-container
        style="padding: 0;"
    >
        <v-row
            no-gutters
        >
            <v-col>
                <v-row
                    align="start"
                    justify="start"
                    class="white"
                    no-gutters
                >
                    <v-card
                        v-for="(project, index) in projects"
                        :key="index"
                        width="350px"
                        height="120px"
                        class="ma-1 pa-1"
                        :color="selection == project ? 'grey lighten-3' : 'white'"
                        hover
                        @click="select(index, selection, project);"
                    >
                        <v-list-item>
                            <v-list-item-avatar tile size="auto">
                                <v-img :src="project.icon" />
                            </v-list-item-avatar>
                            <v-list-item-content style="padding:0;" height="120px">
                                <v-list-item-title :title="project.name" class="my-2" v-on="on">{{ project.name }}</v-list-item-title>
                                <v-list-item-subtitle :title="project.state">State: {{ project.state }}</v-list-item-subtitle>
                                <v-list-item-subtitle :title="project.description">Desc: {{ project.description }}</v-list-item-subtitle>
                                <v-progress-linear
                                    :value="project.progress"
                                    :title="project.progress"
                                    height="8px"
                                    class="my-2"
                                />
                            </v-list-item-content>
                        </v-list-item>
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
        selection: Object
    },

    methods: {
        select(index, selection, project) {
            if (selection !== project) {
                EventBus.$emit("selection_project", index);
            }
        }
    }
};

</script>
