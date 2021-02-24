<template>
  <goods-list :goods="categoryData">
    <goods-list-item />
  </goods-list>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  import GoodsListItem from "components/content/goods/GoodsListItem";

  export default {
    name: "TabContentDetail",
    components: {
      GoodsListItem,
      GoodsList
    },
    props: {
      categoryData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      categoryDetail() {
        return this.categoryData
      }
    }
  }
</script>

<style scoped>
</style>
