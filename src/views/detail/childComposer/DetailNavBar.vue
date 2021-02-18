<template>
  <div id="detail-nav-bar" >
    <nav-bar>
      <div slot="left" class="detail-img" @click="handleBackClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles"
             class="title-item"
             @click="handleHighlightClick(index)"
             :class="{active: currentIndex === index}">{{ item }}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    props: {
      currentIndex: {
        type: Number,
        default () {
          return 0
        }
      }
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐']
      }
    },
    methods: {
      handleHighlightClick(index) {
        this.$emit('titleClick', index)
      },
      handleBackClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  #detail-nav-bar {
  }
  .title {
    font-size: 13px;
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .detail-img {
    overflow: hidden;
    position: absolute;
    width: 60px;
    height: 44px;
  }
  .detail-img img{
    margin-top: 10px;
  }
  .active {
    color: var(--color-high-text);
  }
</style>
