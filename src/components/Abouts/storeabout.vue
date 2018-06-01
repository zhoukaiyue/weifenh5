<template>
  <div class="shop_center">
    <div class="mainInfo">
        <ul class="shop_info_left">
          <li class="shop_name">{{scdata.shop_info.name}}</li>
          <li class="storeManager">{{scdata.shop_info.contact}}&nbsp;&nbsp;<span class="storesanager_right">店长，欢迎您!</span></li>
          <li class="join_time">{{scdata.shop_info.create_time}}&nbsp;加入</li>
          <li class="passenger_traffic">
            <div  class="passenger_traffic_box" style="border:0;"><span>{{scdata.clerk_count}}</span><label>总引客量</label></div>
            <div  class="passenger_traffic_box"><span>{{scdata.member_count}}</span><label>今日订单</label></div>
            <div  class="passenger_traffic_box"><span>{{scdata.member_now_count}}</span><label>近日引客量</label></div>
          </li>
        </ul>
      <div class="shop_info_right">
        <div class='finish_room2 shop_logo'>
           <div class='room_add_btn' >
               <ossFile :imgs='imgs' :message="msg"></ossFile>
              <!--  <div class="room_opacity"></div>
              <div id="img-change2">
                <div class="img-changeImg"></div>
                <p class="img-changeText">更换店铺图像</p>
              </div> -->
            </div>
        </div>
          <!-- <img :src="scdata.shop_info.head_pic" alt="" class="shop_logo"> -->
          <span class="info_modification" @click="edit">编辑店铺信息</span>
      </div>
    </div>

  <div class="store_order">
    <p class="store_ordertext">店铺订单<label @click="order" style="font-weight: normal;">查看更多&nbsp;<span class="jiantou"></span></label></p>
    <ul class="store_order_status">
      <li class="processing"   @click="torder(0)"><span class="processing_img"></span><label>全部</label></li>
      <li class="carryout"  @click="torder1(1)"><span class="carryout_img"></span><label>进行中</label></li>
      <li class="cancel"  @click="torder2(2)"><span class="cancel_img"></span><label>已完成</label></li>
      <li class="aftersales"  @click="torder3(3)"><span class="aftersales_img"></span><label>已取消</label></li>
    </ul>
  </div>
  <div class="store_management">
    <ul class="store_managementul">
      <!-- <li><img src="~@/assets/icon/xinxi.png"><span class="store_managementli_span">店长信息管理</span><label  class="store_managementli_label">&nbsp;暂未开放<span class="jiantou"></span></label></li> -->
      <li v-on:click="shop"><img src="~@/assets/icon/xixi.png"><span class="store_managementli_span">店员管理</span><label  class="store_managementli_label">{{scdata.clerk_count}}人&nbsp;<span class="jiantou"></span></label></li>
    </ul>
  </div>
  <p class="help_center">帮助中心</p>
  <form action="http://im.weifenvip.com/?c=service" method="post">
    <input type="hidden" name="openid" :value ='openid'>
    <input type="hidden" name="goods_id" value =''>
    <input type="hidden" name="oid" value = ''>
    <input type="submit" style="cursor:pointer;outline:none" class="customer_service" value="联系客服">
  </form>
  </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast } from 'vux'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import ossFile from '../../components/oss_file'
