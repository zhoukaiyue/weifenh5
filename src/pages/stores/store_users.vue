<template>
    <div class="store_users">
        <ul class="store_users_ul">
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive1}" @click="abc1show()">7日</li>
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive2}" @click="abc2show()">30日</li>
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive3}" @click="abc3show()">年度</li>
            <li class="store_users_li" v-bind:class="{ store_users_li_active: isActive4}" @click="abc4show()">自定义</li>
        </ul>
        <!-- 引入组建 -->
        <datepicker v-if="isshow"></datepicker>
        <p class="store_users_date">数据统计日期 2018/09/08-2019/09-08</p>
        <div class="data">
            <div v-for="(item,index) in datalist" class="clearfix map">
                <div class="after">
                    <span class="date">{{item.date}}</span>
                    <span class="peo">{{item.num}}人</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import $ from 'jquery'
import datepicker from '../../components/datepicker'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
export default {
    name: 'store_users',
    data() {
        return {
            isshow:false,
            isActive1: true,
            isActive2: false,
            isActive3: false,
            isActive4: false,
            datalist:[{date:"2018-06-03",num:"208"},{date:"2018-06-04",num:"228"},{date:"2018-06-05",num:"211"},{date:"2018-06-06",num:"222"},{date:"2018-06-07",num:"235"},{date:"2018-06-08",num:"398"},{date:"2018-06-09",num:"248"}],
            nums:[],
            number:[]
        }
    },
    deactivated () {
        this.$destroy()
    },
    created() {
        const lists= this.datalist;
        for(var i =0;i<lists.length;i++){
            // console.log(this.nums.push(lists[i].num))
            this.nums.push(lists[i].num)
        }
        console.log(this.nums)
        this.Invitenew()
    },
    computed: {
    },
    methods: {
        abc1show:function(){
            const _this = this;
            this.isshow=false
            this.isActive2=false
            this.isActive1=true
            this.isActive3=false
            this.isActive4=false
           _this.$loading.show();//显示
            setTimeout(function(){  //模拟请求
                  _this.$loading.hide(); //隐藏
            },2000);
        },
        abc2show:function(){
            const _this = this;
            this.isshow=false
            this.isActive2=false
            this.isActive1=true
            this.isActive3=false
            this.isActive4=false
           $('.store_users_date').show()   
            // _this.$loading.show();//显示    //模拟请求
            // _this.$loading.hide(); //隐藏
              _this.$vux.alert.show({
            content: '敬请期待'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
                // location.reload()
            }, 3000)
        },
        abc3show:function(){
           const _this = this;
            this.isshow=false
            this.isActive2=false
            this.isActive1=true
            this.isActive3=false
            this.isActive4=false
           $('.store_users_date').show()   
            // _this.$loading.show();//显示    //模拟请求
            // _this.$loading.hide(); //隐藏
              _this.$vux.alert.show({
            content: '敬请期待'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
                // location.reload()
            }, 3000)
        },
        abc4show:function(){
            const _this = this;
            this.isshow=false
            this.isActive2=false
            this.isActive1=true
            this.isActive3=false
            this.isActive4=false
           $('.store_users_date').show()   
            // _this.$loading.show();//显示    //模拟请求
            // _this.$loading.hide(); //隐藏
              _this.$vux.alert.show({
            content: '敬请期待'
            })
            setTimeout(() => {
                this.$vux.alert.hide()
                // location.reload()
            }, 3000)
        },
        after(){
            const max = Math.max.apply(null, this.nums)
            console.log(max)
            for(var i =0;i<this.nums.length;i++){
                const integer = (this.nums[i]/max).toFixed(2)
                const width = integer*100+'%'
                $(".after").eq(i).css('width',width)
                console.log(width)
                this.number.push(integer)
            }
            const max2 = Math.max.apply(null, this.number)
            console.log(max2)
            for (var i = 0; i < this.number.length; i++) {
                if (this.number[i] == max2) {
                    const index = i
                    $(".after").eq(i).css('background','#FF8134')
                    console.log(i)
                }
            }
            // console.log(this.number)
            // const max2 = Math.max.apply(null, this.number)
            // console.log(max2)        
        },
        // 店铺邀新数据
        Invitenew(){
            const _this =this
            _this.$loading.show()
            const url =`${myPub.URL}/merchant/Shop/inviteRanking`;
            var params = new URLSearchParams();
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
            if (response.data.status =='200') {
                _this.$loading.hide();
                const data = response.data
                console.log(response)
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
        }
    },
    components: {
        datepicker
    },
      mounted(){
        this.after()
        
  }
}
</script>

<style scoped lang="less">
.store_users{
    background:#f8f7f7;
    .store_users_ul{
        background:#ffffff;
        list-style:none;
        height:50px;
        padding:0px 5% 13px 5%;
        display:flex;
        flex-wrap: nowrap;
        .store_users_li{
            width:22.5%;
            height:100%;
            font-family:PingFangSC-Regular;
            font-size:1rem;
            color:#333333;
            letter-spacing:0;
            text-align:center;
            line-height:50px;
        }
        .store_users_li_active{
            border-bottom:2px solid #f54321
            ;
            color: #f54321;
        }
    }
    .store_users_date{
        padding:11px 5%;
        font-family:PingFangSC-Regular;
        font-size:0.9rem;
        color:#777777;
        letter-spacing:0;
        text-align:left;
    }
    .store_users_bar{
        position:relative;
        z-index:0;
        width:100%;
        margin:10px auto;
        height:auto;
        background:#ffffff;
        padding:0px 5%;
        box-sizing:border-box;
    }
    .data{
        border-top: 1px solid #dddddd; 
        padding:  1rem 1.5rem;
        background: #ffffff;
        .map{
            position: relative;
            margin-bottom: 1rem;
            height: 2rem;line-height: 2rem;background: #f7f7f7;width: 100%;position: relative;font-size: 0.8rem;
            .after{display:inline-blobk;width: 80%;position: absolute;background: #d8d8d8   ;left: 0;top: 0;height: 2rem}
            .date{float: left;color: #ffffff;position: absolute;z-index: 1;left: 2%;}
            .peo{float: right;right: 2%;position: absolute;z-index: 1;color: #ffffff;}
        }
    }
}
</style>
