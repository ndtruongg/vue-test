import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import dayjs from 'dayjs'
import './assets/css/global.scss'

import callApi from './plugins/axios'
import router from './router'
import store from './store'

import BtnLoginFacebook from 'btn-login-facebook'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.VUE_APP_GG_CLIENT_ID,
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}

Vue.use(GAuth, gauthOption)
Vue.use(VueCookies)
Vue.use(BtnLoginFacebook)
Vue.$cookies.config('7d')

Vue.config.productionTip = false
Vue.prototype.$callApi = callApi
Vue.prototype.$dayjs = dayjs

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