export default {
  components: {
      Swiper,
      SwiperItem,
      ButtonTab,
      ButtonTabItem,
      Divider,
      Toast,
      ossFile
    },
    data(){
　　　　　　return {
            scdata:{},
            openid:localStorage.openid,
            msg:'store',
            imgs:'https://weifenshops.oss-cn-shanghai.aliyuncs.com/user/20180530/oo1Fj0hcOBHHOfVJWV-zz-zyflE41527678245786.png',
            isshow:true
　　　　　　}
　　　　},
    created() {
      //数据请求接口
      this.mcenterdata()
    },
    computed: {
    },
    mounted(){
    },
    methods: {
       shop() {
            this.$router.push({ path: '/page/shop'})
        },
       edit() {
            this.$router.push({ path: '/page/storeInfo'})
        },
        order(){
          this.$router.push({ path: '/page/order'})
        },
        torder(id){
          console.log(id)
         // this.$router.push({ path: '/page/order',query:{id:id}})
         this.$router.push({path: '/page/order', query:{id: id}});
        },
        torder1(id){
          console.log(id)
         // this.$router.push({ path: '/page/order',query:{id:id}})
         this.$router.push({path: '/page/order', query:{id: id}});
        },
        torder2(id){
          console.log(id)
         // this.$router.push({ path: '/page/order',query:{id:id}})
         this.$router.push({path: '/page/order', query:{id: id}});
        },
        torder3(id){
          console.log(id)
         // this.$router.push({ path: '/page/order',query:{id:id}})
         this.$router.push({path: '/page/order', query:{id: id}});
        },
        // 判断imgs变化
        imgchange(){
          const image = 'https://weifenshops.oss-cn-shanghai.aliyuncs.com/user/20180530/oo1Fj0hcOBHHOfVJWV-zz-zyflE41527671191376.png'
          if (this.imgs!=image) {
            this.isshow =false
          }
        },
        // 请求数据接口
        mcenterdata(){
          const _this = this;
          _this.$loading.show();//隐藏
          const url =`${myPub.URL}/merchant/Shop/shopCore`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            _this.$loading.hide();//隐藏
            // 登录状态不正确
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  location.href = '/login'
              }, 3000)
            }
            // token失效
            if (response.data.status =='1004') {
              _this.getData()
            }
            // 状态码
            if (response.data.status =='200') {
                console.log(response)
              _this.scdata = response.data.data;
            }else{
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
              }, 3000)
            }
          }).catch((err) => {
            console.log(err)
          })
        }
    }
}
</script>

