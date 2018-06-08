<template>
	<div class="commodityData">
		<ul class="commodityData_title">
			<li>
				<span>访问量(次)</span></br><label>{{visit_count}}</label>
			</li>
			<li>
				<span>销售量(件)</span></br><label>{{order_goods_count}}</label>
			</li>
			<li>
				<span>销售金额(元)</span></br><label>{{order_amount_count}}</label>
			</li>
		</ul>
		<div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
		<div class="data_display">
		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品销售量</p>
		    	<ul class="yx_display_tab">
		    		<li class="oli frist" v-bind:class='{ li_select:is_show7}' v-on:click="salesVolume2()">7日</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show8}' v-on:click="salesVolume3()">30日</li>
		    	</ul>
		      <p class="yx_display_ftitle">销售量( 单位：件 )</p>
		      <TmarketingmerchandiseSales  v-if="is_show8"></TmarketingmerchandiseSales>
		      <MarketingproductSales v-if="is_show7"></MarketingproductSales>
		    </div>
			<div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
		     <div class="yh_display">
		    	<p class="yh_display_title">营销商品销量对比图</p>
		    	<ul class="yh_display_tab">
		    		<li class="oli frist" v-bind:class='{ li_select:is_show4 }' v-on:click="salesVolume4()">今日</li>
			    	<li class="oli " v-bind:class='{ li_select:is_show5}' v-on:click="salesVolume5()">7日</li>
			    	<li class="oli last" v-bind:class='{ li_select:is_show6}' v-on:click="salesVolume6()">30日</li>
			    	
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
		      <!-- 今日销量对比图 -->
		      <MarketingVolumecomparisonj v-if="is_show4"></MarketingVolumecomparisonj>
		      <!-- 7日销量对比图 -->
		      <MarketingVolumecomparisonq v-if="is_show5"></MarketingVolumecomparisonq>
		      <!-- 30日销量对比图 -->
		      <MarketingVolumecomparisony v-if="is_show6"></MarketingVolumecomparisony>
		    </div>
		 </div>
	</div>
</template>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast} from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
// 引入营销商品销售量组件图
import TmarketingmerchandiseSales from '@/components/t-marketingMerchandiseSales'
import MarketingproductSales from '@/components/marketingproductSales'
//引入营销商品销量对比图
//今天
import MarketingVolumecomparisonj from '@/components/marketingVolumecomparisonj'
// 7日
import MarketingVolumecomparisonq from '@/components/marketingVolumecomparisonq'
// 30日
import MarketingVolumecomparisony from '@/components/marketingVolumecomparisony'
export default {
  name:'commodityData',
  components: {
  	TmarketingmerchandiseSales,
  	MarketingproductSales,
  	MarketingVolumecomparisonj,
  	MarketingVolumecomparisonq,
  	MarketingVolumecomparisony
  },
  data() {
    return {
    	is_show2:true,
    	is_show3:false,
    	is_show4:true,
    	is_show5:false,
    	is_show6:false,
    	is_show7:true,
    	is_show8:false,
    	visit_count:"",
    	order_goods_count:'',
    	order_amount_count:''
    };
  },
  deactivated () {
        this.$destroy()
    },
  methods:{
    salesVolume2:function(){
        const _this = this;
        this.is_show7=true
        this.is_show8=false
	},
    salesVolume3:function(){
        const _this = this;
        this.is_show8=true
        this.is_show7=false
	},
	salesVolume4:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
        this.is_show6=false
	},
	salesVolume5:function(){
        const _this = this;
        this.is_show4=false
        this.is_show5=true
        this.is_show6=false
	},
	salesVolume6:function(){
        const _this = this;
        this.is_show6=true
        this.is_show5=false
        this.is_show4=false
	},
	//获取访问量销售量和销售金额
	comdatas(){
        const _this = this;
        _this.$loading.show()
        const url =`${myPub.URL}/merchant/Shop/goodsDataStatistics`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);;
            params.append('open_id',localStorage.openid);
            params.append('type',0);
            axios.post(url,params).then(response => {
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
               //状态码
              if (response.data.status =='200') {
                const data = response.data
                // visit_count order_goods_count order_amount_count
                console.log(data)
                _this.visit_count = data.data.visit_count
                _this.order_goods_count = data.data.order_goods_count
                _this.order_amount_count = data.data.order_amount_count
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
	}
  },
  mounted(){
  	this.comdatas()
  }
}
</script>
<style scoped lang="less">

.commodityData{
	background-color:#f8f7f7;
	.commodityData_title{
		list-style:none;
		display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        background-color:#ffffff;
        padding:20px 0 12px 0;
        li{
        	text-align:center;
        	flex-grow:1;
        	span{
        		font-family:PingFangSC-Regular;
				font-size:0.9rem;
				color:#333333;
				letter-spacing:0;
        	}
        	label{
        		font-family:PingFangSC-Semibold;
				font-size:1.1rem;
				color:#f54321;
				letter-spacing:0;
				font-weight:600;
        	}
        }
	}
	/*数据展示*/
	.data_display{
	 	/*margin-top:10px;*/
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
					padding:5px 20px;
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
		        	color:#f54321;
		        }
	 		}
	 	}
	 	.yh_display{
	 		/*margin-top:10px;*/
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
					padding:5px 20px;
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
		        	color:#f54321;
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
}
</style>