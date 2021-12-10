<template>
  <form action="">
    <base-input placeholder="Input keyword..." v-model="keyword"></base-input>
    <base-button>Search</base-button>
  </form>
</template>

<script>
export default {
  name: "MSearchForm",
  data() {
    return {
      keyword: "",
    };
  },
};
</script>

<style></style>
