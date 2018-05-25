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
                <td class="td1">店员姓名</td>
                <td>手机号码</td>
                <td>添加时间</td>
              </tr>
              <!-- <tr style="height:60px">
                <td class="td1" style="padding-left:14px;box-sizing:border-box;">
                  <input type="checkbox" value="1" v-model="checked" @click="currClick(item,$index)" id='1'>  <label for="1" class="cb-label"></label>
                  <img src="http://img4.imgtn.bdimg.com/it/u=352151113,400415667&fm=27&gp=0.jpg" alt="" class="oimg">
                  <span>刘大脑大</span>
                </td>
                <td class="dy_td">13649259704</td>
                <td class="dy_td">2016.08.09</td>
              </tr> -->
              <tr v-for="(item,$index) in lists" style="height:60px">
                <td class="td1" style="padding-left:14px;box-sizing:border-box;">
                  <input type="checkbox" :value="item.id" v-model="checked" @click="currClick(item,$index)" :id='item.id'>  <label :for="item.id" class="cb-label"></label>
                  <img :src="item.head_pic" alt="" class="oimg">&emsp;
                  <span>{{item.truename}}</span>
                </td>
                <td class="dy_td">{{item.username}}</td>
                <td class="dy_td">{{item.create_time.split(" ")[0]}}</td>
              </tr>
        </table>
        <div class="del_btn">
        <input type="checkbox" v-model="checkAll" id="quan"><label for="quan" class="cb-label"></label>全选&nbsp;&nbsp;共有店员人 <div class="del_dy" @click="del_dy">删除店员</div></div>
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
                lists :[]
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
        // 请求数据接口
        getData_shopassistant(){
          const _this = this;
          const url =`${myPub.URL}/merchant/Shop/clerkManage`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',`${openId.open_id}`);
          axios.post(url,params).then(response => {
            // console.log(response.data)
            // _this.lists = response.data.data;
            if(response.data.data){
              _this.lists = response.data.data;
            }else{
              _this.lists = [];
            }
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  this.$router.push({path: '/login'});
              }, 3000)
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //删除店员操作
        del_dy(){
            const _this = this;
            _this.$loading.show();//隐藏
            const id = this.totalPrice
            const url =`${myPub.URL}/merchant/Shop/delClerk`;
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',`${openId.open_id}`);
            params.append('id',id);
            axios.post(url,params).then(response => {
              console.log(response.data.status)
              if (status == "200") {
                setTimeout(() => {
                    _this.$loading.hide();//隐藏
                    _this.getData_shopassistant()
                }, 2000)
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
                      this.$router.push({path: '/login'});
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
      background-color:#fff;
      margin-top:10px;
      .middle_title{
          width:100%;
          font-family:PingFangSC-Semibold;
          font-size:1rem;
          color:#333333;
          letter-spacing:0;
          text-align:center;
          height:50px;
          line-height:50px;
          td{
            width:27%;
            color: #777777
          }
          .td1{
            width:46%;
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
    font-size:0.9rem;
    color:#777777;
    letter-spacing:0;
    text-align:center;
  }
  .cb-label{
    margin-left:14px;
    vertical-align: middle;
  }
  .oimg{
    width:30px;
    height:30px;
    vertical-align: top;
  }
  span{

  }
}
.del_btn{
  width:100%;
  height:50px;
  background-color:#fff;
  line-height:50px;
  position: fixed;
  padding-left:14px;
  box-sizing:border-box;
  bottom:0;
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



/*多选框的样式*/
input[type="checkbox"]{
  display:none;
}

.cb-label{
  height: 30px;
  width: 30px;
  background:#fc5738;
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
  &::before,&::after{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: 20px * 0.2;
    background: #fff;
    display: inline-block;
    -moz-transform-origin: left top;
    -ms-transform-origin: left top;
    -o-transform-origin: left top;
    -webkit-transform-origin: left top;
    transform-origin: left top;
    content: '';
    -webkit-transition: opacity ease 0.5s;
    -moz-transition: opacity ease 0.5s;
    transition: opacity ease 0.5s;
  }
  &::before{
   top: 20.2px;
    left: 13.2px;
   -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  &::after {
    top: 13px;
    left: 6px;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
}
input[type=checkbox]:checked + .cb-label,
.cb-label.checked{

  background: rgb(101,141,181)g;
  border-color:rgb(101,141,181)g;
  &::after{
    border-color:#fff;
    height: 20px * .35;
    -moz-animation: dothabottomcheck .4s/2 ease 0s forwards;
    -o-animation: dothabottomcheck .4s/2 ease 0s forwards;
    -webkit-animation: dothabottomcheck .4s/2 ease 0s forwards;
    animation: dothabottomcheck .4s/2 ease 0s forwards;
  }

  &::before{
    border-color:#fff;
    height: 20px * 1;
    -moz-animation: dothatopcheck .4s ease 0s forwards;
    -o-animation: dothatopcheck .4s ease 0s forwards;
    -webkit-animation: dothatopcheck .4s ease 0s forwards;
    animation: dothatopcheck .4s ease 0s forwards;
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
