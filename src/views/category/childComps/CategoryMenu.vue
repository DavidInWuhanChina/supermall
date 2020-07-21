<template>

    <div id="menu">
      <div class="menu-item"
            @click="menuItemClick(index)"
            v-for="(item,index) in menuData"
           :class="{'active':currentIndex === index}">
        <p>{{item.title}}</p>
      </div>
    </div>


</template>

<script>

    export default {
        name: "CategoryMenu",
        components:{

        },
      props:{
        menuData: {
          //接受父组件Category请求到的所有分类信息
          type:Array,
          default(){
            return []
          }
        }
      },
      data(){
        return {
          //记录当前被选中的menu-item
          currentIndex:0
        }
      },
      methods:{
          menuItemClick(index){
            //更新当前被选中的menu-item的索引下标
              this.currentIndex = index
            //向父组件发送index的menu-item被点击的currentMenu事件
            this.$emit('currentMenu',index)
          }
      }
    }
</script>


<style scoped>
  #menu {
    width: 100%;
    background-color: #f6f6f6;
  }
  .menu-item {
    height: 2rem;
    line-height: 2rem;
  }
  .menu-item p {
    width: 100%;
    text-align: center;
    color: rgb(100, 100, 100);

    display: inline-block;
    /*line-height是用来控制border的，其父亲的line-height是用来控制整体的行高，自己的用来控制元素的行高*/
    line-height: 0.8rem;
    border-left: 0.2rem solid #f6f6f6;
  }
  .menu-item.active{
    background-color: white;
  }
  .menu-item.active p{
    color:var(--color-tint);
    font-weight: 600;
    border-left: 0.2rem solid var(--color-tint);
  }
</style>
