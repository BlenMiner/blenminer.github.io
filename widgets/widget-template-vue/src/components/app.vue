<template>
    <v-app>
        <v-content>
            <preferences :tabcount="tabCount" :tabs="tabs" />

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
                    :owner="owner"
                    :style="'background-color:white;height: 100vh;' + (currentProject !== null ? 'max-width: 360px;' : 'max-width:100%;')"
                />
                <v-slide-x-transition>
                    <projectView
                        v-show="currentProject !== null"
                        :tabcount="tabCount"
                        :tabs="myTabs"
                        :url="(!tenants || !tenants[tenantId]) ? 'https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia' : ('https://' + tenants[tenantId]['platformId'] + '-' + enoviaUrl)"
                        :objectid="objectid"
                        :project="currentProject"
                        :securitycontext="securityContext"
                        style="max-width: 100%;"
                    />
                </v-slide-x-transition>
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
    background-color:#ffffff;
}
</style>

<script>
/* eslint-disable no-console */
import projectGrid from "./project-grid.vue";
import projectView from "./project-view.vue";
import preferences from "./preferences.vue";
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
        projectView,
        preferences
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
            tabCount: 4,
            owner: "Loading ...",

            enoviaUrl: "https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",

            projects:
            [
                {
                    id: "C745A4D6DB8A000080B84F5E43A50500",
                    name: "Project Purple Planet",
                    description: "efe",
                    deadline: "20/09/1997",
                    icon: "https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",
                    progress: "50.2",
                    state: "Active",
                    owner: "Me :D"
                },
                {
                    id: "pfft",
                    name: "Project Red Planet",
                    description: "fef",
                    deadline: "20/09/1997",
                    icon: "https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",
                    progress: "10",
                    state: "Create",
                    owner: "Me :D"
                }
            ],

            tabs:
            [
                {
                    name: "Schedule Status",
                    url: "/programcentral/ProgramCentralExecutionStatusReport.jsp?objectId={id}&SecurityContext={context}"
                },
                {
                    name: "Bussiness Status",
                    url: "/programcentral/ProgramCentralBusinessStatusReport.jsp?objectId={id}&SecurityContext={context}"
                },
                {
                    name: "Gantt",
                    url: "/webapps/ENOGantt/gantt-widget.html?objectId={id}&SecurityContext={context}"
                }
            ],
            myTabs: [],

            securityContext: ""
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

        EventBus.$on("change_tab_count", (value) => {
            widget.setValue("_TabCount_", value);
            that.tabCount = value;
        });

        EventBus.$on("toast", (value) => {
            that.toast(value);
        });

        EventBus.$on("selection_project", (value) => {
            that.objectid = value.id;
            that.currentProject = value;
        });

        EventBus.$on("removeProjectSelection", (value) => {
            that.currentProject = null;
            that.objectid = "";
        });

        EventBus.$on("myTabsUpdated", (value) => {
            that.myTabs = [];
            for (let i = 0; i < that.tabCount; i++) {
                that.myTabs[i] = {
                    name: widget.getValue(`_Tab${i}_Name_`),
                    url: widget.getValue(`_Tab${i}_Url_`)
                };
            }
            that.$forceUpdate();
        });

        EventBus.$on("reloadwidget", (value) => {
            // Loads the prefs if available
            that.tenantId = widget.getValue("_CurrentTenantID_");
            that.enoviaUrl = widget.getValue("_Enovia_");
            that.tabCount = parseInt(widget.getValue("_TabCount_"), 10);
            that.securityContext = widget.getValue("_CurrentSecurityContext_");

            widget.setTitle(widget.getValue("_Title_"));
            window.title = widget.getValue("_Title_");

            EventBus.$emit("myTabsUpdated");
            that.retrieveSecurityContexts();
        });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 2000);
            this.myTabs = this.tabs;
        } else {
            this.projects = [];
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
                name: "_Title_",
                type: "text",
                label: "Widget Title",
                defaultValue: "Widget Project Management"
            });

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
                defaultValue: "eu1-space.3dexperience.3ds.com/enovia"
            });

            widget.addPreference({
                name: "_TabCount_",
                type: "hidden", // range
                label: "Tab Count",
                defaultValue: "2",
                step: "1",
                min: "1",
                max: "10"
            });

            widget.addPreference({
                name: "_CurrentSecurityContext_",
                type: "list",
                label: "Security Context",
                defaultValue: "",
                options: [{ value: "", label: "None" }]
            });

            for (let i = 0; i < 10; i++) {
                widget.addPreference({
                    name: `_Tab${i}_Name_`,
                    type: "hidden",
                    defaultValue: "New tab " + (i + 1)
                });
                widget.addPreference({
                    name: `_Tab${i}_Url_`,
                    type: "hidden",
                    defaultValue: this.tabs[(i > this.tabs.length - 1) ? this.tabs.length - 1 : i].url
                });
            }

            // Loads the prefs if available
            if (widget.id !== undefined) {
                EventBus.$emit("reloadwidget");
            } else this.loadingbar = false;
        },

        retrieveAllProjects() {
            const that = this;
            this.loadingbar = true;

            const _3dspace = this.tenants[this.tenantId]["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/v1/modeler/projects?SecurityContext=" + this.securityContext,
            {
                onComplete: (response) => {
                    const data = JSON.parse(response);

                    for (let i = 0; i < data.data.length; i++) {
                        const prjt = data.data[i];
                        that.projects.push({
                            id: prjt.id,
                            name: prjt.dataelements.name,
                            description: prjt.dataelements.description,
                            deadline: prjt.dataelements.estimatedFinishDate,
                            icon: prjt.dataelements.typeicon,
                            progress: prjt.dataelements.percentComplete,
                            state: prjt.dataelements.state,
                            owner: prjt.relateddata && prjt.relateddata.ownerInfo && prjt.relateddata.ownerInfo.dataelements ? (
                                prjt.relateddata.ownerInfo.dataelements.firstname +
                                prjt.relateddata.ownerInfo.dataelements.lastname
                            ) : that.owner
                        });
                    }

                    that.loadingbar = false;
                },

                onFailure: (err) => {
                    that.projects = [];
                    that.toast(err);
                    that.loadingbar = false;
                }
            });
        },

        retrieveSecurityContexts() {
            const that = this;
            this.loadingbar = true;

            const _3dspace = this.tenants[this.tenantId]["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/modeler/pno/person?&current=true&select=collabspaces&select=firstname&select=lastname",
            {
                onComplete: (response) => {
                    const data = JSON.parse(response);
                    const contextList = []; // {value, label}

                    contextList.push({ value: "", label: "None" });

                    that.owner = data.firstname + " " + data.lastname;

                    for (let j = 0; j < data.collabspaces.length; j++) {
                        const colabspace = data.collabspaces[j].name;

                        for (let i = 0; i < data.collabspaces[j].couples.length; i++) {
                            const couple = data.collabspaces[j].couples[i];

                            const orgName = couple.organization.name;
                            const roleName = couple.role.name;

                            const sec = roleName + "." + orgName + "." + colabspace;

                            contextList.push({
                                value: sec,
                                label: sec
                            });
                        }
                    }

                    widget.addPreference({
                        name: "_CurrentSecurityContext_",
                        type: "list",
                        label: "Security Context",
                        defaultValue: contextList[0],
                        options: contextList
                    });

                    that.securityContext = widget.getValue("_CurrentSecurityContext_");
                    that.retrieveAllProjects();
                },

                onFailure: (response) => {
                    that.retrieveAllProjects();
                }
            });
        }
    }
};

</script>
