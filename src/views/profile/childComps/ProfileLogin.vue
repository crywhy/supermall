<template>
  <div class="profile-login">
    <img src="~assets/img/profile/avatar.svg" alt="">
    <div class="profile-center">
      <div id="loginA">
        <a href="#">登录</a>/<a href="#">注册</a>
      </div>
      <div>
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="profile-right">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "ProfileLogin"
  }
</script>

<style scoped>
 .profile-login {
  background-color: var(--color-tint);
   height: 80px;
   position: relative;
 }
 .profile-login>img {
   width: 70px;
   display: block;
   float: left;
   position: absolute;
   bottom: 5px;
   left: 9px;
 }
 .profile-center{
   position: absolute;
   bottom: 16px;
   left: 90px;
   color: #fff;
 }
 #loginA {
   margin-left: 5px;
   margin-bottom: 5px;
 }
 .profile-center>#loginA>a{
   color: #fff;
 }
 .profile-center>div>span {
   font-size: 12px;
   position: relative;
 }
 .profile-center>div {
   margin-left: 18px;
 }
 .profile-center>div>span::before {
   content: '';
   position: absolute;
   left: -18px;
   width: 20px;
   height: 20px;
   background-image: url("~assets/img/profile/phone.svg");
   background-size: 20px;
 }
 .profile-right {
   float: right;
   line-height: 80px;
   width: 60px;
 }
 .profile-right img {
   width: 20px;
   margin-left: 28px;
 }
</style>
