<template>
  <div class="store">
  <!-- 顶部数据 -->
        <div class="top clearfix" v-on:click="linktoDetail">
          <div class="fl left"><img  src="~@/assets/icon/add.png"></div>
          <div class="fl right">
            <h5>添加新店员<img class="icon" src="~@/assets/icon/goods-left.png" /></h5>
            <p>店员账号添加成功后，店员登录后激活</p>
          </div>
        </div>
        <div class="middle">
          <table>
            <tr class="middle_title">
                <td class="td1"></td>
                <td>店员姓名</td>
                <td>手机号码</td>
                <td>添加时间</td>
              </tr>
              <tr v-for="(item,$index) in lists">
                <td class="td1" style="box-sizing:border-box;">
                  <input type="checkbox" :value="item.id" v-model="checked" @click="currClick(item,$index)" :id='item.id'>
                  <label :for="item.id" class="cb-label"></label>
                </td>
                <td>
                  <img v-lazy="item.head_pic" alt="" class="oimg">&emsp;
                  <span class="name">{{item.truename}}</span></td>
                <td class="dy_td">{{item.username}}</td>
                <td class="dy_td">{{item.create_time.split(" ")[0]}}</td>
              </tr>
        </table>
        <div class="del_btn">
        <input type="checkbox" v-model="checkAll" id="quan"><label for="quan" class="cb-label"></label>全选&nbsp;&nbsp;共有店员{{shop.count}}人 <div class="del_dy" @click="del_dy">删除店员</div></div>
        </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'category',
    data(){
　　　　　　return {
            show:true,
                checked:[],
                totalPrice:[],
                lists :[],
                shop:''
　　　　　　}
　　　　},
    deactivated () {
        this.$destroy()
    },
    computed: {
          totalMoney:function(item,index){
                  let sum = 0;
                  for(let i=0;i<this.totalPrice.length;i++){
                      sum += this.totalPrice[i];
                  };
                  return sum;
              },
              checkAll: {
                  get: function() {
                      return this.checkedCount == this.lists.length;
                  },
                  set: function(value){
                      var _this = this;
                      if (value) {
                          this.totalPrice = [];
                          this.checked = this.lists.map(function(item) {
                              item.checked = true;
                              let total = item.id;
                              _this.totalPrice.push(total);
                              return item.id
                          })
                      }else{
                          this.checked = [];
                          this.totalPrice=[];
                          this.lists.forEach(function(item,index){
                              item.checked = false;
                          });
                      }
                  }
              },
              checkedCount: {
                  get: function() {
                      console.log(this.totalPrice)
                      return this.checked.length;
                  }
              }
    },
    mounted() {
            // 调用请求数据的方法
            this.getData_shopassistant()
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        //请求数据接口
        getData_shopassistant(){
          const _this = this;
          _this.$loading.show();//隐藏
          const url =`${myPub.URL}/merchant/Shop/clerkManage`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            console.log(response)
            _this.$loading.hide()
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
            if (response.data.status == "200") {
                _this.lists = response.data.data.list;
                _this.shop = response.data.data
            }else{
               _this.$loading.hide();//隐藏
               _this.lists = [];
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //删除店员操作
        del_dy(){
            const _this = this;
            _this.$loading.show();//隐藏
            const id = this.totalPrice;
            const url =`${myPub.URL}/merchant/Shop/delClerk`;
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('id',id);
            axios.post(url,params).then(response => {
            console.log(response.data.status)
              if (response.data.status == "200") {
                    _this.getData_shopassistant()
                    
            }else{
               _this.$loading.hide();//隐藏
                this.$vux.alert.show({
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    _this.getData_shopassistant()
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
            }).catch((err) => {
              console.log(err)
            })
        },
        linktoDetail() {
            this.$router.push({ path: '/page/changestore'})
        },
        currClick:function(item,index){
            var _this = this;
            if(typeof item.checked == 'undefined'){
                this.$set(item,'checked',true);
                    let total = item.id;
                    this.totalPrice.push(total);
                    console.log(this.totalPrice);
            }else{
                item.checked = !item.checked;
                if(item.checked){
                    this.totalPrice = [];
                    this.lists.forEach(function(item,index){
                        if(item.checked){
                            let total = item.id;
                            _this.totalPrice.push(total);
                        }
                    });
                }else{
                    this.totalPrice = [];
                    this.lists.forEach(function(item,index){
                        if(item.checked){
                            let total = item.id;
                            v.push(total);
                        }
                    });
                }
            }
        }
  }
}
</script>

<style scoped lang="less">
/*顶部背景 样式*/
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
.fl{float: left;}
.fr{float: right;}
.store{
  background: #f9f8f8;position:relative;height:100%;
  h5{position: relative;font-size: 1rem;font-weight: normal;.icon{width: 0.6rem;position: absolute;right: -6%;top: 30%;}}
  .top{padding: 10px 10px 20px 10px;
    background: #ffffff;
    .left{width:10%;margin-top: 1rem;img{width: 100%;}}
  .right{
      margin-top: 1rem;
      left: 3%;
      position: relative;
      width:80%;
      p{font-size: 0.8rem;color: #999999;}}
  }
  .middle {
      background-color:transparent;
      margin-top:10px;min-height:700px;
      table{background: #ffffff;}
      td{height: 50px;line-height: 50px;border-bottom: 1px solid #eeeeee;text-align: center;}
      .middle_title{
          width:100%;
          font-family:PingFangSC-Semibold;
          font-size:1rem;
          color:#333333;
          letter-spacing:0;
          text-align:center;
          height:3rem;
          line-height:3rem;

          td{
            padding: 0 0.7rem;
            color: #777777;
          }
          .td1{
            width:12%;
            font-family:PingFangSC-Semibold;
            font-size:1rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;

          }
      }
  }
}


table{
  width:100%;
  padding-bottom: 50px;
  .dy_td{
    font-family:PingFangSC-Regular;
    font-size:0.8rem;
    color:#777777;
    letter-spacing:0;
    text-align:center;
  }
  .name{font-size: 0.9rem;float: left;position: relative;left: 0.8rem;}
  .cb-label{
    margin-left:14px;
    vertical-align: middle;
  }
  .oimg{
    width:40px;
    height:40px;
    vertical-align: top;
    border-radius: 50%;
    display: inline-block;
    float: left;
    position: relative;
    top: 0.3rem;
  }
}
.del_btn{
  width:100%;
  height:50px;
  background-color:#fff;
  line-height:50px;
  position: fixed;
  padding-left:14px;
  z-index:5000;
  border-top: 1px solid #f0f0f0;
  bottom:0px;
  .del_dy{
    float:right;
    width:30%;
    height:100%;
    background:#fc5738;
    font-family:PingFangSC-Regular;
    font-size:1rem;
    color:#ffffff;
    text-align:center;
  }
}

@media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
    .del_btn{
        padding-bottom:34px;
    }
}

/*多选框的样式*/
input[type="checkbox"]{
  display:none;
}

.cb-label{
  position: relative;
  bottom: 0.1rem;
  height: 20px;
  width: 20px;
  border:0.2px ;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  transition: border-color ease .4s/2;
  -moz-transition: border-color ease .4s/2;
  -o-transition: border-color ease .4s/2;
  -webkit-transition: border-color ease .4s/2;
    vertical-align: middle;
  cursor: pointer;
  margin-right:5px;
  border:1px solid #dddddd;
  background: #ffffff;
}
input[type=checkbox]:checked + .cb-label,
.cb-label.checked{

  background: rgb(101,141,181)g;
  border-color:rgb(101,141,181)g;
  &::after{
    content: "";
   display: inline-block;
   width: 19px;
   height: 19px;
    background: url(~@/assets/icon/circle@selected.png);
   top: -1px;
   left: 0;
   border-radius: 50%;
   background-size: 100%;
   position: absolute;
  }


}
@-moz-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 20px *0.35; }
}

@-webkit-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 20px *0.35; }
}

@keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 20px *0.35;  }
}

@keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 20px * 0.7; }
}
@-webkit-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 20px * 0.7; }
}
@-moz-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 20px * 0.7; }
}
</style>
