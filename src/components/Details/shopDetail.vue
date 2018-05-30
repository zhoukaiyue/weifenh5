<template>
    <div class="detail page">
        <div class="detail-main"
             v-if="product">
            <!-- 商品详情轮播图 -->
             <swiper :list="demo01_list" v-model="demo02_index" @on-index-change="demo01_onIndexChange">
             </swiper>
            <div class="cart-box marketing-box">
                <div class="product-counts">
                    <div class="picker"></div>
                    <span class="counts-tips">客服</span>
                </div>
                <div class="add-cart-btn "  v-on:click="code">
                    <span class="add-cart">立即生成二维码</span>
                <!-- 生成并分享二维码 -->
                <span id="fenxiang_falsebtn"></span>
                <group id="fenxiang">
                  <x-switch v-model="showHideOnBlur" title="" id="fenxiang_btn"></x-switch>
                </group>
                </div>
            </div>
            
            <!--商品详情信息 -->
            <div class="product-info-box">
                <div class="price">
                    <span class="coupon_price">券后价</span>￥{{product.markte_price}} <s>￥{{product.shop_price}}</s>
                    <span class="order_information order_information_s">包税</span><span class="order_information">包邮</span>
                </div>
                <div class="sold_information">
                    <div class="sold"><span>已售</span>{{product.sales_volume}}件</div>
                    <div class="preview">已有<span>{{product.click_count}}</span>人预览</div>
                </div>
                <div class="name_box">
                    <div class="name_tbor"></div>
                    <p class="name">{{product.goods_name}}</p>
                </div>
                <div class="country">
                    <div class="country_span">来自
                    <img v-lazy="product.natinal_flag" alt="">
                    {{product.natinal_name}}日本</div>
                    <div class="country_label">本商品售价已含税，无需额外支付税费</div>
                 </div>
            </div>
        </div>

        <!-- 领取优惠券部分 -->
        <group class="bgf">
          <x-switch title="领券" v-model="show13" id="title——lq"></x-switch>
          <img class="img" src="~@/assets/icon/goods-left.png">
        </group>
        <div v-transfer-dom>
          <popup v-model="show13" position="bottom" max-height="50%">
            <group>
              <cell v-for="i in couponlist" >
                <div id="use_information">
                <p class="price_box"><span class="com_price">￥{{i.a}}</span><span class="com_range">{{i.b}}</span></p>
                <p class="com_limit">{{i.c}}</p>
                <p class="com_time">{{i.d}}</p>
                </div>
                <button class="com_btn">立即使用</button>
              </cell>
            </group>
            <div style="padding: 15px;">
              <x-button @click.native="show13 = false" plain type="primary"> 关闭 </x-button>
            </div>
          </popup>
        </div>

        <div class="detail-bottom" style="margin-bottom:0px;">
            <tab :line-width=2
                 active-color='#f54321'
                 v-model="index">
                <tab-item class="vux-center"
                          :selected="selectd === item"
                          v-for="(item, index) in list"
                          @click="selectd = item"
                          :key="index">{{item}}
                </tab-item>
            </tab>

            <swiper v-model="index" height="auto" :show-dots="false">
                <swiper-item v-for="(item, index) in list"
                             :key="index">
                    <div class="tab-swiper vux-center">{{item}}</div>
                </swiper-item>
            </swiper>
            <div v-transfer-dom>
              <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
                <div class="img-box">
                  <h5>{{product.shop_name}}赠福利啦~</h5>
                  <p>{{product.goods_name}}</p>
                  <img v-lazy="product.img_src">
                </div>
                <div @click="showHideOnBlur=false" class="qrcode_box clearfix">
                   <qrcode :value="code_url"  id="fx-qcode" type="img"></qrcode>
                   <div class="code_right">
                       <span class="shoprce">RMB {{product.markte_price}}</span>
                       <p class="maketprice">市场价 {{product.shop_price}}</p>
                       <p>长按二维码识别详情</p>
                   </div>
                </div>
              </x-dialog>
            </div>

        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem,Qrcode, GroupTitle,  Divider,XDialog, Popup, Group, Cell, XButton, XSwitch, Toast, XAddress, ChinaAddressData,TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
import $ from 'jquery'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'

