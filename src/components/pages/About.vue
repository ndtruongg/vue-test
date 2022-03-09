<template>
  <div class="container pt-5">
    <h1>About page</h1>
    <template v-if="false">
      <VueSlickCarousel
        :arrows="true"
        :dots="true"
        :class="'slider'"
        :slidesToShow="5"
      >
        <div v-for="item of 0" :key="item">1</div>
      </VueSlickCarousel>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "About",
  components: { VueSlickCarousel },
  computed: {
    ...mapGetters(["term"]),
  },
};
</script>

<style lang="scss" scoped>
.slider {
  div {
    height: 200px;
    background: red;
  }
}
</style>
