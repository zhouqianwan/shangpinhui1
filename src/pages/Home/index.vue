<template>
  <div id="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <like></like>
    <!-- 通过父传子  自定义属性  将数据传到子组件中 -->
    <Floor v-for="(floor) in floorList" :key="floor.id" :list='floor'></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/list-container'
import Recommend from '@/pages/Home/today-recommend'
import Rank from '@/pages/Home/rank'
import Like from '@/pages/Home/like'
import Floor from '@/pages/Home/floor'
import Brand from '@/pages/Home/brand'
// 在vuex中导入mapstate
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MyHome',
  data() {
    return {}
  },
  methods: {
    add() {
      this.$store.dispatch('add')
    },
    subtract() {
      this.$store.dispatch('subtract')
    }
  },
  mounted() {
    // 派发action 通过vuex发起ajax请求，将FloorList数据存储在仓库中
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧的函数就会执行一次
      // 注入一个参数state,其实就是大仓库中的数据
      // categoryList:(state)=>{
      //   return state.home.categoryList;
      // },
      // 简化形式
      // 获取vuex中的categoryList中的数据
      categoryList: state => state.home.categoryList,
      // 获取vuex中的floorList数据
      floorList: state => state.home.floorList
    })
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  }
}
</script>

<style lang="less" scoped>
</style>
