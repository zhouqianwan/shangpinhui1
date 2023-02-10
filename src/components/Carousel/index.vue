<template>
  <div>
    <div class="swiper-container" id="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carousel) in list" :key=carousel.id>
          <img :src="carousel.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  // 使用自定义属性，谁使用这个轮播图，就让那个父组件将轮播图的数据传进来
  props: ['list'],
  watch: {
    // 监听bannerList的数据变化，由空数组变成数组中有数据
    floorList: {
      immediate: true,
      handler(newValue, oldValue) {
        // 如果执行handler说明，组件上的数据已经存在
        // 但是，光数据存在还不行，还有确定v-for循环的结构已经完成才行
        // nextTick:下次DOM更新 循环结束之后 执行延迟回调 在修改数据之后 立即使用这个方法 获取更新后的DOM
        this.$nextTick(() => {
          Swiper.use([Navigation])
          var mySwiper = new Swiper('.swiper-container', {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
