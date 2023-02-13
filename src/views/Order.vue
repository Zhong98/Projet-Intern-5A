<template>
  <div class='order container'>
    <header>
      <i class='iconfont icon-fanhui' @click='$router.back()'></i>
      <span>提交订单</span>
      <i class='iconfont icon-kefu'></i>
    </header>
    <section>
      <div class='path'>
        <h3 class='path-title'>收货信息</h3>
        <div class='path-content' @click="selectAddress">
          <div>
            <span>{{address.name}}</span>
            <span>{{address.tel}}</span>
          </div>
          <div>
            <span>{{address.province}}</span>
            <span>{{address.city}}</span>
            <span>{{address.county}}</span>
            <span>{{address.addressDetail}}</span>
          </div>
        </div>
      </div>
      <div class='payment'>
        <div class='payment-title'>支付方式：</div>
        <van-radio-group v-model="radioPayment">
          <van-radio name="wx">微信支付</van-radio>
          <van-radio name="ali">支付宝支付</van-radio>
        </van-radio-group>
      </div>
      <div class='goods'>
        <ul>
          <li
              v-for='(item,index) in goodsList'
              :key='index'
          >
            <div>
              <img :src="item.product_imgURL" alt="">
            </div>
            <div class='goods-content'>
              <h4>{{item.product_name}}</h4>
              <div class='goods-total'>
                <span>¥{{item.product_price}}</span>
                <span>x{{item.product_num}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <div class='order-total'>
        <span>共</span>
        <b>{{order.order_num}}</b>
        <span>件,</span>
        <span>总金额：</span>
        <em>¥{{order.order_price}}</em>
      </div>
      <div class='order-topay' @click="submitOrder">
        提交订单
      </div>
    </footer>
  </div>
</template>

<script>
import http from '@/common/api/request.js'
import {mapState,mapGetters,mapMutations} from 'vuex'
import {RadioGroup, Radio, Toast} from 'vant';
export default{
  name:'UserOrder',
  data () {
    return {
      radioPayment:'wx',
      address:{},
      order:{},
      goodsList:[]
    }
  },
  components:{
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  },
  computed:{
    ...mapState({
      orderID:state => state.order.orderID, //Obtenir l'ID de la commande
      orderAddress:state => state.order.orderAddress //Le lieu de livraison re-sélectionné par l'utilisateur
    }),
    ...mapGetters(['defaultAddress']),
  },
  methods:{
    ...mapMutations(['initAddress']),
    selectAddress(){
      this.$router.push({
        path:'/address',
        query:{
          type:'select'
        }
      })
    },
    submitOrder(){
      if (!this.address) return Toast('请填写收货地址');

      http.$axios({
        url:'/api/updateOrder',
        method:"post",
        headers:{
          token:true
        },
        data:{
          orderID: this.orderID,
          productList:this.goodsList
        }
      }).then(res=>{
        if (res.success){
          http.$axios({
            url:'/api/alipay',
            method:'POST',
            headers:{
              token:true,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:this.order
          }).then(r=>{
            console.log(r)
            if (r.success){
              window.location.href=r.paymentUrl
            }
          })
        }
      })
    }
  },
  created() {
    this.goodsList=JSON.parse(localStorage.getItem('goodsList'));

    //Si choisir une nouvelle adresse, pas besoin de demander l'API d'adresse pour obtenir l'adresse par défaut
    if (JSON.parse(localStorage.getItem('orderAddress'))){
      this.address=JSON.parse(localStorage.getItem('orderAddress'))[0]
    }else{
      http.$axios({
        url:'/api/getAddress',
        method:"post",
        headers:{
          token:true
        }
      }).then(res=>{
        this.initAddress( res.addressList );
        //S'il existe un lieu de livraison par défaut?
        if( this.defaultAddress.length ){
          this.address = this.defaultAddress[0];
        }else{
          this.address = res.data[0];
        }
      });
    }

    http.$axios({
      url:'/api/getOrder',
      method:"post",
      data:{
        orderID:this.orderID
      }
    }).then(res=>{
      this.order=res.order
    })
  },
}
</script>

<style lang='scss' scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1.173333rem;
  color:#fff;
  background-color: #b0352f;
  i{
    padding:0 0.4rem;
    font-size:0.586666rem;
  }
  span{
    font-weight:300;
    font-size:0.48rem;
  }
}
section{
  flex: 1;
  background-color: #f7f7f7;
  .path-title{
    padding: 0.4rem;
    font-size:0.48rem;
  }
  .path-content{
    padding:0.16rem 0.4rem;
    font-size:0.42rem;
    background-color: #FFFFFF;
    span{
      padding-right:0.16rem;
    }
  }
  .payment{
    padding:0.16rem 0.4rem;
    margin-top:0.4rem;
    font-size:0.426666rem;
    background-color: #FFFFFF;
    .van-radio-group{
      display: flex;
      padding:0.16rem 0;
      .van-radio{
        padding-right:0.266666rem;
      }
    }
  }
  .goods{
    padding:0.16rem 0.4rem;
    margin-top:0.4rem;
    font-size:0.426666rem;
    background-color: #FFFFFF;
    ul{
      width: 100%;
      li{
        display: flex;
        margin-bottom: .2rem;
        width: 100%;
        img{
          width: 1.973333rem;
          height: 1.973333rem;
        }
        .goods-content{
          flex:1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-left:0.4rem;
          .goods-total{
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }

  }
}
footer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.2rem;
  border-top:1px solid #ccc;
  background: white;
  .order-total{
    font-size:0.426666rem;
    span{
      padding:0 0.16rem;
    }
    b{
      color:#b0352f;
    }
    em{
      font-size:0.48rem;
      color:#b0352f;
    }
  }
  .order-topay{
    width: 3.2rem;
    line-height: 1.2rem;
    color:#fff;
    font-size:0.426666rem;
    text-align: center;
    background-color: #b0352f;
  }

}
</style>
