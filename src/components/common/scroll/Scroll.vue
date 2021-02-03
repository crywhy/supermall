<template>
  <div class="wrapper" ref="wrapper">
    <div class="center">
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  components: {
    BScroll
  },
  mounted() {
    const scroll = new BScroll(this.$refs.wrapper, {

    })
  }
}
</script>

<style scoped>

</style>
