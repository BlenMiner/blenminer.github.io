<template>
    <v-app>
        <v-content>
            <preferences :headers="headers" :rows="items" />

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

            <center v-show="fileId === ''">
                <v-content style="height:100vh;width:100%;">
                    <div id="drop" ref="drop" width="90vh" height="90vh"></div>
                </v-content>
            </center>
            <v-content v-if="fileId !== ''">
                <v-card height="100vh">
                    <v-card-title>
                        {{ fileName }}
                        <v-spacer />
                        <v-btn icon small @click="showSettings()"><v-icon>mdi-settings</v-icon></v-btn>
                    </v-card-title>
                    <v-data-table
                        :headers="filteredheaders"
                        :items="filteredrows"
                        :search="search"
                        class="elevation-1"
                        height="calc(100vh - 139px)"
                        loading="true"
                    >
                        <template v-slot:item.action="{ item }">
                            <v-icon
                                v-if="item"
                                small
                                class="mr-2"
                                @click="hidetablerow(item)"
                            >
                                mdi-eye-off
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card>
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
import preferences from "./preferences.vue";
import { EventBus } from "../plugins/vuetify";

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");

    const objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    const arrData = [[]];
    let arrMatches = null;
    let strMatchedValue = null;

    while ((arrMatches = objPattern.exec(strData))) {
        const strMatchedDelimiter = arrMatches[1];
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter !== strDelimiter)
            ) {
            arrData.push([]);
        }

        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
                );
        } else {
            strMatchedValue = arrMatches[3];
        }

        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

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
            tenants: [],

            filteredheaders: [],
            filteredrows: [],
            headers: [],
            items: []
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

        EventBus.$on("onSearch", (txt) => { that.search = txt; });

        EventBus.$on("reloadwidget", () => { that.reload(); });

        EventBus.$on("changeheaders", (hiddencols) => {
            const newHeader = [];
            for (let i = 0; i < that.headers.length; i++) {
                if (hiddencols[i] === undefined) {
                    newHeader.push(that.headers[i]);
                }
            }
            that.filteredheaders = newHeader;
         });

         EventBus.$on("changerowsvisibility", (hiddenrows) => {
            const newRows = [];
            for (let i = 0; i < that.items.length; i++) {
                if (hiddenrows[i] === undefined) {
                    newRows.push(that.items[i]);
                }
            }
            that.filteredrows = newRows;
         });

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => { that.tenantDataLoaded([{ id: -1 }]); }, 500);
        } else {
            this.projects = {};

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
        showSettings() {
            EventBus.$emit("settingsShow");
        },

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
                } else {
                    that.loadingbar = false;
                }
            } else {
                that.fileId = "1";
                that.displayFileData("test 6,test 9,test2\n1,2,3\n4,5,6\naba,eba,ibi");
                that.loadingbar = false;
            }
        },

        objectDroped(strData, element, event) {
            const res = JSON.parse(strData);

            if (res.protocol === "3DXContent") {
                this.fileId = res.data.items[0].objectId;
                this.fileName = res.data.items[0].displayName;
                widget.setValue("_FileID_", this.fileId);
                widget.setValue("_FileName_", this.fileName);
                this.reload();
            }
        },

        displayFileData(datatxt) {
            const data = CSVToArray(datatxt, ",");
            this.headers = [];
            this.filteredheaders = [];
            this.items = [];

            if (data.length === 0) {
                return;
            }

            for (let j = 0; j < data[0].length; j++) {
                const titleBlock = data[0][j];
                const hdr = {
                    text: titleBlock,
                    value: `col_${j}`
                };
                this.headers.push(hdr);
                this.filteredheaders.push(hdr);
            }

            this.headers.push({ text: "Actions", value: "action", sortable: false });
            this.filteredheaders.push({ text: "Actions", value: "action", sortable: false });

            for (let i = 1; i < data.length; i++) {
                const item = {};
                for (let j = 0; j < data[i].length; j++) {
                    const block = data[i][j];
                    item[`col_${j}`] = block;
                }
                this.items.push(item);
                this.filteredrows.push(item);
            }

            EventBus.$emit("loadedtable", this.headers, this.items);
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

            widget.addPreference({
                name: "hidden_columns_list",
                type: "hidden",
                defaultValue: "{}"
            });

            widget.addPreference({
                name: "hidden_rows_list",
                type: "hidden",
                defaultValue: "{}"
            });

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        hidetablerow(item) {
            const index = this.items.indexOf(item);
            EventBus.$emit("removeandupdate", index);
        }
    }
};

</script>
