<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
      <div slot="right" class="right">
        <span @click="handleRmClick" v-show="cartList.length">删除</span>
      </div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部导航 -->
    <cart-bottom-bar ref="cartBar" :cartList="cartList"/>
  </div>
</template>

<script>
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import NavBar from "components/common/navbar/NavBar";

  import { mapGetters } from "vuex"

  export default {
    name: "ShopCart",
    components: {
      CartList,
      CartBottomBar,
      NavBar
    },
    computed: {
      ...mapGetters(['cartLength', 'cartList'])
    },
    methods: {
      handleRmClick() {
        this.$refs.cartBar.handleRmClick()
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    font-weight: 550;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    z-index: 20;
    line-height: 44px;
  }
  .right {
    font-size: 12px;
    font-weight: 300;
  }
</style>
