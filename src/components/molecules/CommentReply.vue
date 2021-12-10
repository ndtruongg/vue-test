<template>
  <div class="comment-reply">
    <Avatar
      :url="
        'https://i.pinimg.com/236x/69/ae/35/69ae3527f994e733c3dbfbf5d22bf8da--french-frances-oconnor.jpg'
      "
      :width="'40px'"
    />
    <form @submit.prevent="sentComment">
      <textarea
        v-model="content"
        cols="30"
        rows="3"
        placeholder="Write a comment..."
      ></textarea>
    </form>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    sentComment() {
      let data = {
        customer_id: 2,
        reply_customer_id: 3
      }
      this.$callApi.post('/comments', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-reply {
  display: flex;
  margin-top: 10px;

  form {
    flex-grow: 1;
    max-width: calc(100% - 40px);
    padding-left: 10px;

    textarea {
      border-radius: 10px;
      background-color: #ffffff;
      width: 100%;
      resize: none;
      padding: 15px;
    }
  }
}
</style>
