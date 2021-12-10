<template>
  <div></div>
</template>

<script>
export default {
  name: "Blog",
  data() {
    return {
      articles: [],
    };
  },
  async created() {
    const data = await this.$axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.VUE_APP_NEWS_API_TOKEN}`
    );

    this.articles = data.articles;
  },
};
</script>

<style></style>
