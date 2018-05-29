<template>
    <div class="charts">
      <!-- 本周访问量销售量-->
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
  //这是本周商品访问量/销售量趋势图
  yx_display(){
       var chart = document.getElementById("myChart");
               let echarts = require('echarts/lib/echarts');
               let mainChart = echarts.init(myChart);
                var option = {
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
                        left: '-4%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data :['商品', '商品', '商品', '商品', '商品', '商品', '商品'],
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
                            symbolSize:2,
                            stack: '销量',
                            itemStyle : {
                              normal: {
                              label : {show: true},
                              lineStyle : {
                                  width : 0.5,
                                  color : '#f7ff50'
                                },
                              }
                            },
                            data:[2270, 3456, 5432, 3423, 632, 291, 134],
                            color:"#ffffff",
                            areaStyle: {color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']}
                        }
                    ]
                };
                mainChart.setOption(option);
    },
    order(a){
      const _this=this
      _this.$loading.show()
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
                const data = response.data.data
                console.log(response)
                this.yx_display()
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
    this.yx_display()
  },
  deactivated () {
        this.$destroy()
  },
 created() {
      this.order('5')
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