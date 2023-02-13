<template>
  <div class="container">
    <LoginHeader>
      <span>找回密码</span>
    </LoginHeader>
    <section>
      <div class="tel">
        <input type="tel" v-model="userTel" placeholder="请输入手机号">
      </div>
      <div class="code">
        <input type="number" v-model="userCode" placeholder="请输入短信验证码">
        <button :disabled="disable" @click="sendCode">{{btnMsg}}</button>
      </div>
      <div class="btn" @click="goNext">下 一 步</div>
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
    sendCode(){

      if (!this.validate('userTel')) return;

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

      this.disable=true;

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
    goNext(){
      if( this.code  ==  this.userCode ){

        http.$axios({
          url:'/api/recovery',
          method:'POST',
          data:{
            phone:this.userTel
          }
        }).then(res=>{
          if( !res.success ) {
            Toast(res.msg);
            return;
          }else {
            this.$router.push({
              path:'/recoveryPwd',
              query:{
                phone:this.userTel
              }
            })
          }
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

</style>
