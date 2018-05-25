<template>
    <div class="home">
        <!-- 临时新建进入商品详情的入口-->
        <div class="index_banner"  @click="linkToDetail('11')">
            <img src="~@/assets/img/banner.png" alt="image">
        </div>
        <!-- 当前累计客户量 -->
        <div class="customer_quantity">
        <p class="customer_quantity_title">我的累计客户量</p>
        <div class="customer_quantity_cont"><span class="customer_quantity_num">{{num.member_count}}&nbsp;<b style="font-size:0.9rem;">人</b></span><label class="customer_quantity_qs" v-on:click="dyinvite"><i class="customer_quantity_qsimg"></i>&nbsp;查看同事业绩对比图</label>
        </div>
        <div class="customer_quantity_box">
            <div class="customer_quantity_m">
                <p>本月新增客户(人)</p>
                <p class="customer_quantity_mnum">{{num.member_mouth_count}}</p>
            </div>
            <div  class="customer_quantity_d">
                <p>今日新增客户(人)</p>
                <p class="customer_quantity_dnum">{{num.member_now_count}}</p>
            </div>
        </div>
        </div>
        <div class="selected-themes">
            <h5 class="title">营销商品 <span class="Notes">实惠佳品 营销利器</span> <span class="see" v-on:click="addGoods">查看全部&emsp;<img src="~@/assets/icon/goods-left.png"></span></h5>
            <div class="selected-box">
                <ul class="selected-box_ul">
                    <li v-for="(item,index) in datalist" @click="maketing(item.id)">
                        <img src="~@/assets/img/goods.png">
                        <h5 class="commodity_name">{{item.cate_name}}</h5>
                        <div class="comm_price"><span><img src="~@/assets/icon/rmb.png" alt="">385.00</span><label>生成二维码</label></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="recent-products">
            <h5 class="title">店铺排行 <span>附近店家人气排行</span> <span class="see">查看全部&emsp;<img src="~@/assets/icon/goods-left.png"></span></h5>
            <ul>
                <li>
                    <img src="~@/assets/img/goods.png">
                    <img class="icon" src="~@/assets/icon/one.png">
                    <h5>美妆护肤</h5>
                    <p>月引客1538<img src="~@/assets/icon/hot.png"><img src="~@/assets/icon/hot.png"></p>
                </li>
                 <li>
                    <img src="~@/assets/img/goods.png">
                    <img class="icon" src="~@/assets/icon/two.png">
                    <h5>美妆护肤</h5>
                    <p>月引客158<img src="~@/assets/icon/hot.png"></p>
                </li>
                <li>
                    <img src="~@/assets/img/goods.png">
                    <img class="icon" src="~@/assets/icon/three.png">
                    <h5>美妆护肤</h5>
                    <p>月引客158<img src="~@/assets/icon/hot.png"></p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
import products from '@/components/Products'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
const bannerId = 1
const themeIds = '1,2,3'
export default {
    name: 'Home',
    data() {
        return {
            imgList: [],
            themeList: [],
            recentList: [],
            datalist:[],
            num:''
        }
    },
    created() {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: {id: id}})
        },
        linkToTheme(id) {
            this.$router.push({
                path: '/page/theme',
                query: {id:id}
            })
        },
        addGoods(){
            this.$router.push({ path: '/page/addGoods' })
        },
        dyinvite(){
            this.$router.push({ path: '/page/dyinvite' })
        },
        // 首页数据接口
        indeData(){
          const _this = this
          const url =`${myPub.URL}/merchant/Shop/index`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',`${openId.open_id}`);
          axios.post(url,params).then(response => {
            const data = response.data.data
            this.num = data
            this.datalist = data.category_list
            console.log(data.category_list)
          }).catch((err) => {
            console.log(err)
          })
        },
        // 跳转营销商品
        maketing(id){
            this.$router.push({ path: '/page/addGoods',query: {id:id}})
        }
    },

    components: {
        Swiper,
        SwiperItem,
        products,
        ButtonTab,
        ButtonTabItem,
        Divider
    },
    //页面加载后执行
    mounted(){
        this.indeData()
    }
}
</script>

