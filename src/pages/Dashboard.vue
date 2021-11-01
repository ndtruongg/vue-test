<template>
  <div id="dashboard" class="container pt-5">
    <div class="d-flex align-items-center justify-content-between mb-4">
      <h1>Dashboard</h1>

      <div class="d-flex align-items-center">
        <b class="mx-2 mb-0">{{ user.name }}</b>
        <Avatar :url="user.avatar" :width="'40px'" />
      </div>
    </div>
    <Comment />
  </div>
</template>

<script>
import Comment from '../components/Comment.vue'
import { mapGetters } from 'vuex'
import Avatar from '../components/Avatar.vue'

export default {
  components: {
    Comment,
    Avatar
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  }
}
</script>
