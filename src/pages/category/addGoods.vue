    <template>
    <div class="goods">
        <div class="nav-list">
            <ul class="nav-list">
                <li  v-bind:class="{ select: is_show1}" @click="price">价格
                    <a href="javascript:" class="t"><img src="~@/assets/icon/goods-down.png"></a>
                    <a href="javascript:" class="d"><img src="~@/assets/icon/goods-up-select.png"></a>
                </li>
                <li v-bind:class="{ select: is_show2}" @click="salesVolume">销量<span></span></li>
                <li v-bind:class="{ select: is_show3}" @click="Stock">库存<span></span></li>
                <li v-on:click="fit" v-bind:class="{ select: is_show4}">
                    适合人群<img class="sx" src="~@/assets/icon/sx.png">
                </li>
            </ul>
            <div class="list"  v-if="isshow_bg">
                <ul>
                    <li v-for="(item,index) in radio001" @click="fit2(item,index)" v-bind:class="{'on':flag==index}">{{item.rec_name}}<span>{{item.id}}</span></li>
                </ul>
            </div>
        </div>
        <!-- 添加商品列表 -->
        <div class="goods-list">
            <ul>
                <li class="bb t" v-for="(item,index) in datalist" >
                    <div class="goods-img" v-on:click="linkToDetail(item.id)">
                        <img v-lazy="item.img_src">
                        <p>{{item.recpos_name}}</p>
                        <div class="mb"><span>已售罄</span></div>
                    </div>
                    <div class="goods" >
                        <h5>{{item.goods_name}}</h5>
                        <p><span class="price">￥{{item.shop_price}}</span>&ensp;<span class="y-charge">券后价</span>&ensp;<span class="charge">￥{{item.markte_price}}</span><a href="javascript:"><img src="~@/assets/icon/goods-left.png"></a></p>
                        <ul class="list">
                            <li>销量 <span>{{item.ogm}}</span></li>
                            <li>库存 <span>{{item.goods_stock}}</span></li>
                        </ul>
                    </div>
                    <div class="addgood">
                        <div v-on:click="join(item.id)">
                            <img src="~@/assets/icon/goodsadd.png">
                            &emsp;<span>加入营销</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="bg" v-if="isshow_bg"></div>
    </div>
