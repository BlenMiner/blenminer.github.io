import { x3DDashboardUtils } from "./lib/widget";
import Vue from "vue";
import App from "./components/app.vue";
// eslint-disable-next-line import/no-duplicates
import vuetify from "./plugins/vuetify";
import { store } from "./store";

// eslint-disable-next-line import/no-duplicates
import { EventBus } from "./plugins/vuetify";

function start() {
    x3DDashboardUtils.disableCSS(true);

    window.title = "Widget Project Management";
    widget.setTitle(window.title);

    const main = new Vue({
        store,
        vuetify,
        render: h => h(App)
    });

    main.$mount("app");
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
        EventBus.$emit("reloadwidget");
    });

    widget.addEvent("onSearch", (searchQuery) => {
        EventBus.$emit("search", searchQuery);
    });
}
