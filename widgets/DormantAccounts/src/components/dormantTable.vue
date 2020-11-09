<template>
    <div id="dormantTable">
        <v-card flat>
            <v-data-table
                :headers="headers"
                :items="table"
                :items-per-page="15"
                dense
                :fixed-header="true"
                :loading="loadingbar"
                :search="search"
                height="calc(100vh - 131px)"
            >
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
        search: String
    },

    data: function() {
        return {
            dialog: false,
            selected: null,

            headers: [
                { text: "Client ID", value: "clientID" },
                { text: "Client", value: "client" },

                { text: "ALC 2019", value: "ALC2019" },
                { text: "YLC 2019", value: "YLC2019" },
                { text: "RLC 2019", value: "RLC2019" },

                { text: "ALC 2018", value: "ALC2018" },
                { text: "YLC 2018", value: "YLC2018" },
                { text: "RLC 2018", value: "RLC2018" }
            ]
        };
    },

    methods: {
    }
};

</script>
