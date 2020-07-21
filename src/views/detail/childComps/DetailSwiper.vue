<template>
    <swiper :options="swiperOption" class="swiper-slide">
      <swiper-slide   v-for="(item,index) in topImages"
        :key="index">
        <a><img :src="item" alt=""/></a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
  // import {Swiper ,SwiperItem} from "../../../components/common/swiper/index.js";
  export default {
    name: "DetailSwiper",
    components: {
      // Swiper,
      // SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        swiperOption: {
          //显示分页
          pagination: {
            el: '.swiper-pagination'
          },
          //设置点击箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // autoHeight:true,
          //自动轮播
          autoplay: {
            delay: 2000,
            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true
        }
      }
    }
  }
</script>

<style scoped>
  /*.detail_swiper {*/
  /*  height: 100%;*/
  /*}*/
  .swiper-slide {
    height: 350px;
    width: 100%;
    overflow: hidden;
  }

  .swiper-slide img{
    width: 100%;
  }

</style>
