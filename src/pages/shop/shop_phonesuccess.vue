<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <div class="ts">
              <img src="~@/assets/icon/pro.png">
              <p>您的手机号已修改完成</p>
              <p class="x-word">请重新登录店员账号</p>
          </div>
          <span v-on:click="login" class="button">重新登录</span>
    </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'category',
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
        login() {
            this.$router.push({ path: '/login'})
        }
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
.logo{
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
