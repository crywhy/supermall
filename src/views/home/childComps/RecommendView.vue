<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendViews",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 0.8vw;

    padding: 8px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend item {
    flex: 1;
  }
  .recommend img {
    //width: 24vw;
    margin-bottom: 10px;
    width: 80%;
  }
</style>