<style scoped lang="less">
.shop_center{
    background-color:#f9f8f8;
    padding-bottom:20px;
    .container{width: 100px!important;height: 100px!important;border-radius: 50%;margin-left: 10px;}
    .mainInfo{
      width:100%;
      height:220px;
      background-color:#ffffff;
      padding:1rem 0.8rem 0.8rem 1rem;
      box-sizing:border-box;
      .shop_info_left{
          float:left;
          list-style:none;
          width:65%;
          height:100%;
          .shop_name{
            font-family:PingFangSC-Semibold;
            font-size:1.5rem;
            color:#333333;
            letter-spacing:0;
            height: 2.5rem;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .storeManager{
            font-family:PingFangSC-Semibold;
            margin-top:8px;
            font-size:1rem;
            color:#f54321;
            letter-spacing:0;
            text-align:left;
            height:25px;
            line-height:25px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /*设置背景图*/
            background:url(~@/assets/icon/storeManager.png) no-repeat
                        left center;
            background-size:25px;
            padding-left:27px;
            box-sizing:border-box;
            .storesanager_right{
              font-size:0.8rem;
              color:#333333;
            }
          }
          .join_time{
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#999999;
            letter-spacing:0;
            text-align:left;
            margin:10px 0px 20px 0px;
          }
          .passenger_traffic{
            width:100%;
            height:58px;
            display: -webkit-flex; /* Safari */
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content:space-between;
            .passenger_traffic_box:after{
                position: absolute;
                top: 20%;
                right: 0;
                content: "";
                display:inline-block;
                width: 1px;
                height: 40px;
                background: #eeeeee;
              }
            .passenger_traffic_box{
              padding: 0 0.5rem;
              flex-grow: 1;
              position: relative;
              span{
                display:block;
                width:100%;
                text-align: center;
                font-family:PingFangSC-Semibold;
                font-size:1.2rem;
                line-height:2rem;
                color:#333333;
                letter-spacing:0;
                text-align:center;
              }
              
              label{
                  display:block;
                  width:100%;
                  font-family:PingFangSC-Regular;
                  font-size:0.7rem;
                  line-height:2rem;
                  color:#777777;
                  letter-spacing:0;
                  text-align:center;
              }
            }
          }
      }
      .shop_info_right{
          float:right;
          width:33%;
          height:100%;
          text-align:center;
          .shop_logo{
            width:95px;
            height:95px;
            border-radius:100%;position: relative;
            span{position: absolute;color: #ffffff;top: 40%;z-index: 0;display: inline-block;width: 100%;text-align: center;left: 10px;}
          }
          .info_modification{
            display: block;
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#f54321;
            letter-spacing:0;
            text-align:center;
            position: relative;
            top: 1rem;
          }
      }
    }
    .store_management{
      width:100%;
      background-color:#ffffff;
      margin-top:10px;
      /*border:1px solid red;*/
      box-sizing:border-box;
      .store_managementtext{
        height:33.33%;
        padding:0px 20px;
        box-sizing:border-box;
        font-family:PingFangSC-Semibold;
        font-size:0.9rem;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight:600;
        border-bottom:1px solid #f9f8f8;
        line-height:50px;
      }
      .store_managementul{
        list-style:none;
        li{
          height:33.33%;
          padding:0px 20px;
          box-sizing:border-box;
          border-bottom:1px solid #f9f8f8;
          line-height:50px;
          font-size: 0.9rem;
          img{width: 1.3rem;height:1.3rem;vertical-align: middle;margin-right:5px;}
          /*.store_dianzhang{
              background:url(~@/assets/icon/xinxi.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
          .store_dianyuan{
              background:url(~@/assets/icon/dianyuan.png) no-repeat
                        right center;
              background-size:100% 100%;
          }*/
          span,label{
            font-family:PingFangSC-Regular;
            font-size:0.9rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            font-weight: 600;
          }
          label{
            float:right;
            font-size: 0.8rem;
            font-weight: normal;  
          }
        }
      }
    }
    .store_order{
      width:100%;
      height:135px;
      background-color:#ffffff;
      margin-top:10px;
      /*border:1px solid red;*/
      box-sizing:border-box;
      .store_ordertext{
        height:45px;
        padding:0px 20px;
        box-sizing:border-box;
        font-family:PingFangSC-Semibold;
        font-size:0.9rem;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight:600;
        border-bottom:1px solid #f9f8f8;
        line-height:45px;
        label{
            float:right;
            font-family:PingFangSC-Regular;
            font-size:0.8rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
          }
      }
      .store_order_status{
        width:100%;
        height:90px;
        list-style:none;
        /*border:1px solid red;*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        li{
          flex-grow: 1;
          font-family:PingFangSC-Regular;
          font-size:0.8rem;
          color:#333333;
          letter-spacing:0;
          text-align:center;
          font-weight:500;
          span{
            display:block;
            width:30px;
            height:30px;
            /*border:1px solid red;*/
            margin:10px auto;
          }
          .processing_img{
              background:url(~@/assets/icon/dingdanq.png) no-repeat
                        right center;
              background-size:100% 100%;
            }
          .carryout_img{
              background:url(~@/assets/icon/dingdan j.png) no-repeat
                        right center;
              background-size:100% 100%;
            }
          .cancel_img{
              background:url(~@/assets/icon/dingdan w.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
          .aftersales_img{
              background:url(~@/assets/icon/dingdanquxiao.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
        }
      }
    }
    .help_center,.customer_service{
      width:100%;
      height:50px;
      line-height:50px;
      font-family:PingFangSC-Semibold;
      font-size:0.9rem;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      background-color:#ffffff;
       margin-top:10px;
       padding:0px 20px;
       box-sizing:border-box;
       font-weight:600;
      border-radius: 0;
    }
    .customer_service{-webkit-appearance : none ;border-radius: 0;-webkit-tap-highlight-color:transparent;
  outline:none;border:0;margin-top:0px;border-top: 1px solid #eeeeee;}
    .jiantou{
      display:inline-block;
      width: 6px;
      height: 6px;
      border-top: 2px solid #999999;
      border-right: 2px solid #999999;
      transform: rotate(45deg);
      }

}

</style>
