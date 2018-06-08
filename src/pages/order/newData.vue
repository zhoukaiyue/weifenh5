<template>
    <div class="orderData">
        <ul class="orderData_title">
            <li>
                <span>营销商品(元)</span></br><label>{{goods_count}}</label>
            </li>
            <li>
                <span>用户消费(元)</span></br><label>{{yin_goods_count}}</label>
            </li>
            <li>
                <span>复购率(%)</span></br><label>{{purchase_rate}}</label>
            </li>
        </ul>
        <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
        <div class="data_display">

            <div class="yx_display">
                <p class="yx_display_title">营销商品数据额统计<span></span></p>
                <ul class="yx_display_tab">
                    <li class="oli first" v-bind:class='{ li_select: is_show1}' v-on:click="salesVolume1()">7日</li>
                    <li class="oli last" v-bind:class='{ li_select: is_show2}' v-on:click="salesVolume2()">30日</li>
                </ul>
              <p class="yx_display_ftitle">销售额( 单位：元 )</p>
              <Marketingproductstatisticsq v-if="is_show1"></Marketingproductstatisticsq>
              <Marketingproductstatisticsy v-if="is_show2"></Marketingproductstatisticsy>
            </div>
             <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
             <div class="yh_display">
             <p class="yh_display_title">用户消费数据统计</p>
                <ul class="yh_display_tab">
                    <li class="oli first" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4()">7日</li>
                    <li class="oli last" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">30日</li>
                </ul>
              <p class="yh_display_ftitle">销售数据( 单位：元 )</p>
              <UserConsumptionstatisticsq v-if="is_show4"></UserConsumptionstatisticsq>
              <UserConsumptionstatisticsy v-if="is_show5"></UserConsumptionstatisticsy>
            </div>
         </div>
    </div>
</template>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'
// 引入营销商品
// 7日
import Marketingproductstatisticsq from '@/components/marketingproductstatisticsq'
// 30日
import Marketingproductstatisticsy from '@/components/marketingproductstatisticsy'
// 引入用户消费userConsumptionstatisticsq.vue
import UserConsumptionstatisticsq from '@/components/userConsumptionstatisticsq'
import UserConsumptionstatisticsy from '@/components/userConsumptionstatisticsy'
export default {
  name:'orderData',
  components: {
      Marketingproductstatisticsq,
      Marketingproductstatisticsy,
      UserConsumptionstatisticsq,
      UserConsumptionstatisticsy
  },
  data() {
    return {
        is_show1:true,
        is_show2:false,
        is_show3:false,
        is_show4:true,
        is_show5:false,
        goods_count:'',
        purchase_rate:'',
        yin_goods_count:''
    };
  },
  created() {
    },
  deactivated () {
        this.$destroy()
    },
  methods:{
    salesVolume1:function(){
        const _this = this;
        this.is_show1=true
        this.is_show2=false
    },
    salesVolume2:function(){
        const _this = this;
        this.is_show1=false
        this.is_show2=true
    },
    salesVolume4:function(){
        const _this = this;
        this.is_show4=true
        this.is_show5=false
    },
    salesVolume5:function(){
        const _this = this;
        this.is_show5=true
        this.is_show4=false
    },
    // 获取复购率到字段
    ondatas(){
      const _this = this;
      _this.$loading.show()
      const url =`${myPub.URL}/merchant/Shop/orderDataStatistics`;
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);;
          params.append('open_id',localStorage.openid);
          params.append('type',0);
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
              console.log(data)
              // goods_count  purchase_rate yin_goods_count
              _this.goods_count = data.goods_count
              _this.purchase_rate = data.purchase_rate
              _this.yin_goods_count = data.yin_goods_count

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
        this.ondatas()
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
        /*margin-top:10px;*/
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
                    color:#f54321;
                }
            }
        }
        .yh_display{
            /*margin-top:10px;*/
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
                    border-top-left-radius:0.3rem;
                    border-bottom-left-radius:0.3rem;
                }
                .last{
                    border-top-right-radius:0.3rem;
                    border-bottom-right-radius:0.3rem;
                }
                .li_select{
                    border:1.5px solid #f54321;
                    color:#f54321;
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