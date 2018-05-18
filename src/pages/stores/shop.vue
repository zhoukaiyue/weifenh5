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
            <tr v-for="(item,$index) in lists">
                <td><input type="checkbox" :value="item.id" v-model="checked" @click="currClick(item,$index)" :id='item.id'>  <label :for="item.id" class="cb-label"></label></td>
                <td>{{item.productName}}</td>
                <td>{{item.price}}</td>
                <td>{{item.count}}</td>
            </tr>
          <tr>
                <td><input type="checkbox" v-model="checkAll" id="quan"><label for="quan" class="cb-label"></label>全选</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                总价：{{totalMoney}}
            </tr>
        </table>
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
export default {
    name: 'category',
    data(){
　　　　　　return {
            show:true,
              checked:[],
                totalPrice:[],
                lists : [
                    {
                        productName:'产品1',
                        price:'24',
                        count:'3',
                        id:1
                    },
                    {
                        productName:'产品2',
                        price:'25',
                        count:'6',
                        id:2
                    },
                    {
                        productName:'产品3',
                        price:'54',
                        count:'7',
                        id:3
                    }
                ]
　　　　　　}
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
                              let total = item.price*item.count;
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
                      return this.checked.length;
                  }
              }
    },
    methods: {
        linktoDetail() {
            this.$router.push({ path: '/page/changestore'})
        },
        currClick:function(item,index){
                var _this = this;
                if(typeof item.checked == 'undefined'){
                    this.$set(item,'checked',true);
                        let total = item.price*item.count;
                        this.totalPrice.push(total);
                        console.log(this.totalPrice);
                }else{
                    item.checked = !item.checked;
                    if(item.checked){
                        this.totalPrice = [];
                        this.lists.forEach(function(item,index){
                            if(item.checked){
                                let total = item.price*item.count;
                                _this.totalPrice.push(total);
                            }
                        });
                    }else{
                        this.totalPrice = [];
                        this.lists.forEach(function(item,index){
                            if(item.checked){
                                let total = item.price*item.count;
                                _this.totalPrice.push(total);
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
  background: #f1f1f1;
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
      tr td{
        width:200px;
        background: #eee;
        padding:10px 0;
    }
  }
}








input[type="checkbox"]{
  display:none;
}

.cb-label{
  height: 100px;
  width: 100px;
  background:#fc5738;
  border: 100px * .1 solid #fc5738;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  transition: border-color ease .4s/2;
  -moz-transition: border-color ease .4s/2;
  -o-transition: border-color ease .4s/2;
  -webkit-transition: border-color ease .4s/2;
  cursor: pointer;
  &::before,&::after{
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    height: 0;
    width: 100px * 0.2;
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
    top:100px * 0.76;
    left: 100px * 0.31;
    -moz-transform: rotate(-135deg);
    -ms-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
  }
  &::after {
    top: 100px * .45;
    left: 100px * 0;
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
    height: 100px * .35;
    -moz-animation: dothabottomcheck .4s/2 ease 0s forwards;
    -o-animation: dothabottomcheck .4s/2 ease 0s forwards;
    -webkit-animation: dothabottomcheck .4s/2 ease 0s forwards;
    animation: dothabottomcheck .4s/2 ease 0s forwards;
  }

  &::before{
    border-color:#fff;
    height: 100px * 1;
    -moz-animation: dothatopcheck .4s ease 0s forwards;
    -o-animation: dothatopcheck .4s ease 0s forwards;
    -webkit-animation: dothatopcheck .4s ease 0s forwards;
    animation: dothatopcheck .4s ease 0s forwards;
  }

}
@-moz-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 100px *0.35; }
}

@-webkit-keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 100px *0.35; }
}

@keyframes dothabottomcheck{
  0% { height: 0; }
  100% { height: 100px *0.35;  }
}

@keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 100px * 0.7; }
}
@-webkit-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 100px * 0.7; }
}
@-moz-keyframes dothatopcheck{
  0% { height: 0; }
  50% { height: 0; }
  100% { height: 100px * 0.7; }
}
</style>
