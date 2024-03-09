/*
 * @Author: your name
 * @Date: 2022-03-29 12:08:15
 * @LastEditTime: 2022-04-28 20:36:16
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE,
 * @FilePath: \shangpinhui\vue.config.js
 */
module.exports = {
  transpileDependencies: [],
    productionSourceMap:false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    
    //配置代理跨域
    devServer: {
      proxy: {
        "/api": {
          target: "http://gmall-h5-api.atguigu.cn",
         
          
        },
      },
    },
    publicPath:'./'
  };
  