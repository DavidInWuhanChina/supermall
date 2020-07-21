<template>
    <div class="cart-empty">
      <img src="~assets/img/cart/empty.png" alt="">
      <div class="cart-title">购物车竟然是空的</div>
      <div class="cart-message">再忙，也要记得去买一点东西犒劳一下自己</div>
      <div class="cart-hangout" @click="toHome">去逛逛</div>
    </div>
</template>

<script>
    export default {
        name: "CartEmpty",
        methods:{
        //  点击跳转首页
          toHome(){
            this.$router.replace('home')
          }
        }
    }
</script>

<style scoped>
  .cart-empty {
    text-align: center;
    display: flex;
    flex-direction: column;
  /*  设置单行在交叉轴上的对其方式*/
    align-items: center;
  }
  .cart-empty img{
    width: 100px;
    height: 100px;
    margin-top: 80px;
    margin-bottom: 30px;
  }
  .cart-title{
    font-size: 12px;
    color: #999999;
    margin-bottom: 20px;
  }
  .cart-hangout {
    padding: 10px;
    border: 1px solid #EFEFEF;
  }
</style>
