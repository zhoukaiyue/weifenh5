<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <h5>店铺介绍</h5>
          <textarea class="input"></textarea>  
          <span class="button" v-on:click="description">保存</span>
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
    name: 'category',
    data(){
　　　　　　return {
　　　　　　　　active: false,
　　　　　　}
　　　　},
    created() {
    },
    computed: {
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail(id) {
            this.$router.push({ path: '/page/addgoods'})
        },
        // 更改店铺介绍
        description(){
          const _this =this
          _this.$loading.show()
          const url =`${myPub.URL}/merchant/Shop/editInfo`;
          const description = $(".input").val();
          console.log(description)
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          params.append('description',description);
          axios.post(url,params).then(response => {
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
            if (response.data.status =='200') {
              _this.$loading.hide();
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
  .input{width: 96%;background: #f7f7f7;line-height: 25px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:10px;height: 200px;font-size: 1.1rem;color: #999999;padding: 10px 6px;}
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
