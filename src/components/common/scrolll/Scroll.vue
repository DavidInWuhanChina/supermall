<template>
<!--  ref/children子组件-->
  <div ref="wrapper" >
    <div>
      <slot></slot>
    </div>
  </div>

</template>

<script>
  import Bscroll from 'better-scroll'
  import {debounce} from "../../../common/utils";

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default:1
      },
      pullUpLoad: {
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll:{
          type: Object,
          default(){
            return {}
          }
        }
      }
    },

    mounted() {

          this.scroll = new Bscroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
          })





      console.log(this.scroll)

      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll', position)
        // console.log(this.scroll.y);
      })
      if (this.pullUpLoad){
        this.scroll.on('pullingUp', ()=>{
          this.$emit('pullingUp')
        })
      }
      console.log(this.scroll);
    },
    methods:{
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
        console.log(this.scroll.y);
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        console.log('scroll刷新');
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }

  }
</script>

<style scoped>

</style>
