<template>
  <div class="container pt-5 pb-5">
    <h1 class="mb-3">Home</h1>
    <Story />

    <div class="mb-5"></div>

    <the-tabs :tabClass="'tab-demo'">
      <the-tab :title="'tab 1'">Tab 1</the-tab>
      <the-tab :title="'tab 2'">Tab 2</the-tab>
      <the-tab :title="'tab 3'">Tab 3</the-tab>
      <the-tab :title="'tab 4'">Tab 4</the-tab>
    </the-tabs>
  </div>
</template>

<script>
import Story from "../molecules/Story.vue";
import TheTabs from "../molecules/TheTabs.vue";
import TheTab from "../molecules/TheTab.vue";
export default {
  components: { Story, TheTabs, TheTab },
};
</script>

<style lang="scss" scoped>
.content {
  height: 300px;

  &:nth-child(1) {
    background-color: #1abc9c;
  }
  &:nth-child(2) {
    background-color: #2ecc71;
  }
  &:nth-child(3) {
    background-color: #3498db;
  }
  &:nth-child(4) {
    background-color: #9b59b6;
  }
  &:nth-child(5) {
    background-color: #34495e;
  }
  &:nth-child(6) {
    background-color: #c0392b;
  }
}
</style>
