<template>
      <div class="charts" >
          <!--营销商品30日销量趋势图 -->
          <div id="myChart" style="width:100%;height:100%;"></div>
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
    //这是营销商品访问量/销售量趋势图
  yx_display(a,b){
       var chart = document.getElementById("myChart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(myChart);
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
                    // tooltip : {
                    //    // trigger: 'item'
                    // },
                    // legend: {
                    //     // data:['']
                    // },
                    // // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                  grid: {
                      left: 35,
                      right:35
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
                              width:1//坐标线的宽度
                            }
                        },
                        axisLabel: {
                          interval:0,
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
                            symbolSize:2,
                            stack: '销量',
                            itemStyle : {
                              normal: {
                              label : {show: false,color:'#ffffff'},
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
                var objdata = this.shopdata;
                for(var i in objdata){
                 arr.push(i)
                 Data.push(objdata[i])
                }
                 _this.yx_display(arr,Data);
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
    this.order('1')
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