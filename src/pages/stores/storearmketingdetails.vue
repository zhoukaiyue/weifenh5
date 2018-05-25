<template>
    <div class="productin">
        <div class="productinformation">
          <div class="productinformation_img">
            <img src="" alt="">
          </div>

          <div class="productinformation_con">
            <p class="productinformation_name">券后价券后价券后价券后价券后价</p>
            <p class="productinformation_price"><span>¥128.00</span><label>券后价</label><b>¥128.00</b></p>
            <p class="productinformation_xl"><span>销量898</span><label>成交订单898</label></p>
            <p class="productinformation_stock"><span>库存8</span><label>下架时间2018/08/08</label></p>
          </div>
        </div>

        <ul  class="productinformation_tab">
          <li v-bind:class="{'borColor':isColor1}" @click="linkToDetail1">全部</li>
          <li v-bind:class="{'borColor':isColor2}" @click="linkToDetail2">进行中</li>
          <li v-bind:class="{'borColor':isColor3}" @click="linkToDetail3">已完成</li>
          <li v-bind:class="{'borColor':isColor4}" @click="linkToDetail4">已取消</li>
        </ul>

        <div class="productinformation_tgy">
          <p class="productinformation_tgyname"><span>推广员：张三丰</span><label>待支付</label></p>
          <div class="productinformation_cont"><img src="" alt=""><span>天使艾栗栗</span><label>&nbsp;&nbsp;&nbsp;共两件商品</label><b>实付：<strong>¥288.00</strong></b></div>
          <p class="productinformation_time"><span>下单时间：2018-09-08 11:00</span><label>查看订单信息</label></p>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'productin',
    data(){
      return {
        isColor1:true,
        isColor2:false,
        isColor3:false,
        isColor4:false
      }
     },
    created() {
    },
    computed: {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
      linkToDetail1(){
        const _this=this;
        _this.isColor1=true,
        _this.isColor2=false,
        _this.isColor3=false,
        _this.isColor4=false
      },
      linkToDetail2(){
        const _this=this;
        _this.isColor2=true,
        _this.isColor1=false,
        _this.isColor3=false,
        _this.isColor4=false
      },
      linkToDetail3(){
        const _this=this;
        _this.isColor3=true,
        _this.isColor1=false,
        _this.isColor2=false,
        _this.isColor4=false
      },
      linkToDetail4(){
        const _this=this;
        _this.isColor4=true,
        _this.isColor1=false,
        _this.isColor3=false,
        _this.isColor2=false
      }
    }
}
</script>

<style scoped lang="less">
.productin{
  background:#f8f7f7;
  height:100%;
  .productinformation{
    width:100%;
    height:10rem;
    background-color:#ffffff;
    /*border-bottom:1px solid red;*/
    box-sizing: border-box;
    padding:20px;
    .productinformation_img{
      float:left;
      width:28%;
      height:100%;
      /*border:1px solid red;*/
    }
    .productinformation_con{
      float:right;
      width:70%;
      height:100%;
      /*border:1px solid red; */
      .productinformation_name{
        width:100%;
        height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:1rem;
        color:#333333;
      } 
      .productinformation_price{
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
      .productinformation_xl{
        margin-top:10px;
        width:100%;
        height:17px;
        font-size:0.7rem;
        color:#777777;
        span{
          display:inline-block;
          width:20%;
          margin-right:50px;
        }
      } 
      .productinformation_stock{
        margin-top:10px;
        width:100%;
        height:17px;
        font-size:0.7rem;
        color:#777777;
        span{
          display:inline-block;
          width:20%;
          margin-right:50px;
        }
      }
    }
  }
  .productinformation_tab{
    width:100%;
    list-style:none;
    box-sizing: border-box;
    padding:0px 20px;
    height:50px;
    margin-top:1px;
    display:flex;
    font-size:1rem;
    background-color:#fff;
    color:#999999;
    line-height:50px;
    li{
      width:25%;
      text-align: center;
    }
    .borColor{
      border-bottom:1px solid #F54321;
      color:#F54321;
    }
  }
  /*推廣員樣式*/
  .productinformation_tgy{
    margin-top:10px;
    height:155px;
    background-color:#ffffff;
    box-sizing: border-box;
    padding:20px;
    .productinformation_tgyname{
      height:50px;
      line-height:50px;
      font-size:1rem;
      color:#333;
      border-bottom:1px solid #dedcdc;
      label{float:right;}
    }
  }
  .productinformation_cont{
    height:34px;
    margin-top:16px;
    font-size:0;
    line-height:34px;
    img{
      display:inline-block;
      height:34px;
      width:34px;
      border:1px solid red;
      vertical-align: top;
      margin-right:6px;
      border-radius: 50%;
    }
    span{
      font-size:0.9rem;
      color:#333333;
    }
    label{
      font-size:0.9rem;
      color:#999999;
    }
    b{
      float:right;
      font-size:0.9rem;
      color:#999999;
      font-weight: 500;
      strong{
         font-weight: 500;
         color:#F54321;
      }
    }
  }
  .productinformation_time{
      margin-top:16px;
      font-size:0.9rem;
      color:#999999;
      height:20px;
      line-height:20px;
    span{
      float:left;
    }
    label{
      float:right;
      color:#333333;
      font-size:0.8rem;
      padding:3px;
      border:1px solid #DDDDDD;
    }
  }
}
</style>