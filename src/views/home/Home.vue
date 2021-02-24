<template>
  <div id="home">
    <nav-bar class="home-nav-bar"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControlShow"
                 class="tab-control"
                  v-show="isTabFixed"/>

    <scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"
              :momentum="momentum1"
              @scroll="contentScroll"
              @pullingUp="handleLoadMore">
      <home-swiper :banners="banners"
      @swiperImageLoad ="swiperImageLoad"/>
      <recommend-view :recommends="recommends"
                      @RecommendImageLoad="RecommendImageLoad"/>
      <feature-view @FeatureViewLoad="FeatureViewLoad"/>
      <tab-control :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"/>
      <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top v-show="backTopViews" @click.native="handleBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from 'components/common/navbar/NavBar';
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {debounce} from "common/utils";
import {backTopMixin} from "common/mixin";

export default {
  name: 'home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      momentum1: true
    }
  },
  mixins: [backTopMixin],
  created() {
    //1. 请求多个数据
    this.getHomeMultidata()
    //2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })

    // 获取tanControl的offsetTop

  },
  methods: {
    /**
     *  事件监听相关的方法
     * */
    tabClick(index) {
      // console.log(index)
      if (index === 1) {
        this.currentType = 'new'
      }else if (index === 2) {
        this.currentType = 'sell'
      }else {
        this.currentType = 'pop'
      }
      this.$refs.tabControl.currentIndex = index
      this.$refs.tabControlShow.currentIndex = index
    },
    contentScroll(position) {
      this.isTabFixed = this.tabOffsetTop < (-position.y)
      this.saveY = position.y

      // 在混入里面做判断是否显示BackTop
      this.listenShowBackTop(position)
    },
    handleLoadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()
    },
    imgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    swiperImageLoad() {
      this.imgLoad()
    },
    FeatureViewLoad() {
      this.imgLoad()
    },
    RecommendImageLoad() {
      this.imgLoad()
    },
    /**
     * 网络请求相关的方法
     * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(this.goods[type].list)
        this.goods[type].list.push(...res.data.list)
        // console.log(this.goods[type].list)
        this.goods[type].page++

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
    this.momentum1 = false
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    z-index: 30;
    position: relative;
    font-size: 18px;
    font-weight: 550;
  }
  .tab-control {
    position: relative;
    top: -1px;
    z-index: 21;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
