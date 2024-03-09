/*
 * @Author: l git@gitee.com:t_20020309/leye.git
 * @Date: 2022-03-29 11:55:14
 * @LastEditors: l git@gitee.com:t_20020309/leye.git
 * @LastEditTime: 2022-05-08 20:28:22
 * @FilePath: \shangpinhui\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
import Carsousel from '@/components/Carsousel'

import Pageination from '@/components/Pageination'
// 引入 mockServer.js ---- mock 数据
import '@/mock/mockServe'
import "swiper/css/swiper.css"

import '@/plugins/validate'
import store from '@/store'
// 统一引入
import * as API from '@/api'
import { Button,MessageBox } from 'element-ui';
import VueLazyload from 'vue-lazyload'

Vue.component(Button.name, Button);
// 第一个参数:全局组件的名字,第二个参数,哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pageination.name,Pageination);

Vue.config.productionTip = false
//注册

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


Vue.use(VueLazyload,{
  loading: 'dist/loading.gif',
})

new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API =API;

  },
  router,
  // 注册仓库
  store
}).$mount('#app')
