/*
 * @Author: your name
 * @Date: 2022-04-07 20:51:18
 * @LastEditTime: 2022-04-09 23:50:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\src\store\detail\index.js
 */
import { reqCartList ,reqDeleteById ,reqUpdateCheckById} from "@/api"
const state = {
    cartList: {}
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
    


}

const actions = {
    async getCartList({ commit }) {
        let result = await reqCartList();
        
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteById(skuId);
        if (result.code == 200) {
            return "ok";
          } else {
            return Promise.reject(new Error("faile"));
          }
    },
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckById(skuId,isChecked);
        if (result.code == 200) {
            return "ok";
          } else {
            return Promise.reject(new Error("faile"));
          }
    },
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        //获取购物车中全部的产品（是一个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
          let promise =
            item.isChecked == 1
              ? dispatch("deleteCartListBySkuId", item.skuId)
              : "";
          //将每一次返回的Promise添加到数组当中
          PromiseAll.push(promise);
        });
        //只要全部的p1|p2....都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll);
    },
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        //数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
          let promise = dispatch("updateCheckedById", {
            skuId: item.skuId,
            isChecked,
          });
          promiseAll.push(promise);
        });
        //最终返回结果
        return Promise.all(promiseAll);
    },
}

const getters = {
    cartList(state){
        return state.cartList[0] || {};
    },

    // carInfoList(state){
    //     return 
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}