<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派，当鼠标移出这两个之后再执行，leaveIndex事件 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 事件委派，将点击事件委派到他的父元素上 -->

        <!-- 添加过渡动画效果，含有v-if或v-show的指令的才能有过渡动画效果 -->
        <transition name="sort">
          <div class="sort" @click="goSearch" v-show='show'>
            <div class="all-sort-list2">
              <!-- v-for进行遍历categoryList -->
              <!-- 定义一个动态的类  如果cur后面的js表达式 符合条件就给他加上cur类  相当于cur==true  -->
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                <!-- 定义鼠标移入事件 -->
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 用自定义属性的形式，动态获取当前元素的categoryId -->
                  <a href="" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }} </a>
                </h3>
                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                  <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c1.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c1.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入lodash
import _ from 'lodash'
export default {
  name: '',
  data() {
    return {
      // 定义变量，用户鼠标移上那一个一级分类、
      currentIndex: -1,
      show: true
    }
  },
  methods: {
    // throttle回调函数别用箭头函数，可能会出现上下文不一致的问题
    changeIndex: _.throttle(function (index) {
      // 把鼠标放上去的index的值 赋值给currentIndex
      this.currentIndex = index
    }, 30),
    leaveIndex() {
      // 只有是search组件的时候才能执行
      if (this.$route.path != '/home') {
        this.show = false
      }
      this.currentIndex = '-1'
    },
    // goSearch,点击分类列表中的标签，跳转到Search页面，并进行参数传递
    goSearch(e) {
      // 最好的解决方法：编程式导航+事件委派
      // 但是存在问题：事件委派是把所有的子节点的事件委派给父亲节点
      // question1:点击a标签的时候，才会进行路由跳转(怎么确定是不是a标签)
      // question2:怎样区分一级 二级 三级分类标签
      // 解决问题1：用自定义属性,只有 a标签有data-categoruName自定义属性
      // e.target，点击那个元素，就能获取到那个元素
      let element = e.target
      // 节点中有一个属性dataset，可以获取节点中的自定义属性和属性值
      // let r = element.dataset;
      // 使用dataset和解构赋值，可以获取自定义属性的属性名和属性值(在浏览器中大写自动转化为小写)
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 如果标签身上有catgegoruname属性那么一定是a标签
      if (categoryname) {
        // 用if  else区分一级 二级 三级  标签分类
        // 整理路由跳转的参数
        // 往search页面中跳转
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 如果路由跳转的时候，有params参数，也将他整合到location中，传递过去（传递的是点击搜索按钮时的input值）
        // 参数整合 这样location中就有name 和 query参数了
        location.query = query
        // 进行路由跳转
        this.$router.push(location)
      }
    },
    enterShow() {
      this.show = true
    }
  },
  mounted() {
    // 如果跳转的不是home组件，就让他的商品分类隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: state => {
        return state.home.categoryList
      }
    })
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none !important;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          //   删除用css实现的二三级分类的显示与隐藏
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的开始状态
    .sort-enter {
      height: 0;
    }
    // 过渡动画的结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画的时间，速率（）
    .sort-enter-active {
      transition: all 1s;
    }
  }
}
</style>
