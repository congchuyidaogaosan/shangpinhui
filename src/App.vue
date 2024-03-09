<!--
 * @Author: your name
 * @Date: 2022-03-29 11:55:14
 * @LastEditTime: 2022-04-10 15:58:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\App.vue
-->
<template>
  <div id="app">
    <!-- 路由组件出口的地方 -->
    <Header></Header>
    <router-view></router-view>
    <!-- 在Home, Search 显示的, 在登录注册时隐藏 -->
    <!-- <Footer v-show="$route.path=='/home' || $route.path=='/search' "></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"


export default {
  name: 'App',
  components: {
    Header,
    Footer,
    
  },
  mounted() {
    
    //通知vuex发请求,获取数据,储存在仓库中
    this.$store.dispatch("categoryList");
  },
  
}
</script>

<style>

</style>
