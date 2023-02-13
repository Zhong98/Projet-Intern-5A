<template>
  <div class="container">
    <SearchHeader></SearchHeader>
    <section ref="wrap">
      <div>
        <div class="hot" v-if="histories.length">
          <div class="title">
            <i class="iconfont icon-lishixiao"></i>
            历史搜索
            <span @click="clearHistory">清除历史搜索</span>
          </div>
          <ul class="items">
            <li v-for="(item,index) in histories" :key="index" @click="goSearch(item)">{{item}}</li>
          </ul>
        </div>
        <div class="hot">
          <div class="title">
            <i class="iconfont icon-remen"></i>
            热门搜索
          </div>
          <ul class="items">
            <li v-for="(item,index) in hotSearch" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="recommended">
          <div class="products">
            <i class="iconfont icon-thumbup"></i>
            推荐商品
          </div>
          <SearchRecommend :products="recommendedProducts"></SearchRecommend>
        </div>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
//Utiliser l'UI de vant3
import { Dialog } from 'vant';

import '@/assets/css/common.css'
import SearchHeader from "@/components/search/Header"
import SearchRecommend from "@/components/search/Recommended"
import TabBar from "@/components/common/Tabbar";
import BScroll from "better-scroll";
import http from "@/common/api/request"

export default {
  name: "SearchIndex",
  data(){
    return{
      histories:[],
      hotSearch:[],
      recommendedProducts:[]
    }
  },
  components:{
    [Dialog.Component.name]: Dialog.Component,
    SearchHeader,
    SearchRecommend,
    TabBar
  },
  methods:{
    clearHistory(){
      Dialog.confirm({
        title: '清除历史记录',
        message:
            '确认删除历史记录吗？',
      }).then(() => {
        localStorage.removeItem('searchHistory');
        this.histories=[];
        this.$nextTick(() => {
          new BScroll(this.$refs.wrap, {
            movable: true,
            click:true, //Faire en sorte que l'événement de clic prenne effet
            zoom: true
          })
        })
      }).catch(() => {
        // on cancel
      });
    },
    async getData(){
      await http.$axios({
        url:'/api/search/index'
      }).then(v=>{
        this.hotSearch=v.hotSearch;
        this.recommendedProducts=v.products;
      })

      this.$nextTick(() => {
        new BScroll(this.$refs.wrap, {
          movable: true,
          click:true,
          zoom: true
        })
      })
    },
    goSearch(item){
      this.$router.push({
        name:'SearchItem',
        query:{
          key:item
        }
      })
    }
  },
  created() {
    if (localStorage.getItem('searchHistory')){
      this.histories=JSON.parse(localStorage.getItem('searchHistory'));
    }
    this.getData();
  }
}
</script>

<style scoped>
.container{
  background: none;
}
section{
  flex: 1;
  background: #f5f5f5;
  overflow: hidden;
}
.hot{
  padding: .267rem .533rem .533rem .533rem;
}
.title{
  position: relative;
  margin-bottom: .4rem;
  font-size: .45rem;
}
.title>i,.products>i{
  color: #b0352f;
}
.title>span{
  position: absolute;
  right: 0;
}
.items li{
  padding: 0 .133rem;
  margin: 0 .4rem .4rem 0;
  height: 0.8rem;
  border: 1px solid #ddd;
  color: #999;
  font-size: .4rem;
  display: inline-block;
  line-height: .8rem;
}
.products{
  padding: .533rem;
  font-size: .45rem;
}

</style>
