<template>
    <div class="goods">
        
        <!-- 中间数据 -->
        <div class="middle">
            <ul>
                <li v-on:click="selectStyle1" class="click1 select"><span>营销中（{{datalist.now_counr}}）</span>
                </li>
                <li v-on:click="selectStyle" class="click2"><span>已下架（{{datalist.other_count}}）</span>
                </li>
            </ul>
        </div>

        <!-- 商品数据查询 -->
        <div class="nav-list">
            <ul>
                <li v-bind:class="{ select: is_show1}" @click="salesVolume1()" v-if="choosed1">销量
                    <a href="javascript:" class="t" >
                        <img src="~@/assets/icon/goods-down.png">
                    </a>
                    <a href="javascript:" class="d">
                        <img src="~@/assets/icon/goods-up.png">
                    </a>
                </li>
                <li v-bind:class="{ select: is_show11}" @click="salesVolume11()" v-if="choosed2">销量
                    <a href="javascript:" class="t">
                        <img src="~@/assets/icon/goods-down.png">
                    </a>
                    <a href="javascript:" class="d">
                        <img src="~@/assets/icon/goods-up.png">
                    </a>
                </li>
                <li v-bind:class="{ select: is_show2}" @click="salesVolume2()"  v-if="choosed1">订单量<span></span>
                </li>
               <li v-bind:class="{ select: is_show22}" @click="salesVolume22()"  v-if="choosed2">订单量<span></span>
                </li>
                <li v-bind:class="{ select: is_show3}" @click="salesVolume3()"  v-if="choosed1">库存<span></span>
                </li>
                <li v-bind:class="{ select: is_show33}" @click="salesVolume33()"  v-if="choosed2">库存<span></span>
                </li>
                <li v-bind:class="{ select: is_show4}" @click="salesVolume4()" v-if="choosed1">添加时间</li>
                <li v-bind:class="{ select: is_show44}" @click="salesVolume44()" v-if="choosed2">添加时间</li>
            </ul>
        </div>
        <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
        <!-- 商品列表 category-goods.png-->
        <div class="goods-list">
            <ul class="goods-list-box">
                <li v-for="(item,index) in goodlist" v-show="show" class="goods-list-li">
                    <div @click="linkToDetail(item.goods_id)">
                        <div class="goods-img"><img v-lazy="item.img_src"></div>
                        <div class="goods-tc">{{item.recpos_name}}</div>
                        <div class="goods-name">精美亚飞女儿香水精美亚飞女儿香水精美亚飞女儿香水精美亚飞女儿香水</div>
                    </div>
                    <div class="goods-price"><span>¥385.00</span><label @click="showcode()">生成二维码</label></div>
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
import Vue from 'vue'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import $ from 'jquery'
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'

