<template>
    <div class="check-button" :class="{check:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props: {
          isChecked:{
            type:Boolean,
            default:false
          }
        }
    }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,.2);
  }
  .check {
    /*选中状态是时去掉边框，未选中状态时有灰色边框*/
    background: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
