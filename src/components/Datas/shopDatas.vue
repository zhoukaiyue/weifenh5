<template>
	<div class="commodityData">
		<p class="title">我的营销订单<span @click="orderlist">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		<ul class="commodityData_title">
			<li class="processing" @click="torder(0)"><span class="processing_img"></span><label>所有订单</label><span class="circular">0</span></li>
		    <li class="carryout" @click="torder(1)"><span class="carryout_img"></span><label>进行中</label><span class="circular">0</span></li>
		    <li class="cancel" @click="torder(2)"><span class="cancel_img"></span><label>已完成</label><span class="circular" >0</span></li>
		    <li class="aftersales" @click="torder(3)"><span class="aftersales_img"></span><label>已取消</label><span class="circular">0</span></li>
		</ul>
		<!--近七日业绩排行 -->
		<div class="ranking">
			<p class="ranking_title">近7日业绩排名</p>
			<div class="ranking_cont">
			<!--<img src="" alt="">
				<span>NO.1</span> -->
			</div>
			<p class="ranking_instructions">再接再厉，你已超过了100%的店员</p>
		</div>
		<div class="data_display">
			<div class="yx_display">
		    	<p class="yx_display_title">我的邀新用户数据数据<span v-on:click="orderData" >查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1">我的新增用户走势</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2">员工邀新业绩排行</li>
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
			  <!-- 我的新增用户数据 -->
              <shopNewdata v-if="!isshow"></shopNewdata>
              <!-- 员工邀新数据 -->
              <shopstaffNewdtata v-if="isshow"></shopstaffNewdtata>
		    </div>

		     <div class="yh_display">
		    	<p class="yh_display_title">我的营销订单数据<span v-on:click="newData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">7日订单销售额</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">7日用户消费额</li>
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
		      <!-- 7日订单量 -->
		      <shopsdayordersdata v-if="!isshow8"></shopsdayordersdata>
		      <!-- 七日用户消费额 -->
		      <shopsdaystradingdata v-if="isshow8"></shopsdaystradingdata>
		    </div>

		 </div>
	</div>
</template>
<script>
import shopNewdata from '@/components/shopNewdata'
import shopstaffNewdtata from '@/components/shopstaffNewdtata'

import shopsdayordersdata from '@/components/shopsdayordersdata'
import shopsdaystradingdata from '@/components/shopsdaystradingdata'
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider,Toast} from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
export default {
  name:'commodityData',
  components: {
  	// 店铺新增用户数据
  	shopNewdata,

  	// 员工邀新业绩排行
  	shopstaffNewdtata,
  	//7日订单量
  	shopsdayordersdata,
  	// 7日用户消费额
  	shopsdaystradingdata
  },
  data() {
    return {
    	is_show1: true,
        is_show2: false,
        is_show3: true,
        is_show4: false,
        is_show5: true,
        is_show6: false,
        //店铺新增用户数据 和 员工邀新数据 组件切换条件
        isshow: false,
        // 7日订单量 和 7日交易额 组件切换条件
        isshow8: false,
        // 店铺数据
        shopdata:{}
    };
  },
  	created() {
        this.order()
    },
	deactivated () {
	    this.$destroy()
	},
  	methods:{

  	//营销商品数据
  	commodityData(){
        this.$router.push({ path: '/page/commodityData'})
    },
    //我的营销订单数据
    newData(){
        this.$router.push({ path: '/page/shopnewdata'})
    },
    //店铺新增用户数据
    orderData(){
        this.$router.push({ path: '/page/shoporderdata'})
    },
    //进入订单页面
    orderlist(){
	    console.log('12345')
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
    //店铺新增用户数据
    salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	           _this.isshow=false
	    },2000);
	},
	//员工邀新数据
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow=true
	    },2000);
	},
	//本周访问量/销售量
	salesVolume3:function(){
        const _this = this;
        this.is_show3=true
        this.is_show4=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow7=false
	    },2000);
	},
	//本周商品对比图
	salesVolume4:function(){
        const _this = this;
        this.is_show3=false
        this.is_show4=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	         _this.isshow7=true
	    },2000);
	},
	//7月订单销售额
	salesVolume5:function(){
        const _this = this;
        this.is_show5=true
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	          _this.isshow8=false
	    },2000);
	},
	//7月用户消费额
	salesVolume6:function(){
        const _this = this;
        this.is_show5=false
        this.is_show6=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	         _this.isshow8=true
	    },2000);
	},
	//请求数据
	order(a){
      const _this = this;
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Clerk/dataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type','0');
          axios.post(url,params).then(response => {
          	if (response.data.status =='1024') {
	              this.$vux.alert.show({
	                  content: response.data.msg
	              })
	              setTimeout(() => {
	                  this.$vux.alert.hide()
	                  location.href = '/login'
	              }, 3000)
	            }
              const data = response.data.data
              this.shopdata = data.order_data
              var objdata = this.shopdata;
              console.log(objdata)
          }).catch((err) => {
              console.log(err)
          })
    }
  },
  mounted(){
  }
}
</script>
<style scoped lang="less">

