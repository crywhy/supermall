<template>
  <div class="bottom-bar">
    <div class="left-bar">
      <div>
        <i class="service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="collection"></i>
        <span>收藏</span>
      </div>
    </div>

    <div class="right-bar">
      <div class="cat" @click="shoppingCart"><span>加入购物车</span></div>
      <div class="purchase" @click="shoppingBuying"><span>购买</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      shoppingCart() {
        this.$emit('shoppingCart')
      },
      shoppingBuying() {
        this.$emit('shoppingBuying')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    z-index: 30;
    background-color: #fff;
    /*bottom: 49px;*/
    bottom: 0;
    right: 0;
    left: 0;
    height: 49px;
    display: flex;
    font-size: 13px;
    text-align: center;
    line-height: 49px;
  }
  .left-bar {
    display: flex;
    flex: 1;
    line-height: 20px;
  }
  .left-bar>div {
    flex: 1;
  }
  .right-bar {
    display: flex;
    flex: 1;
    /*align-self:center;*/
  }
  .left-bar>div>i {
    display: block;
    height: 20px;
    width: 20px;
    margin: 6px auto 2px auto;
    background-size: 20px;
    flex: 1;
  }
  .service {
    background-image: url("~assets/img/detail/detail_bottom.png");
    background-position-y: 89px;
  }
  .shop {
    background-image: url("~assets/img/detail/detail_bottom.png");
    background-position-y: 47px;
  }
  .collection {
    background-image: url("~assets/img/detail/detail_bottom.png");
  }
  .right-bar>div{
    flex: 1;
    font-size: 14px;
  }
  .right-bar .cat{
    background-color: yellow;
  }
  .right-bar .purchase {
    background-color: var(--color-tint);
  }
  .cat span {
    color: #000;
  }
  .purchase span{
    color: #fff;
  }
</style>
