<template>
    <div class="home">
        <!-- 临时新建进入商品详情的入口-->
        <div class="index_banner"  @click="linkToDetail('11')">
            <img src="~@/assets/img/banner.png" alt="image">
        </div>
       <!-- tab菜单切换 -->
       <div class="mid_tab">
            <div class="mid_tab_item" v-on:click="shop">
                <img src="~@/assets/icon/dygl.png" alt="" class='img'><span>店员管理</span>
            </div>
            <div class="mid_tab_item" v-on:click="category">
                <img src="~@/assets/icon/dpyx.png" alt="" class='img'><span>店铺营销</span>
            </div>
            <div class="mid_tab_item" v-on:click="commodityData">
                <img src="~@/assets/icon/dpyj.png" alt="" class='img'><span>店铺业绩</span>
            </div>
            <div class="mid_tab_item" v-on:click="order">
                <img src="~@/assets/icon/ddgl.png" alt="" class='img'><span>订单管理</span>
            </div>
       </div>
        <!-- 当前累计客户量 -->
        <div class="customer_quantity">
        <p class="customer_quantity_title">当前累计客户量</p>
        <div class="customer_quantity_cont"><span class="customer_quantity_num">{{num.member_count}}&nbsp;<b style="font-size:0.8rem;font-weight:600;">人</b></span><label class="customer_quantity_qs" v-on:click="dyinvite"><i class="customer_quantity_qsimg"></i>&nbsp;查看员工引客趋势图</label>
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
                <ul>
                    <li v-for="(item,index) in datalist" @click="maketing(item.id)">
                        <h5>{{item.cate_name}}</h5>
                        <p>{{item.description}}</p>
                        <img v-lazy="item.cate_img">
                    </li>
                </ul>
            </div>
        </div>
        <div class="recent-products">
            <h5 class="title">店铺排行 <span>附近店家人气排行</span><!--  <span class="see">查看全部&emsp;<img src="~@/assets/icon/goods-left.png"></span> --></h5>
            <ul class="oul">
                <li v-for="(item,index) in shoplist" class="oli">
                     <input type="text" name="cloose" style="opacity:0;" :value="item">
                    <span class="ospan" :class="[{select: index == 0},{select1: index == 1},{select2: index == 2}]">{{index+1}}</span>
                    <img v-lazy='item.head_pic' alt="">
                    <h5>{{item.name}}</h5>
                    <p>月引客{{item.fans_count}}
                        <span :class="[{select11: index == 0},{select22: index == 1},{select33: index == 2}]"></span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider,Toast } from 'vux'
