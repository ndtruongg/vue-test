<template>
  <div>
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "../molecules/Menu.vue";
export default {
  components: { Menu },
  name: "OpenSidebar",
};
</script>

<style lang="scss" scoped></style>
