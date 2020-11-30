<template>
    <v-app>
        <v-row row justify-center style="position: absolute;">
            <v-dialog v-model="loading" persistent content content-class="centered-dialog">
                <v-container fill-height>
                    <v-layout column justify-center align-center>
                        <v-progress-circular indeterminate size="70" width="7" color="#005685"></v-progress-circular>
                        <h1>Loading</h1>
                    </v-layout>
                </v-container>
            </v-dialog>
        </v-row>

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

        <v-card flat class="py-0">
            <v-autocomplete
                auto-select-first
                dense
                filled
                :items="communities"
                label="Community"
                v-model="communityId"
            />

            <v-form
                ref="form"
                @submit.prevent="submit"
                class="py-0"
            >
                <v-container fluid class="py-0">
                    <v-row>

                        <v-col v-for="(item, i) in formFields" :key="i" :cols="item.type == 1 ? 12 : 6" class="py-0">
                            <v-text-field
                                v-if="item.type == 0"
                                v-model="item.value"
                                :rules="rules.requiredstr"
                                color="purple darken-2"
                                :label="item.name.split(';')[0]"
                                required
                                outlined
                                dense
                                :placeholder="item.name.split(';')[1]"
                            ></v-text-field>

                            <v-textarea
                                v-else-if="item.type == 1"
                                v-model="item.value"
                                :rules="rules.requiredstr"
                                color="teal"
                                required
                                outlined
                                rows="3"
                                :placeholder="item.name.split(';')[1]"
                            >
                                <template v-slot:label>
                                <div>
                                    {{ item.name.split(';')[0] }}
                                </div>
                                </template>
                            </v-textarea>

                            <v-text-field
                                v-if="item.type == 2"
                                v-model="item.value"
                                :rules="rules.requiredstr"
                                color="red darken-2"
                                type="number"
                                :label="item.name.split(';')[0]"
                                required
                                outlined
                                dense
                                :placeholder="item.name.split(';')[1]"
                            ></v-text-field>

                            <v-checkbox
                                v-if="item.type == 3"
                                v-model="item.value"
                                :label="item.name.split(';')[0]"
                                :placeholder="item.name.split(';')[1]"
                                class="ma-0"
                            ></v-checkbox>

                            <v-menu
                                v-else-if="item.type == 4"
                                v-model="item.model"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="item.value"
                                        :label="item.name.split(';')[0]"
                                        :rules="rules.requiredstr"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        required
                                        outlined
                                        dense
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="item.value"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="item.model = false"
                                    >
                                        Close
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-text-field
                                v-if="item.type == 5"
                                v-model="item.value"
                                :rules="rules.requiredstr"
                                color="green darken-2"
                                type="number"
                                prefix="€"
                                :label="item.name.split(';')[0]"
                                required
                                outlined
                                dense
                                :placeholder="item.name.split(';')[1]"
                            ></v-text-field>
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

<script>
import { EventBus } from "../plugins/vuetify";

function httpCallAuthenticated(url, options) {
    requirejs(["DS/WAFData/WAFData"], (WAFData) => {
        WAFData.authenticatedRequest(url, options);
    });
}

export default {
    name: "App",

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

            communities: [],
            communitiesIds: {},
            communityId: "",

            // New form stuff
            formFields: [],
            formDesiredLength: 0,

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
            for (let i = 0; i < this.formFields.length; ++i) {
                if (!this.formFields[i].value && this.formFields[i].type !== 3)
                    return false;
            }
            return true;
        }
    },

    // As soon as we get mounted start searching the tenant list
    mounted: function () {
        const that = this;
        widget.name = "";

        EventBus.$on("onSearch", (txt) => { that.search = txt; });
        EventBus.$on("reloadwidget", () => { that.reload(); });
        EventBus.$on("OnEventCountChanged", (old, newv) => { that.refreshPrefs(old, newv); });

        that.loading = true;

        // Start loading bar aswell
        if (widget.id === undefined) {
            that.tenantDataLoaded([{ id: -1 }]);
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

        refreshPrefs(oldv, newv) {
            if (newv < oldv) {
                for (let i = newv; i < oldv; ++i) {
                    // Remove the lingering prefs

                    widget.addPreference({
                        name: `_Field[${i}]_Type_`,
                        label: `Field ${i} -----`,
                        type: "hidden"
                    });

                    widget.addPreference({
                        name: `_Field[${i}]_Name_`,
                        type: "hidden"
                    });
                }
            }

            // Make sure the existing ones exist??
            for (let i = i; i < newv; ++i) {
                widget.addPreference({
                    name: `_Field[${i}]_Type_`,
                    type: "list",
                    options: [
                        { value: 0, label: "Text Field" },
                        { value: 1, label: "Rich Text Field" },
                        { value: 2, label: "Number Field" },
                        { value: 3, label: "Checkbox Field" },
                        { value: 4, label: "Date Field" },
                        { value: 5, label: "Money Field" }
                    ],
                    defaultValue: 0
                });

                widget.addPreference({
                    name: `_Field[${i}]_Name_`,
                    type: "text",
                    defaultValue: `Field ${i}`
                });
            }
        },

        resetForm () {
            this.form = Object.assign({}, this.defaultForm)
            this.$refs.form.reset()
        },

        submit () {
            
            this.setCookie("_CurrentCommunityID_", this.communityId, 365);

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            this.swymAddPost(this.communitiesIds[this.communityId], "Speed Dating Card",
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

        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },

        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
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

            widget.addPreference({
                name: "_FieldCount_",
                type: "range",
                label: "Fields Count (You need to apply for this to take effect)",
                defaultValue: 0,
                step: 1,
                min: 0,
                max: 50,
                onchange: "OnEventCountChanged"
            });

            this.formDesiredLength = widget.getValue("_FieldCount_");

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
                console.log("Post on community: " + communityId);
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
            that.formDesiredLength = widget.getValue("_FieldCount_");
            that.communityId = that.getCookie("_CurrentCommunityID_");

            that.loading = true;

            // Load preferences for field count
            that.refreshPrefs(that.formDesiredLength, that.formDesiredLength);
            that.formFields = [];

            if (widget.id === undefined) {
                that.formDesiredLength = 2;

                that.formFields.push({
                    type: 0,
                    name: "Hello",
                    value: ""
                });

                that.formFields.push({
                    type: 1,
                    name: "World;Some hints",
                    value: ""
                });

                that.formFields.push({
                    type: 4,
                    name: "When???;Some hints",
                    value: ""
                });

                that.formFields.push({
                    type: 2,
                    name: "Some number;Some hints",
                    value: ""
                });

                that.formFields.push({
                    type: 5,
                    name: "MONEY MONEY;Some hints",
                    value: ""
                });

                that.formFields.push({
                    type: 3,
                    name: "It's binary bro;Some hints",
                    value: ""
                });

            } else {
                for (let i = 0; i < that.formDesiredLength; ++i) {
                    const fieldtype = widget.getValue(`_Field[${i}]_Type_`);
                    const fieldName = widget.getValue(`_Field[${i}]_Name_`);

                    that.formFields.push({
                        type: fieldtype,
                        name: fieldName,
                        value: ""
                    });
                }
            }
            
            that.swymCommunities((res) => {
                that.communitiesIds = {};

                for (let i = 0; i < res.result.length; ++i) {
                    that.communitiesIds[res.result[i].title] = res.result[i].id;
                    that.communities.push(res.result[i].title);
                }

                if (res.result.length > 0 && !that.communitiesIds[that.communityId]) {
                    that.communityId = res.result[0].title;
                }

                that.loading = false;
            });
        }
    }
};

</script>