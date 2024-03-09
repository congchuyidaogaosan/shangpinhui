/*
 * @Author: your name
 * @Date: 2022-04-07 20:51:18
 * @LastEditTime: 2022-04-09 16:43:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\src\store\detail\index.js
 */
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    uuid_token:getUUID(),
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }


}

const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    async addOrUpdateShopCart({ commit }, {skuId, skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        
        if (result.code == 200) {
            //返回的是成功的标记
            return "ok";
          } else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
          }
    },
}

const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },


}

export default {
    state,
    mutations,
    actions,
    getters
}