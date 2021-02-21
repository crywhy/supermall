<template>
  <div class="cart-list ignore">
    <scroll class="cart-scroll"
            ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index"
                      :product="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import { mapGetters } from "vuex"

  export default {
    name: "CartList",
    components: {
      CartListItem,
      Scroll
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100vh - 45px - 49px - 40px);
  }
  .cart-scroll {
    height: 100%;
    overflow: hidden;
  }
</style>
