<template>
	<div class="orderData">
		<ul class="orderData_title">
			<li>
				<span>店铺总用户(人)</span></br><label>32908.00</label>
			</li>
			<li class="bl">
				<span>今日新增用户(人)</span></br><label>32908.00</label>
			</li>
		</ul>

		<div class="data_display">

		    <div class="yx_display">
		    	<p class="yx_display_title">店铺新增用户数据<!-- <span v-on:click="store_users">查看更多&ensp;<img src="ss"></span> --></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli first" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1()">7日</li>
			    	<li class="oli" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2()">30日</li>
			    	<!-- <li class="oli last" v-bind:class='{ li_select: is_show3}' v-on:click="salesVolume3()">年度</li> -->
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
	          <div class="charts" >
		     	<div id="myChart" style="width:100%;height:100%;"></div>
			  </div>
		    </div>

		     <div class="yh_display">
		    	<p class="yh_display_title">店员邀新数据<!-- <span v-on:click="dyinvite">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span> --></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli first" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4()">7日</li>
			    	<li class="oli" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">30日</li>
			    	<!-- <li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">年度</li> -->
		    	</ul>
		      <p class="yh_display_ftitle">新增用户( 单位：人 )</p>
	          <div class="yhcharts" >
		     	 <div id="yhChart" style="width:100%;height:215px;"></div>
			  </div>
		    </div>

		 </div>
	</div>
