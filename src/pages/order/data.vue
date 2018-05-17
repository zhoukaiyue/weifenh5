<template>
	<div class="commodityData">
		<p class="title">店铺订单<span>查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		<ul class="commodityData_title">
			  <li class="processing"><span class="processing_img"></span><label>全部</label></li>
		      <li class="carryout"><span class="carryout_img"></span><label>进行中</label></li>
		      <li class="cancel"><span class="cancel_img"></span><label>已完成</label></li>
		      <li class="aftersales"><span class="aftersales_img"></span><label>已取消</label></li>
		</ul>

		<div class="data_display">
			<div class="yx_display">
		    	<p class="yx_display_title">店铺用户数据<span v-on:click="store_users" >查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1()">店铺新增用户数据</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2()">员工邀新业绩排行</li>
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
	          <div class="charts" >
		     	<div id="Chart" style="width:100%;height:100%;"></div>
			  </div>
		    </div>

		    <div class="yx_display">
		    	<p class="yx_display_title">营销商品数据<span v-on:click="commodityData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show3}' v-on:click="salesVolume3()">本周访问量/销售量</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4()">本周商品销量对比图</li>
		    	</ul>
		      <p class="yx_display_ftitle">访问量( 单位：元 )/销售量( 单位：件 )</p>
	          <div class="charts" >
		     	<div id="myChart" style="width:100%;height:100%;"></div>
			  </div>
		    </div>

		     <div class="yh_display">
		    	<p class="yh_display_title">订单数据<span v-on:click="orderData">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli frist" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">7日订单量</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">7日交易额</li>
		    	</ul>
		      <p class="yh_display_ftitle">销售金额( 单位：元 )</p>
	          <div class="yhcharts" >
		     	 <div id="yhChart" style="width:100%;height:215px;"></div>
			  </div>
		    </div>

		 </div>
	</div>
</template>
<script>

