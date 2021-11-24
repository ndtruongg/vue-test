<template>
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, key) in tabs"
        :key="key"
        @click="selectTab(key)"
        class="tabs__header__item"
        :class="tab.isActive ? 'tab-current' : ''"
      >
        {{ tab.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheTabs',
  data() {
    return {
      selectedIndex: 0, // the index of the selected tab,
      tabs: [] // all of the tabs
    }
  },
  created() {
    this.tabs = this.$children
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i
      })
    }
  },
  mounted() {
    this.selectTab(0)
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  &__header {
    display: flex;
    list-style-type: none;
    padding: 0;

    &__item {
      padding: 10px 20px;
      border-radius: 10px;
      background-color: #bdc3c7;
      font-weight: 600;
      color: #fff;
      margin-right: 4px;
      opacity: 0.8;
      cursor: pointer;
      user-select: none;

      &.tab-current {
        background-color: #333;
        opacity: 1;
      }
    }
  }
}
</style>
