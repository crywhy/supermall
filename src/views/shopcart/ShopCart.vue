<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list />

    <!-- 底部导航 -->
    <cart-bottom-bar :cartList="cartList"/>
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
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
    position: relative;
    right: 0;
    left: 0;
    top: 0;
    z-index: 1;
  }
</style>
