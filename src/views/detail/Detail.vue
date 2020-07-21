<template>
  <div id="detail">
    <DetailNavBar class="detail-nav"  ref="nav" @titleClick="titleClick"></DetailNavBar>
    <scroll
      class="content"
      :probe-type=3
      @scroll="contentScroll"
      ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" ref="shop"/>
      <detail-comment-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment :comment="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <BackTop @click.native="backClick()" v-show="isShowBackTop"/>


  </div>
</template>


<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailComment from "./childComps/DetailComment";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import Scroll from "../../components/common/scrolll/Scroll";
  import ScrollReveal from 'scrollreveal'



  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail"
  import {debounce} from "../../common/utils";
  import {itemListenerMixin ,backTopMixin} from "../../common/mixin";
  import BackTop from "../../components/content/backTop/BackTop";
  import { mapActions } from 'vuex'

  export default {
    name: "Detail",
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        iid:null,
        res:null,
        topImages:[],
        goods: {},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        scrollReveal:ScrollReveal(),
        getThemeTopY:null,
        themeTopYs:[],
        currentIndex:null,

      }
    },
    components:{
      DetailShopInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailCommentInfo,
      DetailParamInfo,
      DetailComment,
      GoodsList,
      DetailBottomBar,
      BackTop,


      Scroll
    },
    created() {
      this.iid = this.$route.params.iid
      console.log(this.$route.params.iid);

      getDetail(this.iid).then(res => {
        console.log(res);
        this.topImages = res.data.result.itemInfo.topImages
        for (let i in this.topImages){
          this.topImages[i] = this.topImages[i].replace("s11","s3")
          this.topImages[i] = this.topImages[i].replace("s5","s3")
        }
        console.log(this.topImages)

        const data = res.data.result

        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        getRecommend().then(res => {
          console.log(res);
          this.recommends = res.data.data.list
        })

        if(data.rate.list){
          this.commentInfo = data.rate.list[0]
        }

      })
        this.getThemeTopY = debounce(()=>{
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.param.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE);//在数组最后添加一个非常大的值，用于简化判断条件
            // console.log(this.themeTopYs);
        },100)



    },
    mounted() {
      this.scrollReveal.reveal('.content',{interval:0,delay:100,distance:'44px',duration:500,offsetTop:true,easing:'linear'})

    },
    updated() {

    },
    deactivated() {
    },
    destroyed() {
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      titleClick(index){
        console.log(this.themeTopYs[index]);
        if (index===0){
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        }else{
          this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
        }

      },
      contentScroll(position){
        const positionY = -position.y;
        const length = this.themeTopYs.length
        for (let i=0;i<length-1;i++){
          if((this.currentIndex!==i)&&(positionY>=this.themeTopYs[i] && positionY<=this.themeTopYs[i+1])){
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
            // console.log(this.currentIndex);
            this.$refs.scroll.refresh()
          }
        }
        this.listenerShowBackTop(position)
      },
      addToCart(){

      //  获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc =this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        console.log(product);
        //将商品添加到购物车
        // this.$store.commit('addCart',product)
        this.addCart(product).then(res => {
          // this.show = true;
          this.$toast.show(res,1000)

          // this.message = res
          console.log(this.$toast);
        })
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        // setTimeout(()=>{
        //   this.show = false;
        //   this.message = ''
        // },1500)



      }
    }

  }
</script>

<style scoped>
 #detail {
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .detail-nav {
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
