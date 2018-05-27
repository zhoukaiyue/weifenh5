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
        <!-- 没有订单 -->
        <div class="ordernone" v-if="ordernone">
            <img src="~@/assets/icon/order.png">
            <p>店铺还没有相关的订单~</p>
        </div>
        <!-- 添加商品列表 -->
        <div class="goods-list" v-if="!ordernone">
            <ul>
                <li v-for="(item,index) in datalist">
                    <h5 class="clearfix"><span>订单编号:{{item.sn}}</span><span class="fr">{{item.status_name}}</span></h5>
                    <div class="bb t">
                        <div class="goods-img" v-on:click="linkToDetail(item.id)">
                            <img :src="item.img_src">
                        </div>
                        <div class="goods" >
                            <h5>{{item.goods_name}}</h5>
                            <p>下单时间：{{item.add_time}}</p>
                            <P><span>{{item.shop_price}}</span><span class="ml">数量:{{item.total_count}}</span></P>
                        </div>
                    </div>
                    <ul class="list">
                        <li class="clearfix"><span class="fl">买家:{{item.sername}}</span> <span class="fr">实付:<b>{{item.order_amount}}</b></span></li>
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
        panelShow: false,
        show:true,
        is_show1: true,
        is_show2: false,
        is_show3: false,
        is_show4: false,
        datalist:'',
        state:'',
        ordernone:false
    }
  },
    deactivated () {
      this.$destroy()
  },
  created(){
    const _this=this;
    _this.orderdata()
    console.log(_this.$route.query.id)
    const  a = _this.$route.query.id;
    console.log(a)
    if(a==0){
       this.public_orderdata(a)
       this.is_show1=true
       this.is_show2=false
       this.is_show3=false
       this.is_show4=false
       console.log('1')
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
 },
  methods: {
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
        const _this = this;
        _this.$loading.show();//显示
        setTimeout(function(){  //模拟请求
              _this.$loading.hide(); //隐藏
              const url =`${myPub.URL}/merchant/Shop/order`;
              var params = new URLSearchParams();
              params.append('type',a); 
              params.append('token',localStorage.currentUser_token);;
              params.append('open_id',`${openId.open_id}`);
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
                const data = response.data.data
                _this.datalist = data.list
                console.log(response)
              }).catch((err) => {
                console.log(err)
              })
        },2000);
    },
    // 切换数据
    changeData(b){
        const url =`${myPub.URL}/merchant/Clerk/order`;
        const _this = this
        var params = new URLSearchParams();
        params.append('type',b); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',`${openId.open_id}`);
        axios.post(url,params).then(response => {
          console.log(response.data.status)
            //状态码
            const ost = response.data.status;
            // 当前状态为未登录状态 提示用户登录
            if(ost==1024||ost=='1024'){
              _this.$loading.hide(); //隐藏
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                }, 2000)

            }
            //当前状态为登录状态 一切正常进行
            if(ost==200||ost=='200'){
              _this.$loading.hide(); //隐藏
                //营销商品列表
                const data = response.data.data;
                //判断当前店铺是否有订单
                if(data.count==0||data.count=='0'){
                  console.log('订单列表为空')
                    _this.ordernone=true
                    return false;
                }else{
                  _this.datalist = data.list
                }
            }
            //当前请求存在某些异常 页面弹出提示框提示用户异常详情
            else{
              _this.$loading.hide(); //隐藏
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 2000)
            }
        }).catch((err) => {
            console.log(err)
        })
      },

    //店员端店铺订单全部数据
    orderdata(){
        const url =`${myPub.URL}/merchant/Clerk/order`;
        const _this = this;
        _this.$loading.show(); //显示
        var params = new URLSearchParams();
        params.append('type','0'); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',`${openId.open_id}`);
        axios.post(url,params).then(response => {
            console.log(response.data.status)
            //状态码
            const ost = response.data.status;
            // 当前状态为未登录状态 提示用户登录
            if(ost==1024||ost=='1024'){
              _this.$loading.hide(); //隐藏
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                }, 2000)

            }
            //当前状态为登录状态 一切正常进行
            if(ost==200||ost=='200'){
              _this.$loading.hide(); //隐藏
                //营销商品列表
                const data = response.data.data;
                //判断当前店铺是否有订单
                if(data.count==0||data.count=='0'){
                  console.log('订单列表为空')
                    _this.ordernone=true
                    return false;
                }else{
                  _this.datalist = data.list
                }
            }
            //当前请求存在某些异常 页面弹出提示框提示用户异常详情
            else{
              _this.$loading.hide(); //隐藏
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 2000)
            }
        }).catch((err) => {
          _this.$loading.hide(); //隐藏
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
        .ordernone{background: #ffffff;margin-top: 1rem;text-align: center;color:#333;img{width: 7rem;margin-top: 4rem;}p{margin-top: 0.5rem;}}
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
