<template>
  <div class="container pt-5 pb-5">
    <Calendar />
    <div class="mb-3"></div>

    <Chat />
  </div>
</template>

<script>
import Calendar from "../organisms/Calendar.vue";
import Chat from "../organisms/Chat.vue";

export default {
  components: { Calendar, Chat },
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
