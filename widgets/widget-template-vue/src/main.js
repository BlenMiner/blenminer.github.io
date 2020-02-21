import { x3DDashboardUtils } from "./lib/widget";
import Vue from "vue";
import App from "./components/app.vue";
import vuetify from "./plugins/vuetify";
import { store } from "./store";

let mainComponent;

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
        mainComponent.toast("test refresh");
    });
}
