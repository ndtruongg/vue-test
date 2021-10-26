import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auth: false
  },

  getters: {
    auth: (state) => state.auth
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.auth = payload
    }
  },

  actions: {
    setAuth({ commit }, data) {
      commit('SET_AUTH', data)
    }
  }
})

export default store
