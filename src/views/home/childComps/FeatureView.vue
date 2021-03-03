<template>
  <div class="feature">
  <a @click.stop="handleClick" href="" >
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
      },
      handleClick() {
        this.$router.push('/category')
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
