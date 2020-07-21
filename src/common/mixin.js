import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = ()=>{
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
    console.log('混入+refresh');
  }
}

export const backTopMixin={
  data(){
    return {
      isShowBackTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0);
    },
    listenerShowBackTop(position){
      this.isShowBackTop = -position.y > 1000
    }
  }
}
