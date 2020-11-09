<template>
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
</template>

<script>
export default {
    name: "HistoryDialog",

    props: {
        dialog: Boolean,
        selected: Object
    }
};
</script>
