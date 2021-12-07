import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import dayjs from "dayjs";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/global.scss";
import "./assets/css/style.scss";
import "material-icons/iconfont/material-icons.css";
import "vuesax/dist/vuesax.css";

import Vuesax from "vuesax";
import callApi from "./plugins/axios";
import router from "./router";
import store from "./store";

import BtnLoginFacebook from "btn-login-facebook";
import ScrollbarAutoHide from "scrollbar-auto-hide";

import GAuth from "vue-google-oauth2";

const gauthOption = {
  clientId: process.env.VUE_APP_GG_CLIENT_ID,
  scope: "profile email",
  prompt: "consent",
  fetch_basic_profile: true,
};

Vue.use(GAuth, gauthOption);
Vue.use(VueCookies);
Vue.use(BtnLoginFacebook);
Vue.use(ScrollbarAutoHide);
Vue.use(Vuesax, {
  colors: {
    primary: "#5b3cc4",
    success: "rgb(23, 201, 100)",
    danger: "rgb(242, 19, 93)",
    warning: "rgb(255, 130, 0)",
    dark: "rgb(36, 33, 69)",
  },
});
Vue.$cookies.config("7d");

Vue.config.productionTip = false;
Vue.prototype.$callApi = callApi;
Vue.prototype.$dayjs = dayjs;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