</template>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
export default {
  name:'orderData',
  components: {
  },
  data() {
    return {
    	is_show1:true,
    	is_show2:false,
    	is_show3:false,
    	is_show4:true,
    	is_show5:false,
    	is_show6:false
    };
  },
  created() {
        this.order('4')
        this.new('1')
    },
  deactivated () {
        this.$destroy()
    },
  methods:{
  	//店铺新增用户
	yx_display(a,b){
		    let echarts = require('echarts/lib/echarts')
		    let chartBox=document.getElementsByClassName('charts')[0]
		    let myChart=document.getElementById('myChart')
		    function resizeCharts() {//为调整图标尺寸的方法
		        myChart.style.width=chartBox.style.width+'px'
		        myChart.style.height=chartBox.style.height+'px'
		    }
		     let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
		     var option = null;
		     // 指定图表的配置项和数据
		     option = {
                  //   title: {
                  //       text: '店铺新增用户数据',
                  //       left:'center',
                  //       textStyle:{
                  //         //文字颜色
                  //         color:'#ffffff',
                  //         //字体风格,'normal','italic','oblique'
                  //         fontStyle:'normal',
                  //         //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                  //         fontWeight:'bold',
                  //         //字体系列
                  //         fontFamily:'sans-serif',
                  //         //字体大小
                  // 　　　　 fontSize:12
                  //     }
                  //   },
                    tooltip : {
                       // trigger: 'item'
                    },
                    grid: {
                        width:'95%',
                        left: '-2%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data :a,
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
                            itemStyle : {
                              normal: {
                              label : {show: true,color:'#ffffff'},
                              lineStyle : {
                                  width : 0.5,
                                  color : '#ffffff'
                                },
                              }
                            },
                            data:b,
                            color:"#ffffff"
                        }
                    ]
                };

		     // 使用刚指定的配置项和数据显示图表。
		     if (option && typeof option === "object") {
		         mainChart.setOption(option, true)
		     };
  	},

  	//员工业绩
	yh_display(a,b){
            let echarts = require('echarts/lib/echarts')
            let chartBox=document.getElementsByClassName('yhcharts')[0]
            let myChart=document.getElementById('yhChart')
            function resizeCharts() {//为调整图标尺寸的方法
                myChart.style.width=chartBox.style.width+'px'
                myChart.style.height=chartBox.style.height+'px'
            }
             let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
             var option = null;
             option={
             // title: {
             //          text: '员工邀新数据',
             //          left:'center',
             //          textStyle:{
             //            //文字颜色
             //            color:'#ffffff',
             //            //字体风格,'normal','italic','oblique'
             //            fontStyle:'normal',
             //            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
             //            fontWeight:'bold',
             //            //字体系列
             //            fontFamily:'sans-serif',
             //            //字体大小
             //    　　　　 fontSize:12
             //        }
             //      },
                tooltip:{
                    show:true
                },
                xAxis : [{
                        type : 'category',
                       data:a,
                       axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: '#ffffff',//左边线的颜色
                                    }
                        },
                        axisLabel:{
                             textStyle:{
                                 color:"#ffffff"
                             },
                              interval:0,
                                    rotate:0
                         }
                }],
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
                        "name":"销量",
                        "type":"bar",
                        "data":b,
                        itemStyle : {
                            normal: {
                            label : {show: true,color:'#ffffff'},
                            lineStyle : {
                                width : 0.5,
                                color : '#ffffff'
                            },
                          }
                        },
                         barWidth : 10,//柱图宽度
                                                 color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#ffffff'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                ]

            };
            mainChart.setOption(option);
    },
    store_users(){
    	this.$router.push({ path: '/page/store_users' })
    },
    dyinvite(){
    	this.$router.push({ path: '/page/dyinvite' })
    },
  	salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
        this.is_show3=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
    salesVolume2:function(){
        const _this = this;
        this.is_show2=false
        this.is_show1=true
        this.is_show3=false
        this.$vux.alert.show({
            content: "敬请期待"
        })
        setTimeout(() => {
            this.$vux.alert.hide()
            // location.reload()
        }, 3000)
	},
	salesVolume3:function(){
        const _this = this;
       this.is_show2=false
        this.is_show1=true
        this.is_show3=false
        this.$vux.alert.show({
            content: "敬请期待"
        })
        setTimeout(() => {
            this.$vux.alert.hide()
            // location.reload()
        }, 3000)
	},
  salesVolume4:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
        this.is_show6=false
        _this.$loading.show();//显示
	    setTimeout(function(){  //模拟请求
	          _this.$loading.hide(); //隐藏
	    },2000);
	},
	salesVolume5:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
        this.is_show6=false
        this.$vux.alert.show({
            content: "敬请期待"
        })
        setTimeout(() => {
            this.$vux.alert.hide()
            // location.reload()
        }, 3000)
	},
	salesVolume6:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
        this.is_show6=false
        this.$vux.alert.show({
            content: "敬请期待"
        })
        setTimeout(() => {
            this.$vux.alert.hide()
            // location.reload()
        }, 3000)
	},
	order(a){
      const _this = this;
      _this.$loading.show()
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Shop/dataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',a);
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
            // 状态码
            if (response.data.status =='200') {
              _this.$loading.hide();
              const data = response.data.data
              this.shopdata = data.member_data
              var objdata = this.shopdata.seven;
              for(var i in objdata){
               arr.push(i)
               Data.push(objdata[i])
              }
               _this.yx_display(arr,Data);
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
    },
    new(b){
      const _this = this;
      _this.$loading.show()
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Shop/dataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',b);
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
             //状态码
            if (response.data.status =='200') {
              _this.$loading.hide();
              const data = response.data.data
              var objdata = data.member_data;
              for(var i in objdata){
               arr.push(objdata[i].truename)
               Data.push(objdata[i].member_count)
              }
               _this.yh_display(arr,Data);
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
  }
}
</script>
<style scoped lang="less">

.orderData{
	background-color:#f8f7f7;
	.orderData_title{
		list-style:none;
		display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        background-color:#ffffff;
        padding:20px 0 12px 0;
        .bl{border-left: 1px solid #eeeeee}
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
		        .first{
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
		        .first{
					border-top-left-radius:0.3rem!important;
					border-bottom-left-radius:0.3rem!important;
		        }
		        .last{
		        	border-top-right-radius:0.3rem!important;
					border-bottom-right-radius:0.3rem!important;
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