<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="bottom-check"
                    :is-checked="isSelectAll"
                    @click.native="handleAllClick"/>
      <span>全选</span>
    </div>
    <div class="total">合计：<span class="total-color">{{listTotal}}</span></div>
    <div class="settlement" @click="handleNotGoodsClick">去结算({{totalPrice}})</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex"

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    props: {
    },
    data() {
      return {
        isChecked: true
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      listTotal() {
        let total = 0
        this.cartList.forEach(item=> {
          if (item.check) {
            total += +item.realPrice * item.count
          }
        })
        return '￥' + total.toFixed(2)
      },
      totalPrice() {
        return this.cartList.filter(item => item.check).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) return false
        // return !this.cartList.find(item => !item.check)

        for (let item of this.cartList) {
          if (!item.check) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      handleAllClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.check = false)
        } else {
          this.cartList.forEach(item => item.check = true)
        }
      },
      handleNotGoodsClick() {
        // const SelectAll = this.cartList.find(item => item.check)
        if (!this.cartList.find(item => item.check)) {
          this.$toast.show('请选择商品！', 1500)
        } else {
          this.$toast.show('您的余额不足！', 2000)
        }
      },
      handleRmClick () {
        const cart = this.cartList
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].check) {
            this.cartList.splice(i, 1);
            i--;
          }
        }

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 50px;
    right: 0;
    background-color: #ddd;
    display: flex;
    line-height: 40px;
    font-size: 13px;
  }
  .check-content {
    margin-left: 10px;
    width: 80px;
    display: flex;
    align-items: center;
  }
  .settlement {
    width: 80px;
  }
  .bottom-check{
    width: 18px;
    height: 18px;
    line-height: 18px;
    float: left;
    margin-right: 4px;
  }
  .total {
    flex: 1;
  }
  .total-color {
    color: #000;
  }
  .settlement {
    background-color: coral;
    text-align: center;
    color: #fff;
  }
</style>
