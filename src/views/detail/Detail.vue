<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"
                    @titleClick="titleClick"
                    :current-index="currentIndex"/>
    <scroll class="detail-scroll"
            ref="scroll"
            :pullUpLoad="true"
            @pullingUp="pullingUpLoad"
            :probeType="3"
            @scroll="detailScroll">
      <detail-swiper :top-image="topImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="handleImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>

    <back-top  v-show="backTopViews" @click.native="handleBackTop"/>
    <detail-bottom-bar @shoppingCart="shoppingCart"/>

<!--    <toast message="商品添加成功！" :isShow="true"/>-->
  </div>
</template>

<script>
import DetailNavBar from "./childComposer/DetailNavBar";
import DetailSwiper from "./childComposer/DetailSwiper";
import DetailBaseInfo from "./childComposer/DetailBaseInfo";
import DetailShopInfo from "./childComposer/DetailShopInfo";
import DetailGoodsInfo from "./childComposer/DetailGoodsInfo";
import DetailParamInfo from "./childComposer/DetailParamInfo";
import DetailCommentInfo from "./childComposer/DetailCommentInfo";
import DetailBottomBar from "./childComposer/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import { geiDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import { debounce } from "common/utils"
import { backTopMixin } from "common/mixin"
import { mapActions } from "vuex"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    GoodsList,
    Scroll
    // Toast
  },
  data() {
    return {
      iid: '',
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0
    }
  },
  mixins: [backTopMixin],
  created() {
    // 获取iid
    this.iid = this.$route.params.id

    // 请求详情数据
    geiDetail(this.iid).then(res => {
      // console.log(res)
      // 1.获取数据
      const data = res.result

      // 2.获取顶部图片数据
      this.topImage = data.itemInfo.topImages

      // 3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 5.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 6.保存参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 7.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

  },
  methods: {
    ...mapActions(['addCart']),
    handleImageLoad () {
      this.$refs.scroll.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    pullingUpLoad() {
      console.log('到底了')
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },
    titleClick(index) {

      this.currentIndex = index
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)

    },
    detailScroll(position) {
      let positionY = -position.y + 40

      // 在混入里面做判断是否显示BackTop
      this.listenShowBackTop(position)
      // if (positionY > this.themeTopYs[3]) {
      //   this.currentIndex = 3
      // } else if (positionY > this.themeTopYs[2]) {
      //   this.currentIndex = 2
      // } else if (positionY > this.themeTopYs[1]) {
      //   this.currentIndex = 1
      // } else if (positionY > this.themeTopYs[0]) {
      //   this.currentIndex = 0
      // }
      const length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        // if (this.currentIndex !== i && ((i <length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //   this.currentIndex = i
        //   console.log(i)
        // }
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]) && positionY < this.themeTopYs[i+1]) {
          this.currentIndex = i
        }
      }
    },
    shoppingCart() {
      const product = {}
      product.image = this.topImage[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.iid = this.iid
      product.realPrice = this.goods.realPrice

      // commit传到mutations里（同步）
      // this.$store.commit('addCart', product)
      // dispatch传到actions里（异步）
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      this.addCart(product).then(res => {
        // console.log(res)
        this.$toast.show(res, 1500)
      })
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('detailItemImageLoad', () => {
      newRefresh()
    })
    // console.log(this.$refs);
  },
  updated() {
  }
}
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 21;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav-bar {
   position: fixed;
   z-index: 22;
   right: 0;
   top: 0;
   left: 0;
   background-color: #fff;
 }
 .detail-scroll {
   height: calc(100% - 45px - 49px);
   margin-top: 45px;
 }
</style>
