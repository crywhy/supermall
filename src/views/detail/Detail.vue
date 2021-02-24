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

      <div class="no-goods"
           v-if="showNoGoods">该商品已下架！</div>

    <back-top  v-show="backTopViews" @click.native="handleBackTop"/>
    <detail-bottom-bar @shoppingCart="shoppingCart"
                       @shoppingBuying="shoppingBuying"/>
    <shopping-interface ref="interface"
                        :interface="interface"
                        :isShowInterface="isShowInterface"
                        :ifShoppingCart="ifShoppingCart"
                        :shoppingNum="shoppingNum"
                        @handleShowClick="handleShoppingClick"
                        @handleConfirmClick="handleConfirmClick"
                        @Decrease="Decrease" @Increase="Increase"/>
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
import ShoppingInterface from "./childComposer/ShoppingInterface";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
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
    ShoppingInterface,

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
      currentIndex: 0,
      interface: {},
      isShowInterface: false,
      ifShoppingCart: true,
      shoppingNum: 1,
      showNoGoods: false
    }
  },
  mixins: [backTopMixin],
  created() {
    // 获取iid
    this.iid = this.$route.params.id

    // 请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      // 1.获取数据
      if (!res) {
        this.showNoGoods = true
      }

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
      // 8. 获取购物选择节目数据
      this.interface = data.skuInfo
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
      this.isShowInterface = true
    },
    shoppingBuying() {
      // 判断是加入购物车还是购买
      this.ifShoppingCart = false

      // 显示购物选择菜单
      this.isShowInterface = true
    },
    handleShoppingClick() {
      // 判断是加入购物车还是购买
      this.ifShoppingCart = true

      this.isShowInterface = false
    },
    handleConfirmClick(color, size) {
      if (color===-1 || size===-1) {
        this.$toast.show('请选择颜色或者尺寸', 1500)
      } else {
        const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.iid = this.iid
        product.realPrice = this.goods.realPrice
        product.num = this.shoppingNum
        // commit传到mutations里（同步）
        // this.$store.commit('addCart', product)
        // dispatch传到actions里（异步）
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        // })
        this.addCart(product).then(res => {
          this.$toast.show(res, 1500)
        })
        this.isShowInterface = false
      }
    },
    Decrease() {
      if (this.shoppingNum < 2) {
        this.$toast.show('至少要买一件哦', 1500)
      } else {
        this.shoppingNum--
      }
    },
    Increase() {
      this.shoppingNum++
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('detailItemImageLoad', () => {
      newRefresh()
    })
    // console.log(this.$refs);
  },
  computed: {
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
   z-index: 2;
   position: relative;
   background-color: #fff;
 }
 .no-goods {
   position: fixed;
   right: 20%;
   top: 30%;
   left: 20%;
   padding: 6px 0  6px 10px;
   background-color: rgba(0,0,0, .7);
   text-align: center;
   color: #fff;
   font-size: 28px;
   border-radius: 10px;
   z-index: 20;
 }
</style>
