<template>
  <div class='cart container'>
    <header>
      <i class='iconfont icon-fanhui' @click="goBack"></i>
      <span>购物车</span>
      <span @click="changeNav" v-text="hasClickedNav?'完成':'编辑'"></span>
    </header>
    <section v-if="productList.length">
      <div class='cart-title'>
        <van-checkbox @click="checkedAllFn" checked-color="#B0352F" :checked="isCheckedAll"></van-checkbox>
        <span>商品</span>
      </div>
      <ul>
        <li v-for="(item,index) in productList" :key="index">
          <div class='check'>
            <van-checkbox @click="checkItem(index)" v-model="item.checked" checked-color="#B0352F"></van-checkbox>
          </div>
          <h2>
            <img :src="item.product_imgURL" alt="">
          </h2>
          <div class='goods'>
            <div class='goods-title'>
              <span>{{ item.product_name }}</span>
              <i class='iconfont icon-lajitong' @click="deleteFn(item.id)"></i>
            </div>
            <div class='goods-price'>¥{{ item.product_price }}</div>
            <van-stepper @change="changeNum($event,item.id)" v-model="item.product_num" integer/>
          </div>
        </li>
      </ul>
    </section>
    <section v-else>
      暂无数据，请添加商品到购物车
    </section>
    <footer v-if="productList.length">
      <div class='radio'>
        <van-checkbox @click="checkedAllFn" checked-color="#B0352F" :checked="hasChecked"></van-checkbox>
      </div>
      <div class='total' v-if="!hasClickedNav">
        <div>
          共有
          <span class='total-active'>{{ total.num }}</span>
          件商品
        </div>
        <div>
          <span>总计：</span>
          <span class='total-active'>¥{{ total.price }} + 0茶币</span>
        </div>
      </div>
      <div class='order' v-if="hasClickedNav" @click="deleteFn(selectList)">删除</div>
      <div class='order' v-else @click="goOrder">去结算</div>
    </footer>
  </div>
</template>

<script>
import http from "@/common/api/request"
import {Checkbox, Stepper, Toast} from 'vant';
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";

export default {
  name: "TeaCart",
  data() {
    return {
      hasClickedNav: false,
      product_names:''
    }
  },
  computed: {
    ...mapState({
      productList: state => state.cart.list,
      selectList: state => state.cart.selectList,
      loginStatus: state => state.user.loginStatus
    }),
    ...mapGetters(['isCheckedAll', 'hasChecked','total']),
    orderList(){
      return this.selectList.map(id=>{
        return this.productList.find(v=>v.id == id);
      })
    }
  },
  components: {
    [Checkbox.name]: Checkbox,
    [Stepper.name]: Stepper,
  },
  methods: {
    ...mapMutations(['getCartProducts', 'checkItem','clearCart','initOrder']),
    ...mapActions(['checkedAllFn','deleteFn']),
    goBack() {
      this.$router.push('/')
    },
    changeNav() {
      this.hasClickedNav = !this.hasClickedNav
    },
    //Metter à jour la quantité de l'article et transmetter-la au backend
    changeNum(value,detail){ //value est la quantité，detail est l'identité du produit
      http.$axios({
        url:'/api/updateCartNum',
        method:'POST',
        headers:{
          token: true
        },
        data:{
          num:value,
          id:detail
        }
      })
    },
    goOrder(){
      if (this.loginStatus){
        if (this.selectList.length){
          //Après avoir cliqué pour passer à la caisse, le produit sélectionné sera ajouté au stockage local
          localStorage.setItem('goodsList',JSON.stringify(this.orderList))
          this.product_names='';
          this.orderList.forEach(v=>{
            this.product_names+=v.product_name+' '
          });
          http.$axios({
            url:'/api/createOrder',
            method:'POST',
            headers:{
              token:true
            },
            data:{
              products:this.product_names,
              orderPrice:this.total.price,
              orderNum:this.total.num
            }
          }).then(res=>{
            this.initOrder(res.orderID)
            this.$router.push('/order')
          })
        }else{
          Toast('请至少选择一项商品')
        }
      }else {
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.clearCart(); //Effacer les données à chaque fois que entrer dans la page du panier pour éviter les erreurs de superposition de données telles que le prix total/每次进入cart页面先清空数据，避免造成总价等数据叠加错误
    if (this.loginStatus) { //Non connecté ne pas envoyer de requête
      http.$axios({
        url: '/api/getCart',
        method: 'POST',
        headers: {
          token: true
        }
      }).then(res => {
        res.cartInfo.forEach(v => {
          v['checked'] = true
        });
        this.getCartProducts(res.cartInfo);
      })
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  background: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.173333rem;
  color: #fff;
  background-color: #b0352f;

  i {
    padding: 0 0.4rem;
    font-size: 0.586666rem;
  }

  span {
    padding: 0 0.4rem;
    font-size: 0.426666rem;
  }
}

section {
  flex: 1;
  background-color: #f5f5f5;
  overflow: scroll;

  .cart-title {
    display: flex;
    padding: 0.533333rem;

    span {
      padding: 0 0.4rem;
      font-weight: 500;
      font-size: 0.48rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.16rem 0.533333rem;
      margin: 0.213333rem 0;
      background-color: #fff;

      .check {
        padding-right: 0.373333rem;
      }

      .goods {
        display: flex;
        flex-direction: column;
        padding-left: .4rem;
        font-size: 0.32rem;

        .goods-title {
          display: flex;

          i {
            font-size: 0.586666rem;
          }
        }

        .goods-price {
          padding: 0.08rem 0;
          color: #b0352f;
        }

        ::v-deep .van-stepper {
          text-align: right;
        }
      }

      img {
        width: 1.973333rem;
        height: 1.973333rem;
      }
    }
  }
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.28rem;
  border-top: 0.053333rem solid #ccc;

  .radio {
    padding: 0 0.4rem;
  }

  .total {
    flex: 1;
    font-size: 0.32rem;

    .total-active {
      color: #b0352f;
    }
  }

  .order {
    width: 3.2rem;
    line-height: 1.28rem;
    color: #fff;
    text-align: center;
    font-size: 0.426666rem;
    background-color: #b0352f;
  }
}
</style>
