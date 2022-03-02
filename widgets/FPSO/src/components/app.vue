<template>
    <v-app>
        <v-content>
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

            <center v-if="fileId === ''">
                <v-content style="height:100vh;width:100%;">
                    <div id="drop" ref="drop" width="90vh" height="90vh"></div>
                </v-content>
            </center>
            <v-content v-else>
                <center>
                    <v-card width="500px" height="500px">
                        {{ fileId }}
                    </v-card>
                </center>
            </v-content>
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
    width: 90vh;
    height: 90vh;

    border-style: dashed;
    border-color: lightgray;
    border-width: 4px;
    border-radius: 20%;

    background-image: url(https://blenminer.github.io/widgets/LiveTables/assets/cloud.png);
    background-size: 60%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #f7f7f7;

    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>

<script>
/* eslint-disable no-console */
import { EventBus } from "../plugins/vuetify";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",

    components: {},

    data: function() {
        return {
            loadingbar: true,

            // For debugging reasons
            sampleText: "",
            search: "",
            fileName: "",

            // Used to log information
            snackbarMsg: "",
            snackbar: false,

            fileId: "",

            // Data loaded from DS and from preferences
            tenantId: -1,
            tenants: []
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
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 500);
        } else {
            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });

            requirejs(["DS/PlatformAPI/PlatformAPI"], (PlatformAPI) => {
                PlatformAPI.subscribe("file_uploaded", (data) => {
                    if (data === that.fileId) {
                        that.reload();
                    }
                });
            });

            if (that.$refs.drop) {
                requirejs(["DS/DataDragAndDrop/DataDragAndDrop"], (DataDragAndDrop) => {
                    DataDragAndDrop.droppable(that.$refs.drop, {
                        drop: (strData, element, event) => {
                            that.objectDroped(strData, element, event);
                        }
                    });
                });
            }
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
            const _3dspace = that.tenants[that.tenantId]["3DSpace"];
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

            that.loadingbar = true;

            that.tenantId = widget.getValue("_CurrentTenantID_");
            that.fileId = widget.getValue("_FileID_");
            that.fileName = widget.getValue("_FileName_");

            if (widget.id !== undefined) {
                const _3dspace = that.tenants[that.tenantId]["3DSpace"];

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
                                    const fileUrl = res.data[0].dataelements.ticketURL;

                                    console.log(fileUrl);
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
                } else {
                    that.loadingbar = false;
                }
            } else {
                that.loadingbar = false;
                that.fileId = "1";
            }
        },

        objectDroped(strData, element, event) {
            const res = JSON.parse(strData);
            console.log("object dropped!", res); 

            if (res.protocol === "3DXContent") {
                this.fileId = res.data.items[0].objectId;
                this.fileName = res.data.items[0].displayName;
                widget.setValue("_FileID_", this.fileId);
                widget.setValue("_FileName_", this.fileName);
                this.reload();
            }
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

            widget.addPreference({
                name: "_FileName_",
                type: "text",
                label: "File Name",
                defaultValue: ""
            });

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        }
    }
};

</script>
