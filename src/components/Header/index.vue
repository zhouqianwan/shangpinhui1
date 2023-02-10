<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 如果有token就显示用户名（已经登陆成功） -->
          <p v-if="$store.state.user.token">{{loginName}}
            <a class="register" @click="logout">退出登录</a>
          </p>

          <!-- 没token就没登录  -->
          <p v-else>
            <span>请</span>

            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <a @click="goShopCart">我的购物车</a>
          <a>我的尚品汇</a>
          <a>尚品汇会员</a>
          <a>企业采购</a>
          <a>关注尚品汇</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'MyHeader',
  data() {
    return {
      keyword: ''
    }
  },
  mounted() {
    this.$bus.$on('clear', () => {
      this.keyword = ''
    }),
      this.$store.dispatch('getUserInfo')
  },
  methods: {
    // 点击button按钮需要向search组件 进行跳转
    goSearch() {
      // 第一种方式：字符串的方式
      //   this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      // 第二种方式：模板字符串的方式
      //   this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      // 第三种方式：对象的方式

      // 点击搜索按钮进行跳转的时候，判断是否有query参数，如果有整合到location中
      if (this.$route.query) {
        let location = { name: 'search', params: { keyword: this.keyword || undefined } }
        location.query = this.$route.query
        this.$router.push(location)
        console.log(this.keyword)
      }
    },
    goShopCart() {
      this.$router.push('/shopcart')
    },
    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    // 通过计算属性，获取到用户名
    loginName() {
      return this.$store.state.user.loginName
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
