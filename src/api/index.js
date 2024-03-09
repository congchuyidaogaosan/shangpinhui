/*
 * @Author: your name
 * @Date: 2022-04-01 22:54:59
 * @LastEditTime: 2022-04-11 00:13:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\app\src\api\index.js
 */
//所有的API接口进行统一管理
import requests from "./ajax";

import mockRequest from './mockAjax'

export const reqGetCategoryList = () => {
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })

}

export const reqGetBannerList = () => mockRequest.get('/banner');

export const reqGetFloorList = () => mockRequest.get('/floor');
//当前这个函数需不需要接受外部传递参数
//当前这个接口,给服务器传递参数params,至少是一个空对象

export const reqGetSeachInfo = (params) => requests({ url: '/list', method: "post", data: params })

//获取商品的详细信息
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车中
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"});


export const reqCartList = () => requests({ url: `cart/cartList`, method: 'get' });

export const reqDeleteById = (skuId) => requests({ url: `cart/deleteCart/${skuId}`, method: 'DELETE' });

export const reqUpdateCheckById = (skuId,isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });


export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });


export const reqUserRegister = (data) => requests({ url: `/user/passport/register`,data, method: 'post' });


export const reqUserLogin = (data) => requests({ url: `/user/passport/login`,data, method: 'post' });


export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });

export const reqLoginOut = () => requests({ url: `/user/passport/logout`, method: 'get' });

export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });

export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });

export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

export  const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});


export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// /order/auth/{page}/{limit}
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'});

