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

                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small> {{ item.ALC2019 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small> {{ item.YLC2019 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.RLC2019 }} </v-chip></td>

                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small> {{ item.ALC2018 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small> {{ item.YLC2018 }} </v-chip></td>
                        <td class="text-center"><v-chip style="height:90%;width:100%;justify-content:center;" small color="yellow"> {{ item.RLC2018 }} </v-chip></td>

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

                { text: "ALC 2019", value: "N_ALC2019" },
                { text: "YLC 2019", value: "N_YLC2019" },
                { text: "RLC 2019", value: "N_RLC2019" },

                { text: "ALC 2018", value: "N_ALC2018" },
                { text: "YLC 2018", value: "N_YLC2018" },
                { text: "RLC 2018", value: "N_RLC2018" },

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
