<template>
  <div>
    <ListTitle>猜你喜欢</ListTitle>
    <ul>
      <li v-for="(item,index) in productList"
      :key="index" @click="goDetail(item.name)">
        <div>
          <img v-lazy="item.imgURL">
        </div>
        <div>{{item.name}}</div>
        <div>
          <span>¥</span>
          <span class="price">{{item.price}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ListTitle from "@/components/common/Title"
export default {
  name: "GuessYouLike",
  props:{
    productList:Array
  },
  components:{
    ListTitle
  },
  methods:{
    goDetail(productName){
      this.$router.push({
        path:'/detail',
        query:{
          productName
        }
      })
    }
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  padding: .1rem;
}
li{
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  margin-bottom: 0.4rem;
  font-size: .4rem;
}
img{
  width: 4.7rem;
  height: 4.7rem;
  border-radius: 15px;
}
li div:last-child{
  color: #b0352f;
  font-size: .34rem;
}
.price{
  font-size: .5rem;
}
</style>
