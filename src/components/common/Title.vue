<template>
  <h1 class="title">
    <slot>爆款推荐</slot>
  </h1>
</template>

<script>
export default {
  name: "ListTitle"
}
</script>

<style scoped>
.title{
  position: relative;
  margin: .2rem 4rem;
  width: 2rem;
  font-size: .5rem;
  text-align: center;
}
.title::before{
  left: -.5rem;
}
.title::after{
  right: -.5rem;
}
.title::before,
.title::after{
  content: "";
  position: absolute;
  width: .213rem;
  height: .213rem;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  margin-top: -.107rem;
}
</style>