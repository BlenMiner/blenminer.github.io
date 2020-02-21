import { x3DDashboardUtils } from "./lib/widget";
import Vue from "vue";
import App from "./components/app.vue";
import vuetify from "./plugins/vuetify";
import { store } from "./store";

let _Tenants = [];
let _TenantId = 0;
let mainComponent;

function listOfProjects() {
    const tenant = _Tenants[_TenantId];
    const url = tenant + "/resources/v1/modeler/documents/";
    return url;
}

function tenantDataLoaded(data) {
    _Tenants = data;
    const _TenantOpts = [];

    // Load all the tenants
    for (let i = 0; i < _Tenants.length; i++) {
        _TenantOpts.push({
            value: `${i}`,
            label: `${_Tenants[i].platformId} - ${_Tenants[i].displayName}`
        });
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
    _TenantId = widget.getValue("_CurrentTenantID_");
}

function start() {
    x3DDashboardUtils.disableCSS(true);

    window.title = "Widget Project Management";
    widget.setTitle(window.title);

    mainComponent = new Vue({
        store,
        vuetify,
        render: h => h(App)
    });

    mainComponent.$mount("app");

    requirejs(["DS/PlatformAPI/PlatformAPI"], PlatformAPI => {
        // use 3DDashboard APIs
    });
}
/**
 * Entry point for both standalone & 3DDashboard modes
 * Assuming widget object has been loaded through widget-starter module
 */
export default function() {
    widget.addEvent("onLoad", () => {
        start();
    });
    widget.addEvent("onRefresh", () => {
        // TODO an application data refresh
        // meaning only refresh dynamic content based on remote data, or after preference changed.
        // we could reload the frame [ window.location.reload() ], but this is not a good practice, since it reset preferences
    });
}
