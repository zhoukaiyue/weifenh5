<template>
    <div class="goods">
        <!-- 顶部数据 -->
        <div :class="{top: choosed1, top_selecct: choosed2}">
            <ul>
                <li>
                    <p>访问数(个)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">{{datalist.marketing_data.visit_count}}</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/ys.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/ys.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f18: choosed1, f18_selecct: choosed2}">{{datalist.marketing_data.visit_count}}</span>
                    </p>
                </li>
                <li>
                    <p>订单量(单)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">{{datalist.marketing_data.order_count}}</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/ys.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/ys.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f19: choosed1, f19_selecct: choosed2}">{{datalist.marketing_data.order_now_count}}</span>
                    </p>
                </li>
                <li>
                    <p>销售量(件)</p>
                    <p :class="{f16: choosed1, f16_selecct: choosed2}">{{datalist.marketing_data.order_goods_count}}</p>
                    <p :class="{f17: choosed1, f17_selecct: choosed2}">今日 <span>
                    <img src="~@/assets/icon/ys.png" v-if="choosed1" class="img_cate">
                    <img src="~@/assets/icon/ys.png" v-if="choosed2" class="img_cate">
                    </span>  <span :class="{f20: choosed1, f20_selecct: choosed2}">{{datalist.marketing_data.order_now_goods_count}}</span>
                    </p>
                </li>
            </ul>
        </div>
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
        <!-- 商品列表 -->
        <div class="goods-list">
            <ul>
                <li v-for="(item,index) in goodlist" v-show="show" >
                    <div class="bb t" @click='ToCommoditydetail(item.goods_id)'> 
                        <div class="goods-img">
                            <img v-lazy='item.img_src'>
                            <p>{{item.recpos_name}}</p>
                        </div>
                        <div class="goods clerfix"  >
                             <h5>{{item.goods_name}}<span class="goodsId">{{item.goods_id}}</span></h5>
                            <p><span class="price">￥{{item.shop_price}}</span> <span class="y-charge">券后价</span> <span class="charge">￥{{item.markte_price}}</span>
                                <a href="javascript:">
                                   <img src="~@/assets/icon/goods-left.png">
                                </a>
                            </p>
                            <ul class="list fl">
                                <li>销量 <span>{{index}}</span>
                                </li>
                                <li>库存 <span>{{item.goods_stock}}</span>
                                </li>
                            </ul>
                            <ul class="list fr">
                                <li>成交订单 <span>{{item.order_count}}</span>
                                </li>
                                <li>添加时间 <span>{{item.create_time.split(" ")[0]}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="bottom">
                        <ul class="bottom_operating">
                            <li @click="Todetail(item.goods_id)">
                                <p>
                                    <img src="~@/assets/icon/categroy-yl.png">
                                </p>
                                <p>商品预览</p>
                            </li>
                            <li @click='ToCommoditydetail(item.goods_id)'>
                                <p>
                                    <img src="~@/assets/icon/categroy-yx.png">
                                </p>
                                <p>营销分析</p>
                            </li>
                            <li v-if="choosed2" @click="Commodityframe(1,item.goods_id)">
                                <p>
                                    <img src="~@/assets/icon/categroy-select.png">
                                </p>
                                <p>加入营销</p>
                            </li>
                            <li v-if="choosed1" @click="Commodityframe(2,item.goods_id)">
                                <p>
                                    <img src="~@/assets/icon/categroy-xj.png">
                                </p>
                                <p>商品下架</p>
                            </li>
                            <li class="select" v-if="choosed1" v-on:click="showcode(item.goods_id)">
                                <p>
                                    <img src="~@/assets/icon/categroy-tg.png">
                                </p>
                                <p>营销推广</p>
                                <!-- <div style="height:16px;width:100%;background-color: #f8f7f7;"></div> -->
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 分享二维码弹窗样式 -->
        <div class="code_box" v-if="show_code">
            <div class="code_bg"></div>
            <div class="code_title">长按保存图片,分享让客户购买商品哦~</div> 
            <!-- 商品图片-->
            <div class="code_com">
                <img src="">
            </div>
            <!--关闭按钮-->
            <div class="code_close" @click="hidecode()"></div>
        </div>
        <!-- 添加商品 -->
        <div class="add-goods" v-on:click="linktoDetail">
            <img src="~@/assets/icon/goodsadd.png">
            <p>添加商品</p>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tabbar, TabbarItem,ViewBox,Actionsheet, Tab, TabItem, Swiper, SwiperItem,Qrcode, GroupTitle,  Divider,XDialog, Popup, Group,XInput, base64, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import $ from 'jquery'
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
    deactivated () {
        this.$destroy()
    },
    computed: {
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail() {
            this.$router.push({ path: '/page/addgoods'})
        },
        //进入商品营销详情
        ToCommoditydetail(id) {
            this.$router.push({ path: '/page/storearmketingdetails', query: { id: id } })
        },
        Todetail(id) {
            this.$router.push({ path: '/page/detail', query: { id: id } })
        },
        //显示二维码分享
        showcode(id){
            this.show_code=true;
            $('body').css('overflow','hidden')
            const _this = this;
            const url =`${myPub.URL}/merchant/Shop/goodsShareQr` 
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('id',id);
            axios.post(url,params).then(response => {
                const data = response.data
                if (data.status == '200') {
                    console.log(data)
                    $(".code_com img").attr('src',data.promotion_src)
                }
                if (response.data.status =='1024') {
                  this.$vux.alert.show({
                      content: response.data.msg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      location.href = '/login'
                  }, 3000)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        //关闭二维码分享
        hidecode(){
            this.show_code=false;
            $('body').css('overflow','auto')
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
            _this.$loading.show();//出现
            const url =`${myPub.URL}/merchant/Shop/shopMarketing`;
            var params = new URLSearchParams();
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
            console.log(response.data.status)
            if (status == "200") {
                _this.$loading.hide();//隐藏
                const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
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
            if (response.data.status =='1024') {
                _this.$loading.hide();
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  location.href = '/login'
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
              _this.choosed1=false;
        	  _this.choosed2=true;
            const url =`${myPub.URL}/merchant/Shop/shopMarketing`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
             params.append('open_id',localStorage.openid);
            params.append('type','2');
            axios.post(url,params).then(response => {
            if (response.data.status =='1024') {
                this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  location.href = '/login'
              }, 3000)
            }
            if (response.data.status == "200") {
                _this.$loading.hide(); //隐藏
                const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
                console.log(data)
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
        // 营销中
        selectStyle1 () {
            const _this = this;
            $(".click2").removeClass('select');
            $(".click1").addClass('select')
            _this.$loading.show();//显示
             _this.choosed1=true;
        	 _this.choosed2=false;
            const url =`${myPub.URL}/merchant/Shop/shopMarketing`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            // params.append('open_id',localStorage.openid);
            params.append('open_id',localStorage.openid);
            params.append('type','1');
            axios.post(url,params).then(response => {
            if (response.data.status =='1024') {
                    this.$vux.alert.show({
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                }, 3000)
            }
            if (response.data.status == "200") {
                _this.$loading.hide(); //隐藏
                const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
                console.log(data)
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
        //店铺营销数据
        storemaketing(){
            const url =`${myPub.URL}/merchant/Shop/shopMarketing`;
            const _this =this
            _this.$loading.show();//显示
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('type','1');
            axios.post(url,params).then(response => {
            if (response.data.status =='1024') {
                    this.$vux.alert.show({
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                  }, 3000)
                }
            if (response.data.status == "200") {
                _this.$loading.hide(); //隐藏
                const data =response.data.data
                _this.datalist = data
                _this.goodlist=data.list
                console.log(data)
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
        // 商品下架 和加入营销
        Commodityframe(a,id){
            console.log('fangfahebingl ')
            const url =`${myPub.URL}/merchant/Shop/goodsUpDown`;
            const _this =this;
            this.$loading.show();//显示
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('type',a);
            params.append('id',id);
            axios.post(url,params).then(response => {
            console.log(response)
            const status = response.data.status
            console.log(status)
                if (status == 200||status == '200') {
                     this.$loading.hide(); //隐藏
                     if(a==1){
                        _this.selectStyle()
                     }else{
                        _this.selectStyle1()
                     }
                }else{
                    _this.$loading.hide(); 
                    this.$vux.alert.show({
                        
                        content: response.data.msg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
                }
                if (response.data.status =='1024') {
                  this.$vux.alert.show({
                      content: response.data.msg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      location.href = '/login'
                  }, 3000)
                }
                const data =response.data
                console.log(data.status)
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    components: {
        PopupPicker,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Qrcode,
        Divider,
        XDialog,
        Popup,
        Group,
        XSwitch,
        Popup,
        Group,
        Cell,
        XSwitch,
        Toast,
        XAddress,
        XButton,
        GroupTitle,
        Tabbar,
        TabbarItem,
        ViewBox,
        Actionsheet,
        TransferDom
    }
}
</script>
<style type="text/css">
    .weui-cells{opacity:0 }
    .weui-switch{height: 42px!important;right: 15px;}
</style>
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
    border-bottom: 1px solid #f0f0f0;
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
        margin-bottom:10px;
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom: 20px;
            p {
                color: #ffffff;
                font-size:0.9rem;
                line-height: 25px;
            }
        }
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
            font-size:0.9rem;
            color:#ffffff;
            letter-spacing:0;
            text-align:center;
        }
    }
    .top_selecct {
        background: -webkit-linear-gradient(#ff795e, #ff7f40);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#ff795e, #ff7f40);
        /*red Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#ff795e, #ff7f40);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(#ff795e, #ff7f40);
        margin-bottom:10px;
        /* 标准的语法 */
        li {
            display: inline-block;
            width: 32%;
            text-align: center;
            margin-top: 30px;
            margin-bottom:20px;
            p {
                color: #ffffff;
                font-size:0.9rem;
                line-height: 25px;
            }
            .f16_selecct{
                font-family:PingFangSC-Semibold;
                font-size:1rem!important;
                color:#ffffff;
                letter-spacing:0;
                text-align:center;
            }
            .f17_selecct{
                font-family:PingFangSC-Regular;
                font-size:0.8rem;
                color:#ffffff;
                letter-spacing:0;
                text-align:center;
            }
            .f18_selecct, .f19_selecct, .f20_selecct {
                font-family:PingFangSC-Regular;
                font-size:0.9rem;
                color:#ffffff;
                letter-spacing:0;
                text-align:center;
            }
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
        .select{position: relative;}
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
        li {
            background: #ffffff;
            margin-top: 0.8rem;
            .t {
                padding: 1.5rem 1rem 1rem 1.5rem;
            }
            .goods-img {
                position: relative;
                width:30%;
                display: inline-block;
                vertical-align:top;
                img {
                    width: 100%;
                }
                p {
                    position: absolute;
                    bottom: 0;
                    background: rgba(153, 153, 153, .7);
                    text-align: center;
                    line-height: 25px;
                    color: #ffffff;
                    font-size: 10px;
                    width: 100%;
                }
            }
            .goods {
                display: inline-block;
                margin-left:2%;
                width: 65%;
                background: #ffffff;
                h5 {
                    width: 95%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    font-weight: normal;
                    color: #333;
                    position: relative;
                    .goodsId{position: absolute;opacity: 0;top: 0;right: 0;}
                }
                p {
                    margin-top: 10px;
                }
                .price {
                    color: #f54321;
                    font-size:1rem;
                    font-weight: 600;
                }
                .y-charge {
                    display: inline-block;
                    color:#f54321;
                    border: 1px solid #f54321;
                    padding: 0 3px;
                    font-size:0.6rem;
                    position: relative;
                    bottom: 0.1rem;
                }
                .charge {
                    color: #999999;
                    position: relative;
                    font-size: 0.7rem;
                }
                .charge:after {
                    content:'';
                    display: inline-block;
                    position: absolute;
                    width: 100%;
                    top: 50%;
                    height: 1px;
                    background: #999999;
                    left: 0;
                }
                .list {
                    display: inline-block;
                    li {
                        line-height: 25px;
                        padding: 0;
                        font-size: 0.7rem;
                        list-style: none;
                        color: #777;
                        margin-top: 0;
                    }
                }
                a {
                    float: right;
                    img {
                        width: 0.5rem;
                    }
                }
            }
        }
        /*商品列表底部数据*/
        .bottom {
            .bottom_operating {
                list-style:none;
                display:flex;
                flex-direction: row;
                white-space: nowrap;
                justify-content:space-between;
                li {
                    width:25%;
                    font-family:PingFangSC-Regular;
                    font-size:0.8rem;
                    color:#777777;
                    letter-spacing:0;
                    text-align:center;
                    padding:14px 0;
                    margin-top: 0;
                    position: relative;
                    img {
                        width:19px;
                    }
                }
                .select{p{color: #f54321}}
            }
        }
        /*添加商品*/
    }
    /*添加商品*/
    .add-goods {
        position: fixed;
        top: 42%;
        right: 1rem;
        width: 4.2rem;
        height:4.2rem;
        border-radius: 50%;
        background: #ff8134;
        text-align: center;
        z-index:11;
        img {
           margin-top: 0.7rem;
        }
        p {
            color: #ffffff;
            font-size: 0.75rem;
            line-height: 10px;
        }
    }
}
    /*分享二维码组建样式*/
    .code_box{width:100;height:100%;text-align: center;
        .code_bg{
            width:100%;
            height:100%;
            position: fixed;
            top:0;
            background:#000000;
            opacity:0.5;
            z-index:10000000000;
        }
        .code_title{
            width:100%;
            height:35px;
            position: fixed;
            top:0;
            background:#F54321;
            z-index:100000000001;
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
            z-index:100000000001;
            img{width: 100%;}
        }
        .code_close{
            width:20px;
            height:20px;
            position: fixed;
            z-index:100000000001;
            top:12%;
            right:12%;
            margin-left:-20px;
            background:url(~@/assets/icon/close.png) no-repeat
                        right center;
              background-size:100% 100%;
        }
    }
</style>
