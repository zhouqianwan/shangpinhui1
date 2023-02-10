<template>
  <div class="pagination">
    <!-- 当，当前页码是第一页的时候，上一页是不能点击的  -->
    <!-- 其余的时候，通过子传父，自定义事件，将上一页的pageNo传递给父组件 -->
    <!-- 点击上一页，将 -->
    <button :disabled="this.pageNo==1" @click="getPageNo(pageNo-1)">上一页</button>
    <button v-if=" startNumAndEndNum.start>1" @click="getPageNo(1)">1</button>
    <button v-if="startNumAndEndNum.start>2">···</button>

    <!-- v-for也能遍历数字，将连续页数，动态展示 （从第一页遍历到连续页数的end）-->
    <!-- v-if,将start前面的不显示 -->
    <!-- 点击事件，子传父 自定义事件，将点击的page页码传过去 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="getPageNo(page)" :class="{active:pageNo == page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<=totalPage-2" :disabled="pageNo==totalPage">···</button>
    <button v-if="startNumAndEndNum.end<=totalPage-1" @click="getPageNo(totalPage)">{{ totalPage }}</button>
    <button @click="getPageNo(pageNo+1)" :disabled="pageNo == totalPage">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  // 接受父组件传递过来的数据
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  mounted() {},
  computed: {
    // 通过计算属性，计算出一共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    // 计算出，连续页码数的起始页码和结束页码
    startNumAndEndNum() {
      // 将变量引入，方便书写，不用每个再加this
      const { continues, total, pageSize, totalPage, pageNo } = this
      // 定义两个变量存储起始数字和结束数字
      let start = 0,
        end = 0
      // 不正常的现象
      // 问题1、总页数小于连续页码数（总页数3，连续页码数是5）
      if (continues > totalPage) {
        start = 1
        end = totalPage
      } else {
        // 正常现象，总页数大于连续页码数  parseInt向下取整
        start = pageNo - parseInt(continues / 2)

        // 结束数字
        end = pageNo + parseInt(continues / 2)
        // 在总页数大于连续页码数的情况下
        // 问题2、当前页码数是1，start会出现负数的现象
        // 解决，如果当前页码数小于2，直接让start=1,end = continues
        if (start < 1) {
          start = 1
          end = continues
        }
        // 问题3、end的数字，大于总页数
        if (end > totalPage) {
          end = totalPage
          start = totalPage - continues + 1
        }
      }
      return { start, end }
    }
  },
  methods: {
    getPageNo(page) {
      this.$emit('getPageNo', page)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
