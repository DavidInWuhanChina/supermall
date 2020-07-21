<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
    <div slot="right" @click="toggle">
      <div class="manager" v-if="!selectDelete">管理</div>
      <div class="manager" v-else>完成</div>
    </div>

  </nav-bar>
  <!-- 商品列表-->
  <cart-list/>
  <!--  购物车为空-->
  <cart-empty class="cart-empty" v-show="!list.length"/>
<!-- 底部汇总-->
  <cart-button-bar :select-delete="selectDelete"/>

</div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartButtonBar from "./childComps/CartButtonBar";
  import CartEmpty from "./childComps/CartEmpty";

  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartButtonBar,
      CartEmpty,

    },
    computed:{
      // ...mapGetters(['cartLength', 'cartList'])
        ...mapGetters({
          length:'cartLength',
          list:'cartList'
        })
    },
    data(){
      return {
        selectDelete:false,

      }
    },
    methods:{
      toggle(){
        this.selectDelete = !this.selectDelete
      }
    }

  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /*font-weight: 700;*/
  }
  .manager{
    font-size: 14px;
    letter-spacing: 2px;
  }
  .cart-empty {
    position: absolute;
    top: 44px;
    width: 100%;
  }
</style>
