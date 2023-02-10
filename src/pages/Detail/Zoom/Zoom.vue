<template>
  <div class="spec-preview">
    <!-- 空对象.属性最多是undefined至少不会报错 -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" ref="big">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  data() {
    return {
      currentIndex: 0
    }
  },
  // 接收传递过来的数据。他至少是个空数组
  props: ['skuImageList'],
  mounted() {
    // 全局事件总线，获取兄弟组件传递过来的索引值
    this.$bus.$on('getCurrentIndex', index => {
      this.currentIndex = index
    })
  },
  methods: {
    // 放大镜效果
    handler(event) {
      // 获取遮罩层
      let mask = this.$refs.mask
      let big = this.$refs.big
      let bigImg = this.$refs.bigImg
      // 计算出遮罩左侧距离盒子左侧的大小
      let left = event.offsetX - mask.offsetWidth / 2
      let top = event.offsetY - mask.offsetHeight / 2

      // 约束范围
      if (left <= 0) left = 0
      if (top < 0) top = 0
      if (left > big.offsetWidth - mask.offsetWidth) {
        left = big.offsetWidth - mask.offsetWidth
      }
      if (top > big.offsetHeight - mask.offsetHeight) {
        top = big.offsetHeight - mask.offsetHeight
      }
      // 修改元素的left 和 top值
      mask.style.left = left + 'px'
      mask.style.top = top + 'px'
      // 设置右边放大镜的left值和top值
      bigImg.style.left = -2 * left + 'px'
      bigImg.style.top = -2 * top + 'px'
    }
  },
  computed: {
    // 如果数据没有返回，skuImageList就是空数组
    // 空数组的第零项就是undefined  undefined.imgUrl   报错
    // 通过计算属性  如果他返回的是空数组 就让他的第X项至少是一个空对象
    imgObj() {
      return this.skuImageList[this.currentIndex] || {}
    }
  }
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>