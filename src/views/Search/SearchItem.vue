<template>
  <div class="container">
    <header>
      <SearchHeader></SearchHeader>
      <ul class="title">
        <li v-for="(item,index) in orderList.data" :key="index"
            @click="changeTab(index)"
        >
          <div :class=" orderList.currentIndex==index ?'active':''">{{ item.name }}</div>
          <div v-if="index!==0" class="arrow">
            <i class="iconfont icon-shangjiantou" :class="item.status===1 ?'active':''"></i>
            <i class="iconfont icon-xiajiantou" :class="item.status===2 ?'active':''"></i>
          </div>
        </li>
      </ul>
    </header>

    <section ref="wrap">
      <ul class="items" v-if="searchList.length">
        <li v-for="(items,index) in searchList" :key="index">
          <div class="item-info">
            <div>
              <img v-lazy="items.imgURL">
            </div>
            <h4>{{ items.title }}</h4>
            <div class="buy">
              <p>￥{{ items.price }}</p>
              <span>立即购买</span>
            </div>
          </div>
        </li>
      </ul>
      <h1 v-else>暂无数据...</h1>
    </section>

    <TabBar></TabBar>
  </div>
</template>

<script>
import SearchHeader from '@/components/search/Header'
import TabBar from '@/components/common/Tabbar'
import BScroll from "better-scroll";
import http from '@/common/api/request'

export default {
  name: "SearchList",
  components: {
    SearchHeader,
    TabBar
  },
  data() {
    return {
      searchList: [],
      orderList: {
        currentIndex: 0,
        data: [
          {name: '综合', key: 'total'},
          {name: '价格', status: 0, key: 'price'},
          {name: '销量', status: 0, key: 'num'}
        ]
      }
    }
  },
  computed: {
    orderBy() {
      let obj = this.orderList.data[this.orderList.currentIndex];//L'objet actuellement cliqué
      let val = obj.status === 1 ? 'ASC' : 'DESC';
      return {
        [obj.key]: val //obj.key est price ou num
      }
    }
  },
  methods: {
    async searchData() {
      if (this.orderList.currentIndex){ //Prix et ventes
        await http.$axios({
          url: '/api/search/results',
          params: {
            title: this.$route.query.key,
            ...this.orderBy //Objet converti au format price:DESC
          }
        }).then(v => {
          this.searchList = v
        })
      }else { //综合
        await http.$axios({
          url: '/api/search/results',
          params: {
            title: this.$route.query.key, //Obtenir la valeur recherchée
          }
        }).then(v => {
          this.searchList = v
        })
      }

      // eslint-disable-next-line vue/valid-next-tick
      await this.$nextTick(() => {
        new BScroll(this.$refs.wrap, {
          movable: true,
          click: true,
          zoom: true
        })
      })
    },

    changeTab(index) {
      this.orderList.currentIndex = index;
      //Obtenir le nœud cliqué
      let item = this.orderList.data[index];
      //Effacer tous les statuts qui ne font pas partie du clic en cours
      this.orderList.data.forEach((v, i) => {
        if (i !== index) {
          v.status = 0
        }
      })
      //Basculer les flèches en surbrillance
      if (item.status !== undefined) {
        item.status = item.status === 1 ? 2 : 1;
      }
      //Obtenir des données triées
      this.searchData()
    }
  },
  created() {
    this.searchData()
  },
  watch: {
    $route() {
      this.searchData()
    }
  }
}
</script>

<style scoped>
.container {
  background: none;
}

section {
  flex: 1;
  padding-top: .1rem;
  background: #f5f5f5;
  overflow: hidden;
}

.title {
  display: flex;
  justify-content: space-around;
  font-size: .5rem;
}

.title > li {
  display: flex;
}

.arrow {
  display: flex;
  flex-direction: column;
  margin-left: .1rem;
}

.arrow > i {
  font-size: .36rem;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.items > li {
  display: flex;
  flex-direction: column;
  margin-bottom: .05rem;
  width: 4.976rem;
  height: 6.628rem;
  background: white;
  font-size: .373rem;
}

.item-info {
  padding: .2rem .2rem .1rem;
}

img {
  width: 4.587rem;
}

h4 {
  margin-top: .1rem;
}

.buy {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
}

.buy > p {
  color: #b0352f;
}

.buy > span {
  padding: .1rem .2rem;
  display: inline-block;
  color: white;
  background: #b0352f;
  border-radius: 5px;
}

.active {
  color: #b0352f;
}
</style>
