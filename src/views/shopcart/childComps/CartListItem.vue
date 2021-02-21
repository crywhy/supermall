<template>
  <div class="cart-item">
    <check-button class="check-button"
                  :is-checked="product.check"
                  @click.native="handleCheckClick"/>
    <div class="cart-img">
      <img :src="product.image" alt="">
    </div>
    <div class="cart-content">
      <div class="cart-title">{{ product.title }}</div>
      <div class="cart-details">{{ product.desc }}</div>
      <div class="cart-price">
        <span>￥{{ product.realPrice }}</span>
        <span>x{{ product.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      handleCheckClick() {
        this.product.check = !this.product.check
      }
    }
  }
</script>

<style scoped>
  .cart-item {
    height: 40vw;
    padding: 10px 10px 10px 0px;
    border-bottom: 2px #ddd solid;
    font-size: 14px;
  }
  .check-button {
    float: left;
    margin: 13% 5px 0 5px;
    height: 18px;
    width: 18px;
  }
  .cart-img {
    float: left;
  }
  .cart-img img{
    width: 23vw;
    height: 32vw;
    border-radius: 10px;
    margin-right: 12px;
  }
  .cart-content {
  }
  .cart-title, .cart-details {
    white-space: nowrap;
    width: 60vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cart-details {
    width: 60vw;
    margin-top: 5vw;
    font-size: 13px;
  }
  .cart-price {
    margin-top: 9vw;
  }
  .cart-price span:nth-child(1){
    color: coral;
  }
  .cart-price span:nth-child(2){
    float: right;
  }
</style>
