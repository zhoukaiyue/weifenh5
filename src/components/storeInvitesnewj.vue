<template>
       <div class="yhcharts" >
           <div id="yhChart" style="width:100%;height:215px;"></div>
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
    };
  },
  methods:{
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
                  grid: {
                      left: 35,
                      right:35
                  },
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
                        itemStyle : {
                            normal: {
                            label : {show: false,color:'#ffffff'},
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
   new(b){
      const _this = this;
      _this.$loading.show()
      var arr = [];
      var Data = [];
      const url =`${myPub.URL}/merchant/Shop/shopDataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',b);
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
              _this.$loading.hide();
              const data = response.data.data
              
              var objdata = data;
              console.log(objdata)
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
    },
  },

  mounted(){
     this.new('3')
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