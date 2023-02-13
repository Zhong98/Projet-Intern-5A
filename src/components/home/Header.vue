<template>
  <header>
    <h3 class="name">茶七网</h3>
    <div class="search">
      <i class="iconfont icon-sousuo"></i>
      <span @click="goSearch">搜您喜欢的...</span>
    </div>
    <div class="assistant">
      <i class="iconfont icon-kefu"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "MyHeader",
  methods:{
    goSearch(){
      this.$router.push('/search');
    }
  }
}
</script>

<style scoped lang="scss">
header{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.2rem;
  background:#b0352f;
}
.name{
  color: white;
  font-size: .6rem;
}
.search{
  display: flex;
  align-items: center;
  padding-left: .2rem;
  width: 6.5rem;
  height: .8rem;
  background: white;
  color: gray;
  border-radius: 24px;

  span{
    padding-left: .1rem;
    font-size: .4rem;
  }
}
.assistant{
  display: flex;
  align-items: center;
  padding-right: .1rem;
  color: white;
  i{
    font-size: .64rem;
  }
}
</style>