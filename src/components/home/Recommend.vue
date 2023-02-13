<template>
  <div class="recommend">
    <ListTitle></ListTitle>
    <ul>
      <li v-for="(item,index) in recommendList"
      :key="index">
        <div>
          <img v-lazy="item.imgURL">
        </div>
        <div class="info">
          <div class="product">{{item.name}}</div>
          <div class="description">{{item.text}}</div>
          <div class="price">
            <span>¥</span>
            <span>{{item.price}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ListTitle from '@/components/common/Title'
export default {
  name: "HomeRecommend",
  props:{
    recommendList:Array
  },
  components:{
    ListTitle
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-direction: column;
  align-items: center;
}
li{
  position: relative;
  margin-bottom: 0.2rem;
}
.info{
  position: absolute;
  z-index: 2;
  right: 0.4rem;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 4.8rem;
  text-align: right;
}
.product{
  font-size: .34rem;
  color: gray;
}
.description{
  font-size: .4rem;
}
.price{
  margin-top: 0.44rem;
  font-size: .5rem;
  color: #b0352f;
}
.price span:first-child{
  margin-right: 0.107rem;
  font-size: .34rem;
}
img{
  position: relative;
  z-index: 1;
  width: 9.6rem;
  height: 3.84rem;
  border-radius: 15px;
}
</style>