/*
 * @Author: your name
 * @Date: 2022-04-01 10:52:16
 * @LastEditTime: 2022-04-11 01:04:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router"
import routes from "./routes"
import store from '@/store'
Vue.use(VueRouter);



//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => { },
      () => { }
    );
  }
};


let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { x: 0, y: 0 }
  },
})


//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach(async (to, from, next) => {
  // to:可以获得你想要跳转到那个路由的信息
  //from: 可以获取到你从那个路由来的
  // next :  放行函数 next() 放行 next(path) 放行到那个指定路由 

  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          await store.dispatch('loginOut');
          next('/login');
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
      //未登录去上面这些路由-----登录
      let toPath = to.path;
      //包不包含
      if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
        //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
        next('/login?redirect='+toPath);
      }else{
         //去的不是上面这些路由（home|search|shopCart）---放行
         next();
      }

  }


})

//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {

})

export default router;
