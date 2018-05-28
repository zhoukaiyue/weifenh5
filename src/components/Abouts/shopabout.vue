<template>
  <div class="shop_center">
    <div class="mainInfo">
        <ul class="shop_info_left">
          <li class="shop_name">{{scdata.user_info.shop_name}}</li>
          <li class="storeManager">{{scdata.user_info.truename}}&nbsp;&nbsp;<span class="storesanager_right">店员，欢迎您!</span></li>
          <li class="join_time">{{scdata.user_info.create_time}}&nbsp;加入</li>
          <li class="passenger_traffic">
            <div  class="passenger_traffic_box" style="border:0;"><span>{{scdata.member_count}}</span><label>总引客量</label></div>
            <div  class="passenger_traffic_box"><span>{{scdata.order_day_count}}</span><label>今日订单</label></div>
            <div  class="passenger_traffic_box"><span>{{scdata.member_day_count}}</span><label>今日引客量</label></div>
          </li>
        </ul>
      <div class="shop_info_right">
          <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" alt="" class="shop_logo">
          <span class="info_modification" @click="edit">编辑我的信息</span>
      </div>
    </div>

  <div class="store_order">
    <p class="store_ordertext">我的营销订单订单<label @click="order" style="font-weight: normal;">查看更多&nbsp;<span class="jiantou"></span></label></p>
    <ul class="store_order_status">
      <li class="processing"   @click="torder(0)"><span class="processing_img"></span><label>全部</label></li>
      <li class="carryout"  @click="torder1(1)"><span class="carryout_img"></span><label>进行中</label></li>
      <li class="cancel"  @click="torder2(2)"><span class="cancel_img"></span><label>已完成</label></li>
      <li class="aftersales"  @click="torder3(3)"><span class="aftersales_img"></span><label>已取消</label></li>
    </ul>
  </div>
  <p class="store_center" @click="tostoreinfo">店铺中心</p>
  <p class="help_center">帮助中心</p>
  <p class="customer_service">联系客服</p>
  </div>
</template>

<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast } from 'vux'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'shop_center',
    data(){
　　　　　　return {
            scdata:{}
　　　　　　}
　　　　},
    created() {

    },
    computed: {
    },
    mounted(){
            //数据请求接口
            this.mcenterdata()
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
       shop() {
            this.$router.push({ path: '/page/shop'})
        },
        tostoreinfo(){
          this.$router.push({ path: '/page/shop_storeinfo'})
        },
       edit() {
            this.$router.push({ path: '/page/shop_mine'})
        },
        order(){
          this.$router.push({path: '/page/shopdata'});
        },
        torder(id){
          console.log(id)
          this.$router.push({path: '/page/shopdata', query:{id: id}});
        },
        torder1(id){
          console.log(id)
          this.$router.push({path: '/page/shopdata', query:{id: id}});
        },
        torder2(id){
          console.log(id)
          this.$router.push({path: '/page/shopdata', query:{id: id}});
        },
          torder3(id){
          console.log(id)
           this.$router.push({path: '/page/shopdata', query:{id: id}});
        },
        // 请求数据接口
        mcenterdata(){
          const _this = this;
          const url =`${myPub.URL}/merchant/Clerk/shopCore`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
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
                //店员信息
                const data = response.data.data;
                _this.scdata = data
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
        }
    }
}
</script>

<style scoped lang="less">
.shop_center{
    background-color:#f9f8f8;
    padding-bottom:20px;
    .mainInfo{
      width:100%;
      height:220px;
      background-color:#ffffff;
      padding:25px 20px 5px 20px;
      box-sizing:border-box;
      .shop_info_left{
          float:left;
          list-style:none;
          width:65%;
          height:100%;
          .shop_name{
            font-family:PingFangSC-Semibold;
            font-size:1.2rem;
            color:#333333;
            letter-spacing:0;
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
            .passenger_traffic_box{
              border-left:1px solid #eeeeee;
              flex-grow: 1;
              /*width:33.33%;*/
              span{
                display:block;
                width:100%;
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
                  font-size:0.8rem;
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
            border-radius:100%;
          }
          .info_modification{
            display: block;
            font-family:PingFangSC-Regular;
            font-size:0.9rem;
            color:#999999;
            letter-spacing:0;
            text-align:center;
            position: relative;
            top: 1rem;
          }
      }
    }
    .store_management{
      width:100%;
      height:150px;
      background-color:#ffffff;
      margin-top:10px;
      /*border:1px solid red;*/
      box-sizing:border-box;
      .store_managementtext{
        height:33.33%;
        padding:0px 20px;
        box-sizing:border-box;
        font-family:PingFangSC-Semibold;
        font-size:1rem;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight:500;
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
            font-size:0.8rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
          }
          label{
            float:right;
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
        font-size:1rem;
        color:#333333;
        letter-spacing:0;
        text-align:left;
        font-weight:500;
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
    .store_center,.help_center,.customer_service{
      width:100%;
      height:50px;
      line-height:50px;
      font-family:PingFangSC-Semibold;
      font-size:1rem;
      color:#333333;
      letter-spacing:0;
      text-align:left;
      background-color:#ffffff;
       padding:0px 20px;
       box-sizing:border-box;
       font-weight:500;
      border-bottom: 1px solid #f9f8f8;
    }
    .store_center{margin-top:10px;}
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
