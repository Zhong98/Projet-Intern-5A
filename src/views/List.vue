<template>
  <div class="container">
    <ListHeader></ListHeader>
    <section ref="section">
      <div class="list-l" ref="left">
        <ul>
          <li v-for="(item,index) in teaList" :key="index" @click="goScroll(index)"
              :class="{active:index===currentIndex}">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div ref="right">
        <div class="list-r">
          <div class="ad" ref="ad">
            <img src="/images/list/ad.jpeg">
          </div>
          <ul class="type">
            <li v-for="(item,index) in teaList" :key="index" class="product-list">
              <div>
                <span class="title">{{ item.name }}</span>
              </div>
              <ul class="products">
                <li v-for="(item1,index1) in item.data" :key="index1">
                  <img :src="item1.imgURL" @load="load">
                  <span>{{ item1.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TabBar from "@/components/common/Tabbar";
import ListHeader from "@/components/list/Header"
import http from "@/common/api/request";
import BScroll from "better-scroll";

export default {
  name: "ProductList",
  data() {
    return {
      teaList: [],
      allHeight:[],
      rightScroll:{},
      scrollY:0
    }
  },
  components: {
    ListHeader,
    TabBar
  },
  computed:{
    currentIndex(){
      return this.allHeight.findIndex((item,index)=>{
        return this.scrollY>=item && this.scrollY<this.allHeight[index+1] //返回符合这个区间的下标，给符合的index添加active
      })
    }
  },
  methods: {
    goScroll(index) {
      if (index===0){
        this.rightScroll.scrollTo(0,0,300)
      }else {
        this.rightScroll.scrollTo(0,-this.allHeight[index]-this.$refs.ad.clientHeight,300)
      }
    },
    async getData() {
      await http.$axios({
        url: '/api/list/teaList'
      }).then(res => {
        this.teaList = res
      });
      // eslint-disable-next-line vue/valid-next-tick
      await this.$nextTick(() => {
        new BScroll(this.$refs.left,{
          click:true
        });

        this.rightScroll=new BScroll(this.$refs.right, {
          movable: true,
          click: true,
          probeType:3
        });
        //获取滚动距离
        this.rightScroll.on('scroll',(pos)=>{
          this.scrollY=Math.abs(pos.y)
        })
      });
    },
    load(){
      this.rightScroll.refresh(); //better-scroll第一次加载时未计算图片高度导致滚动错误，每次图片加载完以后调用refresh方法更新高度
    }
  },
  created() {
    this.getData();
  },
  watch:{
    //监听到teaList改变时计算每部分高度
    teaList:function () {
      setTimeout(()=>{
        this.$nextTick(()=>{
          let height=0;
          this.allHeight.push(height)
          let uls=this.$refs.right.getElementsByClassName('type')[0].getElementsByClassName('product-list')
          Array.from(uls).forEach(v=>{
            height+=v.clientHeight;
            this.allHeight.push(height)
          });
        })
      },1000)
    }
  }
}
</script>

<style scoped lang="scss">
.container{
  background: white;
}
section {
  position: relative;
  display: flex;
  flex: 1;
  border-bottom: 1px solid #efefef;
  overflow: hidden;
}

.list-l {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 9;
  width: 2.48rem;
  height: 100%;
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: .4rem;
      height: .8rem;
      font-size: .38rem;
    }
  }
}

.active {
  position: relative;
  left: .2rem;
  color: #b0352f;
  transition: all;
}

.active::before {
  position: absolute;
  content: "";
  display: block;
  left: -.2rem;
  width: .1rem;
  height: 100%;
  background: #b0352f;
}

.list-r {
  flex: 1;
  margin-left: 2.48rem;
  padding: .266rem;
  border-left: 1px solid #efefef;
}

.ad {
  height: 3.42rem;
  img {
    width: 100%;
  }
}

.type > li {
  padding: .533rem 0 .267rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .48rem;
    .title {
      position: relative;
    }
  }
}

.title::before, .title::after {
  position: absolute;
  content: "";
  display: block;
  top: 50%;
  width: .6rem;
  height: .05rem;
  transform: translateY(-50%);
  background: #d9d9d9;
}

.title::before {
  left: -.8rem;
}

.title::after {
  right: -.8rem;
}

.products {
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: .267rem;
    margin: 0 .184rem;
    font-size: .34rem;

    img {
      width: 1.413rem;
    }
  }
}
</style>