<template>
  <div class="container pt-5">
    <h1>About page</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "About",
  computed: {
    ...mapGetters(["term"]),
  },
};
</script>

<style lang="scss" scoped></style>
