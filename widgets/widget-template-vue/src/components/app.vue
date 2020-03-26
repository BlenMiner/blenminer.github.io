<template>
    <v-app>
        <v-content>
            <preferences :tabcount="tabCount" :tabs="tabs" />

            <!-- header progress bar -->
            <v-progress-linear
                color="blue accent-4"
                indeterminate
                height="10"
                :active="loadingbar > 0"
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

            loadingbar: 0,
            objectid: "",
            currentProject: null,
            tabCount: 4,
            owner: "Loading ...",

            enoviaUrl: "https://r1132100006595-eu1-space.3dexperience.3ds.com/enovia",

            projects:
            {
                C745A4D6DB8A000080B84F5E43A50500: {
                    id: "C745A4D6DB8A000080B84F5E43A50500",
                    name: "Project Purple Planet",
                    description: "efe",
                    deadline: "20/09/1997",
                    icon: "https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",
                    progress: "50.2",
                    state: "Active",
                    owner: "Me :D"
                },
                pfft: {
                    id: "pfft",
                    name: "Project Red Planet",
                    description: "fef",
                    deadline: "20/09/1997",
                    icon: "https://R1132100006595-eu1-space.3dexperience.3ds.com/enovia/snresources/images/icons/small/I_ProjectSpace.png",
                    progress: "5",
                    state: "Create",
                    owner: "Me :D"
                }
            },

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
                    url: widget.getValue(`_Tab${i}_Url_`),
                    openNewTab: widget.getValue(`_Tab${i}_NewTab_`)
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
            this.projects = {};
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
                widget.addPreference({
                    name: `_Tab${i}_NewTab_`,
                    type: "hidden",
                    defaultValue: false
                });
            }

            // Loads the prefs if available
            if (widget.id !== undefined) {
                EventBus.$emit("reloadwidget");
            } else this.loadingbar = 0;
        },

        retrieveAllProjects() {
            const that = this;
            this.loadingbar += 2;

            const _3dspace = this.tenants[this.tenantId]["3DSpace"];
            const collabspace = this.securityContext.split(".")[2];

            that.projects = {};

            // /resources/e6w/service/json/PRG_Experience_MyProjects_List?tenant=R1132100006595&xrequestedwith=xmlhttprequest
            // /resources/e6w/service/json/PRG_Experience_MyTasks_List?tenant=R1132100006595&xrequestedwith=xmlhttprequest

            httpCallAuthenticated(_3dspace + `/resources/e6w/service/json/PRG_Experience_MyProjects_List?SecurityContext=${this.securityContext}`,
            {
                onComplete: (response) => {
                    const items = JSON.parse(response).widget.datarecords.datagroups;

                    for (let i = 0; i < items.length; i++) {
                        const id = items[i].physicalId;
                        const data = items[i].dataelements;

                        that.$set(this.projects, id, {
                            id: id,
                            name: data.name.value[0].value,
                            description: data.desc.value[0].value,
                            icon: data.image.value[0].imageValue,
                            progress: data.percentComplete.value[0].value,
                            state: (data.phase.value.length !== 0) ? data.phase.value[0].value : "",
                            owner: data.owner.value[0].value,
                            type: "Project Space"
                        });
                        that.loadingbar--;
                    }
                },

                onFailure: (response) => {
                    that.loadingbar--;
                }
            });

            /* const tags = {};
            tags.allfilters = {
                "ds6w:what/ds6w:policy": [
                    {
                        object: "Project Task",
                        type: "string",
                        field: ["implicit"]
                    },
                    {
                        object: "Financial Items",
                        type: "string",
                        field: ["implicit"]
                    }
                ]
            };

            httpCallAuthenticated(_3dspace + `/resources/enocsmrest/collabspaces/${encodeURIComponent(collabspace)}/contents?SecurityContext=${this.securityContext}&tags=${encodeURIComponent(JSON.stringify(tags))}`,
            {
                onComplete: (response) => {
                    const items = JSON.parse(response).items;

                    for (let i = 0; i < items.length; i++) {
                        const id = items[i].id;
                        const data = items[i].businessobj;

                        that.$set(this.projects, id, {
                            id: id,
                            name: data.name,
                            description: data.desc,
                            icon: data.icon,
                            progress: -1,
                            state: data.maturity ? data.maturity.name : "NAN",
                            owner: data.fullnameowner,
                            type: data.type.value
                        });
                        that.loadingbar--;
                    }
                },

                onFailure: (response) => {
                    that.loadingbar--;
                }
            }); */
        },

        retrieveSecurityContexts() {
            const that = this;
            this.loadingbar++;

            const _3dspace = this.tenants[this.tenantId]["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/modeler/pno/person?&current=true&select=collabspaces&select=firstname&select=lastname",
            {
                onComplete: (response) => {
                    that.projects = [];
                    const data = JSON.parse(response);
                    const contextList = []; // {value, label}

                    contextList.push({ value: "", label: "None" });

                    that.owner = data.firstname + " " + data.lastname;

                    for (let j = 0; j < data.collabspaces.length; j++) {
                        const colabspace = data.collabspaces[j];
                        const colabspaceName = data.collabspaces[j].name;

                        for (let i = 0; i < colabspace.couples.length; i++) {
                            const couple = colabspace.couples[i];

                            const orgName = couple.organization.name;

                            const val = "ctx::" + couple.role.name + "." + orgName + "." + colabspaceName;
                            const label = couple.role.nls + "." + orgName + "." + colabspaceName;

                            contextList.push({
                                value: val,
                                label: label
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
                    this.loadingbar--;
                    that.retrieveAllProjects();
                },

                onFailure: (response) => {
                    this.loadingbar--;
                    that.retrieveAllProjects();
                }
            });
        }
    }
};

</script>
