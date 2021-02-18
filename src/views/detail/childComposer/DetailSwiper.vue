<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImage">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    props: {
      topImage: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 50vh;
    overflow: hidden;
  }
  .detail-swiper img {
    margin-top: -100px;
  }
</style>
