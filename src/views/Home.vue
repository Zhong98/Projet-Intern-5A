<template>
  <div class="homepage">
    <MyHeader></MyHeader>
    <fun-tabs v-model="value" :active-color="activeColor" :line-width="lineWidth" @change="changeTab">
      <fun-tab-item v-for="(item,index) in funTabList" :key="index"
          :name="item.index" :title="item.title"/>
    </fun-tabs>
    <section ref="wrap">
      <div>
        <div v-for="(item,index) in newData"
             :key="index"
        >
          <HomeSwiper v-if="item.type=='swiper'"
                      :swiperList="item.data"
          ></HomeSwiper>
          <HomeIcons v-if="item.type=='icon'"
                     :iconList="item.data"
          ></HomeIcons>
          <HomeRecommend v-if="item.type=='recommend'"
                         :recommendList="item.data"
          ></HomeRecommend>
          <TeaAd v-if="item.type=='ad'"
                 :tgy="item.data"
          ></TeaAd>
          <GuessYouLike v-if="item.type=='like'"
                        :productList="item.data"
          ></GuessYouLike>
        </div>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/Tabbar";
import MyHeader from "@/components/home/Header";
import HomeSwiper from "@/components/home/Swiper";
import HomeIcons from "@/components/home/Icons"
import HomeRecommend from "@/components/home/Recommend"
import GuessYouLike from "@/components/home/Like"
import TeaAd from "@/components/home/Ad"
import { FunTabs, FunTabItem } from 'fun-tab';
import BScroll from "better-scroll";
import '@/assets/css/common.css'

import http from '@/common/api/request'

export default {
  name: "HomeView",
  data(){
    return{
      value:0,
      activeColor:"#b0352f",
      lineWidth:40,
      funTabList:[],
      newData:[],
    }
  },
  components:{
    TabBar,
    MyHeader,
    FunTabs,
    FunTabItem,
    HomeSwiper,
    HomeRecommend,
    HomeIcons,
    GuessYouLike,
    TeaAd
  },
  methods:{
    changeTab(index){
      this.getData(index);
    },
    async getData(index){
      //Axios二次封装
      await http.$axios({
        url:'/api/tabList/'+index+'/data/1'
      }).then(res=>{
        this.funTabList=res.funTabList;
        this.newData=res.data;
      })

      //Une fois les données rendues, ajouter better-scroll pour obtenir la bonne hauteur/数据渲染完之后再添加better-scroll，从而获取正确的高度
      // eslint-disable-next-line vue/valid-next-tick
      await this.$nextTick(() => {
        new BScroll(this.$refs.wrap, {
          movable: true,
          click:true,
          zoom: true
        })
      })


    }
  },
  created() {
    this.getData(0);
  }
}
</script>

<style scoped>
@import 'fun-tab/dist/index.css';
.homepage{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}
.van-loading{
  position: fixed !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 3;
}
MyHeader{
  height: 1.173rem;
}
section{
  flex: 1;
  overflow: hidden;
}
TabBar{
  height: 1.6rem;
}
</style>
