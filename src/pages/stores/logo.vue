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
        menuBanner() {
            return this.menu[this.currentIndex].img.url
        },
        categoryTitle() {
            return this.menu[this.currentIndex].name
        }
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail(id) {
            this.$router.push({ path: '/page/addgoods'})
        },
        // 更改品牌名称
        brand_name(){
          const url =`${myPub.URL}/merchant/Shop/editInfo`;
          const brand_name = $(".input").val();
          // console.log(brand_name)
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',`${openId.open_id}`);
          params.append('brand_name',brand_name);
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
          const status = response.data.status
         if (status == "200") {
               this.$router.push({ path: '/page/storeInfo', query: { num:  brand_name},meta:{keepAlive: true}})
            }else{
                this.$vux.alert.show({
                    title: '操作失败',
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
  .input{width: 96%;background: #f7f7f7;line-height: 40px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:10px; }
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
