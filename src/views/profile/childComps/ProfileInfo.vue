<template>
  <div class="profile-info">
    <div class="info-left">
      <div><span>0.00</span>元</div>
      <p>我的余额</p>
    </div>
    <div class="info-center">
      <div><span>0</span>个</div>
      <p>我的优惠</p>
    </div>
    <div class="info-right">
      <div><span>0</span>分</div>
      <p>我的积分</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileInfo"
  }
</script>

<style scoped>
 .profile-info {
   display: flex;
   text-align: center;
 }
 .profile-info>div {
   padding: 20px;
   flex: 1;
   font-size: 15px;
 }
 .profile-info span {
   font-size: 25px;
   font-weight: 600;
   color: coral;
 }
 .profile-info>div>p {
   margin-top: 5px;
 }
</style>
