/*
 * @Author: your name
 * @Date: 2022-04-02 00:26:29
 * @LastEditTime: 2022-04-07 11:02:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\store\search\index.js
 */

// home的小仓库
import { reqGetCategoryList, reqGetBannerList,reqGetFloorList } from "@/api"
// state 仓库存储数据的地方
const state = {
    //state中数据默认的初始值别瞎写, 服务器返回对象,服务器返回数组
    categoryList: [],
    bannerList: [],
    floorList: [],


}
// mutations 修改state的唯一手段

const mutations = {
    GETCATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },

    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
}
// actions 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    //通过API的接口函数发请求
    async categoryList({ commit }) {
        let result = await reqGetCategoryList();
        
        
        if (result.code == 200) {
            commit("GETCATEGORYLIST", result.data)
        }
    },


    //获取首页轮播图的数据reqGetBannerList
    async bannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },

    async floorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
}
// getters 理解为计算属性 , 用于简化仓库数据, 让组件获取仓库的数据更加方便

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}