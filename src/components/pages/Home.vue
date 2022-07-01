<template>
  <div class="container pt-5 pb-5">
    <staggered-fade
      :duration="150"
      tag="ul"
      class="flex flex-col w-full items-center max-w-md"
    >
      <payment-card
        v-for="(payment, index) in payments"
        :payment="payment"
        :data-index="index"
        :key="payment.name"
      />
    </staggered-fade>
    <Calendar />
    <Modal>
      <div class="mb-3" id="asdf"></div>
    </Modal>
    <Chat />
  </div>
</template>

<script>
import Calendar from "../organisms/Calendar.vue";
import Chat from "../organisms/Chat.vue";
import Modal from "./Modal.vue";
import { mapGetters } from "vuex";
import StaggeredFade from "../StaggeredFade.vue";
import PaymentCard from "../organisms/PaymentCard.vue";

export default {
  components: { Calendar, Chat, Modal, StaggeredFade, PaymentCard },
  data() {
    return {
      payments: [
        {
          image:
            "https://cdn-media-1.freecodecamp.org/images/0*xkJgg-6HskYrQ3N7.jpeg",
          name: "Evan You",
          amount: "5",
          currency: "Hooks",
          statusColor: "green",
          statusText: "vuesed",
        },
        {
          image:
            "https://www.sapeople.com/wp-content/uploads/2015/09/elon-th.jpg",
          name: "Jeff Bezos",
          currency: "CyberTrucks",
          amount: "666",
          statusColor: "orange",
          statusText: "flying to mars",
        },
        {
          image: "https://developeronfire.com/assets/images/UncleBobMartin.jpg",
          name: "StackOverflow",
          currency: "Patterns",
          amount: "3",
          statusColor: "blue",
          statusText: "in review",
        },
        {
          image:
            "https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg",
          name: "Steve Jobs",
          currency: "Surface Books",
          amount: "2019",
          statusColor: "red",
          statusText: "delayed forever",
        },
        {
          image:
            "https://yt3.ggpht.com/a/AATXAJwIHOTspfmIL24Bcr_aIor6CI-Q0zifWQ7vIA=s900-c-k-c0xffffffff-no-rj-mo",
          name: "Youtube",
          currency: "Phones",
          amount: "123",
          statusColor: "green",
          statusText: "approved",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      auth: "auth",
    }),
  },

  mounted() {},

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
