<template>
    <div id="costumerTable">
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
                height="calc(100vh - 114px)"
            >
                <template v-slot:item="{item}">
                    <tr>
                        <td> {{ item.clientID }} </td>
                        <td> {{ item.client }} </td>
                        <td>
                            <v-btn width="100%" value="recent" small @click="expand(item)">
                                <v-icon>mdi-history</v-icon>
                                <span>History</span>
                            </v-btn>
                        </td>
                        <td>
                            {{ item.lastActivity }}
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>

export default {
    name: "CostumerTable",

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
                { text: "Subject" },
                { text: "Last Activity" }
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