.commodityData{
	background-color:#f8f7f7;
	.title{width:100%;
		height:auto;
		box-sizing:border-box;
		padding:11px 15px;
		font-family:PingFangSC-Semibold;
		font-size:1rem;
		color:#333333;
		letter-spacing:0;
		text-align:left;
		font-weight:500;
		border-bottom:1px solid #eeeeee;
		background: #ffffff;
		span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	}
	.commodityData_title{
		background: #ffffff;
        width:100%;
        height:100px;
        list-style:none;
        /*border:1px solid red;*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        li{
          position: relative;
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
              background-size:60% 60%;
              background-position:center;
              padding: 0.5rem;
              border: 1px solid #777777;
              border-radius: 50%;
            }
          .carryout_img{
              background:url(~@/assets/icon/dingdan j.png) no-repeat
                        right center;
              background-size:60% 60%;
              background-position:center;
              padding: 0.5rem;
              border: 1px solid #777777;
              border-radius: 50%;
            }
          .cancel_img{
              background:url(~@/assets/icon/dingdan w.png) no-repeat
                        right center;
              background-size:60% 60%;
              background-position:center;
              padding: 0.5rem;
              border: 1px solid #777777;
              border-radius: 50%;
          }
          .aftersales_img{
              background:url(~@/assets/icon/dingdanquxiao.png) no-repeat
                        right center;
              background-size:60% 60%;
              background-position:center;
              padding: 0.5rem;
              border: 1px solid #777777;
              border-radius: 50%;
          }
          .circular{
          	position: absolute;
          	display: inline-block;
          	width: 1.5rem;
          	height: 1.5rem;
          	border-radius: 50%;
          	background: #F54321;
          	color: #ffffff;
          	font-size:0.6rem;
          	line-height:1.5rem;
          	text-align: center;
          	right: 0.7rem;top: -0.1rem;
          }
        }
      }
	/*数据展示*/
	.data_display{
	 	margin-top:10px;
	 	.yx_display{
	 		height:auto;
	 		background-color:#ffffff;
	 		padding-bottom:15px;
	 		.yx_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:500;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yx_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yx_display_tab{
	 			width:80%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.7rem;
					color:#777777;
					letter-spacing:0;
					padding:0.3rem 0.5rem;
					border:1px solid #eeeeee;
		        }
		        .frist{
					border-top-left-radius:0.3rem;
					border-bottom-left-radius:0.3rem;
		        }
		        .last{
		        	border-top-right-radius:0.3rem;
					border-bottom-right-radius:0.3rem;
		        }
		        .li_select{
		        	border:1.5px solid #f54321;
		        	color: #f54321;
		        }
	 		}
	 	}
	 	.yh_display{
	 		margin-top:10px;
	 		padding-bottom:15px;
	 		height:auto;
	 		background-color:#ffffff;
	 		.yh_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:500;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yh_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yh_display_tab{
	 			width:70%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.7rem;
					color:#777777;
					letter-spacing:0;
					padding:0.3rem 0.5rem;
					border:1px solid #eeeeee;
		        }
		        .frist{
					border-top-left-radius:0.3rem;
					border-bottom-left-radius:0.3rem;
		        }
		        .last{
		        	border-top-right-radius:0.3rem;
					border-bottom-right-radius:0.3rem;
		        }
		        .li_select{
		        	border:1.5px solid #f54321;
		        	color: #f54321;
		        }
	 		}
	 	}
	 	.charts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	 	.yhcharts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	}
	/*近7日业绩排行榜样式*/
	.ranking{
		width:100%;
		height:200px;
		margin-top:10px;
		background-color:#ffffff;
		.ranking_title{
			    width: 100%;
			    height: auto;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    padding: 11px 15px;
			    font-family: PingFangSC-Semibold;
			    font-size: 1rem;
			    color: #333333;
			    letter-spacing: 0;
			    text-align: left;
			    font-weight: 500;
			    border-bottom: 1px solid #eeeeee;
			    background: #ffffff;
		}
		.ranking_cont{
			width:40%;
			height:50%;
			margin:20px auto 0px auto;
			background:url(~@/assets/img/paihang.gif) no-repeat
                        center center;
              background-size:100% 100%;
		}
		.ranking_instructions{
			    width: 100%;
			    height: auto;
			    -webkit-box-sizing: border-box;
			    box-sizing: border-box;
			    font-family: PingFangSC-Semibold;
			    font-size: 0.8rem;
			    color: #333333;
			    letter-spacing: 0;
			    text-align: center;
			    font-weight: 500;			
		}
	}
		/*6/7/8plus*/
		/*针对iPhone X底部footer做适配*/
		@media screen and (min-width: 414px) {
	   .circular {
	        right: 1.3rem!important;
	    }
	}
}
</style>