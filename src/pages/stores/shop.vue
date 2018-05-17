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
            <tbody>
              <tr>
                <th class="first"></th>
                <th>店员姓名</th>
                <th>手机号码</th>
                <th>添加时间</th>
              </tr>
              <tr v-for="(item,index) in datalist">
                <td><input class="checkbox" type="checkbox"></td>
                <td class="head"><img src="~@/assets/icon/circle@noselected.png"><span>{{item.name}}</span></td>
                <td>{{item.mobel}}</td>
                <td>{{item.time}}</td>
              </tr>
              <!-- <tr>
                <td @click="sort"><img v-show="show" src="~@/assets/icon/circle@noselected.png"><img v-show="!show" src="~@/assets/icon/circle@selected.png"></td>
                <td class="head"><img src="~@/assets/icon/circle@noselected.png"><span>王美玲</span></td>
                <td>152 2169 4978</td>
                <td>2018.06.02</td>
              </tr> -->
            </tbody>
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
            datalist:[{imgurl:'~@/assets/icon/circle@noselected.png',selectedurl:'~@/assets/icon/circle@selected.png',name:'王美玲',mobel:'152 2169 4978',time:'2018.03.02'},{imgurl:'~@/assets/icon/circle@noselected.png',selectedurl:'~@/assets/icon/circle@selected.png',name:'王美玲',mobel:'152 2169 4978',time:'2018.03.02'}],
            list:[]
　　　　　　}
　　　　},
    computed: {
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail() {
            this.$router.push({ path: '/page/changestore'})
        },
        sort() {
          const list = this.datalist
          for (var i = 0; i < list.length; i++) {
            var img=$(".img").eq(i).attr("src")
          }
          console.log(img)
          // this.show = !this.show
      },
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
    padding: 1rem;
    margin-top: 1rem;
    background: #ffffff;
    table{
      width: 100%;
      padding: 0;
      tr{
        line-height: 2rem;
        text-align: center;
        th{width: 32%;border-bottom: 1px solid #dddddd!important;}
        .first{width: 8%;}
        td{
            color: #999999;
            font-size:0.7rem;
            img{width: 1.2rem;position: relative;top: 0.3rem}
          }
          .head{
              img{width: 2rem}
              span{vertical-align: top;position: relative;top: 0.3rem;left: 0.1rem;color: #333;}
            }
      }
    }
  }
}
</style>
