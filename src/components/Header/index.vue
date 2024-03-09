
<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!username">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{username}}</a>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./image/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      // 跳转路由
      // this.$router.push("/search");
      // 跳转路由并传参
      // 第一种:字符串方式
      // this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
      // 第二种:模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`);
      // 第三种:对象

      // this.$router.push({
      //   name:"search",
      //   params:{
      //     keyword:this.keyword
      //   },
      //   query:{
      //     k:this.keyword.toUpperCase()
      //   },
      // });

      //------------------------------------------------------
      // 面试题1: 路与欧传递参数(对象写法)path是否可以结合params参数一起使用?
      // 不可以
      // this.$router.push({
      //   path:'/search',//path和params不能共同使用
      //   params:{
      //     keyword:this.keyword
      //   },
      //   query:{
      //     k:this.keyword.toUpperCase()
      //   },
      // })

      // 第二题如何指定params参数可传可不传?
      // 如果路由要求传递params参数,但是你就不传递params参数,发现一件事,URL会有问题的
      // 如果指定params参数可以传递或者不传递,在配置路由的时候,在占位的后面加上一个问号 ?  [params可以传递或不传递]
      //   this.$router.push({
      //   path:'/search',//path和params不能共同使用
      //   query:{
      //     k:this.keyword.toUpperCase()
      //   },
      // })
      //

      //第三题 params参数可传可不传, 但params传递的时空值 如何解决
      // 使用underfined解决
      // this.$router.push({
      //   path:'/search',//path和params不能共同使用
      //   params:{
      //     keyword:""||underfined
      //   },
      //   query:{
      //     k:this.keyword.toUpperCase()
      //   },
      // })

      // 第四题路由组件是否能够传递props数据
      // 可以 3种

      // this.$router.push({
      //     name:"search",
      //     params:{
      //       keyword: this.keyword || underfined
      //     },

      //   });

      // 如果有query参数带着
      if (this.$route.query) {
        let loction = {
          name: "search",
          params: {
            keyword: this.keyword || undefined,
          },
        };
        loction.query = this.$route.query;
        this.$router.push(loction);
      }
    },
    async loginOut(){
      try {
       await this.$store.dispatch('loginOut');
       this.$router.push('/home')
      } catch (error) {
        
      }
    }
  },
  mounted() {
    this.$bus.$on("clear",()=>{
      this.keyword="";

    });
  },
  computed:{
    username(){
      return this.$store.state.user.userInfo.name;
    }
  }
};
</script>

<style lang="less" scope>
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