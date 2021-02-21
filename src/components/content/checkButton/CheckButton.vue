<template>
  <div class="check-button"
       :class="{check: isChecked}">
    <img v-show="isChecked" src="~assets/img/cart/tick.svg" alt="">
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
   width: 4vw;
 }
 .check {
   border: var(--color-tint) solid 2px;
   background-color: var(--color-tint);
 }
</style>
