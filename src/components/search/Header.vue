<template>
  <header>
    <div class="back" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div>
      <form class="search" @keyup.enter="goSearch" onsubmit="return false"><!--keyup.xxx 键盘按下哪个键事件-->
        <div>
          <i class="iconfont icon-sousuo"></i>
        </div>
        <input type="search" placeholder="搜索您喜欢的产品..." v-model="searchVal" ref="myInput">
      </form>
    </div>
    <h3 class="go" @click="goSearch">搜索</h3>
  </header>
</template>

<script>
import '@/assets/css/common.css'
export default {
  name: "SearchHeader",
  data(){
    return{
      searchVal:this.$route.query.key || '', //Afficher la valeur searchVal dans la zone de saisie
      searchHistory:[]
    }
  },
  methods:{
    //Perdre la concentration/失去焦点
    myTouchMove() {
      this.$refs.myInput.blur();
    },
    goBack(){
      this.$router.back();
    },
    goSearch(){
      //Si la valeur est vide, le routage ne réoriente pas
      if (!this.searchVal) {
        return;
      }else {
        this.searchHistory.unshift(this.searchVal);
        //Déduplication
        let histories=new Set(this.searchHistory);
        //Array.from convertit un objet en tableau
        localStorage.setItem('searchHistory',JSON.stringify(Array.from(histories)));
      }

      //Eviter l'erreur de réorienter le même chemin 避免同路径跳转同路径报错
      if (this.searchVal===this.$route.query.key) return;

      this.$router.push({
        name:'SearchItem',
        query:{
          key:this.searchVal
        }
      })
    }
  },
  mounted() {
    // L'événement d'écoute de clavier
    window.addEventListener("touchmove", this.myTouchMove, true);
    if (!localStorage.getItem('searchHistory')){
      localStorage.setItem('searchHistory','[]');
    }else{
      this.searchHistory=JSON.parse(localStorage.getItem('searchHistory'));
    }
  }
}
</script>

<style scoped lang="scss">
header{
  display: flex;
  align-items: center;
  width: 100vw;
  height: 1.173rem;
  background: #b0352f;
  color: white;
}
.back{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.2rem;
  height: 100%;

  i{
    font-size: 0.6rem;
  }
}
.search{
  position: relative;
  display: flex;
  align-items: center;
  width: 7.659rem;
  height: 0.8rem;
  color: gray;
  background: white;
  border-radius: 30px;

  input{
    position: absolute;
    right: 0;
    width: 6.6rem;
    height: 0.533rem;
    padding-right: .3rem;
    background: none;
    font-size: 0.4rem;
  }
}
.search>div{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: .1rem;
  width: 0.8rem;
  height: 100%;
}
.search>div>i{
  font-size: .45rem;
}
.go{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 0.45rem;
  font-weight: lighter;
}
</style>
