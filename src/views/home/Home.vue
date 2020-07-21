<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="ptabClick"
      ref="tabControl1"
     class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>
      <RecommendView :recommends="recommends"/>
      <feature-view/>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="ptabClick"
        ref="tabControl2"
        class="tab-control"
      />
      <goods-list :goods="showGoods"/>
    </scroll>
    <BackTop @click.native="backClick()" v-show="isShowBackTop"/>

  </div>

</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scrolll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";

  export default {
    name: "Home",
    components:{
      NavBar,
      Scroll,
      BackTop,

      HomeSwiper,
      FeatureView,
      TabControl,
      RecommendView,
      GoodsList
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      // this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      const pullLoadMore = debounce(this.$refs.scroll.refresh,0)
      this.$bus.$on('ItemImageLoad',()=>{
        pullLoadMore()
      })
      this.ptabClick(0)

    },
    destroyed() {
      // this.$bus.$off('itemImgLoad',this.itemImgListener);
    },
    methods:{
      /**
      *事件监听方法
      */
      ptabClick(index){
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }

      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        this.listenerShowBackTop(position)
        this.isTabFixed = (-position.y) > this.tabOffsetTop


      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.refresh()
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        this.$refs.scroll.refresh()
      },

      /**
       * 网络请求相关方法
       */

      getHomeMultidata(){
        getHomeMultidata().then(res =>{
          console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
          console.log(this.banners);
          console.log(this.recommends);
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          console.log(res);
          for (let item of res.data.data.list){
            // console.log(item);
            item.show.img = item.show.img.replace("s11","s3")
            // console.log(item.show.img);
          }
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    /*padding-top: 44px;*/
    position: relative;
    overflow: hidden;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control {
    position: relative;
    top: 0px;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
