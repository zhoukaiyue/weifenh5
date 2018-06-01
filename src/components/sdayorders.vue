<template>
      <div class="yhcharts" >
           <div id="ddChart" style="width:100%;height:215px;"></div>
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
    //7日订单量
  dd_data(a,b,c){
        let echarts = require('echarts/lib/echarts')
        let chartBox=document.getElementsByClassName('yhcharts')[0]
        let myChart=document.getElementById('ddChart')
        function resizeCharts() {//为调整图标尺寸的方法
            myChart.style.width=chartBox.style.width+'px'
            myChart.style.height=chartBox.style.height+'px'
        }
         let mainChart = echarts.init(myChart)// 基于准备好的dom，初始化echarts实例
         var option = null;
         var option = {
                //     title: {
                //       text: '7日订单量',
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
                        left: '-0%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : a,
                             axisLine: {
                          lineStyle: {
                              type: 'solid',
                              color: '#ffffff',//左边线的颜色
                              width:0.5//坐标线的宽度
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
                                    color: 'ffffff',//左边线的颜色
                                    width:0.5//坐标线的宽度
                                }
                            },

                        },
                    ],
                    series : [
                        {
                            name:'访问量',
                            type:'line',
                            symbolSize:2,
                            stack: '销量',
                            itemStyle : {
                              normal: {
                              label : {show: false},
                              lineStyle : {
                                  width : 0.5,
                                  color : '#ffffff'
                                },
                              }
                            },
                            data:b,
                            color:"#ffffff",
                            areaStyle: {color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']}
                        }
                    ]
                };
        mainChart.setOption(option);
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
            if (response.data.status == "200") {
              const data = response.data.data
              this.shopdata = data.order_data_yin
              var objdata = this.shopdata;
              for(var i in objdata){
               arr.push(i)
               Data.push(objdata[i])
              }
               _this.dd_data(arr,Data);
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
      
  },
  deactivated () {
        this.$destroy()
    },
  created() {
        this.order('6')
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