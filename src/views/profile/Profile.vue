<template>
<div class="profile">
  <nav-bar class="profile-nav-bar">
    <div slot="center">我的主页</div>
  </nav-bar>

  <profile-login/>
  <profile-info class="dividing-line"/>
  <profile-menu/>
</div>
</template>

<script>
  import ProfileLogin from "./childComps/ProfileLogin";
  import ProfileInfo from "./childComps/ProfileInfo";
  import ProfileMenu from "./childComps/ProfileMenu";
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "Profile",
    components: {
      ProfileLogin,
      ProfileInfo,
      ProfileMenu,
      NavBar
    }
  }
</script>

<style scoped>
  .profile{
  }
  .profile-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;
    font-weight: 550;
    z-index: 20;
    line-height: 44px;
  }
  .dividing-line {
    border-bottom: 15px #eee solid;
  }
</style>
