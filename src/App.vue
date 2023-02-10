<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
import Header from '@/components/Header'
export default {
  name: 'app',
  components: {
    Footer,
    Header
  },
  mounted() {
    // 放在app中只会执行一次，性能优化
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped>
</style>
