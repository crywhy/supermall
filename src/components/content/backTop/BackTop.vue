<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
  name: "BackTop"
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    z-index: 10;
    right: 3vw;
    bottom: 45px;
  }
  .back-top img {
    width: 15vw;
  }
</style>
