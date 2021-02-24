<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default: ''
      // },
      // isShow: {
      //   type: Boolean,
      //   default: false
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = "请传入文字", duration = 1500) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% ,-50%);
    background-color: rgba(0,0,0, .6);
    color: #fff;
    padding:8px 12px;
    border-radius: 5px;
    z-index: 99;
    text-align: center;
  }
</style>
