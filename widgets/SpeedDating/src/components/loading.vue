<template>
    <v-row row justify-center style="position: absolute;">
        <v-dialog v-model="value" persistent content content-class="centered-dialog">
            <v-container fill-height>
                <v-layout column justify-center align-center>
                    <v-progress-circular indeterminate :size="70" :width="7" :color="progresscolor"></v-progress-circular>
                    <h1 v-if="message != null">{{message}}</h1>
                </v-layout>
            </v-container>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    name: "Loading",
    props: {
        value: { type: Boolean, default: false },
        message: { type: String, default: null },
        progresscolor: { type: String, default: "purple" },
    },
    data: function () {
        return {}
    },
}
</script>

<style>
.dialog.centered-dialog,
.v-dialog.centered-dialog
{
    background: whitesmoke;
    box-shadow: none;
    border-radius: 6px;
    width: auto;
    color: #222;
}
</style>