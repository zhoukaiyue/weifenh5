    <template>
    <div class="goods">
      <div class="title">
        <img class="order" src="~@/assets/icon/white.png">&ensp;订单状态：<span>待收货</span>
        <div class="address">
          <img class="position" src="~@/assets/icon/position.png">
          <div>
            <p>王先生&emsp;<input type="text" class="mobile" v-model="mobile"/></p>
            <p class="ares">上海省上海市徐汇区泗凤路泗泾镇 </p>
          </div>
          <img class="bottom" src="~@/assets/icon/line@2x.png">
        </div>
      </div>
    </div>
    <!-- 添加商品列表 -->
    </div>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { Radio, Group } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
  components: {
    Radio,
    Group
  },
  data () {
    return {
      mobile:''
    }
  },
    deactivated () {
      this.$destroy()
  },
  created() {
    this.phone()
 },
  methods: {
    // 处理手机号
    phone(){
      const str='15146105546';
      const str2 = str.substr(0,3)+"****"+str.substr(7);
      this.mobile = str2
    },
    //店铺订单全部数据
    orderdata(){
        const url =`${myPub.URL}/merchant/Shop/order`;
        const _this = this
        var params = new URLSearchParams();
        params.append('type','0'); 
        params.append('token',localStorage.currentUser_token);;
        params.append('open_id',`${openId.open_id}`);
        axios.post(url,params).then(response => {
            const data = response.data.data
            _this.datalist = data.list
            console.log(data)
            console.log(_this.datalist)
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
/*订单顶部*/
.goods{
  background: #f1f1f1;
  .title{
    background-color: #FF9656;height: 55px;line-height: 55px;color: #ffffff;padding-left: 1rem;font-size: 0.8rem;
    img{width: 1rem;}
    .order{position: relative;top: 0.3rem;}
    .address{
      height: 80px;
      position: relative;
      div{
        padding-top: 1rem;
        margin-left: 0.5rem;
        color: #333333;
        line-height: 1.5rem;
        display: inline-block;
        .ares{color: #999999}
        .mobile{border: 0;}
      }
      .position{position: relative;bottom: 0.5rem;}
      .bottom{width: 100%;position: absolute;right:0.5rem;bottom: 0;}
    }
  }
}
</style>
