<template>
	<div class="orderData">
		<ul class="orderData_title">
			<li>
				<span>店铺总用户(人)</span></br><label>{{count}}</label>
			</li>
			<li class="bl">
				<span>今日新增用户(人)</span></br><label>{{new_count}}</label>
			</li>
		</ul>
    <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
		<div class="data_display">

		    <div class="yx_display">
		    	<p class="yx_display_title">店铺新增用户数据<!-- <span v-on:click="store_users">查看更多&ensp;<img src="ss"></span> --></p>
		    	<ul class="yx_display_tab">
			    	<li class="oli first" v-bind:class='{li_select: is_show1}' v-on:click="salesVolume1()">7日</li>
			    	<li class="oli last" v-bind:class='{li_select: is_show2}' v-on:click="salesVolume2()">30日</li>
		    	</ul>
		      <p class="yx_display_ftitle">新增用户( 单位：人 )</p>
          <!-- 店铺新增用户7日 -->
          <Storenewusersq v-if="is_show1"></Storenewusersq>
          <!-- 店铺新增用户30日 -->
          <Storenewusersy v-if="is_show2"></Storenewusersy>
		    </div>
        <div style="height:16px;width:100%;background-color: #f8f7f7;"></div>
		     <div class="yh_display">
		    	<p class="yh_display_title">店员邀新数据<!-- <span v-on:click="dyinvite">查看更多&ensp;<img src="~@/assets/icon/goods-left.png"></span> --></p>
		    	<ul class="yh_display_tab">
			    	<li class="oli first" v-bind:class='{ li_select: is_show4}' v-on:click="salesVolume4()">今日</li>
			    	<li class="oli" v-bind:class='{ li_select: is_show5}' v-on:click="salesVolume5()">7日</li>
			    	<li class="oli last" v-bind:class='{ li_select: is_show6}' v-on:click="salesVolume6()">30日</li>
		    	</ul>
		      <p class="yh_display_ftitle">新增用户( 单位：人 )</p>
          <StoreInvitesnewj v-if="is_show4"></StoreInvitesnewj>
          <StoreInvitesnewq v-if="is_show5"></StoreInvitesnewq>
          <StoreInvitesnewy v-if="is_show6"></StoreInvitesnewy>
		    </div>

		 </div>
	</div>
</template>
<script>
import { Swiper, SwiperItem,ButtonTab, ButtonTabItem, Divider, Toast } from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
import axios from 'axios'

// 引入店铺新增用户组件
// 7日
import Storenewusersq from '@/components/storeNewusersq'
// 30日
import Storenewusersy from '@/components/storeNewusersy'
// 引入店员邀新数据模块storeInvitesnewy.vue
// 今日
import StoreInvitesnewj from '@/components/storeInvitesnewj'
// 7日
import StoreInvitesnewq from '@/components/storeInvitesnewq'
// 30日
import StoreInvitesnewy from '@/components/storeInvitesnewy'

