<template>
  <div>
    <Story />

    <PieChart :percent="75" />
    <PieChart :percent="65" :width="'200px'" />
  </div>
</template>

<script>
import Story from "../molecules/Story.vue";
import PieChart from "../molecules/PieChart.vue";
export default {
  name: "Blog",
  data() {
    return {
      articles: []
    };
  },
  async created() {
    const data = await this.$axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.VUE_APP_NEWS_API_TOKEN}`
    );
    this.articles = data.articles;
  },
  components: { Story, PieChart }
};
</script>

<style></style>
