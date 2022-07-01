<template>
  <transition-group
    name="staggered-fade"
    :css="false"
    appear
    v-bind="$attrs"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <!-- Each element requires a data-index attribute in order for the transition to work properly -->
    <slot></slot>
  </transition-group>
</template>
<script>
export default {
  name: "staggered-fade",
  inheritAttrs: false,
  props: {
    duration: {
      type: Number,
      default: 200, // duration of each element transition
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
      el.style.transform = "translateX(40px)";
      el.style.transition = "all ease-in-out .3s";
    },
    enter(el) {
      // Each element requires a data-index attribute in order for the transition to work properly
      const index = el.dataset.index || 1;
      var delay = index * this.duration;
      setTimeout(() => {
        el.style.opacity = 1;
        el.style.height = "100%";
        el.style.transition = "all ease-in-out .3s";
        el.style.transform = "translateX(0px)";
      }, delay);
    },
    leave(el) {
      // Each element requires a data-index attribute in order for the transition to work properly
      const index = el.dataset.index || 1;
      var delay = index * this.duration;
      setTimeout(() => {
        el.style.opacity = 0;
        el.style.height = 0;
        el.style.transition = "all ease-in-out .3s";
        el.style.transform = "translateX(0px)";
      }, delay);
    },
  },
};
</script>