</template>
<script>
import $ from 'jquery'
import { Radio, Group, Toast} from 'vux'
import { mapMutations } from 'vuex'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
        radio001:{},
        show:true,
        is_show1: true,
        is_show2: false,
        is_show3: false,
        is_show4: false,
        is_show5: false,
        is_show6: false,
        is_show7: false,
        is_show8: false,
        datalist:'',
        is_flag:true,　
        datas:true,
        flag:0,
        isshow_bg:false
    }
  },
 created() {
    this.Marketinggoods()
    const  id = this.$route.query.id;
    if (id) {
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=false
        this.is_show4=false
    }
 },
 deactivated () {
    this.$destroy()
},
  methods: {
    change (value, label) {
        const _this = this;
        console.log('change:', value)
        // 适合人群请求
         _this.Marketinggoods('type',value)
    },
    linkToDetail(id) {
        this.$router.push({ path: '/page/detail', query: { id: id } })
    },
    // 加入营销商品
    join(id) {
        const _this =this
        _this.$loading.show();//隐藏
        const url =`${myPub.URL}/merchant/Shop/goodsUpDown`;
        var params = new URLSearchParams();
        params.append('token',localStorage.currentUser_token);
        params.append('open_id',localStorage.openid);
        params.append('id',id);
        params.append('type','1');
        axios.post(url,params).then(response => {
            _this.$loading.hide();//隐藏
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
              
               const data = response.data
                console.log(response)
                _this.Marketinggoods()
                this.$vux.alert.show({
                    content: data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    
                }, 3000)
            }else{
                this.$vux.alert.show({
                content: response.data.msg
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    },
    //销量接口
    salesVolume(){
        const _this = this;
        this.is_show2=true
        this.is_show1=false
        this.is_show3=false
        this.is_show4=false
        this.isshow_bg=false
        // 根据销量请求
         _this.Marketinggoods('sales_volume',1)
    },
    // 库存接口
    Stock(){
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=true
        this.is_show4=false
        this.isshow_bg=false
        // 根据库存请求
         _this.Marketinggoods('stock',1)
    },
    // 适合人群
    fit(){
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=false
        this.is_show4=true
        this.isshow_bg=true

    },
    fit2(item,index){
        console.log(item.id)
        const _this = this;
        this.is_show2=false
        this.is_show1=false
        this.is_show3=false
        this.is_show4=true
         this.flag=index;
         this.isshow_bg=false
        this.Marketinggoods('type',item.id)
    },
    // 价格
    price(){
        const _this = this;
        this.is_show2=false
        this.is_show1=true
        this.is_show3=false
        this.is_show4=false
        //价格请求接口
        const flag=this.is_flag
        if(flag){
            //请求价格高
            console.log('请求价格高')
            _this.Marketinggoods('shop_price',1)
            this.is_flag=!this.is_flag
        }else{
            //请求价格低
            console.log('请求价格低')
             _this.Marketinggoods('shop_price',2)
            this.is_flag=!this.is_flag
        }
    },

    //营销商品数据接口
    Marketinggoods(a,b){
        const _this =this
         _this.$loading.show();//显示
        const category_id = _this.$route.query.id
        const url =`${myPub.URL}/merchant/Shop/addShopGoods`;
        var params = new URLSearchParams();
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',localStorage.openid);
        if(category_id) {
            params.append('category_id',category_id);
        }
        if(a=='shop_price'){
            params.append('shop_price',b);
        }
        if(a=='sales_volume') {
            params.append('sales_volume',b);
        }
        if(a=='stock'){
            params.append('stock',b);
        }
        if(a=='type') {
            params.append('type',b);
        }
        if(a=='page'){
            params.append('page',b);
        }
        if(a=='size'){
            params.append('size',b);
        }
        axios.post(url,params).then(response => {
            _this.$loading.hide();//隐藏
            console.log(response)
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  location.href = '/login'
              }, 3000)
            }
            const status = response.data;
            if (status.status == "200") {
                 _this.datalist = status.data
                 console.log(status.data)
                 _this.radio001=status.data.type_list
                
            }else{
                this.$vux.alert.show({
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)
            }
            console.log(response)
            console.log(status)
        }).catch((err) => {
            _this.$loading.hide();//隐藏
            console.log(err)
        })
    }
  }
}

</script>
<style type="text/css">
    .weui-icon-checked:before{color: #f54321!important;}
    .weui-dialog{background: #ffffff;}
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
.ml10{margin-left: 10px;}
.pb10{padding-bottom:10px;}
.bb{border-bottom: 1px solid #dddddd;}
/*商品数据查询*/
.goods {
        background: #f1f1f1;
        .bg{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,.5);z-index: 11;left: 0;top:55px;}
        .nav-list{background: #ffffff;position: relative;height:55px;
                .select{color: #f64a29;}
                li{width: 23%;display: inline-block;text-align: center;padding: 1rem 0;position: relative;font-size: 0.9rem;box-sizing: border-box;
                    a{position: absolute;margin-left: 10px;img{width: 0.6rem;}}
                    .t{top: 1.3rem;};.d{bottom: 1.4rem;}.sx{width: 0.9rem;position: relative;top: 0.2rem;left: 0.2rem}
                }
                .list{position: absolute;width: 100%;z-index: 2;color: #999999;font-size: 10.8rem;z-index: 111;background: #ffffff;
                    li{width: 100%;padding: 0.8rem;display: block;text-align: left;border-top: 1px solid #eeeeee;span{opacity: 0;}}
                }

            }
        }
/*添加商品列表*/
.goods-list{
    background: #ffffff;margin-top: 10px;
    .t{padding: 1.5rem 1rem 1rem 1.5rem;}
    li{position: relative;}
    .goods-img{
        position: relative;width:30%;display: inline-block;vertical-align:top;
        p{position: absolute;bottom: 0;background: rgba(153,153,153,.7);text-align: center;line-height: 25px;color: #ffffff;font-size: 10px;width: 100%;z-index: 1;}
        img{width: 100%}
        .mb{display: none;position: absolute;width: 100%;height: 100%;left: 0;top: 0;background: rgba(153,153,153,.7);span{display: inline-block;width:4rem;height:1.8rem;color: #ffffff;border: 1px solid #ffffff;transform: rotate(-30deg);margin-top: 1.5rem;margin-left: 0.7rem;text-align: center;line-height: 1.8rem;}}
    }
    .goods{
        display: inline-block;margin-left:2%;width: 65%;background: #ffffff;position: relative;
        h5{width: 95%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-weight: normal;font-size: 0.8rem};
        p{margin-top: 10px;a{float: right;margin-top: 0.1rem;img{width: 0.5rem;}}}
        .price{color: #f54321;font-size:1rem;font-weight: 600;}
        .y-charge{display: inline-block;color:#f54321;border: 1px solid #f54321;padding: 0 0.1rem ;font-size:0.7rem }
        .charge{color: #dddddd;position: relative;font-size: 0.7rem;}
        .charge:after{content: '';display: inline-block;position: absolute;width: 100%;top: 50%;height: 1px;background: #dddddd;left: 0;}
        .list li{line-height: 1.2rem;padding: 0;font-size: 0.8rem;list-style: none;}
        .bottom .select{color: #f64a29;}

    }
    .addgood{font-size:0.8rem;float:right;width: 6rem;height: 1.7rem;background: #f54321;color:#ffffff;line-height:1.7rem;position: absolute;right:2rem;bottom:1rem;
        img{position: relative;top: 0.2rem;left: 0.8rem;width: 0.8rem;};
        .suc{position: absolute;right: 4rem;padding: 1rem;border: 1px solid #999999;background: #ffffff;z-index: 111;color: #999999;width: 9rem;text-align: center;height: 1rem;line-height: 1rem;
            span{position: absolute;top: 0.5rem;right: 0.5rem;width: 0.8rem;img{width: 100%;left: 0;}}
        }
    }
    .sq{.addgood{background: #dddddd;color: #ffffff;text-align: center;}.mb{display: block;}}
}
.on{ color: red; }
</style>
