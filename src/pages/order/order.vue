    <template>
    <div class="goods">
        <div class="nav-list">
            <ul class="nav-list">
                <li  v-bind:class="{ select: is_show1}" @click="salesVolume1()">全部
                </li>
                <li v-bind:class="{ select: is_show2}" @click="salesVolume2()" id="text">进行中<span></span></li>
                <li v-bind:class="{ select: is_show3}" @click="salesVolume3()">已完成<span></span></li>
                <li v-bind:class="{ select: is_show4}" @click="salesVolume4()">
                    已取消
                </li>
            </ul>
        </div>
        <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
        <!-- 没有订单 -->
        <div class="ordernone"  v-if="is_show6">
            <img src="~@/assets/icon/order.png">
            <p>店铺还没有相关的订单~</p>
        </div>
        <!-- 添加商品列表 -->
        <div class="goods-list" v-if="is_show7">
            <ul>
                <li v-for="(item,index) in datalist" v-on:click="linkToDetail(item.id)">
                    <h5 class="clearfix"><span>订单编号:{{item.sn}}</span><span class="fr">{{item.status_name}}</span></h5>
                    <div class="bb t">
                        <div class="goods-img" >
                            <img v-lazy="item.img_src">
                        </div>
                        <div class="goods" >
                            <h5>{{item.goods_name}}</h5>
                            <p>下单时间：{{item.add_time}}</p>
                            <P><span>{{item.shop_price}}</span><span class="ml">数量:{{item.total_count}}</span></P>
                        </div>
                    </div>
                    <ul class="list">
                        <li class="clearfix"><span class="fl">买家:{{item.truename}}</span> <span class="fr">实付:<b>{{item.order_amount}}</b></span></li>
                        <li class="clearfix"><span class="fl">推广店长:{{item.second_leader_name}}</span> <span class="fr">推广店员:{{item.first_leader_name}}</span></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="bg"></div>
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { Radio, Group, Toast } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
      radio001: [ '适合20-30岁群体', '适合30-40岁群体' , '适合40-50岁群体', '适合50-60岁群体'],
       panelShow: false,
       show:true,
        is_show1: true,
        is_show2: false,
        is_show3: false,
        is_show4: false,
        is_show6: false,
        is_show7: true,
        datalist:'',
        state:'',
    }
  },
    deactivated () {
      this.$destroy()
  },
  created() {

    const _this=this;
    const  a = _this.$route.query.id;
    if (a) {
      if(a==0){
      console.log(a)
       this.public_orderdata(a)
       this.is_show1=true
       this.is_show2=false
       this.is_show3=false
       this.is_show4=false
      }
      if(a==1){
         this.public_orderdata(a)
         this.is_show2=true
         this.is_show1=false
         this.is_show3=false
         this.is_show4=false
      }
      if(a==2){
         this.public_orderdata(a)
         this.is_show3=true
         this.is_show2=false
         this.is_show1=false
         this.is_show4=false
      }
      if(a==3){
         this.public_orderdata(a)
         this.is_show4=true
         this.is_show2=false
         this.is_show3=false
         this.is_show1=false
      }
    }else{
      _this.orderdata()
    }
 },
  methods: {
    change (value, label) {
        const _this = this;
        console.log('change:', value)
        $(".nav-list .list").hide();
        $(".bg").hide()
         _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
    },
    greet: function () {
        $(".nav-list .list").show()
        $(".bg").show ()
        $(".nav-list").css("z-index",100);
    },
    linkToDetail(id) {
        this.$router.push({ path: '/page/detail', query: { id: id } })
    },
    showPanel() {
       this.panelShow = true;
       $(".bg").show()
    },
    hidepanel(){
        $(".bg").hide()
        this.show = false;
    },
    //进行中
    salesVolume2:function(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        this.is_show3=false
        this.is_show4=false
         _this.changeData(1)
    },
    // 已完成
    salesVolume3:function(){
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=true
        this.is_show4=false
         _this.changeData(2)
    },
    //已取消
    salesVolume4:function(){
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=false
        this.is_show4=true
         _this.changeData(3)
    },
    // 全部
    salesVolume1:function(){
        const _this = this;
        this.is_show2=false
        this.is_show1=true
        this.is_show3=false
        this.is_show4=false
         _this.changeData(0)
    },
    public_orderdata(a){
        const url =`${myPub.URL}/merchant/Shop/order`;
        const _this = this
        _this.$loading.show();
        var params = new URLSearchParams();
        params.append('type',a); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',localStorage.openid);
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
            // 状态码
            if (response.data.status =='200') {
              _this.is_show6=false
              _this.is_show7=true
              _this.$loading.hide();
              const data = response.data.data
              _this.datalist = data.list
              console.log(_this.datalist)
            }else{
              if (response.data.status =='1053') {
                _this.is_show6=true
                _this.is_show7=false
              }else{
                  this.$vux.alert.show({
                  content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
              }
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    // 切换数据
    changeData(b){
        const url =`${myPub.URL}/merchant/Shop/order`;
        const _this = this
        _this.$loading.show();
        var params = new URLSearchParams();
        params.append('type',b); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',localStorage.openid);
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
            // 状态码
            if (response.data.status =='200') {
              _this.is_show7=true
              _this.is_show6=false
              _this.$loading.hide();
              const data = response.data.data
              _this.datalist = data.list
              console.log(data)
              console.log(_this.datalist)
            }else{
              if (response.data.status =='1053') {
                _this.is_show6=true
                _this.is_show7=false
              }else{
                  this.$vux.alert.show({
                  content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
              }
            }
        }).catch((err) => {
            console.log(err)
        })
      },
    //店铺订单全部数据
    orderdata(){
        const _this = this;
        _this.$loading.show();//显示
        const url =`${myPub.URL}/merchant/Shop/order`;
        var params = new URLSearchParams();
        params.append('type','0'); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',localStorage.openid);
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
        // 状态码
        if (response.data.status =='200') {
          _this.is_show6=false
          _this.is_show7=true
          _this.$loading.hide();//隐藏
          const data = response.data.data
          _this.datalist = data.list
          console.log(response)
        }else{
          if (response.data.status =='1053') {
            _this.is_show6=true
            _this.is_show7=false
          }else{
              this.$vux.alert.show({
              content: response.data.msg
            })
            setTimeout(() => {
                this.$vux.alert.hide()
            }, 3000)
          }
        }
          
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}

</script>
<style type="text/css">
    .weui-icon-checked:before{color: #f54321!important;}
</style>
<style scoped lang="less">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.clearfix{
    zoom:1;
}

.f16{font-size: 0.8rem!important;}
.fr{float: right;}
.fl{float:left; }
.ml10{margin-left: 10px;}
.pb10{padding-bottom:10px;}
.bb{border-bottom: 1px solid #dddddd;}
/*商品数据查询*/
.goods {
        background: #f1f1f1;
        .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 11;left: 0;top: 0;display: none;}
        .nav-list{background: #ffffff;position: relative;
                .select{color: #f64a29;border-bottom: 2px solid #f64a29}
                li{width: 23%;display: inline-block;text-align: center;padding: 1rem 0;position: relative;font-size: 0.9rem;
                    a{position: absolute;margin-left: 10px;img{width: 0.6rem;}}
                    .t{top: 1.3rem;};.d{bottom: 1.4rem;}.sx{width: 0.9rem;position: relative;top: 0.2rem;left: 0.2rem}
                }
            }
        }
        .ordernone{background: #ffffff;margin-top: 1rem;text-align: center;color:#333;height:100%;
          padding:1rem 0px 5rem 0px;margin-top:0px;img{width: 7rem;margin-top: 4rem;}p{margin-top: 0.5rem;}}
/*添加商品列表*/
.goods-list{
    .t{padding: 1.5rem 1rem 1rem 1.5rem;}
    li{position: relative;background: #ffffff;margin-top: 1rem;h5{padding: 0 1.5rem;border-bottom: 1px solid #dddddd;line-height: 3rem;color: #333;font-weight: normal;.fr{font-weight: 600;}}}
    .bb{
        .goods-img{
        position: relative;width:30%;display: inline-block;vertical-align:top;border: 1px solid #dddddd;
        p{position: absolute;bottom: 0;background: rgba(153,153,153,.7);text-align: center;line-height: 25px;color: #ffffff;font-size: 10px;width: 100%;z-index: 1;}
        img{width: 100%}
        .mb{display: none;position: absolute;width: 100%;height: 100%;left: 0;top: 0;background: rgba(153,153,153,.7);span{display: inline-block;width:4rem;height:1.8rem;color: #ffffff;border: 1px solid #ffffff;transform: rotate(-30deg);margin-top: 1.5rem;margin-left: 0.7rem;text-align: center;line-height: 1.8rem;}}
        }
        .goods{
            display: inline-block;margin-left:2%;width: 65%;background: #ffffff;position: relative;
            h5{width: 95%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-weight: normal;font-size: 0.8rem;border: 0;padding: 0;line-height: 2rem;};
            p{margin-top: 10px;font-size: 0.8rem;color: #777;.ml{margin-left: 3rem;}}

        }
    }
    .list{padding:0 1.5rem;padding-bottom:1rem;li{list-style: none;font-size: 0.8rem;line-height: 1rem;margin-top: 0.5rem;span{b{font-weight: normal;color: #f54321}}} }
}

</style>
