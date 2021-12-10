<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
button {
  padding: 10px 20px;
  border-radius: 50px;
  background: #2980b9;
  color: #fff;
  transition: ease 0.3s all;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 2px 15px 2px rgba(0, 0, 0, 0.15);
  }
}
</style>