const tabList = () => ['图文详情', '商品解答']
const baseList = [{
      img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    },
    {
      img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    },
    {
      img: 'https://static.vux.li/demo/5.jpg', // 404
      fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]
export default {
    name: 'detail',
    directives: {
        TransferDom
    },
    data() {
        return {
            product:'',
            countsArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            count: ['1'],
            list: tabList(),
            selectd: '图文详情',
            index: 0,
            isFly: false,
            isShake: false,
            value: 'https://vux.li',
            fgColor: '#000000',
            qrcode_url: ``,
            avatar_url: ``,
            friendName: '',
            imageUrl: null,
            showScrollBox: false,
            show13: false,
            showHideOnBlur: false,
            couponlist:'',
            demo01_list: '',
            demo02_index: 1,
            //二维码链接地址
            code_url:''
        }
    },
    deactivated () {
        this.$destroy()
    },
    computed: {
        ...mapState(['userInfo']),
        ...mapGetters(['totalCount']),
        isDisabled() {
            return this.product.stock > 0
        }
    },
    mounted () {

    },
    created() {
        this.goods()
    },
    activated() {
    },
    methods: {
        ...mapMutations(['ADD_TO_CART']),
        linkToCart() {
            this.$router.push({ path: '/page/cart' })
        },
        demo01_onIndexChange (index) {
          this.demo01_index = index
        },
        // 商品数据
        goods(){
            const _this = this;
            const url =`${myPub.URL}/merchant/Clerk/goodsInfo`;
            const id = this.$route.query.id
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            // params.append('open_id',localStorage.openid);
            params.append('id',id);
            axios.post(url,params).then(response => {
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
                //营销商品详情
                const data = response.data.data;
                _this.product=data;
                //商品详情轮播图
                _this.demo01_list=data.goods_photo;
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

        // 分享二维码图片
        code(){
            const _this = this;
            const url =`${myPub.URL}/merchant/Clerk/goodsShareQr` 
            const id = this.$route.query.id
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('id',id);
            axios.post(url,params).then(response => {
                const data = response.data
                // if (data.status == '200') {
                //     console.log(data)
                //     $("#fx-qcode img").attr('src',data.img_src)
                // }
                // if (response.data.status =='1024') {
                //   this.$vux.alert.show({
                //       content: response.data.msg
                //   })
                //   setTimeout(() => {
                //       this.$vux.alert.hide()
                //       location.href = '/login'
                //   }, 3000)
                // }
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
                    _this.code_url = data.qr_str;
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
        GroupTitle
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
@import '~vux/src/styles/close.less';
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix{
    zoom:1;
}
.bgf{background-color: #ffffff}
    .detail {
    background-color:#f9f9f9;
    .img{position: absolute;top:0.9rem;right: 1.2rem;width: 0.7rem;}
    .detail-main {
    background:#ffffff;
    .fixed-cart-box {
    position:fixed;
    z-index:100000000;
    top:71px;
    right:0.6rem;
    width:40px;
    height:32px;
    img {
    width:32px;
    height:32px;
}
.total-count {
    font-size:0.6rem;
    background-color:#ab956d;
    color:#ffffff;
    position:absolute;
    right:32px;
    top:0;
    height:18px;
    width:18px;
    line-height:18px;
    border-radius:18px;
    text-align:center;
}
&.animate {
    animation:animateCartScale 200ms
                    cubic-bezier(0.17,0.67,0.83,0.67);
    animation-fill-mode:backwards;
}
}.detail-img {
    position:relative;
    height:0;
    padding-top:100%;
    img {
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    vertical-align:top;
}
}.cart-box {
    height:3.5rem;
    width:100%;
    border-top:1px solid #dddddd;
    background-color:#ffffff;
    color:#ffffff;
    position:fixed;
    bottom:0;
    left:0;
    z-index:1000000;
    display:flex;
    align-items:center;
    .product-counts {
    width:30%;
    height:100%;
    background-color:#ffffff;
    font-family:PingFangSC-Regular;
    font-size:0.8rem;
    color:#666666;
    letter-spacing:0;
    text-align:center;
    box-sizing:border-box;
    .picker {
    width:1.5rem;
    height:1.5rem;
    background:url(~@/assets/icon/shop_kefu.png) no-repeat
                        right center;
    background-size:100% 100%;
    margin:5px auto 2px auto;
    /*border:1px solid red;
    */
}
.counts-tips {
    display:block;
    height:40%;
    font-size:1rem;
}
}.add-cart-btn {
    height:100%;
    line-height:55px;
    font-family:PingFangSC-Regular;
    font-size:1.2rem;
    color:#ffffff;
    letter-spacing:0;
    text-align:center;
    position:relative;
    background: #f54321;
    flex:1;
    &:active {
    color:#ffffff;
}
&.disabled {
    color:#d5d5db;
}
.icon-cart {
    margin-left:20px;
    height:16px;
    width:16px;
    background:url(~@/assets/icon/cart.png) no-repeat;
    background-size:100% 100%;
}
.small-top-img {
    width:80px;
    height:80px;
    right:5px;
    position:absolute;
    // opacity:0;
    visibility:hidden;
    &.animate {
    // opacity:1;
    visibility:visible;
    transition:all 1000ms
    cubic-bezier(0.175,0.885,0.32,1.275);
}
}}}.product-info-box {
    border-top:1px solid #eeeeee;
    border-bottom:1px solid #eeeeee;
    padding:8px 0;
    color:#454552;
    /*text-align:center;
    */
    div {
        margin:10px auto;
        &.stock {
        font-size:0.6rem;
        &.no {
        color:#b42f2d;
    }
}&.country {
    width:100%;
    padding:0px 17px;
    font-size:0.6rem;
    color:#999999;
    letter-spacing:0;
    text-align:left;
    display:flex;
    height:2rem;
    line-height:2rem;
    /*border:1px solid red;*/
    box-sizing:border-box;
    flex-wrap:nowrap;
    justify-content:space-between;
    .country_span {
    font-size: 0.9rem;
    img {
    display:inline-block;
    width:1.5rem;
    height:1rem;
    /*background:red;*/
    vertical-align: middle;
}
}.country_span,.country_label {
    font-size: 0.7rem;
    margin:0;
}
}&.name_box {
    box-sizing:border-box;
    width:100%;
    font-size:20px;
    padding:0px 17px;
    .name_tbor {
    background:#eeeeee;
    width:100%;
    height:1px;
}
.name {
    font-family:PingFangSC-Semibold;
    font-size:1rem;
    color:#333333;
    letter-spacing:0;
    text-align:left;
    font-weight:700;
}
}&.price {
    font-size:1.3rem;
    color:#f54321;
    .coupon_price {
    margin-left:17px;
    margin-top:6.5px;
    float:left;
    border:1px solid #f54321;
    border-radius:4px;
    width:40px;
    height:17px;
    line-height:17px;
    font-family:PingFangSC-Semibold;
    font-size:0.6rem;
    color:#f54321;
    letter-spacing:0;
    text-align:center;
}
s {
    font-family:PingFangSC-Regular;
    font-size:14px;
    color:#999999;
    letter-spacing:0;
    text-align:left;
}
.order_information {
    display:inline-block;
    background:#ff5f41;
    border-radius:4px;
    width:33px;
    height:23px;
    margin-left:10px;
    font-family:PingFangSC-Regular;
    font-size:0.6rem;
    color:#ffffff;
    letter-spacing:0;
    text-align:center;
    line-height:23px;
    vertical-align:text-bottom;
}
.order_information_s {
    background:#56c66a;
}
}}}}.detail-bottom {
    background:#ffffff;
    margin-top:15px;
    .tab-swiper {
    background-color:#ffffff;
    height:180px;
    margin-bottom:0px!important;
}
}.sold_information {
    width:100%;
    height:17px;
    display:flex;
    /*border:1px solid red;
    */
        box-sizing:border-box;
    flex-wrap:nowrap;
    justify-content:space-between;
    padding:0px 17px;
    font-family:PingFangSC-Regular;
    font-size:13px;
    color:#999999;
    letter-spacing:0;
    text-align:left;
    .sold {
    height:100%;
    margin:0px!important;
}
.preview {
    height:100%;
    margin:0px!important;
}
}}@keyframes animateCartScale {
    0% {
    -webkit-transform:scale(1.2);
}
100% {
    -webkit-transform:scale(1);
}
}.page {
    height:100%;
    width:100%;
    position:relative;
    background-size:cover;
    font-family:PingFangSC-Regular;
    color:#757575;
    .avatar {
    position:absolute;
    z-index:999;
    height:8%;
    width:13%;
    right:30.3%;
    bottom:15.3%;
    img {
    height:100%;
    width:100%;
    overflow:hidden;
    border-radius:50%;
}
}.bg {
    position:absolute;
    display:block;
    max-width:100%;
    height:auto;
    z-index:997;
}
.mention {
    margin-bottom:1rem;
    /* margin-top:1.2rem;
    */
    font-size:1.5rem;
    height:1.6rem;
}
.qrcode {
    z-index:999;
    position:absolute;
    left:60%;
    bottom:12%;
    width:80px;
    height:80px;
    img {
    height:100%;
    width:100%;
}
}.image {
    width:100%;
    height:32rem;
}
/*iphone 5s*/
  @media screen and (max-width:320px) {
    .avatar {
    bottom:15.8%;
}
.qrcode {
    bottom:11%;
}
}}.popup0 {
    padding-bottom:15px;
    height:200px;
}
.popup1 {
    width:100%;
    height:100%;
}
.popup2 {
    padding-bottom:15px;
    height:400px;
}
.position-vertical-demo {
    background-color:#ffe26d;
    color:#000;
    text-align:center;
    padding:15px;
}
.position-horizontal-demo {
    position:relative;
    height:100%;
    .vux-close {
    position:absolute;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%) scale(4);
    color:#000;
}
}.vux-popup-dialog {
    z-index:2000000;
}
.weui-cell {
    width:100%;
    height:100px;
    padding:0px;
    box-sizing:border-box;
    background:url(~@/assets/img/yhq_bg.jpg) no-repeat;
    background-size:100% 100%;
    position:relative;
    #use_information {
    float:left;
    text-align:left;
    position:absolute;
    left:1rem;
    top:12.5px;
    width:65%;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    .price_box {
    color:#ff8134;
    .com_price {
    font-family:PingFangSC-Semibold;
    font-size:1.3rem;
    color:#ff8134;
    letter-spacing:0;
    text-align:center;
}
.com_range {
    font-family:PingFangSC-Regular;
    font-size:1rem;
    margin-left:1rem;
    color:#ff8134;
    letter-spacing:0;
    text-align:left;
}
}.com_limit {
    font-family:PingFangSC-Regular;
    font-size:0.8rem;
    color:#333333;
    letter-spacing:0;
    text-align:left;
    height:1.5rem;
    line-height:1.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
.com_time {
    font-family:PingFangSC-Regular;
    font-size:0.8rem;
    color:#333333;
    letter-spacing:0;
    text-align:left;
    height:1rem;
    line-height:1rem;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
}}.com_btn {
    background:#ff8134;
    border-radius:1rem;
    width:5rem;
    height:2rem;
    border:0;
    margin-right:0.5rem;
    font-family:PingFangSC-Regular;
    font-size:0.8rem;
    color:#ffffff;
    letter-spacing:0;
    text-align:center;
}
#title——lq {
    background:none;
    width:100%;
    height:50px;
    padding:0px 17px;
    box-sizing:border-box;
}
.weui-btn_plain-primary {
    color:#ff8134;
    border:1px solid #ff8134;
}
@import '~vux/src/styles/close';

.dialog-demo {
  .weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    padding: 0 2rem;
    height: 350px;
    width:80%;
    overflow: hidden;
    h5{margin-top: 2rem;color: #EF2B1A}
    p{font-size: 0.8rem;margin-top: 5px;}
    img{width: 100%;margin-top: 1.5rem;}
  }
  .code_right{float: left;text-align: left;
    .shoprce{border: 1px solid #F54321;margin-top: 20px;color: #F54321;font-size: 0.8rem;padding: 0.2rem 1rem;display: block;}
    p{color: #333333;text-align: center;font-size: 0.8rem;}
    .maketprice{font-size: 0.7rem;color: #999999;position: relative;text-align: center;margin-top: 0.5rem;}
    .maketprice:after{content: '';display: inline-block;position: absolute;width: 80%;height: 1px;left: 10%;top: 50%;background-color: #999999;}
}
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}

#fenxiang{
    background:none;
    width:100%;
    height:100%;
    border-radius:50%;
    padding-left:17px;
    box-sizing:border-box;
    border:none;
    padding:0;
    position:absolute;
    right:0px;
    top:0px;
    opacity:1;
    z-index: 11111;
}
#fenxiang_btn{
    background:none;
    width:100%;
    height:100%;
    border-radius:50%;
    padding:0;
    box-sizing:border-box;
    position:relative;
    .weui-switch{

    }
}
#fenxiang_falsebtn{
    position:absolute;
    right:20px;
    top:80px;
    display:block;
    width:30px;
    height:30px;
    background:url(~@/assets/icon/fenxiang.jpg) no-repeat;
    background-size:100% 100%;
}

#fx-qcode{
    width:80px;
    height:80px;
    margin:20px;
    margin-left:0;
    float: left;
    vertical-align:middle;
    canvas{width: 100px;height: 100px}
}
/*针对iPhone X底部footer做适配*/
@media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
    .detail .detail-main .cart-box{padding-bottom: 32px;}
}

.qrcode_box{
    width: 80%;
    margin-left: 10%;
    font-family:PingFangSC-Regular;
    font-size:1.2rem;
    color:#ffffff;
    letter-spacing:0;
    text-align:center;
    color:#333333;
}
</style>
