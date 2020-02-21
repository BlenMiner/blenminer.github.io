<template>
    <v-container
        style="height: calc(100vh - 75px); width:415px;"
        class="overflow-y-auto"
    >
        <v-row no-gutters>
            <v-col>
                <v-row
                    align="start"
                    justify="start"
                    class="grey lighten-3"
                    no-gutters
                >
                    <v-card
                        v-for="(project, index) in projects"
                        :key="index"
                        max-width="296"
                        max-height="150"
                        outlined
                        tile
                        class="ma-1 pa-1"
                        hover
                        @click="select(index)"
                    >
                        <v-list-item>
                            <v-list-item-avatar tile size="60">
                                <v-img src="https://blenminer.github.io/widgets/widget-template-vue/dist/static/images/project.png" class="white--text align-end" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="mb-2">{{ project.name }}</v-list-item-title>
                                <v-list-item-subtitle>Owner: {{ project.description }}</v-list-item-subtitle>
                                <v-list-item-subtitle>Date: {{ project.deadline }}</v-list-item-subtitle>
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
        projects: Array
    },
    methods: {
        select(index) {
            EventBus.$emit("selection_project", index);
        }
    }
};

</script>
