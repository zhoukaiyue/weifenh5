<template>
    <div class="dyinvite">
        <!--切换按钮-->
        <ul class="dyinvite_title">
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive1}" @click="abc1show()">7日</li>
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive2}" @click="abc2show()">30日</li>
            <!-- <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive3}" @click="abc3show()">年度</li>
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive4}" @click="abc4show()">自定义</li -->
        </ul>
        <p class="tjdate">数据统计日期 2018/05/10</p>
        <ul class="dylist">
            <li class="dylist_title"><span>店员</span><label>引客数量</label></li>
            <!--店员排名列表循环体-->
             <li v-for="(item,index) in products" class="dylist_cont" ><span class="dylist_mc">{{item.mc}}</span><img v-lazy="item.head_pic" alt="" class="dylist_tx"><span class="dylist_name">{{item.truename}}</span><label class="dylist_num">{{item.member_count}}</label></li>
        </ul>
    </div>
</template>

<script>
import $ from 'jquery'
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'dyinvite',
    data() {
        return {
            products:'',
            isActive1: true,
            isActive2: false,
            isActive3: false,
            isActive4: false,
        }
    },

    created() {
        this.Invite()
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        //7日
        abc1show:function(){
              const _this = this;
               this.isActive1=true
               this.isActive2=false
               this.isActive3=false
               this.isActive4=false
               $('.store_users_date').show()
                _this.$loading.show();//显示
                setTimeout(function(){  //模拟请求
                    _this.$loading.hide(); //隐藏
                    const url =`${myPub.URL}/merchant/Shop/inviteRanking`;
                    var params = new URLSearchParams();
                    params.append('token',localStorage.currentUser_token);;
                    params.append('open_id',localStorage.openid);
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
                        console.log(response)
                        
                    }).catch((err) => {
                        console.log(err)
                    })
                },2000);
        },
        abc2show:function(){
                const _this = this;
                this.isActive2=false
               this.isActive1=true
               this.isActive3=false
               this.isActive4=false
               $('.store_users_date').show()
               this.$vux.alert.show({
                    content: "敬请期待"
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    // location.reload()
                }, 3000)
        },

        //邀新数据
        Invite(){
            const url =`${myPub.URL}/merchant/Clerk/inviteRanking`;
            const _this = this
            _this.$loading.show()
            const params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);;
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
                 // 状态码
                if (response.data.status =='200') {
                  const data = response.data.data
                    _this.products = data
                    console.log(data)
                }else{
                    this.$vux.alert.show({
                    content: response.data.msg
                    })
                }
                
            }).catch((err) => {
                console.log(err)
            })
        }

    },

    components: {
    }
}
</script>

<style scoped lang="less">
.dyinvite{
    background:#f8f7f7;
    .dyinvite_title{
        list-style:none;
        height:auto;
        background-color:#ffffff;
        display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        padding:15px 1% 0 1%;
        box-sizing:border-box;
        font-family:PingFangSC-Regular;
        font-size:1rem;
        color:#333333;
        letter-spacing:0;
        text-align:center;
        border-bottom:1px solid #f7f7f7;
        li{
            width:49%;
            height:100%;
            padding-bottom:15px;
            text-align:center;
        }
        .store_users_li_active{
            border-bottom:2px solid #f54321;
            color: #f54321;
        }
    }
    .tjdate{
        font-family:PingFangSC-Regular;
        font-size:0.8rem;
        color:#777777;
        letter-spacing:0;
        text-align:left;
        box-sizing:border-box;
        padding:10px 0px 10px 20px;
    }
    .dylist{
        background-color:#ffffff;
        li{
            text-align:center;
            font-family:PingFangSC-Regular;
            font-size:1rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            line-height:40px;
            span{
                display:inline-block;
                width:50%;
                height:100%;
            }
            label{
                display:inline-block;
                width:50%;
                height:100%;
                text-align:right;
                padding-right:20px;
                box-sizing:border-box;
            }
        }
        .dylist_title{
            height:40px;
            border-bottom:1px solid #eeeeee;
        }
        .dylist_cont{
            height:60px;
            display:flex;
            line-height:30px;
            padding:15px 20px;
            box-sizing:border-box;
            border-bottom:1px solid #eeeeee;
            .dylist_mc{
                width:15%;
                transform:rotate(5deg);
                font-family:PingFangSC-Regular;
                font-size:1rem;
                color:#777777;
                letter-spacing:0;
                text-align:left;
            }
            .dylist_tx{
                width:20%;
                width:30px;
                height:30px;
                border-radius:100%;
            }
            .dylist_name{
                width:30%;

            }
            .dylist_num{
                text-align:right;
                width:50%;
            }
        }
    }
}
</style>