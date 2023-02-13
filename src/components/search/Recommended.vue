<template>
  <ul>
    <li v-for="(item,index) in products" :key="index">
      <div class="product">
        <div>
          <img v-lazy="item.imgURL">
          <span class="tip">{{item.tip}}</span>
        </div>
        <h4 class="text">{{item.text}}</h4>
        <h4 class="price">{{item.price}}元</h4>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SearchRecommended",
  props:{
    products: Array
  }
}
</script>

<style scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
li{
  margin-bottom: 0.2rem;
  width: 4.989rem;
  height: 6.995rem;
  background: white;
}
.product{
  padding: .3rem;
}
.product>div{
  position: relative;
}
img{
  width: 100%;
}
.tip{
  position: absolute;
  left: -.3rem;
  right: -.3rem;
  bottom: 0;
  padding: .1rem .3rem;
  font-size: .32rem;
  background: rgba(0,0,0,0.4);
  color: white;
}
.text{
  padding: .15rem 0;
  height: .9rem;
  font-size: .373rem;
}
.price{
  color: #ff6600;
  font-size: .48rem;
}
</style>