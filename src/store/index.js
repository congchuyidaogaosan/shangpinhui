/*
 * @Author: your name
 * @Date: 2022-04-02 00:08:41
 * @LastEditTime: 2022-04-10 17:21:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEim
 * 
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import home from './home';
import search from './search'
import detail from './detail'
import shopCart from './shopCart'
import user from './user'
import trade from './trade'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
    

})
