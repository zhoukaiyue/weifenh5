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
//这是营销订单趋势图
    yh_display(a,b){
           let chart = document.getElementById("yhChart");
           let _this=this;
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(yhChart);
                var option = {
                    title: {
                        text: '左右滑动即可查看更多相关数据',
                        textStyle:{
                            //文字颜色
                            color:'#FFFFFF',
                            //字体风格,'normal','italic','oblique'
                            fontStyle:'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight:'normal',
                            //字体系列
                            fontFamily:'sans-serif',
                            //字体大小
                    　　　　 fontSize:12
                        }
                    },
                    tooltip : {
                       // trigger: 'item'
                    },
                    dataZoom: [  
                       {  
                         id: 'dataZoomX', 
                        　show:true, //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。 
                        　backgroundColor:"rgba(47,69,84,0)", //组件的背景颜色 
                           type: 'inside',  
                           throttle:'50',  
                           minValueSpan:4,  
                           start: 0,  
                           end: 15  
                       }  
                    ], 
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
                            name:'访问量',
                            type:'line',
                            stack: '销量',
                            itemStyle : {
                              normal: {
                              label : {show: false},
                              lineStyle : {
                                  width : 0.5,
                                  color : '#f7ff50'
                                },
                              }
                            },
                            data:b,
                            color:"#ffffff"
                        }
                    ]
                };
                mainChart.setOption(option);
    },
    new(b){
      const _this = this;
      var arr = [];
      var Data = [];
      _this.$loading.show()
      const url =`${myPub.URL}/merchant/Shop/orderDataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',b);
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
              var objdata = data;
              for(var i in objdata){
               arr.push(i)
               Data.push(objdata[i])
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
        this.new('2')
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