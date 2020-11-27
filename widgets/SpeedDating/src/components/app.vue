<template>
    <v-app>
        <loading :value="loading" :message="'Loading'" :progresscolor="'#005685'" />
        <v-btn @click="swymAddPost(communityId, 'test', 'body', 0)">Add Post</v-btn>
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
.loading-dialog {
   background-color: #303030;
}
</style>

<script>
import { EventBus } from "../plugins/vuetify";
import loading from "./loading.vue";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",

    components: {
        loading
    },

    data: function() {
        return {
            // Search
            search: null,
            msg: "[NULL]",

            loading: false,

            // Data loaded from DS and from preferences
            tenantId: 0,
            tenants: [],

            communityId: ""
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
        widget.name = "";

        EventBus.$on("onSearch", (txt) => { that.search = txt; });
        EventBus.$on("reloadwidget", () => { that.reload(); });

        that.loading = true;

        // Start loading bar aswell
        if (widget.id === undefined) {
            setTimeout(() => {
                    that.tenantDataLoaded([{ id: -1 }]);
                },
                1000);
        } else {
            requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], i3DXCompassServices => {
                i3DXCompassServices.getPlatformServices({
                    platformId: undefined,
                    onComplete: this.tenantDataLoaded
                });
            });
        }
    },

    methods: {

        tenantDataLoaded(data) {
            this.tenants = [];
            const _TenantOpts = [];

            let j = 0;

            // Load all the tenants
            for (let i = 0; i < data.length; i++) {
                if (data[i]["3DSwym"] === undefined) continue;

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

            // Loads the prefs if available
            EventBus.$emit("reloadwidget");
        },

        swymCommunities(onCompleted) {
            if (widget.id === undefined) {
                onCompleted({
                    result: [
                        { id: "1245152", title: "hello" },
                        { id: "1291515", title: "world" }
                    ]
                });

                return;
            }

            const that = this;
            const base = that.tenants[that.tenantId]["3DSwym"];

            // Get a CRSF ticket
            httpCallAuthenticated(base + "/api/index/tk", {
                method: "GET",

                onComplete: (response) => {
                    const res = JSON.parse(response);
                    const crsf = res.result.ServerToken;

                    // Make the call with the ticket
                    httpCallAuthenticated(base + "/api/community/listmycommunities/creation_granted_for/post", {
                        method: "GET",
                        headers: { "X-DS-SWYM-CSRFTOKEN": crsf },

                        onComplete: (response) => {
                            const res = JSON.parse(response);
                            onCompleted(res);
                        },

                        onFailure: (response) => {
                            console.error(response);
                        }
                    });
                },

                onFailure: (response) => {
                    console.error(response);
                }
            });
        },

        swymAddPost(communityId, title, message, publish = 0) {
            if (widget.id === undefined) {
                return;
            }

            const that = this;
            const base = that.tenants[that.tenantId]["3DSwym"];

            // Get a CRSF ticket
            httpCallAuthenticated(base + "/api/index/tk", {
                method: "GET",

                onComplete: (response) => {
                    const res = JSON.parse(response);
                    const crsf = res.result.ServerToken;
                    const params = {
                        title: title,
                        community_id: communityId,
                        message: message,
                        published: publish.toString()
                    };

                    // Post the message
                    httpCallAuthenticated(base + "/api/post/add", {
                        method: "POST",
                        headers: { "X-DS-SWYM-CSRFTOKEN": crsf },
                        data: JSON.stringify({ params: params }),
                        type: "json",

                        onComplete: (response) => {
                            console.log(response);
                        },

                        onFailure: (response) => {
                            console.error(response);
                        }
                    });

                    // that.swymPost(crsf, base + "/api/post/add", params);
                },

                onFailure: (response) => {
                    console.error(response);
                }
            });
        },

        swymPost(token, path, params) {
            fetch(path, {
                method: "POST",
                body: JSON.stringify({ params: params }),
                headers: { 
                    "Content-type": "application/json;charset=UTF-8",
                    "X-DS-SWYM-CSRFTOKEN": token
                }
            }).then((response) => {
                console.log(response);
            }).catch(err => {
                console.error(err);
            });
        },

        reload() {
            const that = this;

            that.tenantId = widget.getValue("_CurrentTenantID_");
            that.communityId = widget.getValue("_ComunityId_");

            that.loading = true;
            that.swymCommunities((res) => {
                const _Communities = [];

                for (let i = 0; i < res.result.length; ++i) {
                    _Communities.push({
                        value: `${res.result[i].id}`,
                        label: `${res.result[i].title}`
                    });
                }

                // Setup your preferences...
                widget.addPreference({
                    name: "_ComunityId_",
                    type: "list",
                    label: "Community",
                    defaultValue: _Communities.length == 0 ? "0" : _Communities[0].value,
                    options: _Communities
                });

                that.loading = false;
            });
        }
    }
};

</script>
