<template>
    <v-app>
        <v-content>
            <!-- header progress bar -->
            <v-progress-linear
                color="blue accent-4"
                indeterminate
                height="10"
                :active="loadingbar"
            />

            <!-- widget notifaction module -->
            <v-snackbar v-model="snackbar">
                {{ snackbarMsg }}
                <v-btn
                    color="grey"
                    text
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </v-snackbar>

            <!-- actual widget's content -->
            <v-list-item style="padding: 0;">
                <projectGrid
                    :projects="projects"
                    :selection="currentProject"
                    :style="'background-color:#eeeeee;height: 100vh;' + (currentProject !== null ? 'max-width: 360px;' : 'max-width:100%;')"
                />
                <template>
                    <projectView :items="tabs" :url="'https://' + tenantId + '-' + enoviaUrl" :objectid="objectid" :project="currentProject" style="max-width: 100%;" />
                </template>
            </v-list-item>
        </v-content>
    </v-app>
</template>

<!-- no scope for app.vue, style defined here is global for the app -->
<style>
html, body {
    overflow-y: auto !important;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color:#eeeeee;
}
</style>

<script>
/* eslint-disable no-console */
import projectGrid from "./project-grid.vue";
import projectView from "./project-view.vue";
import { EventBus } from "../plugins/vuetify";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",
    components: {
        projectGrid,
        projectView
    },
    data: function() {
        return {
            snackbar: false,
            snackbarMsg: "Bro",

            tenants: [],
            tenantId: 0,

            loadingbar: true,
            objectid: "",
            currentProject: null,

            enoviaUrl: "https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",

            projects:
            [
                {
                    id: "C745A4D6DB8A000080B84F5E43A50500",
                    name: "Project Purple Planet",
                    description: "efe",
                    deadline: "20/09/1997"
                },
                {
                    id: "pfft",
                    name: "Project Red Planet",
                    description: "fef",
                    deadline: "20/09/1997"
                }
            ],

            tabs:
            [
                {
                    name: "Schedule Status",
                    url: "/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId="
                },
                {
                    name: "Bussiness Status",
                    url: "/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId="
                }
            ]
        };
    },
    computed: {
        message: function() {
            return this.$store.state.message;
        }
    },
    watch: {},

    // As soon as we get mounted start searching the tenant list
    mounted: function () {
        const that = this;

        EventBus.$on("toast", (value) => {
            that.toast(value);
        });

        EventBus.$on("selection_project", (value) => {
            that.objectid = that.projects[value].id;
            that.currentProject = that.projects[value];
        });

        EventBus.$on("removeProjectSelection", (value) => {
            that.currentProject = null;
            that.objectid = "";
        });

        EventBus.$on("reloadwidget", (value) => {
            // Loads the prefs if available
            this.tenantId = widget.getValue("_CurrentTenantID_");
            this.enoviaUrl = widget.getValue("_Enovia_");
            that.retrieveAllProjects();
        });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 2000);
        } else {
            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });
        }
    },
    methods: {

        // Displays a fun notification
        toast(text) {
            this.snackbarMsg = text;
            this.snackbar = true;
        },

        // Load the tenant data & its services URLs based on the ID
        tenantDataLoaded(data) {
            this.tenants = [];
            const _TenantOpts = [];

            let j = 0;

            // Load all the tenants
            for (let i = 0; i < data.length; i++) {
                if (data[i]["3DSpace"] === undefined) continue;
                _TenantOpts.push({
                    value: `${j++}`,
                    label: `${data[i].platformId} - ${data[i].displayName}`
                });
                this.tenants.push(data[i]);
            }

            // Setup your preferences...
            widget.addPreference({
                name: "_CurrentTenantID_",
                type: "list",
                label: "Tenant",
                defaultValue: "0",
                options: _TenantOpts
            });

            widget.addPreference({
                name: "_Enovia_",
                type: "text",
                label: "Enovia URL",
                defaultValue: "https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia"
            });

            // Loads the prefs if available
            this.tenantId = widget.getValue("_CurrentTenantID_");
            this.enoviaUrl = widget.getValue("_Enovia_");

            if (widget.id !== undefined) this.retrieveAllProjects();
            else this.loadingbar = false;
        },

        retrieveAllProjects() {
            const that = this;

            const _3dspace = this.tenants[this.tenantId]["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/v1/modeler/projects",
            {
                onComplete: (response) => {
                    const data = JSON.parse(response);
                    that.projects = [];

                    for (let i = 0; i < data.data.length; i++) {
                        const prjt = data.data[i];
                        that.projects.push({
                            id: prjt.id,
                            name: prjt.dataelements.name,
                            description: prjt.dataelements.description,
                            deadline: prjt.dataelements.estimatedFinishDate
                        });
                    }

                    this.loadingbar = false;
                },

                onFailure: () => {
                    this.loadingbar = false;
                }
            });
        }
    }
};

</script>
