<template>
  <div class="feature">
  <a href="https://act.mogujie.com/zzlx67">
    <img @load="imgLoad" src="~assets/img/home/recommend_bg.jpg" alt="">
  </a>
  </div>
</template>

<script>
  export default {
    name: "FeatureView",
    methods: {
      imgLoad () {
        this.$emit('FeatureViewLoad')
      }
    }
  }
</script>

<style scoped>
  .feature {
    width: 100%;
  }
  .feature img {
    width: 100%;
  }
</style>
