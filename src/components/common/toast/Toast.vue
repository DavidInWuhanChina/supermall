<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      props: {
        //   message:{
        //     type:String,
        //     default:''
        //   },
        // show:{
        //     type: Boolean,
        //     default: false
        // }
      },
      data(){
        return {
          message:'',
          isShow:false
          }
        }
      ,
      methods:{
        show(message='默认文字', duration=2000){
            this.isShow = true    //显示
            this.message = message

          setTimeout(()=>{
            this.isShow = false;  //隐藏
            this.message = ''   //清空
          },duration)
        }
      }
    }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0,.6);
  }
</style>
