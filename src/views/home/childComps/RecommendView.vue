<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
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
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit('RecommendImageLoad')
        this.isLoad = true
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
    font-size: 3vw;

    padding: 8px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommend item {
    flex: 1;
  }
  .recommend img {
    margin-bottom: 10px;
    width: 80%;
  }
</style>
