<template>
  <div class="container">
    <LoginHeader></LoginHeader>
    <section>
      <div class="tel">
        <input type="tel" v-model="userTel" placeholder="请输入手机号">
      </div>
      <div class="code">
        <input type="number" v-model="userCode" placeholder="请输入短信验证码">
        <button :disabled="disable" @click="sendCode">{{btnMsg}}</button>
      </div>
      <div class="btn" @click="login">登 录</div>
      <div class="others">
        <div @click="goUserLogin">
          <i class="iconfont icon-mima"></i>
          <span>密码登录</span>
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
import http from "@/common/api/request";
import {mapMutations} from "vuex"

export default {
  name: "UserLogin",
  data(){
    return{
      userTel:'',
      userCode:'',
      btnMsg:'获取短信验证码',
      disable:false,
      time:60,
      rules:{
        userTel:{
          rule:/^1[23456789]\d{9}$/,
          msg:'手机号不能为空，且必须是11位数字'
        }
      },
      code:''
    }
  },
  components: {
    TabBar,
    LoginHeader
  },
  methods:{
    ...mapMutations(['saveUser']),
    sendCode(){
      //Vérification
      if (!this.validate('userTel')) return;

      //Envoyer le SMS avec un code de vérification
      http.$axios({
        method:'POST',
        url:'/api/smscode',
        data:{
          phone:this.userTel
        }
      }).then(res=>{
        if( res.success ){
          this.code = res.data;
        }
      })
      //Désactiver le bouton
      this.disable=true;
      //Compte à rebours
      let timer=setInterval(()=>{
        --this.time;
        this.btnMsg=`重新发送 ${this.time}`
      },1000)
      setTimeout(()=>{
        clearInterval(timer);
        this.time=60;
        this.btnMsg='获取短信验证码'
      },60000)
    },
    goUserLogin(){
      this.$router.push('/userLogin')
    },
    goRegister(){
      this.$router.push('/register')
    },
    validate(key){
      let bool=true;
      if (!this.rules[key].rule.test(this[key])){ //Pas validé par l'expression régulière
        Toast(this.rules[key].msg);
        bool=false;
        return false
      }
      return bool;
    },
    login(){
      if( this.code  ==  this.userCode ){
        //Vérification le code saisi par l'utilisateur
        //Envoyer la requête
        http.$axios({
          url:'/api/addUser',
          method:'POST',
          data:{
            phone:this.userTel
          }
        }).then(res=>{
          if( !res.success ) return;
          console.log()
          this.saveUser(res.userInfo);
          setTimeout(()=>{
            this.$router.push('/my')
          },1000)
        })
      }
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
}
.tel input{
  width: 95%;
}
.code{
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 35%;
    height: 1.173rem;
    color: white;
    font-size: 0.386rem;
    background: #ae3933;
    display: inline-block;
    text-align: center;
    line-height: 1.173rem;
    border: none;
    border-radius: 5px;
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
