<template>
  <div class="profile-menu">
    <div>
      <img src="~assets/img/profile/message.svg" alt="">
      <p>我的消息</p>
    </div>
    <div>
      <img src="~assets/img/profile/pointer.svg" alt="">
      <p>积分商城</p>
    </div>
    <div class="dividing-line ">
      <img src="~assets/img/profile/vip.svg" alt="">
      <p>会员卡</p>
    </div>
    <div>
      <img src="~assets/img/profile/cart.svg" alt="">
      <p>我的购物车</p>
    </div>
    <div>
      <img src="~assets/img/profile/shopping.svg" alt="">
      <p>下载购物APP</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileMenu"
  }
</script>

<style scoped>
  .profile-menu>div {
    padding: 20px 0 0 20px;
  }
  .profile-menu img{
    width: 22px;
    float: left;
  }
  .profile-menu p{
    margin-left: 30px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 13px;
  }
  .dividing-line {
    border-bottom: 15px #eee solid;
  }
  .dividing-line>p {
    border-bottom: none;
  }
</style>
