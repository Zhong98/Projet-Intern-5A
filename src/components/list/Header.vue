<template>
  <header>
    <div class="back" @click="goBack">
      <i class="iconfont icon-fanhui"></i>
    </div>
    <div class="search-container">
      <form class="search" @keyup.enter="goSearch" onsubmit="return false"><!--keyup.xxx 键盘按下哪个键事件-->
        <i class="iconfont icon-sousuo"></i>
        <input type="search" placeholder="搜索您喜欢的..." v-model="searchVal">
      </form>
    </div>
    <div class="home">
      <i class="iconfont icon-shouye"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "ListHeader"
}
</script>

<style scoped lang="scss">
header{
  display: flex;
  width: 100vw;
  height: 1.173rem;
  background: #b0352f;
}
.back,.home{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.173rem;
  height: 100%;
  color: white;
  i{
    font-size: .65rem;
  }
}
.search-container{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search{
  height: .8rem;
  background: white;
  border-radius: 20px;
  i{
    padding-left:.3rem;
  }
  input{
    padding-left: .15rem;
    padding-right: .15rem;
    width: 6.72rem;
    height: .534rem;
    background: none;
    border: none;
    outline: none;
    font-size: .5rem;
    line-height: .534rem;
  }
}
</style>