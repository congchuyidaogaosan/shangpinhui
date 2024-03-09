/*
 * @Author: your name
 * @Date: 2022-04-10 13:50:37
 * @LastEditTime: 2022-04-10 16:56:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shangpinhui\src\store\user\index.js
 */
/*
 * @Author: your name
 * @Date: 2022-04-07 20:51:18
 * @LastEditTime: 2022-04-09 23:50:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\src\store\detail\index.js
 */
import { reqGetCode, reqUserRegister, reqLoginOut, reqUserLogin, reqUserInfo } from "@/api"
import { setToken, getToken,removeToken } from "@/utils/token"
const state = {
    code: '',
    token: getToken(),
    userInfo: {}

}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;

    },
    CLEAR(state) {
        state.token = "";
        state.userInfo = {};
        removeToken();

    }



}

const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);

        if (result.code == 200) {
            commit("GETCODE", result.data);
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);

        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);

        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);

            setToken(result.data.token);

            return "ok";

        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();

        if (result.code == 200) {
            commit("USERINFO", result.data);
            return "ok";

        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    async loginOut({ commit }) {
        let result = await reqLoginOut();

        if (result.code == 200) {
            commit("CLEAR");
            return "ok";

        } else {
            return Promise.reject(new Error('faile'))
        }
    },

}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}