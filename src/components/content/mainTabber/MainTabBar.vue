<template>
  <tab-bar>
    <tab-bar-item path="/home" :activeClass="color">
      <img src="~assets/img/tabbar/home.svg" alt="home" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.svg" alt="home" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" :activeClass="color">
      <img src="~assets/img/tabbar/category.svg" alt="home" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.svg" alt="home" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/shopcart" :activeClass="color">
      <img src="~assets/img/tabbar/shopcart.svg" alt="home" slot="item-icon">
      <img src="~assets/img/tabbar/shopcart_active.svg" alt="home" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" :activeClass="color">
      <img src="~assets/img/tabbar/profile.svg" alt="home" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.svg" alt="home" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {
      color: 'deepPink'
    }
  }
}
</script>

<style scoped>

</style>
