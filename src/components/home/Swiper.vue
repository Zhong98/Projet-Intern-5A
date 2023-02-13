<template>
  <swiper
      :modules="modules"
      :space-between="50"
      :pagination="{ clickable: true }"
      :autoplay="{delay: 3000}"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(item,index) in swiperList" :key="index">
      <img :src="item.imgUrl">
    </swiper-slide>
  </swiper>
</template>

<script>
import { Pagination,Autoplay } from 'swiper';
import {Swiper,SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
  props:{
    swiperList:Array
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const onSwiper = () => {
    };
    const onSlideChange = () => {
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination, Autoplay],
    };
  },
}
</script>

<style scoped>
.swiper-slide{
  height: 4.9rem;
}
.swiper-slide img{
  width: 100%;
  height: 100%;
}
::v-deep .swiper-pagination-bullet-active{
  --swiper-theme-color:#b0352f;
}
</style>