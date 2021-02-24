<template>
  <div class="tab-bar-item" @click="handleRouterClick" :style="activeBackground">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>

    <div v-else><slot name="item-icon-active"></slot></div>

    <div :style="activeStyle" ><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeClass: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: false
    background: '#f0f0f0'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path)

      // return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeClass} : {}
    },
    activeBackground() {
      return this.isActive ? {backgroundColor: this.background} : {}
    }
  }
  ,
  methods: {
    handleRouterClick() {
      // console.log('ww')

      this.$router.replace(this.path).catch(err => {})
      document.title = this.path.substr(1)
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    width: 20px;
    margin-top: 5px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
