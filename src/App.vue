<template>
  <router-view v-slot="{Component}">
    <keep-alive :include="keep">
      <component class="view" v-if="this.$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
    </keep-alive>
    <component :is="Component" v-if="!this.$route.meta.keepAlive" />
  </router-view>
</template>

<script>
export default {
  created() {
    this.$store.commit('initUser')
  }
}
</script>
<style>
</style>