export default {
  name:'orderData',
  components: {
    // 店铺新增用户7日
    Storenewusersq,
    // 店铺新增用户30日
    Storenewusersy,
    // 店员邀新今日
    StoreInvitesnewj,
    //店员邀新7日
    StoreInvitesnewq,
    // 店员邀新
    StoreInvitesnewy
  },
  data() {
    return {
    	is_show1:true,
    	is_show2:false,
    	is_show3:false,
    	is_show4:true,
    	is_show5:false,
    	is_show6:false,
      count:'',
      new_count:''
    };
  },
  created() {
    },
  deactivated () {
        this.$destroy()
    },
  methods:{
    store_users(){
    	this.$router.push({ path: '/page/store_users' })
    },
    dyinvite(){
    	this.$router.push({ path: '/page/dyinvite' })
    },
  	salesVolume1:function(){
        const _this = this;
        _this.is_show1=true
        _this.is_show2=false
	},
    salesVolume2:function(){
      console.log('qq')
        const _this = this;
        _this.is_show2=true
        _this.is_show1=false
	},
	// salesVolume3:function(){
 //        const _this = this;
 //        _this.is_show2=false
 //        _this.is_show1=true
 //        _this.is_show3=false
 //        _this.$vux.alert.show({
 //            content: "暂无数据"
 //        })
 //        setTimeout(() => {
 //            this.$vux.alert.hide()
 //            // location.reload()
 //        }, 3000)
	// },
  salesVolume4:function(){
        const _this = this;
        _this.is_show4=true
        _this.is_show5=false
        _this.is_show6=false
	},
	salesVolume5:function(){
        const _this = this;
        _this.is_show5=true
        _this.is_show4=false
        _this.is_show6=false
	},
	salesVolume6:function(){
        const _this = this;
        _this.is_show6=true
        _this.is_show5=false
        _this.is_show4=false
	},

  
    //獲取店鋪縂用戶數和今日新增用戶數
    datas(){
        const _this = this;
        _this.$loading.show()
        const url =`${myPub.URL}/merchant/Shop/shopDataStatistics`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);;
            params.append('open_id',localStorage.openid);
            params.append('type',0);
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
               //状态码
              if (response.data.status =='200') {
                _this.$loading.hide();
                const data = response.data
                console.log(data)
                _this.count=data.data.member_count
                _this.new_count = data.data.member_now_count
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
  mounted(){
      this.datas()
  }
}
</script>
<style scoped lang="less">

.orderData{
	background-color:#f8f7f7;
	.orderData_title{
		list-style:none;
		display:flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content:space-between;
        background-color:#ffffff;
        padding:20px 0 12px 0;
        .bl{border-left: 1px solid #eeeeee}
        li{
        	text-align:center;
        	flex-grow:1;
        	span{
        		font-family:PingFangSC-Regular;
				font-size:0.9rem;
				color:#333333;
				letter-spacing:0;
        	}
        	label{
        		font-family:PingFangSC-Semibold;
				font-size:1.1rem;
				color:#f54321;
				letter-spacing:0;
				font-weight:600;
        	}
        }
	}
	/*数据展示*/
	.data_display{
	 	/*margin-top:10px;*/
	 	.yx_display{
	 		height:auto;
	 		background-color:#ffffff;
	 		padding-bottom:15px;
	 		.yx_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:600;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yx_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yx_display_tab{
	 			width:70%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.8rem;
					color:#777777;
					letter-spacing:0;
					padding:5px 20px;
					border:1px solid #eeeeee;
		        }
		        .first{
					border-top-left-radius:0.3rem;
					border-bottom-left-radius:0.3rem;
		        }
		        .last{
		        	border-top-right-radius:0.3rem;
					border-bottom-right-radius:0.3rem;
		        }
		        .li_select{
  		        	border:1.5px solid #f54321;
                color: #f54321;
		        }
	 		}
	 	}
	 	.yh_display{
	 		/*margin-top:10px;*/
	 		padding-bottom:15px;
	 		height:auto;
	 		background-color:#ffffff;
	 		.yh_display_title{
	 			width:100%;
	 			height:auto;
	 			box-sizing:border-box;
	 			padding:11px 15px;
	 			font-family:PingFangSC-Semibold;
				font-size:1rem;
				color:#333333;
				letter-spacing:0;
				text-align:left;
				font-weight:600;
				border:1px solid #eeeeee;
				span{float: right;font-size:0.9rem;font-weight:normal;color:#999999;img{width: 0.6rem;position: relative;top: 0.2rem;}}
	 		}
	 		.yh_display_ftitle{
	 			font-family:PingFangSC-Regular;
				font-size:0.8rem;
				color:#999999;
				letter-spacing:0;
				text-align:center;
				line-height:1.2rem;
	 		}
	 		.yh_display_tab{
	 			width:70%;
	 			margin:21px auto;
				list-style:none;
				display:flex;
		        flex-direction: row;
		        flex-wrap: nowrap;
		        justify-content:space-between;
		        background-color:#ffffff;
		        li{
		        	text-align:center;
		        	flex-grow:1;
		        	font-family:PingFangSC-Regular;
					font-size:0.8rem;
					color:#777777;
					letter-spacing:0;
					padding:5px 20px;
					border:1px solid #eeeeee;
		        }
		        .first{
					border-top-left-radius:0.3rem!important;
					border-bottom-left-radius:0.3rem!important;
		        }
		        .last{
		        	border-top-right-radius:0.3rem!important;
					border-bottom-right-radius:0.3rem!important;
		        }
		        .li_select{
		        	border:1.5px solid #f54321;
              color: #f54321;
		        }
	 		}
	 	}
	 	.charts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	 	.yhcharts{
	 		width:90%;
	 		margin:10px auto;
	 		height:215px;
	 		background:-webkit-gradient(linear, 0% 20%, 8% 100%,from(#e84f57), to(#eb8139));
	 	}
	}
}
</style>