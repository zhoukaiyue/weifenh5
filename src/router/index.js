import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'
import axios from 'axios'
const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const Settlein = r => require.ensure([], () => r(require('@/pages/login/settlein')), 'settlein')
const Page = r => require.ensure([], () => r(require('@/pages/page/page')), 'page')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Theme = r => require.ensure([], () => r(require('@/pages/theme/theme')), 'theme')
const Category = r => require.ensure([], () => r(require('@/pages/category/category')), 'category')
const addGoods = r => require.ensure([], () => r(require('@/pages/category/addGoods')), 'addGoods')
const Detail = r => require.ensure([], () => r(require('@/pages/detail/detail')), 'detail')
const Ceshi = r => require.ensure([], () => r(require('@/pages/detail/ceshi')), 'ceshi')
//const Cart = r => require.ensure([], () => r(require('@/pages/cart/cart')), 'cart')
const Order = r => require.ensure([], () => r(require('@/pages/order/order')), 'order')
const OrderData = r => require.ensure([], () => r(require('@/pages/order/orderData')), 'orderData')
const Address = r => require.ensure([], () => r(require('@/pages/address/address')), 'address')
const User = r => require.ensure([], () => r(require('@/pages/user/user')), 'user')
const About = r => require.ensure([], () => r(require('@/pages/about/about')), 'about')
const StoreInfo = r => require.ensure([], () => r(require('@/pages/stores/storeInfo')), 'storeInfo')
const ShopCenter = r => require.ensure([], () => r(require('@/pages/stores/shopCenter')), 'shopCenter')
const logo = r => require.ensure([], () => r(require('@/pages/stores/logo')), 'logo')
const people = r => require.ensure([], () => r(require('@/pages/stores/people')), 'people')
const shopinfo = r => require.ensure([], () => r(require('@/pages/stores/shopinfo')), 'shopinfo')
const shopstroeinfo = r => require.ensure([], () => r(require('@/pages/shop/shop_storeinfo')), 'shop_storeinfo')
const phone = r => require.ensure([], () => r(require('@/pages/stores/phone')), 'phone')
const newphone = r => require.ensure([], () => r(require('@/pages/stores/newphone')), 'newphone')
const phonesuccess = r => require.ensure([], () => r(require('@/pages/stores/phonesuccess')), 'phonesuccess')
const storeer = r => require.ensure([], () => r(require('@/pages/stores/storeer')), 'storeer')
const changestore = r => require.ensure([], () => r(require('@/pages/stores/changestore')), 'changestore')
const changeshop = r => require.ensure([], () => r(require('@/pages/stores/changeshop')), 'changeshop')
const changephone = r => require.ensure([], () => r(require('@/pages/stores/changephone')), 'changephone')
const shop = r => require.ensure([], () => r(require('@/pages/stores/shop')), 'shop')
const shopsuccess = r => require.ensure([], () => r(require('@/pages/stores/shopsuccess')), 'shopsuccess')
const Dyinvite = r => require.ensure([], () => r(require('@/pages/invite/dyinvite')), 'dyinvite')
const ShopDyinvite = r => require.ensure([], () => r(require('@/pages/invite/shopdyinvite')), 'shopdyinvite')
const CommodityData = r => require.ensure([], () => r(require('@/pages/commodity/commodityData')), 'commodityData')
const storesuccess = r => require.ensure([], () => r(require('@/pages/stores/storesuccess')), 'storesuccess')
const Store_users = r => require.ensure([], () => r(require('@/pages/stores/store_users')), 'store_users')
const newData = r => require.ensure([], () => r(require('@/pages/order/newData')), 'newData')
const ShopnewData = r => require.ensure([], () => r(require('@/pages/shopdata/shopnewdata')), 'shopnewdata')
const data = r => require.ensure([], () => r(require('@/pages/order/data')), 'data')
const Shopdata = r => require.ensure([], () => r(require('@/pages/shopdata/shopdata')), 'shopdata')
const sh_success = r => require.ensure([], () => r(require('@/pages/stores/sh_success')), 'sh_success')
const Customer = r => require.ensure([], () => r(require('@/pages/order/Customer')), 'Customer')
const Storearmketingdetails = r => require.ensure([], () => r(require('@/pages/stores/storearmketingdetails')), 'storearmketingdetails')
const Shopmine = r => require.ensure([], () => r(require('@/pages/shop/shop_mine')), 'shop_mine')
const Shopname = r => require.ensure([], () => r(require('@/pages/shop/shop_name')), 'shop_name')
const Shoporderdata = r => require.ensure([], () => r(require('@/pages/shopdata/shoporderdata')), 'shoporderdata')
const Shopphonesuccess = r => require.ensure([], () => r(require('@/pages/shop/shop_phonesuccess')), 'shop_phonesuccess')
const Shopcheckphone = r => require.ensure([], () => r(require('@/pages/shop/shop_checkphone')), 'shop_checkphone')
const Shopmodifyphone = r => require.ensure([], () => r(require('@/pages/shop/shop_modifyphone')), 'shop_modifyphone')
Vue.use(Router)
const routes = [
    {
        path: '/',
        redirect: '/page'
    },
    {
        path: '/page',
        component: Page,
        children: [
            {
                path: '',
                redirect: '/page/home'
            },
            {
                path: 'home',
                name: 'home',
                meta: {
                     title: '首页',
                     keepAlive: false,// 不需要被缓存
                     auth: true,// 如果此路由需要微信授权请设置为true,默认为false
                     requireAuth: true
                },
                component: Home
            },
            {
                path: 'theme',
                name: 'theme',
                meta: {
                    title: '主题',
                    keepAlive: false // 不需要被缓存
                },
                component:Theme
            },
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '店铺营销',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Category
            },
            {
                path: 'storearmketingdetails',
                name: 'storearmketingdetails',
                meta: {
                    title: '店铺营销详情',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Storearmketingdetails
            },
            // 店员端店铺中心
            {
                path: 'shop_storeinfo',
                name: 'shop_storeinfo',
                meta: {
                    title: '店铺中心',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: shopstroeinfo
            },
            {
                path: 'addGoods',
                name: 'addGoods',
                meta: {
                    title: '添加商品',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: addGoods
            },
            {
                path: 'detail',
                name: 'detail',
                meta: {
                    title: '商品详情',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Detail
            },
            {
                path: 'ceshi',
                name: 'ceshi',
                meta: {
                    title: '测试',
                    keepAlive: false // 不需要被缓存
                },
                component: Ceshi
            },
            {
                path: 'sh_success',
                name: 'sh_success',
                meta: {
                    title: '等待审核',
                    keepAlive: false // 不需要被缓存
                },
                component: sh_success
            },
            {
                path: 'dyinvite',
                name: 'dyinvite',
                meta: {
                    title: '店员邀新排行榜',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Dyinvite
            },
            {
                path: 'shopdyinvite',
                name: 'shopdyinvite',
                meta: {
                    title: '营销邀新排行榜',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: ShopDyinvite
            },
            // {
            //     path: 'cart',
            //     name: 'cart',
            //     meta: {
            //         title: '购物车',
            //         // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            //     },
            //     component: Cart
            // },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单',
                    requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
                    keepAlive: false // 不需要被缓存
                },
                component: Order
            },
            {
                path: 'orderData',
                name: 'orderData',
                meta: {
                    title: '店铺订单数据',
                    requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
                    keepAlive: false // 不需要被缓存
                },
                component: OrderData
            },
            {
                path: 'commodityData',
                name: 'commodityData',
                meta: {
                    title: '营销商品数据',
                    requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
                    keepAlive: false // 不需要被缓存
                },
                component: CommodityData
            },
            {
                path: 'address',
                name: 'address',
                meta: {
                    title: '地址',
                    requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
                    keepAlive: false // 不需要被缓存
                },
                component: Address
            },
            {
                path: 'shoporderdata',
                name: 'shoporderdata',
                meta: {
                    title: '数据',
                    requireAuth: true ,// 添加该字段，表示进入这个路由是需要登录的
                    keepAlive: false // 不需要被缓存
                },
                component: Shoporderdata
            },

            {
                path: 'about',
                name: 'about',
                meta: {
                    title: '店铺中心',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: About,
            },
            {
                path: 'storeInfo',
                name: 'storeInfo',
                meta: {
                    title: '店铺信息',
                    requireAuth: true,
                     keepAlive: false // 不需要被缓存
                },
                component: StoreInfo
            },
            {
                path: 'shop_mine',
                name: 'shop_mine',
                meta: {
                    title: '个人信息',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Shopmine
            },
                        {
                path: 'shop_name',
                name: 'shop_name',
                meta: {
                    title: '修改昵称',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Shopname
            },
            {
                path: 'store_users',
                name: 'store_users',
                meta: {
                    title: '店铺新增用户数据',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Store_users
            },
            // 该路由暂时换为about
            // {
            //     path: 'shopCenter',
            //     name: 'shopCenter',
            //     meta: {
            //         title: '店铺中心',
            //         // requireAuth: true
            //     },
            //     component: ShopCenter
            // },
            {
                path: 'logo',
                name: 'logo',
                meta: {
                    title: '品牌名称',
                    keepAlive: false // 不需要被缓存
                },
                component: logo
            },
            ,
            {
                path: 'people',
                name: 'people',
                meta: {
                    title: '修改负责人',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: people
            },
            {
                path: 'shopinfo',
                name: 'shopinfo',
                meta: {
                    title: '店铺介绍',
                     keepAlive: false // 不需要被缓存
                },
                component: shopinfo
            },
            {
                path: 'changephone',
                name: 'changephone',
                meta: {
                    title: '修改手机号',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: changephone
            },
            {
                path: 'shop_modifyphone',
                name: 'shop_modifyphone',
                meta: {
                    title: '修改手机号',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Shopmodifyphone
            },
            {
                path: 'phone',
                name: 'phone',
                meta: {
                    title: '修改手机号',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: phone
            },
            {
                path: 'shop_checkphone',
                name: 'shop_checkphone',
                meta: {
                    title: '修改手机号',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Shopcheckphone
            },
            {
                path: 'newphone',
                name: 'newphone',
                meta: {
                    title: 'ceshi',
                    keepAlive: false // 不需要被缓存
                },
                component: newphone
            }
            ,
            {
                path: 'phonesuccess',
                name: 'phonesuccess',
                meta: {
                    title: '修改手机号成功',
                     keepAlive: false // 不需要被缓存
                },
                component: phonesuccess
            }
            ,
            {
                path: 'shop_phonesuccess',
                name: 'shop_phonesuccess',
                meta: {
                    title: '修改手机号成功',
                     keepAlive: false // 不需要被缓存
                },
                component: Shopphonesuccess
            },
            {
                path: 'storeer',
                name: 'storeer',
                meta: {
                    title: '店长管理',
                    requireAuth: true,
                     keepAlive: false // 不需要被缓存
                },
                component: storeer
            }
            ,
            {
                path: 'changeshop',
                name: 'changeshop',
                meta: {
                    title: '添加新店长',
                    requireAuth: true,
                     keepAlive: false // 不需要被缓存
                },
                component: changeshop
            }
            ,
            {
                path: 'shop',
                name: 'shop',
                meta: {
                    title: '店员管理',
                    requireAuth: true,
                     keepAlive: false // 不需要被缓存
                },
                component: shop
            }
            ,
            {
                path: 'shopsuccess',
                name: 'shopsuccess',
                meta: {
                    title: '店长添加成功',
                     keepAlive: false // 不需要被缓存
                },
                component: shopsuccess
            }
            ,
            {
                path: 'changestore',
                name: 'changestore',
                meta: {
                    title: '更换店员',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: changestore
            }
            ,
            {
                path: 'storesuccess',
                name: 'storesuccess',
                meta: {
                    title: '店员添加成功',
                    keepAlive: false // 不需要被缓存
                },
                component: storesuccess
            },
            {
                path: 'newData',
                name: 'newData',
                meta: {
                    title: '邀新数据',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: newData
            },
            {
                path: 'shopnewdata',
                name: 'shopnewdata',
                meta: {
                    title: '我的营销数据',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: ShopnewData
            },
            {
                path: 'data',
                name: 'data',
                meta: {
                    title: '数据统计',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: data
            },
            //店员端数据统计
            {
                path: 'shopdata',
                name: 'shopdata',
                meta: {
                    title: '数据统计',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Shopdata
            },
            {
                path: 'Customer',
                name: 'Customerdata',
                meta: {
                    title: '客户订单',
                    requireAuth: true,
                    keepAlive: false // 不需要被缓存
                },
                component: Customer
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '商家登录',
             keepAlive: false, // 不需要被缓存
             //auth: true// 如果此路由需要微信授权请设置为true,默认为false 
           }
    },

    {
        path: '/settlein',
        name: 'settlein',
        component: Settlein,
        meta: {
            title: '申请入驻',
             keepAlive: false // 不需要被缓存
        }
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '我的',
            // requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: User
    },
    { 
        path: '*', 
        component: Home,
        meta: {
             auth: true// 如果此路由需要微信授权请设置为true,默认为false 
           }
     }
]

const router = new Router({
    mode:'history',
    routes
})


// router.afterEach(function(to) {
// })

export default router