<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    momentum: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  components: {
    BScroll
  },
  mounted() {
    // 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper , {
      click: true,
      pullUpLoad: this.pullUpLoad,
      probeType: this.probeType,
      momentum: this.momentum
    })

    // 监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }

    // 监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time = 3000) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      console.log(4)
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>
