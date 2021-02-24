<template>
  <div v-if="isShowInterface">
    <div class="shopping-bgc" @click.stop="handleShowClick"></div>
    <div class="shopping">
      <div class="shopping-title">
        <div>
          <img :src="imageShow" alt="">
        </div>
        <div class="title-center">
<!--          <span class="price">{{ interface.defaultPrice }}</span>-->
          <span class="price">{{ interface.defaultPrice }}</span>
          <div>库存{{ stockShow }}件</div>
          <div class="size" v-if="sizeIndex  === -1">请选择：尺码</div>
          <div class="size"  v-else>已选择：{{ sizeShow }}</div>
        </div>
        <div class="off">
          <span @click.stop="handleShowClick">X</span>
        </div>
      </div>

      <div class="shopping-content">
        <div>
          <p>颜色</p>
          <ul v-for="(item,index) in interface.props[0].list"
              :class="{active: index === colorIndex}"
              @click="handleColorActiveClick(index)">
            <li>{{ item.name }}</li>
          </ul>
        </div>

        <div>
          <p>尺码</p>
          <ul v-for="(item,index) in interface.props[1].list"
              :class="{active: index === sizeIndex}"
              @click="handleSizeActiveClick(index)">
            <li>{{ item.name }}</li>
          </ul>
        </div>

        <div class="shopping-number">
          <p>数量</p>
          <div>
            <span @click="handleDecrease">-</span>
            <span>{{ shoppingNum }}</span>
            <span @click="handleIncrease">+</span>
          </div>
        </div>
      </div>

      <div class="shopping-bottom"
           @click="handleConfirmClick"
           v-if="ifShoppingCart">确认</div>
      <div class="shopping-bottom" v-else @click="handleFalse">确认</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ShoppingInterface",
  props: {
    interface: {
      type: Object,
      default() {
        return {}
      }
    },
    isShowInterface: {
      type: Boolean,
      default() {
        return true;
      }
    },
    ifShoppingCart: {
      type: Boolean
    },
    shoppingNum: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  data() {
    return {
      colorIndex: -1,
      sizeIndex: -1
    }
  },
  computed: {
    imageShow() {
      if (this.interface.length) return {}
      return this.interface.skus[0].img
    },
    stockShow() {
      if (this.interface.length) return {}
      return this.interface.skus[0].stock
    },
    sizeShow() {
      if (this.interface.length) return {}
      for (let i=0; i<this.interface.props[1].list.length; i++) {
        if (this.sizeIndex === i) {
          return this.interface.props[1].list[i].name
        }
      }

    }
  },
  mounted() {
  },
  methods: {
    handleShowClick() {
      this.$emit('handleShowClick')
    },
    handleConfirmClick() {
      this.$emit('handleConfirmClick',this.colorIndex, this.sizeIndex)
    },
    handleFalse() {
      this.$toast.show('你的钱包为空！购买失败。', 2000)
    },
    handleColorActiveClick(index) {
      if (this.colorIndex !== index) {
        this.colorIndex = index
      } else {
        this.colorIndex = -1
      }
    },
    handleSizeActiveClick(index) {
      if (this.sizeIndex !== index) {
        this.sizeIndex = index
      } else {
        this.sizeIndex = -1
      }
    },
    handleDecrease() {
      this.$emit('Decrease')
    },
    handleIncrease() {
      this.$emit('Increase')
    }
  }
}
</script>

<style scoped>
  .shopping-bgc {
    background-color: rgba(0,0,0, .4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 30;
  }
  .shopping {
    background-color: #fff;
    height: 450px;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 30;
  }
  .shopping-title {
    position: relative;
  }
  .shopping-title>div:first-child {
    height: 100px;
    overflow: hidden;
    border-radius: 5px;
    width: 90px;
    float: left;
    margin: 5px 10px 0 5px;
  }
  .shopping-title>div>img {
    margin-top: -10px;
    width: 90px;
  }
  .title-center > div{
    position: absolute;
    left: 110px;
    font-size: 15px;
  }
  .shopping-title .size {
    top: 75px;
  }
  .shopping-title .price {
    font-size: 24px;
    color: #000;
  }
  .title-center {
    padding-top: 15px;
  }
  .off {
    float: right;
    position: relative;
    top: -20px;
    right: 5px;
  }
  .shopping-content {
    position: absolute;
    overflow: auto;
    top: 110px;
    left: 0;
    right: 0;
    bottom: 40px;
    font-size: 13px;
    padding: 5px;
  }
  .shopping-content>div {
    margin-bottom: 30px;
  }
  .shopping-content ul {
    list-style: none;
    margin-top: 10px;
    padding: 3px 9px;
    border: #ddd 1px solid;
    display: inline-block;
    margin-right: 15px;
    border-radius: 3px;
  }
  .shopping-number>div{
    border: 1px #ddd solid;
    border-radius: 2px;
    display: inline-block;
    margin-top: 10px;
  }
  .shopping-number>div>span {
    padding:5px 12px;
    display: inline-block;
    border-right: 1px #ddd solid;
  }
  .shopping-number span:last-child {
    border-right: none;
  }
  .shopping-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    background-color: var(--color-tint);
  }
  .active {
    border:1px solid var(--color-tint) !important;
    color: var(--color-tint);
  }
</style>
