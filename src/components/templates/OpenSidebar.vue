<template>
  <div>
    <Menu />
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
import Menu from "../molecules/Menu.vue";
export default {
  components: { Menu },
  name: "OpenSidebar",
};
</script>

<style lang="scss" scoped></style>
