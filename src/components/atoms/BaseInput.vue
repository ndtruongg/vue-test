<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "base-input",
  props: ["value"],
};
</script>

<style lang="scss" scoped>
input {
  padding: 10px 20px;
  border: 2px solid #3498db;
  border-radius: 50px;
  transition: ease all 0.3s;

  &:focus {
    box-shadow: 0px 2px 15px 2px rgba(0, 0, 0, 0.13);
  }
}
</style>
