<template>
  <div class="stories">
    <div class="stories__list">
      <div
        v-for="(item, key) of stories"
        :key="key"
        class="stories__item"
        @click="showStory(key)"
      >
        <div class="stories__item--avatar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA1Ww0B4oeZDmdMSQG7LZdQRMXmutFIaprw&usqp=CAU"
            alt=""
          />
        </div>

        <template v-if="item.type === 'image'">
          <img :src="item.img_url" alt="" />
        </template>
        <template v-if="item.type === 'video'">
          <video>
            <source type="video/mp4" :src="item.video_url" />
          </video>
        </template>
      </div>
    </div>
    <transition name="fade">
      <div class="stories__stage" v-if="show">
        <button class="stories__close" @click="closeStory">
          <img src="../assets/cancel.png" alt="" />
        </button>
        <div class="stories__item __show">
          <div class="progress">
            <div
              class="progress__value"
              :style="{ width: this.duration + '%' }"
            ></div>
          </div>

          <div class="stories__item--avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA1Ww0B4oeZDmdMSQG7LZdQRMXmutFIaprw&usqp=CAU"
              alt=""
            />
          </div>

          <button
            class="stories__control"
            :class="play ? 'play' : 'pause'"
            @click="controlAudio"
          >
            <img
              src="../assets/pause.svg"
              class="play__img"
              v-if="play"
              alt=""
            />
            <img src="../assets/play.svg" class="pause__img" v-else alt="" />
          </button>

          <template v-if="stories_selected.type === 'image'">
            <img :src="stories_selected.img_url" alt="" />
            <audio
              controls
              autoplay
              id="story-media"
              @timeupdate="updateTrackTime"
            >
              <source type="audio/mpeg" :src="stories_selected.audio_url" />
            </audio>
          </template>
          <template v-if="stories_selected.type === 'video'">
            <video autoplay id="story-media" @timeupdate="updateTrackTime">
              <source type="video/mp4" :src="stories_selected.video_url" />
            </video>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      play: false,
      show: false,
      duration: 0,
      stories_selected: {},
      stories: [
        {
          id: 1,
          type: 'image',
          img_url: 'https://wallpaperaccess.com/full/809524.jpg',
          audio_url: require('../assets/mp3/intro.mp3')
        },
        {
          id: 2,
          type: 'video',
          img_url:
            'https://images.hdqwalls.com/download/vegeta-2020-2s-1080x1920.jpg',
          audio_url: '',
          video_url: require('../assets/video/video_1.mp4')
        }
      ]
    }
  },
  methods: {
    controlAudio() {
      this.play = !this.play
      const storyMedia = document.getElementById('story-media')
      if (this.play) {
        storyMedia.play()
      } else {
        storyMedia.pause()
      }
    },
    showStory(key) {
      this.stories_selected = this.stories[key]

      this.play = true
      this.show = true
    },
    closeStory() {
      this.play = false
      this.show = false
    },
    updateTrackTime() {
      const storyMedia = document.getElementById('story-media')
      if (storyMedia) {
        this.duration = parseInt(
          (storyMedia.currentTime * 100) / storyMedia.duration
        )

        if (this.duration === 100) {
          this.play = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  background-color: transparent;
  outline: none;
  border: none;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: ease 0.4s;
}

.fade-leave,
.fade-enter-to {
  opacity: 1;
}

.progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.5);

  &__value {
    background-color: royalblue;
    height: 100%;
    transition: ease 1s;
    border-radius: 3px;
  }
}

.stories {
  &__list {
    display: flex;
    max-width: 100%;
    overflow: auto;
  }

  &__control {
    width: 30px;
    height: 30px;
    top: 20px;
    right: 20px;
    position: absolute;
    img {
      width: 25px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      opacity: 0;
      z-index: 0;
    }

    &.pause {
      .pause__img {
        z-index: 2;
        opacity: 1;
      }
    }

    &.play {
      .play__img {
        z-index: 2;
        opacity: 1;
      }
    }
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);

    img {
      width: 60%;
    }
  }

  &__item {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    width: 200px;
    height: 320px;
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);

    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 2;
      top: 0;
      left: 0;
    }

    img,
    video {
      display: block;
    }

    video {
      width: 100%;
    }

    &:not(:last-child) {
      margin-right: 12px;
    }

    &--avatar {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid #0379e7;
      position: absolute;
      left: 10px;
      top: 10px;
      z-index: 2;
      img {
        widows: 100%;
      }
    }

    &.__show {
      height: 95vh;
      max-width: 480px;
      width: unset;
      border-radius: 0;

      &::before {
        display: none;
      }

      img {
        max-height: 100%;
      }

      audio {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }

      .stories__item--avatar {
        left: 15px;
        top: 15px;
      }
    }
  }

  &__stage {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>
