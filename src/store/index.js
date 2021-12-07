import Vue from "vue";
import Vuex from "vuex";
import callApi from "../plugins/axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    auth: false,
    user: {},
    term: 0
  },

  getters: {
    auth: (state) => state.auth,
    user: (state) => state.user,
    term: (state) => state.term
  },

  mutations: {
    SET_AUTH(state, payload) {
      state.auth = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    setAuth({ commit }, data) {
      commit("SET_AUTH", data);
    },
    getUserInfo({ commit }) {
      callApi.get("/get-user-info").then((response) => {
        commit("SET_USER", response.data);
      });
    }
  }
});

export default store;
