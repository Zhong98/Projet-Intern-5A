<template>
  <div class="container">
    <LoginHeader>
      <span>找回密码</span>
    </LoginHeader>
    <section>
      <div class="tel">
        <input type="text" v-model="userPwd" placeholder="请输入新的密码">
      </div>
      <div class="btn" @click="recovery">确 定</div>
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
  data() {
    return {
      userPwd: '',
      rules: {
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: '密码需要6-12位'
        }
      },
      code: ''
    }
  },
  components: {
    TabBar,
    LoginHeader
  },
  methods: {
    validate(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        Toast(this.rules[key].msg);
        bool = false;
        return false
      }
      return bool;
    },
    recovery() {
      if (!this.validate('userPwd')) return;
      http.$axios({
        url: '/api/recovery',
        method: 'POST',
        data: {
          phone: this.userTel,
          pwd: this.userPwd
        }
      }).then(res => {
        Toast(res.msg);
        if (!res.success) return;
        setTimeout(()=>{
          this.$router.push({
            path: '/login',
            query: {
              phone: this.userTel
            }
          })
        },3000)
      })
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

.tel {
  margin-top: .5rem;
  background: white;
  border: 1px solid #999999;
  border-radius: 5px;
}

.tel input {
  width: 95%;
}

.btn {
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
