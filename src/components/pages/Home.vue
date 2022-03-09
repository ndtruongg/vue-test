<template>
  <div class="container pt-5 pb-5">
    <Calendar />
    <Modal>
      <div class="mb-3" id="asdf"></div>
    </Modal>
    <Chat />

    <p>{{ auth }}</p>
    <div v-for="(item, key) of units" :key="key">
      <input
        type="checkbox"
        :id="'unit_' + key"
        :checked="item.checked"
        @change="updateChecked(item)"
      />
      <label :for="'unit_' + key">{{ item.video_title }}</label>
    </div>

    <div v-for="(item, key) of units" :key="key">
      <input
        type="checkbox"
        :id="'unit_' + key"
        :checked="item.checked"
        @change="updateChecked(item)"
      />
      <label :for="'unit_' + key">{{ item.video_title }}</label>
    </div>
  </div>
</template>

<script>
import Calendar from "../organisms/Calendar.vue";
import Chat from "../organisms/Chat.vue";
import Modal from "./Modal.vue";
import { mapGetters } from "vuex";

export default {
  components: { Calendar, Chat, Modal },

  computed: {
    ...mapGetters({
      auth: "auth",
      units: "units",
    }),
  },

  mounted() {
    console.log(document.getElementById("asdf"));
  },

  methods: {
    updateChecked(item) {
      this.$store.commit("UPDATE_UNIT", item);
    },
  },
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
