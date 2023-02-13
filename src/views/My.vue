<template>
  <div class="container">
    <header>
      <div class="login" @click="goLogin" v-show="!loginStatus"> 登录 / 注册</div>
      <div class="user" v-show="loginStatus">
        <img :src="userInfo.imgURL">
        <p>{{ userInfo.nickname }}</p>
      </div>
    </header>
    <section>
      <div>
        <h1>个人中心</h1>
        <ul>
          <li @click="goAddress">
            <i class="iconfont icon-dizhi"></i>
            <span>地址管理</span>
            <i class="iconfont icon-xiangyoujiantou"></i>
          </li>
          <li @click="goOrder">
            <i class="iconfont icon-31dingdan"></i>
            <span>订单管理</span>
            <i class="iconfont icon-xiangyoujiantou"></i>
          </li>
          <li v-show="loginStatus" @click="loginOut">
            <span>退出登录</span>
          </li>
        </ul>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/Tabbar";
import {mapState, mapMutations} from 'vuex'

export default {
  name: "MyInfos",
  components: {
    TabBar
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      loginStatus: state => state.user.loginStatus
    })
  },
  methods: {
    ...mapMutations(['loginOut']),
    goLogin() {
      this.$router.push('/login')
    },
    goAddress(){
      this.$router.push('/address')
    }
  }
}
</script>

<style scoped lang="scss">

header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.173rem;
  background: #b2504d;
  font-size: 0.4rem;
  color: white;

  .login {
    padding: 0.133rem 0.533rem;
    background: rgba(255, 181, 0, 0.9);
    border-radius: 5px;
    display: inline-block;
  }

  .user {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: .6rem;

    img {
      margin-bottom: .2rem;
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
    }
  }
}

section {
  flex: 1;
  background: #f5f5f5;

  div {
    background: white;
    padding: 0 0.32rem;

    h1 {
      display: flex;
      align-items: center;
      height: 1.173rem;
      font-size: 0.4rem;
      color: #9E9E9E;
    }

    ul {
      li {
        position: relative;
        display: flex;
        align-items: center;
        height: 1.173rem;
        border-top: 1px solid #e3e5e9;

        .icon-dizhi, .icon-31dingdan{
          padding-right: 0.32rem;
          font-size: .5rem;
          color: #FF4B4B;
        }
        .icon-31dingdan{
          color: #00B7FF;
        }
        span {
          font-size: 0.373rem;
        }

        .icon-xiangyoujiantou {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
