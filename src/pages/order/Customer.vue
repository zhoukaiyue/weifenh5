<template>
    <div class="goods">
      <div class="title">
        <img class="order" src="~@/assets/icon/white.png">&ensp;订单状态：<span>{{datalist.status_name}}</span>
      </div>
      <div class="address">
          <img class="position" src="~@/assets/icon/position.png">
          <div>
            <p>{{datalist.receiver}}&emsp;<input type="text" class="mobile" v-model="mobile"/></p>
            <p class="ares">{{datalist.address}}</p>
          </div>
          <img class="bottom" src="~@/assets/icon/line@2x.png">
      </div>

      <div class="Cusproductinformation">
        <h5>推广店员：<span>{{datalist.first_leader_name}}</span></h5>
        <div class="clearfixss">
          <div class="Cusproductinformation_img">
            <img v-lazy="datalist.img_src" alt="">
          </div>
          <div class="Cusproductinformation_con">
            <p class="Cusproductinformation_name">{{datalist.goods_name}}</p>
            <p class="Cusproductinformation_xl"><span>规格：200ml</span></p>
            <p class="Cusproductinformation_stock"><span>¥{{datalist.shop_price}}</span><label>数量：{{datalist.total_count}}</label></p>
          </div>
        </div>
      </div>
      
      <p class="Cusproductinformation_bz"><span>备注</span><label>{{datalist.user_note}}</label></p>
      <p class="Cusproductinformation_yhq"><span>优惠券</span><label>-{{datalist.coupon_price}}</label></p>
      
      <ul class="Cusproductinformation_xx">
        <li><span>商品总价</span><label>{{datalist.coupon_price}}</label></li>
        <li><span>税费</span><label>0</label></li>
        <li><span>运费</span><label>包邮</label></li>
        <li><span>总优惠</span><label>{{datalist.coupon_price}}</label></li>
        <li class="Cusproductinformation_total"><label>订单金额：<span>¥{{datalist.total_amount}}</span></label></li>
      </ul>

      <div class="Cusproductinformation_order">
        <p><span>订单编号：{{datalist.sn}}</span><label>复制</label></p>
        <p><span>下单时间：{{datalist.add_time.split(" ")[0]}}</span></p>
      </div>
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { Radio, Group } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
      mobile:'',
      datalist:'',
      goodlist:''
    }
  },
    deactivated () {
      this.$destroy()
  },
  created() {
    this.goodsdata()
 },
  methods: {
    //店铺订单全部数据
   goodsdata(){
        const url =`${myPub.URL}/merchant/Shop/orderInfo`;
        const id = this.$route.query.id
        const _this = this
         _this.$loading.show();
        var params = new URLSearchParams();
        params.append('token',localStorage.currentUser_token);
        params.append('open_id',localStorage.openid);
        params.append('id',id);
        axios.post(url,params).then(response => {
          _this.$loading.hide()
          const status = response.data.status
          console.log(response)
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
          // token失效
          if (response.data.status =='1004') {
            _this.getData()
          }
          // 状态码
          if (response.data.status =='200') {
              _this.$loading.hide();//隐藏
            const data =response.data.data
            _this.datalist = data
            _this.goodlist=data.order_list
            console.log(_this.datalist)
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
      },
  }
}

</script>
<style type="text/css">
    .weui-icon-checked:before{color: #f54321!important;}
    body{background: #f8f7f7;font-family: "微软雅黑"}
</style>
<style scoped lang="less">

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
/*订单顶部*/

.goods{
  background: #f8f7f7;
  .title{
    background-color: #FF9656;height: 55px;line-height: 55px;color: #ffffff;
    padding-left: 1rem;
    box-sizing: border-box;
    font-size: 1rem;
      img{width: 1rem;}
      .order{position: relative;top: 0.3rem;}
   
  } 


  .address{ 
      height: 80px;
      position: relative;
      background-color: #FFFFFF;
      padding-left: 1rem;
     box-sizing: border-box;
      img{width: 1rem;}
      div{
        padding-top: 1rem;
        margin-left: 0.5rem;
        color: #333333;
        line-height: 1.5rem;
        display: inline-block;
        .ares{color: #999999;font-size: 0.9rem;}
        .mobile{border: 0;}
      }
      .position{position: relative;bottom: 0.5rem;}
      .bottom{width: 100%;position: absolute;right:0.5rem;bottom: 0;}
    }

  .Cusproductinformation{
    width:100%;
    height:9rem;
    background-color:#ffffff;
    box-sizing: border-box;
    padding:1rem;
    margin-top:11px;
    min-height: 160px;
    h5{
      color: #333333;
      font-weight: normal;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 0.5rem;
    }
    .Cusproductinformation_img{
      float:left;
      width:25%;
      margin-top: 10px;
      img{width: 100%;border: 1px solid #eeeeee;}
    }
    .Cusproductinformation_con{
      float:right;
      width:70%;
      height:100%;
      margin-top: 10px;
      .Cusproductinformation_name{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:0.9rem;
        color:#333333;
      } 
      .Cusproductinformation_price{
        margin-top:10px;
        width:100%;
        span{
          font-size:1rem;
          color:#F54321;
        }
        label{
          display:inline-block;
          font-size:0.7rem;
          color:#F54321;
          border:1px solid #F54321;
          vertical-align: middle;
          margin-left:9px;
        }
        b{
          font-size:0.7rem;
          color:#999999;
          margin-left:9px;
        }
      } 
      .Cusproductinformation_xl{
        margin-top:10px;
        width:100%;
        font-size:0.8rem;
        color:#777777;
        span{
        }
      } 
      .Cusproductinformation_stock{
        margin-top:10px;
        width:100%;

        font-size:0.8rem;
        color:#777777;
        span{
          display:inline-block;
          width:20%;
          margin-right:50px;
        }
      }
    }
  }

  .Cusproductinformation_bz{
    margin-top:10px;
    padding: 0.8rem 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:0.9rem; 
    color:#333333;
    label{float:right;color: #999999;}
  }
  .Cusproductinformation_yhq{
    margin-top:10px;
    padding: 0.8rem 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:0.9rem; 
    color:#333333;
    label{float:right;color: #999999}
  }
  .Cusproductinformation_xx{
    list-style: none;
    margin-top:10px;
    padding: 0.8rem 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:0.9rem; 
    color:#333333;
    li{
      height:2.5rem;
      line-height: 2.5rem;
    }
    label{float:right;color: #999999}
    .Cusproductinformation_total{
      span{
        color:#FF5639;
      }
      
    }
  }
  .Cusproductinformation_order{
    margin-top:10px;
    padding-top: 10px;
    background-color:#fff;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    font-size:0.9rem; 
    color:#333333;
    line-height:2rem;
    padding-bottom: 10px;
    label{
      float:right;
      border:1px solid #999999;
      height:1rem;
      font-size:0.8rem;
      line-height:1rem;
      padding:0.1rem;
      margin-top:0.5rem;
    }
  }
}
</style>
