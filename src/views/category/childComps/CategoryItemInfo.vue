<template>
  <div class="category-item">
    <div class="category-info"  v-for="item in subcategory.list">
      <a :href="item.link">
        <img @load="imageLoad" class="category-img" :src="item.image" alt="">
        <p>{{ item.title }}</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryItemInfo",
    props: {
      subcategory: {
        type: Object,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      imageLoad() {
        // this.$bus.$emit('imageLoad')
        if (++this.currentIndex  === this.subcategory.list.length) {
          this.$emit('imageLoad')
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .category-item {
    font-size: 14px;
    text-align: center;
    display: flex;
    flex-wrap:wrap;
    flex-grow: revert;
  }
  .category-info {
    margin-bottom: 20px;
    flex: 1;
  }
  .category-info:last-child{
    display: inherit;
  }
  .category-img {
    width: 80px;
    margin: 9px auto;
  }
  .category-item div span {
    padding: 3px;
    margin-top: 10px;
  }
</style>