export default {
    name: 'category',
    data(){
　　　　return {
　　　　　  active: false,
            is_show1: true,
            is_show2: false,
            is_show3: false,
            is_show4: false,
            is_show11: true,
            is_show22: false,
            is_show33: false,
            is_show44: false,
            datalist:'',
            choosed1:true,
        	choosed2:false,
            goodlist:'',
            show:true,
            is_flag:true,
            is_flag1:true,
            show_code:false
　　　　 }
　　},
    created() {
        this.storemaketing()
    },
    //清楚页面缓存
    deactivated () {
        this.$destroy()
    },
    computed: {
    },
    methods: {
        // 显示二维码分享
        showcode(){
            this.show_code=true;
        },
        // 关闭二维码分享
        hidecode(){
             this.show_code=false;
        },
        //跳转到对应商品详情
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: {id: id}})
        },
        // 订单量
        salesVolume2:function(){
            const _this = this;
            this.is_show2=true
            this.is_show1=false
            this.is_show3=false
            this.is_show4=false
            _this.public_tab(1,1,1,1,1,1,1,20)
        },
        //库存
        salesVolume3:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=true
            this.is_show4=false
            _this.public_tab(1,1,1,1,1,1,1,20)
        },
        // 添加时间
        salesVolume4:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=false
            this.is_show3=false
            this.is_show4=true
            _this.public_tab(1,1,1,1,1,1,1,20)
        },
        //销量
        salesVolume1:function(){
            const _this = this;
            this.is_show2=false
            this.is_show1=true
            this.is_show3=false
            this.is_show4=false
            const flag=this.is_flag
            if(flag){
                //请求销量高
                console.log('请求销量高')
                _this.public_tab(1,1,1,1,1,1,1,20)
                this.is_flag=!this.is_flag
            }else{
                //请求销量低
                console.log('请求销量低')
                _this.public_tab(1,2,1,1,1,1,1,20)
                this.is_flag=!this.is_flag
            }
            
        },
        //已下架tab 
        // 订单量
        salesVolume22:function(){
            const _this = this;
            this.is_show22=true
            this.is_show11=false
            this.is_show33=false
            this.is_show44=false
            _this.public_tab(2,1,1,1,1,1,1,20)
        },
        //库存
        salesVolume33:function(){
            const _this = this;
            this.is_show22=false
            this.is_show11=false
            this.is_show33=true
            this.is_show44=false
            _this.public_tab(2,1,1,1,1,1,1,20)
        },
        // 添加时间
        salesVolume44:function(){
            const _this = this;
            this.is_show22=false
            this.is_show11=false
            this.is_show33=false
            this.is_show44=true
           _this.public_tab(2,1,1,1,1,1,1,20)
        },
        //销量
        salesVolume11:function(){
            const _this = this;
            this.is_show22=false
            this.is_show11=true
            this.is_show33=false
            this.is_show44=false
            const flag1=this.is_flag1;
            if(flag1){
                //请求销量高
                console.log('请求销量高')
                _this.public_tab(2,1,1,1,1,1,1,20)
                this.is_flag1=!this.is_flag1
            }else{
                //请求销量低
                console.log('请求销量低')
                _this.public_tab(2,2,1,1,1,1,1,20)
                this.is_flag1=!this.is_flag1
            }
        },

        //tab选择切换时的方法封装
        public_tab(a,b,c,d,e,f,g,h){
            const _this=this;
            const url =`${myPub.URL}/merchant/Clerk/shopMarketing`;
            var params = new URLSearchParams();
            _this.$loading.show();//隐藏
            params.append('token',localStorage.currentUser_token);
            // params.append('open_id',localStorage.openid);
            params.append('open_id',localStorage.openid);
            params.append('type',a);
            params.append('sales_volume',b);
            params.append('order_quantity',c);
            params.append('stock',d);
            params.append('create_time',e);
            params.append('stock',f);
            params.append('page',g);
            params.append('size',h);
            axios.post(url,params).then(response => {
              console.log(response)
            const status = response.data.status
            console.log(status)
            if (status == "200") {
                setTimeout(() => {
                    _this.$loading.hide();//隐藏
                    const data =response.data.data
                    _this.datalist = data
                    _this.goodlist=data.list
                }, 2000)
            }else{
                 _this.$loading.hide();//隐藏
                this.$vux.alert.show({
                    title: '操作失败',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
            }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 已下架
        selectStyle () {
            const _this = this;
            $(".click1").removeClass('select');
            $(".click2").addClass('select')
            _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
                  _this.choosed1=false;
            	  _this.choosed2=true;
                const url =`${myPub.URL}/merchant/Clerk/shopMarketing`;
                var params = new URLSearchParams();
                params.append('token',localStorage.currentUser_token);
                 params.append('open_id',localStorage.openid);
                params.append('type','2');
                axios.post(url,params).then(response => {
                    const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })
            },2000);
    　　　　},
        // 营销中
        selectStyle1 () {
            const _this = this;
            $(".click2").removeClass('select');
            $(".click1").addClass('select')
            _this.$loading.show();//显示
                  _this.$loading.hide(); //隐藏
                  _this.choosed1=true;
            	  _this.choosed2=false;
                  const url =`${myPub.URL}/merchant/Clerk/shopMarketing`;
                var params = new URLSearchParams();
                params.append('token',localStorage.currentUser_token);
                // params.append('open_id',localStorage.openid);
                params.append('open_id',localStorage.openid);
                params.append('type','1');
                axios.post(url,params).then(response => {
                    const data =response.data.data
                    _this.datalist = data
                    _this.goodlist=data.list
                    console.log(data)
                }).catch((err) => {
                    console.log(err)
                })
    　　　　},
        //店铺营销数据
        storemaketing(){
            const url =`${myPub.URL}/merchant/Clerk/shopMarketing`;
            const _this =this
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            // params.append('open_id',localStorage.openid);
            params.append('open_id',localStorage.openid);
            params.append('type','1');
            axios.post(url,params).then(response => {
                const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        },
        // 商品下架 和加入营销
        Commodityframe(a,id){
            console.log('fangfahebingl ')
            const url =`${myPub.URL}/merchant/Shop/goodsUpDown`;
            const _this =this;
            this.$loading.show();//显示
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            // params.append('open_id',localStorage.openid);
            params.append('open_id',localStorage.openid);
            params.append('type',a);
            params.append('id',id);
            axios.post(url,params).then(response => {
                const data =response.data
                console.log(data.status)
                if (data.status == '200') {
                     // location.reload()
                     this.$loading.hide(); //隐藏
                     if(a==1){
                        this.selectStyle()
                     }else{
                        this.selectStyle1()
                     }
                }else{
                    _this.$loading.hide(); 
                    this.$vux.alert.show({
                        
                        content: data.msg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped lang="less">
.category {
    height: 100%;
    display: flex;
    overflow: hidden;
    .category-menu {
        width: 75px;
        flex: 0 0 75px;
        height: 100%;
        .menu-item {
            height: 25px;
            padding: 10px 0;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 3px solid #ffffff;
            &.active {
                color: #ab956d;
                border-color: #ab956d;
                font-size: 15px;
                // transform: scale(1.125);
                transition: all linear 0.3s;
            }
        }
    }
    .category-main {
        flex: 1;
        height: 100%;
        transition: all 500ms ease-in-out;
        .category-detail-box {
            overflow-y: auto;
            padding: 20px;
            height: 100%;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            .category-top {
                .category-header {
                    img {
                        width: 100%;
                        vertical-align: top;
                        border-radius: 2px;
                    }
                }
                .category-title {
                    margin: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .text {
                        font-size: 12px;
                        color: #ab956d;
                        font-weight: normal;
                        &::before, &::after {
                            content:'';
                            display: inline-block;
                            position: relative;
                            top: -3px;
                            width: 35px;
                            height: 1px;
                            margin: 0 10px;
                            background-color: #979797;
                            transform: scaleY(0.5);
                        }
                    }
                }
            }
            .category-list {
                display: flex;
                flex-wrap: wrap;
                .category-goods-items {
                    width: 30%;
                    margin-right: 5%;
                    margin-bottom: 10px;
                    text-align: center;
                    &:nth-child(3n) {
                        margin-right: 0;
                    }
                    .goods-image {
                        width: 80%;
                        border-radius: 50%;
                    }
                    .goods-name {
                        color: #444452;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
.goods {
    font-family:'微软雅黑';
    background: #f8f8f8;
}
/*顶部背景 样式*/
 .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content:" ";
    clear: both;
    height: 0;
}
.clearfix {
    zoom:1;
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.bb {
    border-bottom: 1px solid #dddddd;
}
.img_cate {
    vertical-align: text-bottom;
}
.goods {
    /*顶部样式*/
    .top {
        background: -webkit-linear-gradient(#ff795e, #ff7f40);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#ff795e, #ff7f40);
        /*red Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#ff795e, #ff7f40);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(#ff795e, #ff7f40);
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            p {
                color: #ffffff;
                font-size:0.8rem;
                line-height: 25px;
            }
        }
        margin-bottom:10px;
        .f16 {
            font-family:PingFangSC-Semibold;
            font-size:1rem!important;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
        .f17 {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
        .f18, .f19, .f20 {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
    }
    .top_selecct {
        background-color: #ffffff;
        background-color: #ffffff;
        background-color: #ffffff;
        /* Safari 5.1 - 6.0 */
        /*red Opera 11.1 - 12.0 */
        /* Firefox 3.6 - 15 */
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            p {
                color: #000000;
                font-size:0.8rem;
                line-height: 25px;
            }
        }
        margin-bottom:10px;
        .f16_selecct {
            font-family:PingFangSC-Semibold;
            font-size:1rem!important;
            color:#f54321;
            letter-spacing:0;
            text-align:center;
        }
        .f17_selecct {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#999999;
            letter-spacing:0;
            text-align:center;
        }
        .f18_selecct, .f19_selecct, .f20_selecct {
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            letter-spacing:0;
            text-align:center;
        }
        .f18_selecct {
            color:#f54321;
        }
        .f19_selecct, .f20_selecct {
            color:#0bac27;
        }
    }
    /*中间样式*/
    .middle {
        line-height: 30px;
        border-bottom: 1px solid #d2d2d2;
        background: #ffffff;
        li {
            display: inline-block;
            width: 49%;
            text-align: center;
            padding: 1rem 0;
            span {
                color: #373737;
            }
        }
        .select span {
            color: #f64a29;
            border-bottom: 2px solid #f64a29;
            padding-bottom:1.2rem;
            font-weight: 500;
        }
    }
    /*商品数据查询*/
    .nav-list {
        background: #ffffff;
        .select {
            color: #f64a29;
        }
        li {
            width: 23%;
            display: inline-block;
            text-align: center;
            padding: 1rem 0;
            position: relative;
            font-size:0.9rem;
            color: #777777;
            a {
                position: absolute;
                margin-left: 0.5rem;
                img {
                    width: 0.6rem;
                }
            }
            .t {
                top: 1.3rem;
            }
            .d {
                bottom: 1.3rem;
            }
        }
    }
    /*商品列表*/
    .goods-list {
        .goods-list-box{
            display:flex;
            flex-direction: row;
            flex-wrap:wrap;
            list-style:none;
            border-left:1px solid #faf9f9;
            border-top:1px solid #faf9f9;
            background-color:#ffffff;
            .goods-list-li{
                width:50%;
                height:100%;
                padding:13px;
                box-sizing:border-box;
                border-right:1px solid #faf9f9;
                border-bottom:1px solid #faf9f9;
                .goods-img{
                    width:100%;
                    height:80%;
                    img{
                        display:block;
                        width:60%;
                        height:50%;
                        margin:0 auto;
                    }
                }
                .goods-tc{
                    height:20px;
                    font-size:1rem;
                    color:#ffffff;
                    line-height:20px;
                    text-align:center;
                    background-color:#999999;
                }
                .goods-name{
                    height:40px;
                    font-size:0.8rem;
                    color:rgba(0, 0, 0, 0.87);
                    line-height:1.2rem;
                    text-align:center; 
                    display:-webkit-box;
                  -webkit-line-clamp:2;
                  overflow:hidden;
                  -webkit-line-break:auto;
                  -webkit-box-orient:vertical;
                    margin:6.5px 0px 3.5px 0px;                
                }
                .goods-price{
                    font-size:1rem;
                    color:#F54321;
                    line-height:23px;
                    text-align:left;
                    label{
                        float:right;
                        height:23px;
                        font-size:0.8rem;
                        border:1px solid #F54321;
                        padding:0px 3px;
                    }
                }

            }
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
</style>
