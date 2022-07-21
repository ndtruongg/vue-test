<template>
  <div class="pie" :style="{ '--p': percentNumber.number, '--w': width }">
    <slot>
      <div class="pie__value">{{ roundNumber(percentNumber.number) }}%</div>
    </slot>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  name: "PieChart",
  props: {
    percent: {
      type: Number,
      require: true,
      default: 0
    },
    duration: {
      type: Number,
      require: false,
      default: 2000
    },
    width: {
      type: String,
      require: false,
      default: "100px"
    }
  },
  data() {
    return {
      percentNumber: {
        number: 0
      }
    };
  },

  mounted() {
    gsap.to(this.percentNumber, {
      duration: this.duration / 1500,
      number: this.percent || 0
    });
  },

  methods: {
    roundNumber(num) {
      return Math.ceil(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.pie {
  width: var(--w);
  height: var(--w);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  background-image: conic-gradient(
    royalblue 0deg,
    royalblue calc(var(--p) * 3.6deg),
    #b8caff calc(var(--p) * 3.6deg),
    #b8caff 360deg
  );

  &::after,
  &::before {
    position: absolute;
    content: "";
    background: royalblue;
    border-radius: 50%;
  }

  &::after {
    inset: calc(50% - 12px / 2);
    transform: rotate(calc(var(--p) * 3.6deg))
      translateY(calc(50% - var(--w) / 2));
  }

  &::before {
    width: 12px;
    height: 12px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &__value {
    width: calc(var(--w) - 24px);
    height: calc(var(--w) - 24px);
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
