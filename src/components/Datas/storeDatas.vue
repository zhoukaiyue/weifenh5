<template>
	<div class="commodityData">
		<p class="title">店铺订单<span @click="torder(0)">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		<ul class="commodityData_title">
			  <li class="processing" @click="torder(0)"><span class="processing_img"></span><label>全部</label><span class="circular" v-if="isshow1">{{shopdata.all_count}}</span></li>
		      <li class="carryout" @click="torder(1)"><span class="carryout_img"></span><label>进行中</label><span class="circular" v-if="isshow2">{{shopdata.count_ing}}</span></li>
		      <li class="cancel" @click="torder(2)"><span class="cancel_img"></span><label>已完成</label><span class="circular" v-if="isshow3">{{shopdata.count_complete}}</span></li>
		      <li class="aftersales" @click="torder(3)"><span class="aftersales_img"></span><label>已取消</label><span class="circular" v-if="isshow4">{{shopdata.count_cancel}}</span></li>
		</ul>

		<div class="data_display">
			<div class="yx_display">
		    	<p class="yx_display_title">店铺用户数据<span v-on:click="orderData" >查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1">店铺新增用户数据</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2">员工邀新业绩排行</li>
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
				<!-- 店铺新增用户数据 -->
              <storeNewdata v-if="!isshow"></storeNewdata>
              <!-- 员工邀新数据 -->
              <staffNewdtata v-if="isshow"></staffNewdtata>
		    </div>

		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品数据<span v-on:click="commodityData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show3}' v-on:click="salesVolume3">本周访问量/销售量</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4">本周商品销量对比图</li>
		    	</ul>
		      <p class="yx_display_ftitle">访问量( 单位：元 )/销售量( 单位：件 )</p>
		      <!-- 本周访问量/销售量数据-->
		      <visitsalesNewdata  v-if="!isshow7"></visitsalesNewdata>
		      <weeksalescomparisonNewdata  v-if="isshow7"></weeksalescomparisonNewdata>
          <div class="goodlist" v-if="isshow7">
            <ul>
              <li v-for="(item,index) in goodlist">{{item.goods_name}}</li>
            </ul>
          </div>
		    </div>
		     <div class="yh_display">
		    	<p class="yh_display_title">订单数据<span v-on:click="newData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">7日订单销售额</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">7日用户消费额</li>
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
		      <!-- 7日订单量 -->
		      <sdayordersdata v-if="!isshow8"></sdayordersdata>
		      <sdaystradingdata v-if="isshow8"></sdaystradingdata>
		    </div>

		 </div>
	</div>
</template>
<script>
import storeNewdata from '@/components/store-new-user-data'
import staffNewdtata from '@/components/staff-invite-new-data'
import visitsalesNewdata from '@/components/visit-sales-this-week'
import weeksalescomparisonNewdata from '@/components/this-week-sales-comparison'
import sdayordersdata from '@/components/sdayorders'
import sdaystradingdata from '@/components/sdaystrading'
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider,Toast} from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
export default {
  name:'commodityData',
  components: {
  	//店铺新增用户数据
  	storeNewdata,
  	// 员工邀新业绩排行
  	staffNewdtata,
  	//本周访问量销售量
  	visitsalesNewdata,
  	// 本周销量对比图
  	weeksalescomparisonNewdata,
  	//7日订单量
  	sdayordersdata,
  	// 7日交易量
  	sdaystradingdata
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
        // 本周访问量销售量 和 本周销量对比图 组件切换条件
        isshow7: false,
        // 7日订单量 和 7日交易额 组件切换条件
        isshow8: false,
        // 店铺数据
        shopdata:{},
        isshow1: false,
        isshow2: false,
        isshow3: false,
        isshow4: false,
        goodlist:[],
    };
  },
  	created() {
        this.order('0')
    },
	deactivated () {
	    this.$destroy()
	},
  	methods:{
  	// 营销商品数据
  	commodityData(){
        this.$router.push({ path: '/page/commodityData' })
    },
    // 订单数据
    newData(){
        this.$router.push({ path: '/page/newData' })
    },
    // 店铺新增用户数据
    orderData(){
        this.$router.push({ path: '/page/orderData' })
    },
    order(){
    	this.$router.push({path: '/page/order'});
    },
    torder(id){
      console.log(id)
     // this.$router.push({ path: '/page/order',query:{id:id}})
     this.$router.push({path: '/page/order', query:{id: id}});
    },
    torder1(id){
      console.log(id)
     // this.$router.push({ path: '/page/order',query:{id:id}})
     this.$router.push({path: '/page/order', query:{id: id}});
    },
    torder2(id){
      console.log(id)
     // this.$router.push({ path: '/page/order',query:{id:id}})
     this.$router.push({path: '/page/order', query:{id: id}});
    },
      torder3(id){
      console.log(id)
     // this.$router.push({ path: '/page/order',query:{id:id}})
     this.$router.push({path: '/page/order', query:{id: id}});
    },
    // 店铺新增用户数据
    salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        _this.isshow=false
	},
	// 员工邀新数据
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        _this.isshow=true
	},
	// 本周访问量/销售量
	salesVolume3:function(){
        const _this = this;
        this.is_show3=true
        this.is_show4=false
         _this.isshow7=false
	},
	//本周商品对比图
	salesVolume4:function(){
        const _this = this;
        this.is_show3=false
        this.is_show4=true
        _this.isshow7=true
        _this.order('2')
          
	},
	// 7月订单销售额
	salesVolume5:function(){
        const _this = this;
        this.is_show5=true
        this.is_show6=false
        _this.isshow8=false
	},
	// 7月用户消费额
	salesVolume6:function(){
        const _this = this;
        this.is_show5=false
        this.is_show6=true
        _this.isshow8=true
	},
	// 请求数据
	order(a){
      const _this = this;
      _this.$loading.show();
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Shop/dataStatistics`;
      var params = new URLSearchParams();
      params.append('token',localStorage.currentUser_token);;
      params.append('open_id',localStorage.openid);
      params.append('type',a);
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
        // 状态码
        if (response.data.status =='200') {
            const data = response.data.data
          	_this.shopdata = data.order_data
            _this.goodlist =data.goods_data
          	var objdata = this.shopdata;
          	console.log(_this.goodlist)
            if (objdata.all_count!='0') {
              _this.isshow1 = true
            }
            if (objdata.count_cancel!='0') {
              _this.isshow4 = true
            }
            if (objdata.count_complete!='0') {
              _this.isshow3 = true
            }
            if (objdata.count_ing!='0') {
              _this.isshow2 = true
            }
        }else{
          	this.$vux.alert.show({
              ontent: response.data.msg
          })
        }
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
		font-weight:600;
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
          	width: 1rem;
          	height: 1rem;
          	border-radius: 50%;
          	background: #F54321;
          	color: #ffffff;
          	font-size:0.6rem;
          	right: 1rem;top: -0.1rem;
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
				font-weight:600;
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
              padding: 0.3rem 0;
					font-size:0.8rem;
					color:#777777;
					letter-spacing:0;
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
      .goodlist{
        width: 90%;
        margin-left: 5%;
        ul{li{width: 40%;display: inline-block;margin-left: 5%;list-style-type: disc;}}
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
				font-weight:600;
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
					font-size:0.8rem;
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
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#F94F5B), to(#FF853B));
	 	}
	 	.yhcharts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#F94F5B), to(#FF853B));
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