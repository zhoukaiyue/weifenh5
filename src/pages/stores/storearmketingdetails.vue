<template>
    <div class="productin">
        <div class="productinformation"  @click='ToDetail()'>
          <div class="productinformation_img">
            <img :src="datalist.img_src" alt="">
            <p>{{datalist.recpos_name}}</p>
          </div>

          <div class="productinformation_con">
            <p class="productinformation_name">{{datalist.goods_name}}</p>
            <p class="productinformation_price"><span>￥{{datalist.shop_price}}</span><label>券后价:</label><b>￥{{datalist.markte_price}}<i></i></b></p>
            <p class="productinformation_xl"><span>销量:{{datalist.ogm}}</span><label>成交订单:{{datalist.order_count}}</label></p>
            <p class="productinformation_stock"><span>库存:{{datalist.goods_stock}}</span><label>下架时间:{{datalist.create_time.split(" ")[0]}}</label></p>
          </div>
        </div>

        <ul  class="productinformation_tab">
          <li v-bind:class="{'borColor':isColor1}" @click="linkToDetail1">全部</li>
          <li v-bind:class="{'borColor':isColor2}" @click="linkToDetail2">进行中</li>
          <li v-bind:class="{'borColor':isColor3}" @click="linkToDetail3">已完成</li>
          <li v-bind:class="{'borColor':isColor4}" @click="linkToDetail4">已取消</li>
        </ul>
        <div class="productinformation_tgy" v-for="(item,index) in goodlist">
          <p class="productinformation_tgyname"><span>推广员：{{item.first_leader_name}}</span><label>{{item.status_name}}</label></p>
          <div class="productinformation_cont"><img :src="item.head_pic" alt=""><span>{{item.truename}}</span><label>&nbsp;&nbsp;&nbsp;共{{item.total_count}}件商品</label><b>实付：<strong>{{item.order_amount}}</strong></b></div>
          <p class="productinformation_time"><span>下单时间：{{item.add_time}}</span><label @click="ToCustomer(item.id)">查看订单信息</label></p>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'productin',
    data(){
      return {
        isColor1:true,
        isColor2:false,
        isColor3:false,
        isColor4:false,
        datalist:'',
        goodlist:''
      }
     },
    created() {
      this.goodsdata()
    },
    computed: {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
      // 全部
      linkToDetail1(){
        const _this=this;
        _this.isColor1=true,
        _this.isColor2=false,
        _this.isColor3=false,
        _this.isColor4=false
        _this.public_tab('0')
      },
      // 进行中
      linkToDetail2(){
        const _this=this;
        _this.isColor2=true,
        _this.isColor1=false,
        _this.isColor3=false,
        _this.isColor4=false
        _this.public_tab('1')
      },
      // 已完成
      linkToDetail3(){
        const _this=this;
        _this.isColor3=true,
        _this.isColor1=false,
        _this.isColor2=false,
        _this.isColor4=false
        _this.public_tab('2')
      },
      // 已取消
      linkToDetail4(){
        const _this=this;
        _this.isColor4=true,
        _this.isColor1=false,
        _this.isColor3=false,
        _this.isColor2=false
        _this.public_tab('3')
      },
      ToDetail(id) {
          id = this.$route.query.id
          this.$router.push({ path: '/page/detail', query: { id: id } })
      },
      ToCustomer(id) {
          this.$router.push({ path: '/page/Customer', query: { id: id } })
      },
      // 数据请求接口
      goodsdata(){
        console.log('1111')
        const _this = this
         _this.$loading.show();//隐藏
        const url =`${myPub.URL}/merchant/Shop/goodsOrder`;
        const id = this.$route.query.id
        
        var params = new URLSearchParams();
        params.append('token',localStorage.currentUser_token);
        params.append('open_id',localStorage.openid);
        params.append('type','0');
        params.append('id',id);
        axios.post(url,params).then(response => {
                _this.$loading.hide();//隐藏
            const status = response.data.status
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
                const data =response.data.data
                _this.datalist = data.goods_info
                _this.goodlist=data.order_list
                console.log(_this.datalist)
                console.log(_this.goodlist)
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
      //数据请求封装方法
     public_tab(a){
        const _this = this;
        _this.$loading.show();
        const url =`${myPub.URL}/merchant/Shop/goodsOrder`;
        const id = this.$route.query.id
        var params = new URLSearchParams();
        params.append('token',localStorage.currentUser_token);
        params.append('open_id',localStorage.openid);
        params.append('type',a);
        params.append('id',id);
        axios.post(url,params).then(response => {
          _this.$loading.hide();//隐藏
          const status = response.data.status
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
                const data =response.data.data
                _this.datalist = data.goods_info
                _this.goodlist=data.order_list
                console.log(_this.datalist)
                console.log(_this.goodlist)
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
    padding:1rem;
    .productinformation_img{
      float:left;
      width:30%;
      position: relative;
      img{width: 100%;}
      p{position: absolute;background: rgba(0,0,0,.3);text-align: center;font-size: 0.8rem;color: #ffffff;width: 100%;bottom: 0;left: 0;}
    }
    .productinformation_con{
      float:right;
      width:65%;
      height:100%;
      /*border:1px solid red; */
      .productinformation_name{
        width:100%;
        height:20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size:0.9rem;
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
          padding: 0rem 0.2rem;
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
          position: relative;
          i{
            position: absolute;
            width: 100%;
            height: 1px;
            background: #777777;
            left: 0;
            top: 50%;
          }
        }
      } 
      .productinformation_xl{
        margin-top:10px;
        width:100%;
        font-size:0.8rem;
        color:#777777;
        span{
          display:inline-block;
          width:20%;
          margin-right:1rem;
        }
      } 
      .productinformation_stock{
        margin-top:10px;
        width:100%;
        font-size:0.8rem;
        color:#777777;
        span{
          display:inline-block;
          width:20%;
          margin-right:1rem;
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
      font-size: 0.9rem;
    }
    .borColor{
      border-bottom:2px solid #F54321;
      color:#F54321;
    }
  }
  /*推廣員樣式*/
  .productinformation_tgy{
    margin-top:10px;
    min-height:155px;
    background-color:#ffffff;
    box-sizing: border-box;
    padding:1rem;
    .productinformation_tgyname{
      height:2rem;
      font-size:0.9rem;
      color:#333;
      border-bottom:1px solid #dedcdc;
      label{float:right;color: #999999}
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
      font-size:0.8rem;
      color:#999999;
    }
    b{
      float:right;
      font-size:0.8rem;
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
      font-size:0.8rem;
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
      position: relative;
      top: -0.3rem;
    }
  }
}
</style>