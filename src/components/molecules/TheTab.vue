<template>
  <div v-show="isActive" class="tab">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheTab',
  props: {
    title: {
      type: String,
      default: 'Tab'
    }
  },
  data() {
    return {
      isActive: true
    }
  }
}
</script>

<style></style>
