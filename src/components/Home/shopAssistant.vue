<template>
    <div class="home">

        <!-- banner-->
        <div class="index_banner">
            <img src="~@/assets/img/banner.png" alt="image">
        </div>

        <!-- 当前累计客户量 -->
        <div class="customer_quantity">
            <p class="customer_quantity_title">我的累计客户量</p>
            <div class="customer_quantity_cont"><span class="customer_quantity_num">&nbsp;{{access.member_count}}<b style="font-size:0.9rem;">人</b></span><label class="customer_quantity_qs" v-on:click="dyinvite"><i class="customer_quantity_qsimg"></i>&nbsp;查看同事业绩对比图</label>
            </div>
            <div class="customer_quantity_box">
                <div class="customer_quantity_m">
                    <p>本月新增客户(人)</p>
                    <p class="customer_quantity_mnum">{{access.member_mouth_count}}</p>
                </div>
                <div  class="customer_quantity_d">
                    <p>今日新增客户(人)</p>
                    <p class="customer_quantity_dnum">{{access.member_now_count}}</p>
                </div>
            </div>
        </div>

        <!--营销商品 -->
        <div class="selected-themes">
            <h5 class="title">营销商品 <span class="Notes">实惠佳品 营销利器</span> <span class="see" v-on:click="addGoods">查看全部&emsp;<img src="~@/assets/icon/goods-left.png"></span></h5>
            <div class="selected-box">
                <ul class="selected-box_ul">
                    <li v-for="(item,index) in datalist">
                        <div @click="linkToDetail(item.goods_id)">
                            <img v-lazy="item.img_src">
                            <h5 class="commodity_name">{{item.goods_name}}</h5>                        
                        </div>
                        <div class="comm_price"><span><img src="~@/assets/icon/rmb.png" alt="">{{item.shop_price}}</span><label @click="showcode()">生成二维码</label></div>
                    </li>
                </ul>
            </div>
        </div>

        <!--店铺排行 -->
        <div class="recent-products">
            <h5 class="title">店铺排行 <span>附近店家人气排行</span> <span class="see">查看全部&emsp;<img src="~@/assets/icon/goods-left.png"></span></h5>
            <ul>
                <li v-for="(item,index) in shop_list">
                    <img src="~@/assets/img/goods.png">
                    <img class="icon" src="~@/assets/icon/one.png">
                    <h5>{{item.name}}</h5>
                    <p>月引客{{item.fans_count}}<img src="~@/assets/icon/hot.png"><img src="~@/assets/icon/hot.png"></p>
                </li>
            </ul>
        </div>

        <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
        <!-- 分享二维码弹窗样式 -->
        <div class="code_box" v-if="show_code">
            <div class="code_bg"></div>
            <div class="code_title">长按保存图片,分享让客户购买商品哦~</div> 
            <!-- 商品图片-->
            <div class="code_com">
                <p></p>
            </div>
            <!--关闭按钮-->
            <div class="code_close" @click="hidecode()"></div>
        </div>

    </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
import products from '@/components/Products'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
export default {
    name: 'Home',
    data() {
        return {
            datalist:[],
            access:{},
            shop_list:[],
            show_code:false
        }
    },
    created() {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        //显示二维码分享
        showcode(){
            this.show_code=true;
        },
        //关闭二维码分享
        hidecode(){
            this.show_code=false;
        },

        //跳转到对应商品详情
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: {id: id}})
        },
        addGoods(){
            this.$router.push({ path: '/page/category' })
        },
        dyinvite(){
            this.$router.push({ path: '/page/shopdyinvite' })
        },
        //首页数据接口
        indeData(){
          const _this = this;
          const url =`${myPub.URL}/merchant/Clerk/index`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            console.log(response.data.status)
            //状态码
            const ost = response.data.status;
            // 当前状态为未登录状态 提示用户登录
            if(ost==1024||ost=='1024'){
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                }, 2000)

            }
            //当前状态为登录状态 一切正常进行
            if(ost==200||ost=='200'){
                //营销商品列表
                const data = response.data.data;
                _this.datalist = data.list;
                //累计客户量信息
                _this.access = data;
                //店铺列表
                _this.shop_list = data.shop_list
                console.log(data)
            }
            //当前请求存在某些异常 页面弹出提示框提示用户异常详情
            else{
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 2000)
            }

          }).catch((err) => {
            console.log(err)
          })
        },
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
            img{display: block;width:4rem;height:4rem;margin:16px auto 0px auto;}
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
    .recent-products {
        overflow: hidden;
        padding: 17px 15px 23px 15px;
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
        li{list-style: none;border: 1px solid #eeeeee;min-width:35%;float: left;margin-top: 1rem;margin-left: 1rem;padding:10px 5px;position:relative;
            h5{text-align: center;color:#333333;height:20px;font-size:0.8rem;line-height:20px;padding:10px 0;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
            p{font-size: 0.8rem;color: #f54321;text-align: center;
            img{width:14px;height:20px;display: inline-block;margin-left:3px;}
            }
           img{display: block;width:4.5rem;height:4rem;margin:0 auto;}
            .hide{display: none;}
            .icon{position: absolute;width: 18px;height:22px;top: 0.3rem;left: 0;}
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

    /*分享二维码组建样式*/
    .code_box{width:100;height:100%;
        .code_bg{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            background:#000000;
            opacity:0.5;
            z-index:10000000;
        }
        .code_title{
            width:100%;
            height:35px;
            position: fixed;
            top:0;
            background:#F54321;
            z-index:100000001; 
            font-size:1rem;    
            color:#ffffff; 
            line-height:35px; 
            text-align:center;
        }
        .code_com{
            width:80%;
            height:70%;
            background:#ffffff;
            position: fixed;
            top:10%;
            left:10%;
            z-index:100000001;
        }
        .code_close{
            width:40px;
            height:40px;
            position: fixed;
            z-index:100000001;
            bottom:10%;
            left:50%;
            margin-left:-20px;
            background:url(~@/assets/icon/close_code.png) no-repeat
                        right center;
              background-size:100% 100%;
        }
    }
}
</style>