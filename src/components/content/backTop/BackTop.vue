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
    z-index: 30;
    right: 10px;
    bottom: 3rem;
  }
  .back-top img {
    width: 40px;
  }
</style>
