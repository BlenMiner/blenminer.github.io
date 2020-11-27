<template>
    <v-app>
        <loading :value="loading" :message="'Loading'" :progresscolor="'#005685'" />

        <v-snackbar
            v-model="snackbar"
            absolute
            top
            right
            color="success"
        >
            <span>Post successful!</span>
            <v-icon dark>
                mdi-checkbox-marked-circle
            </v-icon>
        </v-snackbar>

        <v-snackbar
            v-model="snackbarerror"
            absolute
            top
            right
            color="error"
        >
            <span>Post failed</span>
            <v-icon dark>
                mdi-minus-box
            </v-icon>
        </v-snackbar>

        <v-card flat>
            <v-form
                ref="form"
                @submit.prevent="submit"
            >
                <v-container fluid>
                <v-row>
                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="form.company"
                            :rules="rules.requiredstr"
                            color="purple darken-2"
                            label="Société"
                            required
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-text-field
                            v-model="form.commercialTeam"
                            :rules="rules.requiredstr"
                            color="blue darken-2"
                            label="Equipe Commerciale"
                            required
                            outlined
                            dense
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="py-0">
                        <v-textarea
                            v-model="form.presentCompany"
                            :rules="rules.requiredstr"
                            color="teal"
                            required
                            outlined
                            rows="3"
                            placeholder="<Activités, localisation, secteur(s) d’activité, industrie, etc.>"
                        >
                            <template v-slot:label>
                            <div>
                                Présentation société
                            </div>
                            </template>
                        </v-textarea>
                    </v-col>

                    <v-col cols="12"  class="py-0">
                        <v-textarea
                            v-model="form.opportunity"
                            :rules="rules.requiredstr"
                            color="teal"
                            required
                            outlined
                            rows="3"
                            placeholder="< Business drivers, challenges, objectifs ciblés, processus ciblés à transformer, ISE, IPE, domaines fonctionnels, Brand(s), nombre d’utilisateurs, Cloud ou On Premise >"
                        >
                            <template v-slot:label>
                            <div>
                                Contexte Projet/Opportunité
                            </div>
                            </template>
                        </v-textarea>
                    </v-col>
                </v-row>
                </v-container>
                <v-card-actions>
                    <v-btn
                        @click="resetForm"
                        rounded
                        width="45%"
                        color="red"
                        dark
                    >
                        Reset Form
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        :disabled="!formIsValid"
                        color="primary"
                        type="submit"
                        rounded
                        width="45%"
                    >
                        Post Form
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
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
        const defaultForm = Object.freeze({
            company: '',
            commercialTeam: '',
            presentCompany: '',
            opportunity: ''
        })

        return {
            // Search
            search: null,
            msg: "[NULL]",

            loading: false,
            snackbar: false,
            snackbarerror: false,

            // Data loaded from DS and from preferences
            tenantId: 0,
            tenants: [],

            communityId: "",

            // FORM STUFF
            form: Object.assign({}, defaultForm),
            rules: {
                requiredstr: [val => (val || '').length > 0 || 'This field is required'],
            },
            defaultForm
        };
    },

    computed: {
        message: function() {
            return this.$store.state.message;
        },

        formIsValid () {
            return (
                this.form.company &&
                this.form.commercialTeam &&
                this.form.presentCompany &&
                this.form.opportunity
            );
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

        resetForm () {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },

        submit () {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            this.swymAddPost(this.communityId, "Speed Dating Card",
            `<p>
            <span style="text-decoration:underline;"><strong>${this.form.company}</strong> - ${this.form.commercialTeam}</span>
            </p>
            <p>
                <h3>Présentation société</h3>
                <br/>
                ${this.form.presentCompany} 
            </p>
            <p> 
                <h3>Contexte Projet/Opportunité </h3>
                <br/>
                ${this.form.opportunity}
            </p>`, 1);

            this.resetForm()
        },

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
                        headers: { "X-DS-SWYM-CSRFTOKEN": crsf,
                                   "Content-type": "application/json; charset=UTF-8" },
                        data: JSON.stringify({ params: params }),
                        // type: "json",

                        onComplete: (response) => {
                            this.snackbar = true
                        },

                        onFailure: (response) => {
                            this.snackbarerror = true
                        }
                    });
                },

                onFailure: (response) => {
                    console.error(response);
                }
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
