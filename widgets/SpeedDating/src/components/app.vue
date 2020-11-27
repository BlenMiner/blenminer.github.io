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
                    /*httpCallAuthenticated(base + "/api/post/add", {
                        method: "POST",
                        headers: { "X-DS-SWYM-CSRFTOKEN": crsf },
                        data: datastr,
                        type: "json",

                        onComplete: (response) => {
                            console.log(response);
                        },

                        onFailure: (response) => {
                            console.error(response);
                        }
                    });*/

                    that.swymPost(crsf, base + "/api/post/add", params);
                },

                onFailure: (response) => {
                    console.error(response);
                }
            });
        },

        async doHttp(params) {
            let followRedirect = params.followRedirect;
            if (typeof followRedirect === "undefined") followRedirect = false;
            let url = params.url;
            if (!url.startsWith("http:") && !url.startsWith("https:")) {
                url = this.baseurl + url;
            }
            const headers = params.headers || {};
            let bodyData = "";
            if (params.method === "GET") {
                if (url.indexOf("?") === -1) url += "?";
                else url += "&";
                url += querystring.stringify(params.data);
            } else {
                if (params.data instanceof FormData) {
                    const fd = params.data;
                    headers["Content-Type"] = fd.getHeaders()["content-type"];
                    bodyData = fd.getBuffer();
                } else if (!headers["Content-Type"] || headers["Content-Type"] === "") {
                    headers["Content-Type"] = "application/x-www-form-urlencoded";
                    bodyData = querystring.stringify(params.data);
                } else {
                    if (typeof params.data === "object" && !(params.data instanceof Buffer)) {
                        bodyData = JSON.stringify(params.data);
                    } else {
                        bodyData = params.data;
                    }
                }
                headers["Content-Length"] = Buffer.byteLength(bodyData);
            }

            try {
                // call
                const oUrl = new URL(url);
                const options = {
                    ...this.reqOpts,
                    method: params.method,
                    protocol: oUrl.protocol,
                    hostname: oUrl.hostname,
                    path: oUrl.pathname + oUrl.search,
                    headers: headers
                };

                const resp = await this.promiseRequest(options, bodyData);
                this.trace(`${params.method} ${params.url} (${resp.statusCode}) => Success`);
                if (followRedirect && resp.statusCode === 302) {
                    return await this.doHttp({ ...params, url: resp.headers["location"] });
                } else return resp;
            } catch (err) {
                this.trace(`${params.method} ${params.url} => ${err.message}`);
                throw err;
            }
        },

        async request(method, url, data, headers, followRedirect) {
            return await this.doHttp({ method: method, url: url, data: data, headers: headers, followRedirect: followRedirect });
        },

        async swymPost(token, path, params) {
            // console.log(JSON.stringify(params));
            const resp = await this.request("POST", path, { params: params }, { "Content-Type": "application/json", "X-DS-SWYM-CSRFTOKEN": token });
            // console.log(resp);
            const obj = JSON.parse(resp.content);
            if (resp.statusCode === 200) {
                return obj;
            } else {
                throw new Error(obj.errorcode + ": " + obj.errormsg);
            }
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