import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider } from 'vux'
export default {
  name:'commodityData',
  components: {
  },
  data() {
    return {
    	is_show1: true,
        is_show2: false,
        is_show3: true,
        is_show4: false,
        is_show5: true,
        is_show6: false
    };
  },
  methods:{
  	// 营销商品数据
  	order_display(){
		   var chart = document.getElementById("Chart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(Chart);
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip : {
                       // trigger: 'item'
                    },
                    grid: {
                        left: '-8%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                             axisLine: {
			                    lineStyle: {
			                        type: 'solid',
			                        color: '#ffffff',//左边线的颜色
			                        width:'2'//坐标线的宽度
				                    }
				                },
				                axisLabel: {
				                    textStyle: {
				                        color: '#ffffff',//坐标值得具体的颜色
				                    }
				                },
				                axisTick:{
							        show:false/*隐藏刻度*/
							    }
			                }
                    ],
                    yAxis : [
                        {
		                   type: 'value',
					        axisLine: {
		                    lineStyle: {
			                        type: 'solid',
			                        color: 'transparent',//左边线的颜色
			                        width:'2'//坐标线的宽度
			                    }
			                },
                        }
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#ffffff'}}},
                            data:[1270, 6382, 2091, 1034, 6382, 2091, 1034],
                            color:"#ffffff"
                        }
                    ]
                };
                mainChart.setOption(option);
  	},
  	//这是营销商品访问量/销售量趋势图
	yx_display(){
		   var chart = document.getElementById("myChart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(myChart);
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip : {
                       // trigger: 'item'
                    },
                    grid: {
                        left: '-8%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                             axisLine: {
			                    lineStyle: {
			                        type: 'solid',
			                        color: '#ffffff',//左边线的颜色
			                        width:'2'//坐标线的宽度
				                    }
				                },
				                axisLabel: {
				                    textStyle: {
				                        color: '#ffffff',//坐标值得具体的颜色
				                    }
				                },
				                axisTick:{
							        show:false/*隐藏刻度*/
							    }
			                }
                    ],
                    yAxis : [
                        {
		                   type: 'value',
					        axisLine: {
		                    lineStyle: {
			                        type: 'solid',
			                        color: 'transparent',//左边线的颜色
			                        width:'2'//坐标线的宽度
			                    }
			                },
                        }
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#ffffff'}}},
                            data:[1270, 6382, 2091, 1034, 6382, 2091, 1034],
                            color:"#ffffff"
                        },
                        {
                            name:'销售量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#f7ff50'}}},
                            data:[2270, 3456, 5432, 3423, 12, 291, 134],
                            color:"#f7ff50"
                        }
                    ]
                };
                mainChart.setOption(option);
  	},
  	  	//这是营销订单趋势图
	yh_display(){
		    let echarts = require('echarts/lib/echarts')
		    let chartBox=document.getElementsByClassName('yhcharts')[0]
		    let myChart=document.getElementById('yhChart')
		    function resizeCharts() {//为调整图标尺寸的方法
		        myChart.style.width=chartBox.style.width+'px'
		        myChart.style.height=chartBox.style.height+'px'
		    }
		     let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
		     var option = null;
		     var option = {
                    title: {
                        text: ''
                    },
                    tooltip : {
                       // trigger: 'item'
                    },
                    grid: {
                        left: '-8%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
                             axisLine: {
			                    lineStyle: {
			                        type: 'solid',
			                        color: '#ffffff',//左边线的颜色
			                        width:'2'//坐标线的宽度
				                    }
				                },
				                axisLabel: {
				                    textStyle: {
				                        color: '#ffffff',//坐标值得具体的颜色
				                    }
				                },
				                axisTick:{
							        show:false/*隐藏刻度*/
							    }
			                }
                    ],
                    yAxis : [
                        {
		                   type: 'value',
					        axisLine: {
		                    lineStyle: {
			                        type: 'solid',
			                        color: 'transparent',//左边线的颜色
			                        width:'2'//坐标线的宽度
			                    }
			                },
                        }
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#ffffff'}}},
                            data:[1270, 6382, 2091, 1034, 6382, 2091, 1034],
                            color:"#ffffff"
                        },
                        {
                            name:'销售量',
                            type:'line',
                            stack: '销量',
                            itemStyle : { normal: {label : {show: true,color:'#f7ff50'}}},
                            data:[2270, 3456, 5432, 3423, 12, 291, 134],
                            color:"#f7ff50"
                        }
                    ]
                };
		    mainChart.setOption(option);
  	},
  	// 营销商品数据
  	commodityData(){
        this.$router.push({ path: '/page/commodityData' })
    },
    // 订单数据
    orderData(){
        this.$router.push({ path: '/page/orderData' })
    },
    // 店铺新增用户数据
    store_users(){
        this.$router.push({ path: '/page/store_users' })
    },
    salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume3:function(){
        const _this = this;
        this.is_show3=true
        this.is_show4=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},salesVolume4:function(){
        const _this = this;
        this.is_show3=false
        this.is_show4=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume5:function(){
        const _this = this;
        this.is_show5=true
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume6:function(){
        const _this = this;
        this.is_show5=false
        this.is_show6=true
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	}
  },

  mounted(){
	  	this.yx_display()
	  	this.yh_display()
	  	this.order_display()
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
        height:90px;
        list-style:none;
        /*border:1px solid red;*/
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        li{
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
              background-size:100% 100%;
            }
          .carryout_img{
              background:url(~@/assets/icon/dingdan j.png) no-repeat
                        right center;
              background-size:100% 100%;
            }
          .cancel_img{
              background:url(~@/assets/icon/dingdan w.png) no-repeat
                        right center;
              background-size:100% 100%;
          }
          .aftersales_img{
              background:url(~@/assets/icon/dingdanquxiao.png) no-repeat
                        right center;
              background-size:100% 100%;
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
}
</style>