<template>
  <div id="app">
    <input type="checkbox" v-model="authen" /> {{ authen }}
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    authen: {
      get() {
        return this.$store.state.auth;
      },

      set(val) {
        this.$store.commit("SET_AUTH", val);
      },
    },

    ...mapGetters({
      auth: "auth",
    }),
  },
  watch: {
    auth: function(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="css">
img {
  max-width: 100%;
}
</style>
