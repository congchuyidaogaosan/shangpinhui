/*
 * @Author: your name
 * @Date: 2022-04-02 00:26:29
 * @LastEditTime: 2022-04-07 20:50:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\store\search\index.js
 */
// search的小仓库
// state 仓库存储数据的地方
import { reqGetSeachInfo } from "@/api"
const state={
    searchList:{},
}
// mutations 修改state的唯一手段

const mutations={
    GETSEACHINFO(state,searchList){
        state.searchList = searchList;
    }
}
// actions 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions={
    async getSearchList({commit},params={}){
        //当前这个reqGetSearchInfo这个函数在调用服务器数据的时候,至少传递一个参数(空对象)
        //params形参:使当前用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSeachInfo(params);
        if(result.code==200){
            commit("GETSEACHINFO",result.data)
        }
    }
}
// getters 理解为计算属性 , 用于简化仓库数据, 让组件获取仓库的数据更加方便

const getters={
    //当前形参state , 当前仓库中的state,并非大仓库中的那个state。
    goodsList(state){
        //state.searchList.goodsList如果服务器数据回来了，没问题，是一个数组，
        //假如网络不给力，没有网 state.searchList.goodsList应该返回的是underfined。
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];

    },
    
    
    
}
export default {
    state,
    mutations,
    actions,
    getters
}