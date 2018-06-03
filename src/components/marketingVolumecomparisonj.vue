<template>
      <div class="yhcharts" >
        <!-- 营销商品销量对比图今日 -->
          <div id="yhChart" style="width:100%;height:215px;" v-if="shouw"></div>
          <p  v-if="!shouw" style="text-align:center;color:#ffffff;line-height:2rem;">暂无数据</p>
      </div>
</template>
<script>
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
export default {
  name:'charts',
  components: {
  },
  data() {
    return {
       shouw:false
    };
  },
  methods:{
  //这是营销商品销量对比图
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
         var option={
            tooltip:{
                show:true
            },
            grid: {
                left: 35,
                right:35
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
                       splitLine:{                 //坐标轴在 grid 区域中的分隔线。
                              show:true,              //是否显示分隔线。默认数值轴显示，类目轴不显示。
                              interval:'auto',
                              lineStyle:{
                                type: 'dotted',
                                color: '#eeeeee',//刻度线颜色
                                width:0.5//刻度线的宽度
                            }
                          },
                          axisLabel: {
                            textStyle: {
                                color: '#ffffff',//坐标值得具体的颜色
                            }
                        },
                  axisLine: {
                        lineStyle: {
                              type: 'solid',
                              color: '#ffffff',//左边线的颜色
                              width:0.5//坐标线的宽度
                          }
                      },
                        }
            ],
            series : [
                {
                    "name":"销量",
                    "type":"bar",
                    "data":b,
                    itemStyle : { normal: {label : {show:false,color:'#ffffff',position:'top'}}},
                     barWidth : 15,//柱图宽度
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
      // 接口数据
    order(a){
      const _this = this;
      _this.$loading.show()
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Shop/goodsDataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',a);
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
            if (response.data.status == "200") {
                _this.$loading.hide(); //隐藏
                const data = response.data.data
                this.shopdata = data;
                console.log(data.length)
                if(data.length==0){
                   _this.shouw = false
                }else{
                  var objdata = this.shopdata;
                  for(var i in objdata){
                   arr.push(i)
                   Data.push(objdata[i])
                  }
                   _this.yh_display(arr,Data);                  
                }

            }else{
                 _this.$loading.hide();//隐藏
                this.$vux.alert.show({
                    title: '操作失败',
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
    this.order('2')
  },
  deactivated () {
        this.$destroy()
    },
  created() {
     
    },
}
</script>
<style scoped lang="less">
    .charts{
      width:90%;
      margin:10px auto;
      height:215px;
      background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
    }
</style>