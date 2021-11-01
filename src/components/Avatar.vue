<template>
  <div class="avatar" :style="{ width: width, height: width }">
    <img :src="url" alt="" />
  </div>
</template>

<script>
export default {
  props: ['width', 'url']
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  overflow: hidden;
  img {
    max-width: 100%;
  }
}
</style>
