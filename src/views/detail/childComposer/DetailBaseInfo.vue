<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount"
            class="discount"
            :style="{backgroundColor: goods.discountBgColor}">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item"
            v-for="index in goods.services.length-1"
            :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{ goods.services[index-1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {

  }
  .info-title {
    color: #000;
    margin-top: 15px;
    margin-left: 5px;
    font-size: 4vw;
  }
  .info-price {
    margin-top: 10px;
    margin-left: 5px;
  }
  .n-price {
    color: var(--color-high-text);
    font-size: 7vw;
  }
  .o-price {
    font-size: var(--font-size);
    margin-left: 5px;
    text-decoration: line-through;
  }
  .discount {
    overflow: hidden;
    display: inline-block;
    /*background-color: var(--color-tint);*/
    border-radius: 30px;
    font-size: 12px;
    padding: 2px 3px 1px 3px;
    color: #fff;
    margin-bottom: 3px;
    margin-left: 6px;
  }
  .info-other {
    margin-top: 10px;
    font-size: var(--font-size);
    display: flex;
    text-align: center;
    align-content: space-evenly;
    padding: 3px;
  }
  .info-other span {
    flex: 1;
    display: block;
    padding: 7px;
    border-bottom: 1px solid #ddd;
  }
  .info-other span:first-child {
    text-align: left;
  }
  .info-other span:last-child {
    text-align: right;
  }

  .info-service {
    font-size: 12px;
    display: flex;
    text-align: center;
    align-content: space-evenly;
    padding-bottom:  4vw;
    border-bottom: #eee 5px solid;
  }
  .info-service img{
    width: 13px;
  }
  .info-service-item {
    flex: 1;
    overflow: hidden;
    margin-top: 2vw;
    padding: 3px;
  }
  .info-service-item span:first-child {
    text-align: left;
  }
  .info-service-item:first-child {
    text-align: left;

  }
  .info-service-item span:last-child {
    text-align: right;
  }
  .info-service-item span {
    margin-left: 1px;
  }
</style>
