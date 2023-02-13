<template>
  <div class='path-index container'>
    <Header></Header>
    <section>
      <ul v-if="addressList.length">
        <li v-for="(item,index) in addressList" :key="index" @click="editAddress(item.id)">
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.tel }}</span>
          </div>
          <div>
            <span class='active' v-if="item.isDefault">[默认]</span>
            <span>{{ item.province }} {{ item.city }} {{ item.country }} {{ item.addressDetail }} </span>
          </div>
        </li>
      </ul>
      <h1 v-else>暂无地址，请添加</h1>
      <div class='add-path' @click="addAddress">添加地址</div>
    </section>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/address/Header.vue'
import TabBar from '@/components/common/Tabbar.vue'
import http from "@/common/api/request"
import {mapState, mapMutations} from "vuex";

export default {
  computed: {
    ...mapState({
      addressList: state => state.address.list
    })
  },
  components: {
    Header,
    TabBar
  },
  methods: {
    ...mapMutations(['initAddress']),
    addAddress() {
      this.$router.push('/addOrEdit')
    },
    editAddress(addressId){
      if (this.$route.query.type==='select'){ //Détecter s'il s'agit d'une réorientation depuis la page de payement, si c'est le cas, l'action est 'Choisir'
        let orderAddress=this.addressList.filter(v=>{
          return v.id===addressId
        })
        localStorage.setItem('orderAddress',JSON.stringify(orderAddress)) //Enregistrer l'adresse sélectionnée dans le stockage local
        this.$router.back()
      }
      this.$router.push({
        path:'/addOrEdit',
        query:{
          id:addressId //S'il s'agit d'une modification, il faut transmettre l'identifiant de l'adresse
        }
      })
    }
  },
  created() {
    http.$axios({
      url: '/api/getAddress',
      method: 'POST',
      headers: {
        token: true
      }
    }).then(res => {
      this.initAddress(res.addressList)
    })
  }
}
</script>

<style lang='scss' scoped>
section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F7F7F7;

  ul {
    width: 100%;

    li {
      padding: 0.266666rem 0.4rem;
      margin: 0.16rem 0;
      background-color: #FFFFFF;

      span {
        padding-right: 0.4rem;
        font-size: 0.426666rem;
      }

      .active {
        color: #b0352f;
      }
    }
  }

  .add-path {
    margin-top: 0.8rem;
    width: 3.2rem;
    line-height: 1.066666rem;
    font-size: 0.48rem;
    text-align: center;
    color: #FFFFFF;
    background-color: #b0352f;
    border-radius: 6px;
  }
}

::v-deep .tabbar {
  border-top: 2px solid #ccc;
}
</style>
