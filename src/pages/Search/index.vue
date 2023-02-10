<template>
  <div id="search">
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a>全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 如果有categoryName就将他渲染到页面上-->
            <!-- 如果searchParams中有categoryName的值，就想将他的值渲染都页面上 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }} <i @click="removeCategoryName">×</i> </li>
            <!-- 关键字的面包屑 如果有keyword将将他渲染到页面上-->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }} <i @click="removeKeyword">×</i> </li>
            <!-- 品牌的面包屑，如果searchParams中有trademark属性，就将他渲染到页面上 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }} <i @click="removeTrademark">×</i> </li>
            <!-- 属性的面包屑，如果searchParams中有props,就遍历里面的数据（数组），将他们渲染到页面上 -->
            <li class="with-x" v-for="(prop,index) in searchParams.props" :key="index">{{ prop.split(':')[1] }} <i @click="removeProp(index)">×</i> </li>

          </ul>
        </div>
        <!--selector-->
        <div class="clearfix selector">
          <div class="type-wrap logo">
            <div class="fl key brand">品牌</div>
            <div class="value logos">
              <ul class="logo-list">
                <li v-for="(trade) in trademarkList" :key="trade.tmId" @click="trademarkHandler(trade)">{{ trade.tmName }}</li>
              </ul>
            </div>
            <div class="ext">
              <a href="javascript:void(0);" class="sui-btn">多选</a>
              <a href="javascript:void(0);">更多</a>
            </div>
          </div>
          <div class="type-wrap" v-for='(attr) in attrsList' :key="attr.attrId">
            <div class="fl key">{{attr.attrName}}</div>
            <div class="fl value">
              <ul class="type-list">
                <li v-for="(attrvalue,index) in attr.attrValueList" :key="index" @click="attrHandler(attr,attrvalue)">
                  <a>{{ attrvalue }}</a>
                </li>

              </ul>
            </div>
            <div class="fl ext"></div>
          </div>

        </div>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 如果searchParams中的order中包含1，就让他加背景颜色为红色 -->
                <!-- 如果order中有1，就让他有actice类 -->
                <!-- 创建点击事件，点击第一个传1过去 -->
                <li :class="{suiActive:isOne}" @click="changeOrder(1)">
                  <!-- 如果他是综合他就有箭头 -->
                  <a :class="{aActive:isOne}"> 综合<span v-show="isOne" :class="{arrowDesc:isDesc,arrowAsc:isAsc}"></span> </a>
                </li>
                <!-- 创建点击事件，点击第一个传2过去 -->
                <li :class="{suiActive:isTwo}" @click="changeOrder(2)">
                  <a :class="{aActive:isTwo}">价格<span v-show="isTwo" :class="{arrowDesc:isDesc,arrowAsc:isAsc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/details/'+goods.id">
                      <img v-lazy=goods.defaultImg />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器，先传递几条假数据过去，等测试完毕后，在传递服务器中的数据过去 -->
          <!-- 父传子，自定义属性   当前页码数：1   一页3条数据  一共91条数据    连续页码数：5     -->
          <Pagination :pageNo='searchParams.pageNo' :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"></Pagination>
        </div>
        <!--hotsale-->
        <!-- <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'MySearch',
  data() {
    return {
      // 定义带给服务器的参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        // 排序：初始状态应为综合降序
        order: '1:desc',
        pageNo: 1,
        pageSize: 15,
        props: [],
        trademark: ''
      }
    }
  },
  methods: {
    // 把这次请求封装成一个函数，在mounted中执行一次，需要的时候调用即可
    // 将参数传递进去，根据参数的不同向服务器发送请求，返回不同的数据
    // 经常调用这个getData()函数，他讲参数传递给store中的actions中，在里面也是将参数传进去，请求服务器中的商品信息
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 点击面包屑中categoryName的叉号按钮，将该面包屑删除
    removeCategoryName() {
      // 将带给服务器的数据清空，再向服务器发送请求
      this.searchParams.categoryName = undefined
      // 将categoryId那三个也要置空
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      // 点击面包屑中的叉号，让url地址中的数据也要改变（进行路由跳转，自己跳自己）
      // 这里的主要意图是删除query参数，要保留params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }

      this.getData()
    },
    // 点击面包屑中的keyword中的叉号按钮，将该面包屑删除
    removeKeyword() {
      this.searchParams.keyword = undefined
      // 这里的主要意图是删除params参数，要保留query参数
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
      // 重新进行路由跳转更新数据
      this.getData()
      // 删除关键字之后，将输入框中的数据进行删除
      // 在search组件中，通过$bus实现组件通信，将header中的关键字清除
      // 通知组件header清除关键字
      this.$bus.$emit('clear')
      // 进行路由跳转
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    //点击品牌名，在面包屑上也显示
    trademarkHandler(trade) {
      // 将id(trade.tmId)和name(trade.tmName)当做参数，传到searchParams中
      this.searchParams.trademark = `${trade.tmId}:${trade.tmName}`
      // 再次发起请求，获取相应的数据
      this.getData()
    },
    removeTrademark() {
      this.searchParams.trademark = undefined
      // 在此发送请求
      this.getData()
    },
    attrHandler(attr, attrvalue) {
      // 属性id:属性值:属性名
      let props = `${attr.attrId}:${attrvalue}:${attr.attrName}`

      // 数组去重，往数组props中push之前，看里面是否有重复的，如果有重复的就不进行push
      if (this.searchParams.props.indexOf(props) == -1) {
        // 整合数据，因为searchParams中的props是数组类型，需要将这里的props,push到searchParams中的props数组中
        // push,修改原数组，而不是产生新数组
        this.searchParams.props.push(props)
      }

      // 再次发起请求
      this.getData()
    },
    // 点击面包屑中的叉号时，将该数据在searchParams中的props数组中删除
    removeProp(index) {
      // 两个参数：attr.split(索引值，截取几个)
      this.searchParams.props.splice(index, 1)
      // 再次发送请求
      this.getData()
    },
    // 点击切换order  排序
    changeOrder(flag) {
      let originOrder = this.searchParams.order
      // 获取最开始的状态
      let originFlag = originOrder.split(':')[0]
      let originSort = originOrder.split(':')[1]
      // 准备一个新的order
      let newOrder = ''
      // 如果点击的是之前已经存在的排序（之前点击综合，现在还点击综合）
      if (originFlag == flag) {
        // 判断是升序还是降序，如果是变为升序，将他变为降序
        newOrder = `${flag}:${originSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的是新排序（之前是价格，现在点击综合）
        newOrder = `${flag}:'desc`
      }
      // 将neworder赋值给searchParams中的order属性
      this.searchParams.order = newOrder
      // 重新发动请求`
      this.getData()
    },
    // 自定义事件的回调函数--获取点击的是第几页
    getPageNo(pageNo) {
      // 将传递过来的值，赋值给searchParams中的pageNo(当前页面号)
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  // 在组件挂栽完毕之前，这个生命周期阶段能拿到跳转过来的数据
  beforeMount() {
    // 使用Object.assign，将后面对象中的属性值，合并到第一个对象中
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  // 在组建挂栽完毕之后执行一次 【仅仅执行一次】
  mounted() {
    // 在这里调用一次这个函数
    this.getData()
  },
  computed: {
    // 获取存储在vuex中的searchList的数据

    // 获取getters中的数据
    // State是分模块的，但是getters是不分模块的
    ...mapGetters(['goodsList', 'attrsList', 'trademarkList']),
    ...mapState({
      //这样获取vuex中的数据可以，但是很麻烦，使用getters用于简化仓库中的数据
      // searchList: state => state.search.searchList
      // 获取search模块展示产品一共多少数据
      total: state => state.search.searchlist.total
    }),
    // 在计算属性中写好，免得在上面写得太多
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    }
  },
  // 数据监听，监听组件上的属性的属性值的变化
  // TypeNav中的数据传过来之后，在这里进行赋值处理
  watch: {
    // input点击按钮之后，再次发送请求，获取数据
    // 监听$route值得变化，只要他的数据有变化，（点击分类列表，搜索框中进行搜索）就发送一次请求，注意此处都不加this
    $route: {
      handler() {
        // 整理带给服务器的参数
        Object.assign(this.searchParams, this.$route.query, this.$route.params)
        // 再次发送请求
        this.getData()
        // 每一次请求完毕，把一级，二级，三级分类的id置空（点击一级列表之后，再次点击二级列表会携带两个id的问题）
        // this.searchParams.category1Id = undefined
        // this.searchParams.category2Id = undefined
        // this.searchParams.category3Id = undefined
        // 其他属性值的变化，新值会覆盖旧值，不用置空
      }
    }
  }
}
</script>

<style lang="less" scoped>
.suiActive {
  background-color: red;
}
.aActive {
  color: #fff !important;
}
.arrowDesc {
  background-image: url(./images/desc.png) !important;
  background-size: contain;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-position: 0 3px;
}
.arrowAsc {
  background-image: url(./images/asc.png) !important;
  background-size: contain;
  display: inline-block;
  width: 15px;
  height: 15px;
  background-position: 0 3px;
}

.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;
      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;
        .key {
          padding-bottom: 87px !important;
        }
      }
      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;
        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }
        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;
          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;
              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }
          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;
              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }
        .ext {
          position: absolute;
          top: 10px;
          right: 10px;
          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }
          a {
            color: #666;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
