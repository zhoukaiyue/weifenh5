<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <h5>修改负责人</h5>
          <input class="input" :placeholder="user" />
          <span class="button" v-on:click="people">保存</span>
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
　　　　　　　　items: [
　　　　　　　　　　{select:'营销中（29)'},
　　　　　　　　　　{select:'已下架（39)'},
　　　　　　　　],
              user:this.$route.query.user
　　　　　　}
　　　　},
    created() {
    },
    //关闭缓存
    deactivated () {
        this.$destroy()
    },
    computed: {
    },
    methods: {
        switchCategory(index, id) {
            this.currentIndex = index
            this.getProduct(id)
        },
        linktoDetail(id) {
            this.$router.push({ path: '/page/addgoods'})
        },
        // 修改负责人
        people(){
          const _this=this
          _this.$loading.show()
          const url =`${myPub.URL}/merchant/Shop/editInfo`;
          const name = $(".input").val()
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('name',name);
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
         const status = response.data.status
         if (status == "200") {
               this.$router.push({ path: '/page/storeInfo'})
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
.logo{
  padding: 20px;h5{line-height: 30px;font-size: 1rem;font-weight: normal;}
  .input{width: 96%;background: #f7f7f7;line-height: 40px;border: 0;border-radius: 4px;padding-left: 4%;margin-top:10px; }
  .button{width: 100%;height: 40px;background: #fd5536;border-radius: 4px;color: #ffffff;display: inline-block;line-height: 40px;text-align: center;margin-top: 30px}
}
</style>
