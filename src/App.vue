<template>
  <div id="app">
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <router-view />
    </transition>
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
    ...mapGetters({}),
  },
  watch: {
    auth: function(val) {
      console.log(val);
    },
  },

  mounted() {
    window.onbeforeunload = function(e) {
      console.log(e);
      e.preventDefault();
      alert(confirm("Confirm refresh"));
      return confirm("Confirm refresh");
    };
  },
};
</script>

<style lang="css">
img {
  max-width: 100%;
}
</style>
