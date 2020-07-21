<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkAllClick"
      />
      <span>全选</span>
    </div>
    <div class="price">
      合计 {{totalPrice}}
    </div>
    <div v-if="!selectDelete" class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
    <div v-else class="delete" @click="delClick">删除</div>

  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters,mapMutations} from 'vuex'
    export default {
      name: "CartButtonBar",
      components:{
          CheckButton
      },
      props:{
         selectDelete:{
           type:Boolean,
           default:false
         }
      },
      computed:{
          ...mapGetters(['cartList','cartLength','totalPrice',"checkLength","isSelectAll"]),
      },
      methods:{
        ...mapMutations({
          deleteInfo:'delete_info'
        }),
          checkAllClick(){

            // if (this.isSelectAll){
            //   this.cartList.forEach(item => item.checked = false)
            // }else {
            //   this.cartList.forEach(item => item.checked =true)
            // }
            let isAll = this.isSelectAll
            this.cartList.forEach(item => item.checked=!isAll)
          },
        calcClick(){
            if (this.cartLength === 0){
              this.$toast.show('您的购物车为空',1000)
            }else if (!this.checkLength === 0){
              this.$toast.show('请选择购买的商品')
            }
        },
        delClick(){
            if(this.cartLength === 0){
              this.$toast.show('您的购物车为空')
            }else {
              this.deleteInfo()
            }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar {
    position: relative;


    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 14px;
    display: flex;
  }
  .check-content {
      display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    margin-left: auto;
    /*margin-right: 10px;*/
    width: 100px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;

    /*border-radius: 20px;*/
  }
  .delete {
    margin-top: auto;
    margin-right: 10px;
    margin-bottom: auto;
    width: 60px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    background-color: #fff;
    color: var(--color-tint);
    border: 1px solid var(--color-tint);
  }

</style>
