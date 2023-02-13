<template>
  <div class="container">
    <header>
      <div v-show="isShow">
        <div @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <div @click="goHome">
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>

      <div class="secondHeader" v-show="!isShow" :style="{opacity:headerOpacity}">
        <i class="iconfont icon-fanhui" @click="goBack"></i>
        <span>商品详情</span>
        <i class="iconfont icon-shouye" @click="goHome"></i>
      </div>
    </header>
    <section ref="wrap">
      <div>
        <div>
          <swiper
              :modules="modules"
              :space-between="50"
              :pagination="{ type:'fraction'}"
              :autoplay="{delay: 3000}"
          >
            <swiper-slide v-for="(item,index) in swiperList" :key="index">
              <img :src="item" class="swiperImg">
            </swiper-slide>
          </swiper>
        </div>

        <div class="title">
          <h1>{{ product.title }}</h1>
          <div>{{ product.text }}</div>
        </div>

        <div class="price">
          <div class="new-price">
            <span>{{ product.price }}</span>
            <span> / 160g</span>
          </div>
          <div class="old-price">
            <span>价格:</span>
            <del>￥158</del>
          </div>
        </div>

        <div class="description">
          <h3>商品详情</h3>
          <div v-for="(item,index) in detailList" :key="index">
            <img :src="item" @load="load">
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div class="add" @click="addCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </footer>
  </div>
</template>

<script>
import {Pagination, Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import BScroll from "better-scroll";
import http from "@/common/api/request"
import {Toast} from "vant";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: {},
      swiperList: [],
      detailList: [],
      scroll: undefined,
      isShow: true,
      headerOpacity: 0,
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
  methods: {
    getData() {
      http.$axios({
        url: '/api/detail/productDetail',
        params: {
          product: this.$route.query.productName
        }
      }).then(res => {
        this.product = res[0];
        this.swiperList = this.product.swiperList.split(',')
        this.detailList = this.product.detailList.split(',')
      })
    },
    load() {
      if (this.scroll){ //Éviter de réactualiser la page Web actuelle et le défilement est vide, ce qui entraînera l'échec d'une série de méthodes telles que l'actualisation/避免重新刷新当前网页出现scroll为空从而导致refresh等一系列方法失效错误
        this.scroll.refresh()
      }else {
        this.getScroll();
        this.scroll.refresh();
      }
    },
    goBack() {
      this.$router.back()
    },
    goHome() {
      this.$router.push({
        path: '/'
      })
    },
    addCart(){
      http.$axios({
        url:'/api/addCart',
        method:'POST',
        data:{
          id:this.product.id
        },
        headers:{
          token:true
        }
      }).then(res=>{
        if (res.success){
          Toast.success(res.msg)
        }
      })
    },
    getScroll(){
      this.scroll = new BScroll(this.$refs.wrap, {
        movable: true,
        observeDOM:true,
        probeType: 3,
        click: true,
      });
      this.scroll.on('scroll', (pos) => {
        let scrollY = pos.y;
        let opacity = Math.abs(scrollY) / 300;
        this.headerOpacity = opacity >= 1 ? 1 : opacity;
        if (scrollY <= -100) { //Utiliser négatif est dû à l'effet de rebond du Better-Scroll/取负数是因为better-scroll回弹效果，可以往上滚一段距离，往上滚为正数，若取绝对值，往上滚会造成secondHeader出现
          this.isShow = false;
        } else {
          this.isShow = true;
        }
      })
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.getScroll();
  },
  activated() {
    let product = this.$route.query.productName;
    if (product !== this.product.title) { //S'il ne s'agit pas du même produit, envoyez une requête/若不是相同商品，则发送请求
      this.getData();
    }
  }
}
</script>

<style scoped lang="scss">
section {
  flex: 1;
  overflow: hidden;
}

header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  height: 1.173rem;

  div {
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: .133rem;
      width: .907rem;
      height: .907rem;
      color: white;
      background: rgba(0, 0, 0, .3);
      border-radius: 50%;
    }
  }
}

.secondHeader {
  display: flex;
  align-items: center;
  padding: 0 .4rem;
  height: 100%;
  background: white;
  font-size: .4rem;

  i {
    font-size: .5rem;
  }
}

::v-deep .swiper-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .053rem;
  width: .46rem;
  height: .46rem;
  color: white;
  font-size: .26rem;
  background: rgba(0, 0, 0, .3);
  border-radius: 2px;
}

::v-deep .swiper-horizontal > .swiper-pagination-fraction {
  left: 9.2rem;
}

.swiper-slide {
  width: 10rem;
  height: 10rem;

  img {
    width: 100%;
    height: 100%;
  }
}

.title {
  padding: .3rem;
  background: white;

  h1 {
    font-size: .48rem;
  }

  div {
    padding-top: .1rem;
    font-size: .373rem;
    color: #999999;
  }
}

.price {
  padding: 0 .3rem .3rem;
  background: white;

  .new-price {
    padding-top: .3rem;
    border-top: 1px solid #E3E5E9;

    span:nth-child(1) {
      font-size: .75rem;
      color: #D22531;
    }

    span:nth-child(1)::before {
      content: '￥';
      display: inline-block;
      font-size: .42rem;
      text-indent: 0;
    }

    span:nth-child(2) {
      font-size: .4rem;
      color: #949494;
    }
  }

  .old-price {
    padding-top: .2rem;
    font-size: .35rem;
    color: #999999;
  }
}

.description {
  margin-top: .267rem;
  padding: .267rem;
  background: white;

  h3 {
    position: relative;
    left: .6rem;
    font-size: .4rem;
    display: inline-block;
  }

  h3::before {
    position: absolute;
    content: "";
    display: block;
    top: 50%;
    left: -.3rem;
    width: .1rem;
    height: 70%;
    transform: translateY(-40%);
    background: #DD2727;
  }

  div img {
    padding-top: .267rem;
    width: 100%;
  }
}

footer {
  display: flex;
  padding-top: 1px;
  height: 1.307rem;
  font-size: .5rem;
  color: white;
  border-top: 1px solid #E3E5E9;

  .buy, .add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }

  .buy {
    background: #DD2727;
  }

  .add {
    background: #FF9500;
  }
}

</style>
