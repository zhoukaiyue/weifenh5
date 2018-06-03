<template>
	<div class="commodityData">
		<ul class="commodityData_title">
			<li>
				<span>访问量(次)</span></br><label></label>
			</li>
			<li>
				<span>销售量(件)</span></br><label></label>
			</li>
			<li>
				<span>销售金额(元)</span></br><label></label>
			</li>
		</ul>

		<div class="data_display">

		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品销售量</p>
		    	<ul class="yx_display_tab">
			    	<li class="oli" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2()" style="border-radius: 0.3rem;">30日</li>
		    	</ul>
		      <p class="yx_display_ftitle">销售量( 单位：件 )</p>
		      <TmarketingmerchandiseSales></TmarketingmerchandiseSales>
		    </div>

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

// 引入营销商品销售量组件图
import TmarketingmerchandiseSales from '@/components/t-marketingMerchandiseSales'
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
    	is_show6:false
    };
  },
  deactivated () {
        this.$destroy()
    },
  methods:{
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show3=false
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
	}
  },
  mounted(){
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