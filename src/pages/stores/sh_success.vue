<template>
    <div class="sh_success">
    <!-- 顶部数据 -->
          <div class="ts">
              <img src="~@/assets/icon/pro.png">
              <p>您的入驻申请已提交成功</p>
              <p class="x-word">24小时内市场专员将与你联系</p>
          </div>
          <span v-on:click="login" class="button">联系客服&nbsp;&nbsp;快速审核</span>
    </div>
</template>

<script>
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,Panel, Radio,XButton,Box} from 'vux'
import Vue from 'vue'
import $ from 'jquery'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'sh_success',
    data(){
      return {
       show: true,
       count: '',
       timer: null,
      }
     },
    created() {
    },
    computed: {
    },
    methods: {
        login(openid) {
          openid = localStorage.openid
          location.href = 'http://im.weifenvip.com/?c=service&openid=$openid&gid=$goods_id&oid=$order'
          // this.$vux.alert.show({
          //         title: '提示',
          //         content: '该功能暂未开启，敬请期待'
          //   })
          //   setTimeout(() => {
          //       this.$vux.alert.hide()
          //   }, 3000)
        },
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
  .button{width: 50%;height: 40px;border:1px solid #fd5536;border-radius: 4px;color: #fd5536;display: block;line-height: 40px;text-align: center;margin-top: 30px;margin-left: 25%;}
}
</style>
