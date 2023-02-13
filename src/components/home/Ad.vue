<template>
  <div v-for="(item,index) in tgy"
       :key="index"
  >
    <img :src="item.imgURL">
  </div>
</template>

<script>
export default {
  name: "TeaAd",
  props:{
    tgy:Array
  }
}
</script>

<style scoped>
img{
  width: 100%;
  height: 3.333rem;
}
</style>