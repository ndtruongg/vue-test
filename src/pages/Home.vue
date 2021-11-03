<template>
  <div class="container pt-5 pb-5">
    <h1 class="mb-3">Home</h1>
    <Story />
    <scrollbar-auto-hide
      :contentStyle="{ maxHeight: '600px' }"
      :scrollBarStyle="{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }"
      :trackStyle="{ borderRadius: '10px', backgroundColor: '#3498db' }"
    >
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
      <div class="content"></div>
    </scrollbar-auto-hide>
  </div>
</template>

<script>
import Story from '../components/Story.vue'
export default {
  components: { Story }
}
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
