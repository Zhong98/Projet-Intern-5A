<template>
  <div v-if="payStatus">支付成功</div>
  <div v-else>支付失败</div>
</template>

<script>
import http from '@/common/api/request.js'
export default {
  name: "PaymentResult",
  data () {
    return {
      payStatus : false
    }
  },
  methods:{
    getData(){
      let orderData={
        out_trade_no:this.$route.query.out_trade_no,
        trade_no:this.$route.query.trade_no
      }
      http.$axios({
        url:'/api/payResult',
        method:'POST',
        headers:{
          token:true,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:orderData
      }).then(res=>{
        if( res.code == 2 ){
          this.payStatus = true;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
