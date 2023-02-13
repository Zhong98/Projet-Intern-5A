<template>
  <div class="occupy">
    <div class="tabbar">
      <ul>
        <li
            v-for="(item,index) in routerList" :key="index"
            @click="changePath(item.path)"
        >
          <i :class='item.icon' :style='{color:$route.path.includes(item.path) ? "red" : "black"}'></i>
          <span :class='$route.path.includes(item.path) ? "active" : "" '>{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data(){
    return{
      routerList:[
        {
          title:'首页',
          path:'/home',
          icon:'iconfont icon-shouye'
        },
        {
          title:'分类',
          path:'/list',
          icon:'iconfont icon-icon'
        },
        {
          title:'购物车',
          path:'/cart',
          icon:'iconfont icon-gouwuche'
        },
        {
          title:'我的',
          path:'/my',
          icon:'iconfont icon-wode'
        }
      ]
    }
  },
  methods:{
    changePath(path){
      this.$router.replace(path);
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/iconfont.css";
.tabbar{
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 1.6rem;
  background: white;
  ul{
    display: flex;
    justify-content: space-around;
    width: 100%;
    li{
      display: flex;
      flex-direction: column;
      justify-content: center;
      i{
        text-align: center;
        font-size: 0.64rem;
      }
      span{
        font-size: 0.427rem;
      }
    }
  }
}
.occupy{
  width: 100vw;
  height: 1.6rem;
}
.active{
  color: red;
}
</style>
