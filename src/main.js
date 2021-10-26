import Vue from 'vue'
import App from './App.vue'
import callApi from './plugins/axios'
import router from './router'
import store from './store'

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

Vue.config.productionTip = false
Vue.prototype.$callApi = callApi

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
