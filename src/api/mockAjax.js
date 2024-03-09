/*
 * @Author: your name
 * @Date: 2022-04-01 22:40:13
 * @LastEditTime: 2022-04-02 19:36:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\api\requset.js
 */
import axios  from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";//可以进行修改
//引入进度条的样式

//start:进度条开始   done :进度条结束
//1.利用axios 对象的方法create 去创建一个axios 实例
//2. request 就是axios 只不过稍微配置一下
const requests = axios.create({
    //配置对象
    
    baseURL:'/mock',
    //代表请求超时的时间5S
    timeout:5000,

});

//请求拦截器.在发送请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事情

requests.interceptors.request.use((config)=>{
    // config 配置对象,对象里面有一个属性很重要,header请求头
    nprogress.start();
    return config;

})
//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data
},(error)=>{
    //响应失败
    return Promise.reject(new Error('faile'));
})


//对外暴露
export default requests;
