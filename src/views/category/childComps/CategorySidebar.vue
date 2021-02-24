<template>
  <div class="category-sidebar">
    <div class="sidebar-bgc">
    <scroll class="category-scroll">
        <div class="sidebar-info"
             v-for="(item, index) in categoryList"
             :class="{active: currentIndex === index}"
             @click="handleActiveClick(index)">
          {{ item.title }}
        </div>
    </scroll>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "sidebar",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      categoryList: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    components: {
      Scroll
    },
    methods: {
      handleActiveClick(index) {
        this.currentIndex = index
        this.$emit('ListItemInfo', index)
      }
    }
  }
</script>

<style scoped>
  .category-scroll {
    margin-top: 45px;
    height: calc(100vh - 45px - 50px);
  }
  .sidebar-bgc {
    background-color: #eee;
    font-size: 14px;
    height: 100vh;
    width: 100px;
    overflow: hidden;
  }
  .sidebar-info {
    padding: 13px 18px;
    text-align: center;
  }
  .active {
    background-color: var(--color-background);
    color: var(--color-tint);
    font-weight: 600;
    border-left: 4px var(--color-tint) solid;
    padding-left: 14px;
  }
</style>
