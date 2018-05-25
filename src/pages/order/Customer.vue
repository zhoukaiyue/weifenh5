<template>
    <div class="goods">
      <div class="title">
        <img class="order" src="~@/assets/icon/white.png">&ensp;订单状态：<span>待收货</span>
      </div>
      <div class="address">
          <img class="position" src="~@/assets/icon/position.png">
          <div>
            <p>王先生&emsp;<input type="text" class="mobile" v-model="mobile"/></p>
            <p class="ares">上海省上海市徐汇区泗凤路泗泾镇 </p>
          </div>
          <img class="bottom" src="~@/assets/icon/line@2x.png">
      </div>

      <div class="Cusproductinformation">
          <div class="Cusproductinformation_img">
            <img src="" alt="">
          </div>

          <div class="Cusproductinformation_con">
            <p class="Cusproductinformation_name">券后价券后价券后价券后价券后价</p>
            <p class="Cusproductinformation_xl"><span>规格：200ml</span></p>
            <p class="Cusproductinformation_stock"><span>¥999.00</span><label>数量：2</label></p>
          </div>
      </div>
      
      <p class="Cusproductinformation_bz"><span>备注</span><label>未备注</label></p>
      <p class="Cusproductinformation_yhq"><span>优惠券</span><label>-0.00</label></p>
      
      <ul class="Cusproductinformation_xx">
        <li><span>商品总价</span><label></label></li>
        <li><span>税费</span><label></label></li>
        <li><span>运费</span><label></label></li>
        <li><span>总优惠</span><label></label></li>
        <li class="Cusproductinformation_total"><label>订单金额：<span>¥123.00</span></label></li>
      </ul>

      <div class="Cusproductinformation_order">
        <p><span>订单编号：12345678909887</span><label>复制</label></p>
        <p><span>下单时间：2019-08-09</span></p>
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
      mobile:''
    }
  },
    deactivated () {
      this.$destroy()
  },
  created() {
    this.phone()
 },
  methods: {
    // 处理手机号
    phone(){
      const str='15146105546';
      const str2 = str.substr(0,3)+"****"+str.substr(7);
      this.mobile = str2
    },
    //店铺订单全部数据
    orderdata(){
        const url =`${myPub.URL}/merchant/Shop/order`;
        const _this = this
        var params = new URLSearchParams();
        params.append('type','0'); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',`${openId.open_id}`);
        axios.post(url,params).then(response => {
            const data = response.data.data
            _this.datalist = data.list
            console.log(data)
            console.log(_this.datalist)
        }).catch((err) => {
            console.log(err)
        })
    }
  }
}

</script>
<style type="text/css">
    .weui-icon-checked:before{color: #f54321!important;}
</style>
<style scoped lang="less">
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
        .ares{color: #999999}
        .mobile{border: 0;}
      }
      .position{position: relative;bottom: 0.5rem;}
      .bottom{width: 100%;position: absolute;right:0.5rem;bottom: 0;}
    }

  .Cusproductinformation{
    width:100%;
    height:9rem;
    background-color:#ffffff;
    /*border-bottom:1px solid red;*/
    box-sizing: border-box;
    padding:1rem;
    margin-top:11px;
    .Cusproductinformation_img{
      float:left;
      width:28%;
      height:100%;
      /*border:1px solid red;*/
    }
    .Cusproductinformation_con{
      float:right;
      width:70%;
      height:100%;
      /*border:1px solid red; */
      .Cusproductinformation_name{
        width:100%;
        height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:1rem;
        color:#333333;
      } 
      .Cusproductinformation_price{
        margin-top:10px;
        width:100%;
        height:23px;
        span{
          font-size:1rem;
          color:#F54321;
        }
        label{
          display:inline-block;
          height:21px;
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
        height:17px;
        font-size:0.9rem;
        color:#777777;
        span{
        }
      } 
      .Cusproductinformation_stock{
        margin-top:10px;
        width:100%;
        height:17px;
        font-size:0.9rem;
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
    height:50px;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:1rem; 
    color:#333333;
    line-height:50px;
    label{float:right;}
  }
  .Cusproductinformation_yhq{
    margin-top:10px;
    height:50px;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:1rem; 
    color:#333333;
    line-height:50px;
    label{float:right;}
  }
  .Cusproductinformation_xx{
    list-style: none;
    margin-top:10px;
    height:auto;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    background-color:#fff;
    font-size:1rem; 
    color:#333333;
    line-height:50px;
    li{
      height:50px;
    }
    label{float:right;}
    .Cusproductinformation_total{
      span{
        color:#FF5639;
      }
      
    }
  }
  .Cusproductinformation_order{
    margin-top:10px;
    background-color:#fff;
    padding-left: 1rem;
    padding-right: 1rem;
    box-sizing: border-box;
    font-size:1rem; 
    color:#333333;
    line-height:2rem;
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
