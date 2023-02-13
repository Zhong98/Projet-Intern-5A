<template>
  <div class="container">
    <LoginHeader></LoginHeader>
    <section>
      <div class="tel">
        <input type="tel" v-model="userTel" placeholder="请输入手机号">
      </div>
      <div class="code">
        <input type="password" v-model="userPwd" placeholder="请输入密码">
      </div>
      <div class="btn" @click="login">登 录</div>
      <div class="others">
        <div @click="goLogin">
          <i class="iconfont icon-mima"></i>
          <span>短信登录</span>
        </div>
        <div @click="goRecovery">
          <span>找回密码</span>
        </div>
        <div @click="goRegister">
          <i class="iconfont icon-shouji"></i>
          <span>快速注册</span>
        </div>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/Tabbar";
import LoginHeader from "@/components/login/Header"
import {Toast} from "vant";
import http from "@/common/api/request"
import {mapMutations} from "vuex"

export default {
  name: "PasswordLogin",
  data(){
    return{
      userTel:'',
      userPwd:'',
      rules:{
        userTel:{
          rule:/^1[23456789]\d{9}$/,
          msg:'手机号不能为空，且必须是11位数字'
        },
        userPwd:{
          rule:/^\w{6,12}$/,
          msg:'密码需要6-12位'
        }
      }
    }
  },
  components: {
    TabBar,
    LoginHeader
  },
  methods:{
    ...mapMutations(['saveUser']),
    login(){
      //Expression régulière
      if (!this.validate('userTel')) return;
      if (!this.validate('userPwd')) return;
      //Requête avec numéro de mobile et mot de passe
      http.$axios({
        url:'/api/login',
        method:'POST',
        data:{
          userTel:this.userTel,
          userPwd:this.userPwd
        }
      }).then(res=>{
        Toast(res.msg);
        //Utiliser la mutation pour stocker les données utilisateur dans vuex
        if (res.success){
          this.saveUser(res.userInfo);
          setTimeout(()=>{
            this.$router.push('/my')
          },1000)
        }
      })
    },
    goLogin(){
      this.$router.push('/login')
    },
    validate(key){
      let bool=true;
      if (!this.rules[key].rule.test(this[key])){ //Si pas validé par l'expression régulière
        Toast(this.rules[key].msg);
        bool=false;
        return false
      }
      return bool;
    },
    goRegister(){
      this.$router.push('/register')
    },
    goRecovery(){
      this.$router.push('/recovery')
    }
  }
}
</script>

<style scoped lang="scss">

section {
  flex: 1;
  margin: 0.533rem 0.533rem 0;
}

input {
  padding: 0 0.2rem;
  height: 1.173rem;
  font-size: 0.373rem;
  background: none;
}

.tel, .code {
  margin-top: .5rem;
  background: white;
  border: 1px solid #999999;
  border-radius: 5px;
  input{
    width: 95%;
  }
}

.btn{
  margin-top: .5rem;
  height: 1.173rem;
  font-size: .5rem;
  color: white;
  background: #ae3933;
  border-radius: 5px;
  text-align: center;
  line-height: 1.173rem;
}
.others{
  display: flex;
  justify-content: space-between;
  margin-top: .5rem;
  font-size: 0.427rem;
  span{
    padding-left: .2rem;
  }
}

</style>
