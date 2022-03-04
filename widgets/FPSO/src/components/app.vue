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
                <div style="position: relative; width:100%; height:100vh;">
                    <canvas id="generalChart" ref="generalChart"></canvas>
                </div>
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
    overflow: hidden;
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

section {
  display: grid;
  justify-content: center;
  align-content: center;

  gap: 4px;
  grid-auto-flow: column;
}

</style>

<script>
/* eslint-disable no-console */
import { EventBus } from "../plugins/vuetify";
import Chart from "chart.js/auto";
import "chartjs-adapter-moment";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

function ExcelDateToJSDate(serial) {
   const utcDays = Math.floor(serial - 25569);
   const utcValue = utcDays * 86400;
   const dateInfo = new Date(utcValue * 1000);

   const fractionalDay = serial - Math.floor(serial) + 0.0000001;

   let totalSeconds = Math.floor(86400 * fractionalDay);

   const seconds = totalSeconds % 60;

   totalSeconds -= seconds;

   const hours = Math.floor(totalSeconds / (60 * 60));
   const minutes = Math.floor(totalSeconds / 60) % 60;

   return new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);
}

export default {
    name: "App",

    components: {},

    data: function() {
        return {
            loadingbar: false,

            // For debugging reasons
            sampleText: "",
            search: "",
            fileName: "",

            // Used to log information
            snackbarMsg: "",
            snackbar: false,

            fileId: "",
            fileSize: 2,

            // Data loaded from DS and from preferences
            tenantId: -1,
            tenants: [],

            lastChart: null
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

        displaydata(sheet) {
            const HEADER_ROW = 4;
            const ACTUAL_ROW = Number.parseInt(widget.getValue("_ActualPlan_"));
            const PLAN_ROW = Number.parseInt(widget.getValue("_RowPlan_"));
            const PLAN_COL = Number.parseInt(widget.getValue("_StartCol_"));
            const COL_COUNT = Number.parseInt(widget.getValue("_ColCount_"));

            const generalChartElement = this.$refs.generalChart;

            // console.log(sheet);

            const labels = [];
            const plan = [];
            const actual = [];

            for (let i = 0; i < COL_COUNT; ++i) {
                const number = sheet[HEADER_ROW][PLAN_COL + i];
                const date = ExcelDateToJSDate(number);
                labels.push(date);
            }

            for (let i = 0; i < COL_COUNT; ++i) {
                plan.push(sheet[PLAN_ROW][PLAN_COL + i]);
            }

            for (let i = 0; i < COL_COUNT; ++i) {
                actual.push(sheet[ACTUAL_ROW][PLAN_COL + i]);
            }

            if (this.lastChart !== null) {
                this.lastChart.destroy();
            }

            // eslint-disable-next-line no-unused-vars
            this.lastChart = new Chart(generalChartElement, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Plan",
                            data: plan,
                            backgroundColor: [
                                "rgba(0, 176, 80, 1)"
                            ],
                            borderColor: [
                                "rgba(0, 176, 80, 1)"
                            ],
                            pointRadius: 0,
                            pointHitRadius: 50
                        },
                        {
                            label: "Actual",
                            data: actual,
                            backgroundColor: [
                                "rgba(0, 0, 255, 1)"
                            ],
                            borderColor: [
                                "rgba(0, 0, 255, 1)"
                            ],
                            pointRadius: 0,
                            pointHitRadius: 50
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { type: "time" }
                    }
                }
            });

            // console.log(plan);
        },

        loadgraph(fileUrl) {
            const that = this;
            that.loadingbar = true;

            fetch(fileUrl).then(result => {
                result.arrayBuffer().then(buffer => {
                    that.fileSize = buffer.byteLength;

                    const code = `
                        self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.2/xlsx.min.js');

                        self.addEventListener("message", e => {
                            const workbook = XLSX.read(e.data, { sheets: ["DATA"] , cellFormula : false, cellHTML : false, cellText : false});
                            let table = XLSX.utils.sheet_to_json(workbook.Sheets.DATA, { header:1, defval: "" });
                            postMessage(table);
                        }, false);
                    `;
                    const blob = new Blob([code], { type: "application/javascript" });
                    const url = URL.createObjectURL(blob);
                    const worker = new Worker(url);
                    URL.revokeObjectURL(url);

                    worker.onerror = error => {
                        console.error(error.message);
                    };

                    worker.onmessage = e => {
                        that.displaydata(e.data);
                        worker.terminate();
                        that.loadingbar = false;
                    };

                    worker.postMessage(buffer);
                });
            });
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

            widget.setTitle(widget.getValue("_FileName_"));

            if (that.loadingbar === true) return;

            that.loadingbar = true;

            that.tenantId = widget.getValue("_CurrentTenantID_");
            that.fileId = widget.getValue("_FileID_");
            that.fileName = widget.getValue("_FileName_");

            if (widget.id !== undefined) {
                const _3dspace = that.tenants[that.tenantId]["3DSpace"];

                if (that.fileId !== "") {
                    that.getCSRF(
                        (csrf) => {
                            httpCallAuthenticated(_3dspace + `/resources/v1/modeler/documents/${that.fileId}/files/DownloadTicket`,
                            {
                                method: "PUT",
                                headers: { ENO_CSRF_TOKEN: csrf },

                                onComplete: (response) => {
                                    const res = JSON.parse(response);
                                    const fileUrl = res.data[0].dataelements.ticketURL;
                                    that.loadingbar = false;
                                    that.loadgraph(fileUrl);
                                },

                                onFailure: (response) => {
                                    that.log(response);
                                    that.loadingbar = false;
                                }
                            });
                        },
                        (_) => {
                            that.loadingbar = false;
                        }
                    );
                } else {
                    that.loadingbar = false;
                }
            } else {
                that.loadingbar = false;
                that.loadgraph("static/112 Engineering - Package Engineering Progress v3.1 (1).xlsm");
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
                name: "_RowPlan_",
                type: "text",
                label: "Plan Row",
                defaultValue: "60",
                options: _TenantOpts
            });

            widget.addPreference({
                name: "_ActualPlan_",
                type: "text",
                label: "Actual Row",
                defaultValue: "192",
                options: _TenantOpts
            });

            widget.addPreference({
                name: "_StartCol_",
                type: "text",
                label: "Col Offset",
                defaultValue: "12",
                options: _TenantOpts
            });

            widget.addPreference({
                name: "_ColCount_",
                type: "text",
                label: "Item Count",
                defaultValue: "116",
                options: _TenantOpts
            });

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
