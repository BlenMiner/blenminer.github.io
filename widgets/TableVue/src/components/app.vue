<template>
    <v-app>
        <v-content>
            <preferences />

            <!-- header progress bar -->
            <v-progress-linear
                color="blue accent-4"
                indeterminate
                height="10"
                :active="loadingbar"
                absolute
                app
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

            <v-slide-x-transition>
                <center v-if="fileId === ''">
                    <v-content style="height:100vh;width:100%;">
                        <v-card id="drop" ref="drop" width="90vh" height="90vh" />
                    </v-content>
                </center>
                <v-content v-else>
                    <span>{{ sampleText }}</span>
                </v-content>
            </v-slide-x-transition>
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

#drop {
    width: 20em;
    height: 20em;

    border-style: dashed;
    border-color: lightgray;
    border-width: 4px;
    border-radius: 20%;

    background-image: url(https://blenminer.github.io/widgets/LiveTables/assets/cloud.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f7f7f7;

    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
</style>

<script>
/* eslint-disable no-console */
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
        preferences
    },

    data: function() {
        return {
            loadingbar: true,

            sampleText: "test,test1,test2",

            // Used to log information
            snackbarMsg: "",
            snackbar: false,

            fileId: "",

            // Data loaded from DS and from preferences
            tenantId: -1,
            tenants: [],

            // tenant returns the current selected tenant, used to retrieve services URL
            tenant: (this.tenantId > -1 && this.tenantId < this.tenants.length) ? this.tenants[this.tenantId] : null
        };
    },

    computed: {
        message: function() {
            return this.$store.state.message;
        }
    },

    // As soon as we get mounted start searching the tenant list
    mounted: function () {
        const that = this;

        that.loadingbar = true;

        EventBus.$on("reloadwidget", () => { that.reload(); });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 2000);
        } else {
            this.projects = {};

            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });

            requirejs(["DS/DataDragAndDrop/DataDragAndDrop"], (DataDragAndDrop) => {
                DataDragAndDrop.droppable(that.$refs.drop, {
                    drop: (strData, element, event) => {
                        that.objectDroped(strData, element, event);
                    }
                });
            });
        }
    },

    methods: {
        log(msg) {
            this.snackbarMsg = msg;
            this.snackbar = true;
        },

        getCSRF(onComplete, onFailure) {
            const that = this;

            // Retrive CSRF ticket
            const _3dspace = that.tenant["3DSpace"];
            httpCallAuthenticated(_3dspace + "/resources/v1/application/CSRF",
            {
                onComplete: (response) => {
                    const res = JSON.parse(response);
                    onComplete(res.csrf.value);
                },

                onFailure: (response) => {
                    that.log(response);
                    onFailure();
                }
            });
        },

        reload() {
            const that = this;

            that.tenantId = widget.getValue("_CurrentTenantID_");
            that.fileId = widget.getValue("_FileID_");

            if (widget.id !== undefined) {
                const _3dspace = that.tenant["3DSpace"];

                if (that.fileId !== "") {
                    // Retrieve a CSRF ticket & download the file!
                    that.getCSRF(
                        (csrf) => {
                            httpCallAuthenticated(_3dspace + `/resources/v1/modeler/documents/${that.fileId}/files/DownloadTicket`,
                            {
                                method: "PUT",
                                headers: { ENO_CSRF_TOKEN: csrf },

                                onComplete: (response) => {
                                    const res = JSON.parse(response);
                                    httpCallAuthenticated(res.data[0].dataelements.ticketURL,
                                    {
                                        onComplete: (datatxt) => {
                                            that.displayFileData(datatxt);
                                            that.loadingbar = false;
                                        },

                                        onFailure: (response) => {
                                            that.log(response);
                                            that.loadingbar = false;
                                        }
                                    });
                                },

                                onFailure: (response) => {
                                    that.log(response);
                                    that.loadingbar = false;
                                }
                            });
                        },
                        () => {
                            that.loadingbar = false;
                        }
                    );
                }
            } else {
                that.loadingbar = false;
            }
        },

        objectDroped(strData, element, event) {
            const res = JSON.parse(strData);
            console.log(strData);
            console.log(res);
        },

        displayFileData(datatxt) {
            this.sampleText = datatxt;
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
                name: "_FileID_",
                type: "text",
                label: "File Object ID",
                defaultValue: ""
            });

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        }
    }
};

</script>
