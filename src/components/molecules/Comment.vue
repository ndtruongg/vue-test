<template>
  <div class="comments">
    <CommentItem v-for="(item, key) of comments" :key="key" :data="item" />
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
export default {
  components: {
    CommentItem
  },
  data() {
    return {
      comments: []
    }
  },
  created() {
    this.$callApi
      .get('/comments')
      .then((response) => {
        this.comments = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">
.comments {
  .comment {
    margin-bottom: 20px;
  }
}
</style>
