<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 动态展示商品 -->
        <ul class="cart-list" v-for="(goods) in cartInfoList" :key="goods.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='goods.isChecked==1?true:false' @change="shopcartCheckState(goods,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src='goods.imgUrl'>
            <div class="item-msg">{{ goods.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ goods.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 对商品数量进行修改 -->
            <!-- 使用的是同一个函数，需要知道进行的是哪个操作，传递第一个参数 -->
            <!-- 需要知道改变的数量，传递第二个参数 -->
            <!-- 需要传递商品的skuId,传递第三个参数（是一个是对象  需要使用其中的属性skuId） -->
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,goods)">-</a>
            <input autocomplete="off" type="text" :value="goods.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,goods)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,goods)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{goods.skuNum*goods.cartPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteGoods(goods)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 点击全选按钮，将改变后的状态传过去，把所有的状态都变为全选状态 -->
        <input class="chooseAll" type="checkbox" :checked='isAllChecked&&cartInfoList.length >0'>
        <span>全选</span>
      </div>
      <div class="option">
        <!-- 点击删除选中的商品后，通过遍历找出选中的商品，将他们删除即可 -->
        <a href="#none" @click="deleteAllCheckedGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalCheckedGoods}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}.00</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
// 引入请求
export default {
  name: 'ShopCart',
  data() {
    return {
      skuNum: 1
    }
  },
  mounted() {
    this.getData()
    // 直接在组件中发起请求，不再从仓库中
  },
  methods: {
    getData() {
      this.$store.dispatch('getShopCartList')
    },
    // 购物车中数据的更改，需要发请求
    // 对事件进行节流，防止点击过快的现象
    handler: throttle(async function (str, disnum, cart) {
      // 如果点击的是  减
      switch (str) {
        case 'minus':
          // 减操作    判断商品的数目是否小于1,小于1不能在进行减操作   所以传递0 不进行更改
          disnum = cart.skuNum > 1 ? -1 : 0
          break
        case 'add':
          // 这是加操作
          disnum = 1
          break
        case 'change':
          // 如果用户输入的是非法的（汉字或者小于1）,让disnum等于0
          // $event.target.value*1用户输入的值
          if (isNaN(disnum) || disnum < 1) {
            disnum = 0
          } else {
            // 输入的值是数字，并且大于1
            // 用输入的值减去之前的值就是变化的数目
            disnum = parseInt(disnum) - cart.skuNum
          }
          break
      }
      try {
        // 成功派发action
        await this.$store.dispatch('updatgeShopcartNum', { skuNum: disnum, skuId: cart.skuId })
        // 重新派发请求，获取数据
        this.getData()
      } catch (error) {
        // 如果失败，提示错误信息
        alert(error.message)
      }
    }, 1000),
    // 点击删除按钮，删除购物中的商品
    async deleteGoods(goods) {
      try {
        await this.$store.dispatch('deleteGoods', goods.id)
      } catch (error) {
        alert(error.message)
      }
    },
    // 商品选中状态的提交
    async shopcartCheckState(goods, checked) {
      try {
        await this.$store.dispatch('shopcartCheckState', { skuID: goods.skuId, isChecked: checked ? '1' : '2' })
        // 重新更新下数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除选中的商品
    async deleteAllCheckedGoods() {
      try {
        //派发请求
        await this.$store.dispatch('deleteAllCheckedGoods')
        // 更新一下数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 在购物车中点击结算按钮，跳转页面到结算
    goTrade() {
      this.$router.push('/trade')
    }
  },
  computed: {
    // 获取存在shopCart仓库中的购物车的数据
    ...mapGetters(['cartList']),
    // 获取到的购物车数据是个数组，需要使用里面的cartInfoList  这里面有几个元素就有几个商品  进行遍历即可
    cartInfoList() {
      return this.cartList.cartInfoList || []
    },
    // 计算出商品总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        if (item.isChecked == 1) {
          sum += item.skuNum * item.skuPrice
        }
      })
      console.log(sum)
      return sum
    },
    // 遍历数组，通过isChecked属性查看是否全不选中
    isAllChecked() {
      return this.cartInfoList.every(item => item.isChecked === 1)
    },
    //全部选中商品数量
    totalCheckedGoods() {
      let sum = 0
      this.cartInfoList.forEach(item => {
        item.isChecked == 1 ? (sum += item.skuNum) : 0
      })
      return sum
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>