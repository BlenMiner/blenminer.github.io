<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col>
                <v-row
                    align="start"
                    justify="start"
                    class="grey lighten-5"
                    no-gutters
                >
                    <v-card
                        v-for="(project, index) in projects"
                        :key="index"
                        max-width="260"
                        max-height="150"
                        outlined
                        tile
                        class="ma-1 pa-1"
                        hover
                        @click="toast('pra ' + index)"
                    >
                        <v-list-item>
                            <v-list-item-avatar
                                tile
                                size="60"
                            >
                                <v-img src="static/images/project.png" class="white--text align-end" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="mb-2">{{ project.name }}</v-list-item-title>
                                <v-list-item-subtitle>Owner: {{ project.owner }}</v-list-item-subtitle>
                                <v-list-item-subtitle>Role: {{ project.role }}</v-list-item-subtitle>
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
    data: function() {
        return {
            projects:
            [
                {
                    name: "Project Purple Planet",
                    owner: "My Mom",
                    role: "Animator",
                    deadline: "20/09/1997"
                },
                {
                    name: "Project Red Planet",
                    owner: "Me myself & I",
                    role: "Animator",
                    deadline: "20/09/1997"
                }
            ]
        };
    },
    methods: {
        toast(text) {
            EventBus.$emit("toast", text);
        }
    }
};

</script>
