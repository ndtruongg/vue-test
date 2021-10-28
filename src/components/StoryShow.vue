<template>
  <transition name="fade">
    <div class="stories__stage" v-if="show">
      <button class="stories__close" @click="closeStory">
        <img src="../assets/cancel.png" alt="" />
      </button>
      <div class="stories__item __show">
        <div class="stories__item--avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA1Ww0B4oeZDmdMSQG7LZdQRMXmutFIaprw&usqp=CAU"
            alt=""
          />
        </div>

        <img
          src="https://i.pinimg.com/originals/99/26/24/992624f493739896caf5edb2e2a5d94e.jpg"
          alt=""
        />

        <button
          class="stories__control"
          :class="play ? 'play' : 'pause'"
          @click="controlAudio"
        >
          <img src="../assets/pause.svg" class="play__img" v-if="play" alt="" />
          <img src="../assets/play.svg" class="pause__img" v-else alt="" />
        </button>

        <audio controls autoplay id="story-audio">
          <source type="audio/mpeg" src="../assets/mp3/intro.mp3" />
        </audio>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      play: false,
      duration: 0
    }
  }
}
</script>

<style></style>
