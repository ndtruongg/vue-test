<template>
  <nav class="menu">
    <ul class="menu-list">
      <li v-for="(item, key) of menus" :key="key" class="menu-item">
        <router-link :to="item.path" class="menu-link" :exact="item.exact">
          <img :src="item.icon" :alt="item.title" />
          <span>{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import menu from '../definition/menu'
export default {
  name: 'Menu',
  data() {
    return {
      menus: menu
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: column;
  &-list {
    list-style-type: none;
  }

  &-link {
    display: flex;
    align-items: center;
    height: 50px;

    &.router-link-active {
      background-color: lightblue;
    }

    img {
      display: block;
      margin-right: 10px;
      width: 30px;
      height: 30px;
    }
  }
}
</style>
