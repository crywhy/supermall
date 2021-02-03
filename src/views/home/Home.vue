<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll>
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <ul>
      <li>内容1</li>
      <li>内容2</li>
      <li>内容3</li>
      <li>内容4</li>
      <li>内容5</li>
      <li>内容6</li>
      <li>内容7</li>
      <li>内容8</li>
      <li>内容9</li>
      <li>内容10</li>
      <li>内容11</li>
      <li>内容12</li>
      <li>内容13</li>
      <li>内容14</li>
      <li>内容15</li>
      <li>内容16</li>
      <li>内容17</li>
      <li>内容18</li>
      <li>内容19</li>
      <li>内容20</li>
      <li>内容21</li>
      <li>内容22</li>
      <li>内容23</li>
      <li>内容24</li>
      <li>内容25</li>
      <li>内容26</li>
      <li>内容27</li>
      <li>内容28</li>
      <li>内容29</li>
      <li>内容30</li>
      <li>内容31</li>
      <li>内容32</li>
      <li>内容33</li>
      <li>内容34</li>
      <li>内容35</li>
      <li>内容36</li>
      <li>内容37</li>
      <li>内容38</li>
      <li>内容39</li>
      <li>内容40</li>
      <li>内容41</li>
      <li>内容42</li>
      <li>内容43</li>
      <li>内容44</li>
      <li>内容45</li>
      <li>内容46</li>
      <li>内容47</li>
      <li>内容48</li>
      <li>内容49</li>
      <li>内容50</li>
    </ul>
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

import {getHomeMultidata, getHomeGoods} from 'network/home';

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
      currentType: 'pop'
    }
  },
  created() {
    //1. 请求多个数据
    this.getHomeMultidata()
    //2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     *  事件监听相关的方法
     * */
    tabClick(index) {
      // console.log(index)
      if (index == 1) {
        this.currentType = 'new'
      }else if (index == 2) {
        this.currentType = 'sell'
      }else {
        this.currentType = 'pop'
      }
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
      })
    }
  }
}
</script>

<style>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
  }
  .tab-control {
    z-index: 9998;
    position: sticky;
    top: 44px;
  }
</style>
