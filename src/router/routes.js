/*
 * @Author: your name
 * @Date: 2022-04-07 20:41:45
 * @LastEditTime: 2022-04-11 02:11:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \projectd:\23田雷宇\shangpinhui\src\router\routes.js
 */

import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"
import AddCartSuccess from "@/pages/AddCartSuccess"
import ShopCart from "@/pages/ShopCart"
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
import Center from "@/pages/Center"

// 二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path:"/home",
        // 路由懒加载
        component:()=> import('@/pages/Home'),
        // 路由原信息控制显示或隐藏
        meta:{show:true}
        
    },
    {
        path:"/search/:keyword?",//此?代表params可传可不传
        component:Search,
        meta:{show:true},
        name:"search",
        // 路由组件是否能够传递props数据
        // 布尔值写法 传递params 
        // props:true,
        
        // 对象写法:额外的给组件传递一些props参数
        // props:{a:1, b:2},

        // 函数写法,通过props传递params参数  和query参数给路由组件
        props:($route)=>{
            return {keyword:$route.params.keyword,k:$route.query.k}
        }
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        path:"/",
        redirect:"/home"
    },
    {
      path:"/detail/:skuid",
        component:Detail,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:"/shopCart",
        
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/trade",
        
        component:Trade,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();

            }else{
                next(false);

            }
        }
    },
    {
        path:"/center",
        
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/',
                component:MyOrder
            },
        ]
    },
    {
        path:"/pay",
        
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path =='/trade'){
                next();

            }else{
                next(false);

            }
        }
    },
    {
        path:"/paysuccess",
        
        component:PaySuccess,
        meta:{show:true},
        
    }

]