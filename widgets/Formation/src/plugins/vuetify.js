import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);

export const EventBus = new Vue();

export default new Vuetify({
    icons: {
        iconfont: "mdi"
    }
});
