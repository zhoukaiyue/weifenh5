<template>
    <div class="logo">
      <!-- 顶部数据 -->
      <h5>品牌名称</h5>
      <input class="input" placeholder="修改品牌名称" />
      <span class="button" v-on:click="brand_name">保存</span>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'

import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    data(){
　　　　　　return {
　　　　　　　　active: false,
　　　　　　}
　　　　},
    created() {
    },
    computed: {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        // 更改品牌名称
        brand_name(){
          const url =`${myPub.URL}/merchant/Clerk/editInfo`;
          const brand_name = $(".input").val();
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',`${openId.open_id}`);
          params.append('name',brand_name);
          axios.post(url,params).then(response => {
            if(brand_name==""){
                this.$vux.alert.show({
                    title: '操作失败',
                    content: '昵称不能为空'
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 3000)              
            }else{
             //状态码
              const ost = response.data.status;
              // 当前状态为未登录状态 提示用户登录
              if(ost==1024||ost=='1024'){
                 this.$vux.alert.show({
                      title: '温馨提示',
                      content: response.data.msg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      location.href = '/login'
                  }, 3000)

              }
              //当前状态为登录状态 一切正常进行
              if(ost==200||ost=='200'){
                this.$vux.alert.show({
                      title: '温馨提示',
                      content: '修改成功，正在跳转'
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      this.$router.push({ path: '/page/shop_mine'})
                  }, 2000)
              }
              //当前请求存在某些异常 页面弹出提示框提示用户异常详情
              else{
                 this.$vux.alert.show({
                      title: '温馨提示',
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
.logo{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .input{width: 96%;background: #f7f7f7;line-height: 40px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:10px; }
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
