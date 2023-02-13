<template>
  <header>
    <i class="iconfont icon-fanhui" @click="goBack"></i>
    <span>
      <slot>登录</slot>
    </span>
    <i class="iconfont icon-shouye" @click="goHome"></i>
  </header>
</template>

<script>
export default {
  name: "LoginHeader",
  methods: {
    goBack() {
      this.$router.back();
    },
    goHome(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .4rem;
  height: 1.173rem;
  background: #ae3933;
  color: white;
  font-size: 0.427rem;

  i {
    position: absolute;
    font-size: 0.48rem;
  }

  .icon-fanhui {
    left: .4rem;
  }

  .icon-shouye {
    right: .4rem;
  }
}
</style>