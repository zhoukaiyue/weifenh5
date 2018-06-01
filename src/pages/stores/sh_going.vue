<template>
    <div class="sh_success">
    <!-- 顶部数据 -->
          <div class="ts">
            <img src="~@/assets/icon/set.png">
              <p>您的申请入驻在审核中</p >
              <p class="x-word">市场专员将在您提交的24小时内与您联系</p >
          </div>
          <form action="http://im.weifenvip.com/?c=service" method="post">
             <input type="hidden" name="openid" :value ='openid'>
             <input type="hidden" name="goods_id" value =''>
             <input type="hidden" name="oid" value = ''>
             <input type="submit" style="cursor:pointer;" class="button" value="联系客服  快速审核">
          </form>
    </div>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,Panel, Radio,XButton,Box} from 'vux'
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'sh_success',
    data(){
      return {
       show: true,
       count: '',
       timer: null,
       openid:localStorage.openid
      }
     },
    created() {
    },
    computed: {
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
/*顶部背景 样式*/
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
.fl{float: left;}
.fr{float: right;}
.sh_success{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .ts{
    margin-top: 40px;
    text-align: center;
    img{width: 5rem;};
    .x-word{margin-top: 10px;font-size: 0.9rem;color: #999999}
  }
  .button{width: 50%;height: 40px;border:1px solid #fd5536;border-radius: 4px;color: #fd5536;display: block;line-height: 40px;text-align: center;margin-top: 30px;margin-left: 25%;background: #ffffff;-webkit-appearance : none ;border-radius: 0;}
}
</style>