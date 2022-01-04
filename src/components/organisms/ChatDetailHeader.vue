<template>
  <div class="header">
    <div class="avatar">
      <img :src="userData.avatar" :alt="userData.nickname" />
    </div>

    <h3>{{ userData.nickname }}</h3>
  </div>
</template>

<script>
export default {
  name: "ChatDetailHeader",
  props: {
    userData: Object,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #cecece;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 0;
  }
}
</style>
