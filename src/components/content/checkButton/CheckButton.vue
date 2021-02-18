<template>
  <div class="check-button"
       :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return true
        }
      }
    }
  }
</script>

<style scoped>
 .check-button {
   border-radius: 50%;
   border: #aaa solid 2px;
 }
 .check-button img {
   position: relative;
   right: 1px;
 }
 .check {
   border: var(--color-tint) solid 2px;
   background-color: var(--color-tint);
 }
</style>
