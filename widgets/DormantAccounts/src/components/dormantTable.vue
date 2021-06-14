<template>
    <div id="dormantTable">
        <v-dialog
            v-if="selected !== null"
            id="histDialog"
            v-model="dialog"
            scrollable
            max-width="60%"
        >
            <v-card>
                <v-card-title>History {{ selected.name }}</v-card-title>
                <v-card-text style="height: 80vh;">
                    <v-card v-for="(hist, i) in selected.history" :key="i" outlined class="ma-1" elevation="5">
                        <v-list-item three-line>
                            <v-list-item-content>
                                <div class="overline text-right" style="user-select: text;">
                                    DS Customer Number: {{ hist.dsCustomerNumber.replace(" ", "").replace(" ", "").replace(" ", "") }}
                                    <br />
                                    {{ hist.date.toLocaleString() }}
                                </div>
                                <v-list-item-title><h5 style="user-select: text;">{{ hist.subject }}</h5></v-list-item-title>
                                <v-list-item-content style="user-select: text;">{{ hist.description }}</v-list-item-content>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-card flat>
            <v-data-table
                :headers="headers"
                :items="table"
                :items-per-page="15"
                dense
                :fixed-header="true"
                :loading="loadingbar"
                :search="search"
                height="calc(100vh - 123px)"
            >
                <template v-slot:footer>
                    Last update: {{ date }}
                </template>
                <template v-slot:item="{item}">
                    <tr>
                        <td> {{ item.clientID }} </td>
                        <td> {{ item.client }} </td>

                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="#ffe500"> {{ item.ALC2021 }} </v-chip></td>
                        <!-- <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.PLC2021 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.YLC2021 }} </v-chip></td>
                        -->
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="#ffee57"> {{ item.ALC2020 }} </v-chip></td>
                        <!--<td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.PLC2020 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.YLC2020 }} </v-chip></td>
                        -->
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="#fff495"> {{ item.ALC2019 }} </v-chip></td>
                        <!--<td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.PLC2019 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.YLC2019 }} </v-chip></td>
                        -->
                        <td class="text-center">
                            <v-btn v-if="item.hist" value="recent" small rounded @click="expand(item.hist)">
                                {{ item.hist.lastActivity }} DAYS AGO
                            </v-btn>
                            <div v-else>-</div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>

export default {
    name: "DormantTable",

    props: {
        table: Array,
        loadingbar: Boolean,
        search: String,
        date: String
    },

    data: function() {
        return {
            dialog: false,
            selected: null,

            headers: [
                { text: "Client ID", value: "clientID" },
                { text: "Client", value: "client" },

                { text: "ALC 2021", value: "N_ALC2021" },
                // { text: "PLC 2021", value: "N_PLC2021" },
                // { text: "YLC 2021", value: "N_YLC2021" },

                { text: "ALC 2020", value: "N_ALC2020" },
                // { text: "PLC 2020", value: "N_PLC2020" },
                // { text: "YLC 2020", value: "N_YLC2020" },

                { text: "ALC 2019", value: "N_ALC2019" },
                // { text: "PLC 2019", value: "N_PLC2019" },
                // { text: "YLC 2019", value: "N_YLC2019" },

                { text: "History", value: "hist.lastActivity" }
            ]
        };
    },

    methods: {
        expand(item) {
            this.dialog = false;
            this.dialog = true;
            this.selected = item;
        }
    }
};

</script>
