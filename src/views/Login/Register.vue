<template>
  <div class="login">
    <LoginHeader>
      <span>注册</span>
    </LoginHeader>
    <section>
      <div class="tel">
        <input type="tel" v-model="userTel" placeholder="请输入手机号">
      </div>
      <div class="code">
        <input type="number" v-model="userCode" placeholder="请输入短信验证码">
        <button :disabled="disable" @click="sendCode">{{btnMsg}}</button>
      </div>
      <div class="tel">
        <input type="text" v-model="userPwd" placeholder="请输入密码">
      </div>
      <div class="btn" @click="register">注 册</div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/Tabbar";
import LoginHeader from "@/components/login/Header"
import {Toast} from "vant";
import http from "@/common/api/request";
export default {
  name: "UserLogin",
  data(){
    return{
      userTel:'',
      userCode:'',
      userPwd:'',
      btnMsg:'获取短信验证码',
      disable:false,
      time:60,
      rules:{
        userTel:{
          rule:/^1[23456789]\d{9}$/,
          msg:'手机号不能为空，且必须是11位数字'
        },
        userPwd:{
          rule:/^\w{6,12}$/,
          msg:'密码需要6-12位'
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
    sendCode(){
      //Vérification
      if (!this.validate('userTel')) return;

      //Envoyer une requête au backend pour envoyer un SMS avec un code de vérification
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
      //Déactiver le bouton
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
    validate(key){
      let bool=true;
      if (!this.rules[key].rule.test(this[key])){
        Toast(this.rules[key].msg);
        bool=false;
        return false
      }
      return bool;
    },
    register(){
      if( this.code  ==  this.userCode ){
        //Le mot de passe défini par l'utilisateur est-il conforme ?
        if (!this.validate('userPwd')) return;
        //Vérifier le code de vérification saisi par l'utilisateur
        http.$axios({
          url:'/api/register',
          method:'POST',
          data:{
            phone:this.userTel,
            pwd:this.userPwd
          }
        }).then(res=>{
          Toast(res.msg);
          if( !res.success ) return;
          setTimeout(()=>{
            this.$router.push('/userLogin')
          },3000)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #f5f5f5;
}

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

</style>
