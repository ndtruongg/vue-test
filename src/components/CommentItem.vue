<template>
  <div class="comment">
    <Avatar :width="'40px'" :url="data.customer.avatar_url" />

    <div class="comment__content">
      <p>
        <strong>{{ data.customer.name }}</strong>
        <span class="ml-2 comment__publish">{{ formatTime }}</span>
      </p>
      <p>
        {{ data.comment }}
      </p>
      <div class="comment__actions">
        <button
          class="action-comment text-primary outline-none"
          @click="openReply = !openReply"
        >
          Reply
        </button>
      </div>
      <transition name="show">
        <CommentReply v-if="openReply" :parentId="data.comment_id" />
      </transition>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import CommentReply from './CommentReply.vue'

export default {
  components: { Avatar, CommentReply },
  props: ['data'],
  computed: {
    formatTime() {
      return this.$dayjs(this.data.publish_at).format('HH:mm MMM D, YYYY')
    }
  },
  data() {
    return {
      openReply: false
    }
  }
}
</script>

<style lang="scss" scoped>
.show {
  &-active,
  &-leave-to {
    opacity: 0;
    visibility: hidden;
    z-index: 0;
  }

  &-active-enter,
  &-leave-enter {
    transition: all ease 0.4s;
  }

  &-active-to,
  &-leave {
    opacity: 1;
    visibility: visible;
    z-index: 1;
  }
}

.comment {
  display: flex;
  padding: 15px;
  border-radius: 10px;
  background-color: #f5f5f5;
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  &__content {
    flex-grow: 1;
    max-width: calc(100% - 40px);
    padding-left: 20px;

    p {
      margin-bottom: 10px;
    }
  }

  &__publish {
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    color: #808080;
  }
}
</style>
