<template>
    <v-card style="width: 100%;">
        <v-tabs
            v-model="tab"
            background-color="primary"
            dark
        >
            <v-tab
                v-for="(item, index) in items"
                :key="index"
            >
                {{ item.name }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" style="height: calc(100vh - 120px);">
            <v-tab-item
                v-for="(item, index) in items"
                :key="index"
            >
                <v-card flat>
                    <iframe :src="item.url" width="100%" style="height: calc(100vh - 120px);"></iframe>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>

export default {
    props: {
        items: Array
    },

    data: function() {
        return {
            tab: null
        };
    }
};

</script>
