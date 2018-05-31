<template>
      <div class="charts">
              <!-- 店铺新增用户数据 -->
          <div id="Chart" style="width:100%;height:100%;"></div>
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
    //店铺新增用户数据
    order_display(a,b){
           let chart = document.getElementById("Chart");
           let _this=this;
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(Chart);
                var option = {
                  //   title: {
                  //       text: '我的新增用户数据',
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
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data :a,
                            axisLine: {
                            lineStyle: {
                              width : 0.5,
                              color : '#ffffff'
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
                            symbolSize:3,
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
      // 接口数据
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
                this.shopdata = data.member_data
                var objdata = this.shopdata.seven;
                for(var i in objdata){
                 arr.push(i)
                 Data.push(objdata[i])
                }
                 _this.order_display(arr,Data);
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
        this.order('4')
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