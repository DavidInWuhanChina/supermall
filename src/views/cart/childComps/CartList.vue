<template>
    <div class="cart-list">
      <scroll class="content" ref="scroll">
        <CartListItem v-for="(item, index) in cartList"
                      :key="index"
                      :product="item"/>
      </scroll>

    </div>
</template>

<script>
  import Scroll from "../../../components/common/scrolll/Scroll";
  import CartListItem from "./CartListItem";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartList",
        components: {
          Scroll,
          CartListItem,
        },
        computed:{
          ...mapGetters(['cartList'])
      },
      activated() {
        this.$refs.scroll.refresh()
      }
    }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 49px - 44px - 40px);
  }

    .content {
      height: 100%;
      overflow: hidden;
    }
</style>
