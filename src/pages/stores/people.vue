<template>
    <div class="logo">
    <!-- 顶部数据 -->
          <h5>修改负责人</h5>
          <input class="input" placeholder="王富贵" />
          <span class="button" v-on:click="people">保存</span>
    </div>
</template>

<script>
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
　　　　　　　　]
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
          const url =`${myPub.URL}/merchant/Shop/editInfo`;
          const user_name = $(".input").val()
          var params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('user_name',user_name);
          params.append('open_id',`${openId.open_id}`);
          axios.post(url,params).then(response => {
            // const currentUser_token = response.data.data //获取token
            // console.log(response)
            // next('/page/storesuccess')
         const status = response.data.status
         if (status == "200") {
               this.$router.push({ path: '/page/storesuccess'})
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