<style scoped lang="less">
.home {
    background: #f8f7f7;
    padding-bottom:0px;
    .index_banner{
        width:100%;
        height:190px;
        img{
            display:block;
            width:100%;
            height:190px;
        }
    }
    .selected-themes{
        overflow: hidden;
        padding: 17px 15px 25px 1rem;
        margin-top: 10px;
        background: #fff;
        height: 12rem;
        .selected-box{
            width:100%;
            height:11rem;
        }
        .title{
            font-size: 1rem;
            .Notes{padding: 0.2rem 0.6rem;background: #f54321;color: #fff;line-height: 1.5rem;text-align: center;border-radius: 66px;font-size: 0.5rem;font-weight: normal;margin-left: 0.5rem;}
            .see{font-size:0.8rem;float:right;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.3rem;}}
        }
        ul{
            display:flex;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 10px;
            white-space: nowrap;
            width:100%;
            height:11rem;
        }
        ul::-webkit-scrollbar {
            display: none;
        }
        li{list-style: none;border: 1px solid #eeeeee;min-width:35%;float: left;margin-top: 1rem;margin-left: 1rem;padding:0px 5px;
        .commodity_name{text-align: center;color:#333333;height:20px;font-size:0.8rem;line-height:20px;padding:10px 0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
            img{display: block;width:4rem;height:4rem;margin:0 auto;}
            .comm_price{
                height:20px;
                span{
                    font-size:12px;
                    img{
                        display:inline-block;
                        width:12px;
                        height:12px;
                    }
                }
                label{
                    display:inline-block;
                    width:auto;
                    height:auto;
                    font-size:12px;
                    padding:1px;
                    border:1px solid #F54321;
                    margin-left:6px;
                    margin-right:5px;
                    color:#F54321;
                    border-radius:2px;
                }
            }
        }
        li:first-child{margin-left: 0;}
    }
    .recent-products {overflow: hidden;
        padding: 17px 15px 0px 15px;
        margin: 10px 0px 0px 0px;
        background: #fff;
        height: 12rem;
        .title{
            font-size: 1rem;
            span{font-size: 0.8rem;color: #999999;font-weight: normal;}
            .see{font-size:0.8rem;float:right;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.3rem;}}
        }
        ul{
            display:flex;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 10px;
            white-space: nowrap;
        }
        ul::-webkit-scrollbar {
            display: none;
        }
        li{list-style: none;border: 1px solid #eeeeee;min-width:35%;float: left;margin-top: 1rem;margin-left: 1rem;padding:0px 5px;position:relative;
            h5{text-align: center;color:#333333;height:20px;font-size:0.8rem;line-height:20px;padding:10px 0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
            p{font-size: 0.8rem;color: #f54321;text-align: center;
            img{width:0.8rem;height:0.8rem;display: inline-block;margin-left:3px;}
            }
           img{display: block;width:4rem;height:4rem;margin:0 auto;}
            .hide{display: none;}
            .icon{position: absolute;width: 1.5rem;height:1.5rem;top: 0.3rem;left: 0;}
        }
        li:first-child{margin-left: 0;}
    }

    .mid_tab{
        width:100%;
        height:auto;
        background-color:#ffffff;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        padding-top:15px;
        padding-bottom:15px;
        box-sizing:border-box;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#333333;
        letter-spacing:0;
        text-align:right;
        .mid_tab_item{
            width:25%;
            height:100%;
            text-align:center;
            .img{
                display:block;
                /*background:#eeeeee;*/
                margin:auto;
                width: 50px;
                height: 50px;
                margin-bottom:8px;
            }
        }
    }
    .customer_quantity{
        width:100%;
        min-height:180px;
        /*border:1px solid red;*/
        box-sizing:border-box;
        margin-top:10px;
        background:#ffffff;
        padding:17px 15px 25px 15px;
        .customer_quantity_title{
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#999999;
            letter-spacing:0;
            text-align:left;
        }
        .customer_quantity_cont{
            min-height:2rem;
            .customer_quantity_num{
                float:left;
                font-family:PingFangSC-Semibold;
                font-size:1.1rem;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                font-weight: 600;
            }
            .customer_quantity_qs{
                float:right;
                font-family:PingFangSC-Regular;
                font-size:0.8rem;
                color:#999999;
                letter-spacing:0;
                .customer_quantity_qsimg{
                    display:inline-block;
                    width:1rem;
                    height:1rem;
                    vertical-align: top;
                    background:url(~@/assets/icon/zushi.png) no-repeat
                        right center;
                    background-size:100% 100%;
                }
            }
        }
        .customer_quantity_box{
            margin-top:10px;
            width:100%;
            .customer_quantity_m{
                float:left;
                background:#ff8b45;
                width:48%;
                height:80px;
                font-family:PingFangSC-Regular;
                font-size:0.8rem;
                color:#ffffff;
                letter-spacing:0;
                text-align:left;
                box-sizing:border-box;
                padding:1rem;
            }
            .customer_quantity_d{
                float:right;
                background:#ed765b;
                width:48%;
                height:80px;
                font-family:PingFangSC-Regular;
                font-size:0.8rem;
                color:#ffffff;
                letter-spacing:0;
                text-align:left;
                box-sizing:border-box;
                padding:1rem;
            }
            .customer_quantity_mnum,.customer_quantity_dnum{
                font-weight:600;
                font-size:1rem;
            }
        }
    }
}
</style>