import $ from 'jquery'
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
            num:'',
            shoplist:[],
            isshow1:false,
            isshow2:false,
            isshow3:false,
            isshow4:false,
            isshow5:false,
            is_imgshow:false,
            src_img:''
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
        category(){
            this.$router.push({ path: '/page/category' })
        },
        shop(){
            this.$router.push({ path: '/page/shop' })
        },
        addGoods(){
            this.$router.push({ path: '/page/addGoods' })
        },
        order(){
            this.$router.push({ path: '/page/order' })
        },
        dyinvite(){
            this.$router.push({ path: '/page/dyinvite' })
        },
        commodityData(){
            this.$router.push({ path: '/page/commodityData' })
        },
        // 首页数据接口
        indeData(){
          const _this = this
          _this.$loading.show()
          const url =`${myPub.URL}/merchant/Shop/index`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            _this.$loading.hide();
                console.log(response)
            if (response.data.status =='1024') {
                 _this.$loading.hide();
                 _this.$vux.alert.show({
                 content: response.data.msg
              })
              setTimeout(() => {
                  _this.$vux.alert.hide()
                  location.href = '/login'
              }, 3000)
            }
            // token失效
            if (response.data.status =='1004') {
              _this.getData()
            }
            // // openid失效
            // if (response.data.status =='1015') {
            //     console.log('openid失效')
            //   _this.getopenid()
            // }
            // 状态码
            if (response.data.status =='200') {
               const data = response.data.data
                _this.num = data
                _this.datalist = data.category_list
                _this.shoplist = data.shop_list
                console.log(_this.shoplist.sort)
                                }else{
                  this.$vux.alert.show({
                  content: response.data.msg
                })
            }
          }).catch((err) => {
             _this.$loading.hide();
            console.log(err)
          })
        },
        // 跳转营销商品
        maketing(id){
            this.$router.push({ path: '/page/addGoods',query: { id: id } })
        }
    },

    components: {
        Swiper,
        SwiperItem,
        products,
        ButtonTab,
        ButtonTabItem,
        Divider,
        Toast
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
    padding-bottom:10px;
    .index_banner{
        width:100%;
        height:190px;
        img{
            display:block;
            width:100%;
            height:190px;
        }
    }
    .selected-themes {
        overflow: hidden;
        padding: 17px 15px 25px 15px;
        margin-top: 10px;
        background: #fff;
        height: 12rem;
        .selected-box{
            width:100%;
        }
        .title{
            font-size: 1rem;
            .Notes{padding: 0.1rem 0.6rem;background: #f54321;color: #fff;line-height: 1.5rem;text-align: center;border-radius: 66px;font-size: 0.75rem;font-weight: normal;margin-left: 0.5rem;}
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
        li{min-width:100px;list-style: none;border: 1px solid #eeeeee;width: 6rem;float: left;margin-top: 1rem;padding: 0.5rem;margin-left: 1rem;
            h5{text-align: center;color: #333333}
            p{font-size: 0.8rem;color: #999999;text-align: center;overflow: hidden;width: 90%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-weight: normal;height: 1.3rem;}
            img{display: block;width:75px;height:68px;margin:0 auto;}
            .hide{display: none;}
        }
        li:first-child{margin-left: 0;}
    }
    .recent-products {overflow: hidden;
        padding: 17px 15px 0px 15px;
        margin-top: 10px;
        background: #fff;
        height: 13rem;
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
        li{min-width:100px;list-style: none;border: 1px solid #eeeeee;width: 6rem;float: left;margin-top: 1rem;padding: 0.5rem;margin-left: 1rem;position: relative;
            h5{text-align: center;color: #333333}
            p{font-size: 0.7rem;color: #f54321;text-align: center;img{width: 0.8rem;display: inline-block;}}
            img{display: block;width: 90%;margin-left: 5%;}
            .hide{display: none;}
            .icon1{position: absolute;width: 1rem;height:2rem;top: 0.3rem;left: 0;background: url(~@/assets/icon/one.png);display: inline-block;background-size: 100%;background-repeat: no-repeat;}
            .icon2{position: absolute;width: 1rem;height:2rem;top: 0.3rem;left: 0;background: url(~@/assets/icon/two.png);display: inline-block;background-size: 100%;background-repeat: no-repeat;}
            .icon3{position: absolute;width: 1rem;height:2rem;top: 0.3rem;left: 0;background: url(~@/assets/icon/three.png);display: inline-block;background-size: 100%;background-repeat: no-repeat;}
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
            span{font-size: 0.8rem}
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
        min-height:175px;
/*        border:1px solid red;*/
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
            min-height:1.5rem;
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
                position: relative;
                top: 0.4rem;
                .customer_quantity_qsimg{
                    display:inline-block;
                    width:1rem;
                    height:0.8rem;
                    /*vertical-align: top;*/
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
                font-size:1rem;
            }
        }
    }
}
.oul{
    .oli{                font-size:1rem;
                color:#333333;
        .ospan{
                width:16px;
                height:21px;
                /*border:1px solid red;*/
                line-height:24px;
                position: absolute;
                top: 0;
                left:5px;
                transform:rotate(4deg);
                font-family:PingFangSC-Semibold;

                letter-spacing:0;
                text-align:center;
        } 
        img{
            width:50px;
            height:60px;
            margin:0 auto;
        }       
    }
}

.select{
    background: url(~@/assets/icon/one.png);display: inline-block;background-size: 100%;
color:#fff;font-size:0.8rem;color:transparent;}
.select1{background: url(~@/assets/icon/two.png);display: inline-block;background-size: 100%;color:#fff;font-size:0.8rem;color:transparent;}
.select2{background: url(~@/assets/icon/three.png);display: inline-block;background-size: 100%;color:#fff;font-size:0.8rem;color:transparent;}
.select11{
    display:inline-block;width:25px;height:13px;
    background: url(~@/assets/icon/hot.png);display: inline-block;background-size: 50%;
color:#fff;font-size:0.8rem;}
.select22,.select33{display:inline-block;width:13px;height:13px;
    background: url(~@/assets/icon/hot.png);display: inline-block;background-size: 100%;}
</style>