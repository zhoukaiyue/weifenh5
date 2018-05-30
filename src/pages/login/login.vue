   <template>
    <div class="login">
        <div class="logo-wrap">
           <div class="logo_box">
                <div class='logo_imgbox'>
                    <img src="~@/assets/logo.jpg"
                     class="app-logo">
                </div>
                <div class="m_bor">
                    <div class="m_bor_box"></div>
                </div>
                <div class='logo-app-name'>商家登录入口</div>
           </div>
        </div>
        <div class="login—prompt">成功入驻店加圈，即可开启线上引客之路</div>
        <group>
        </group>
        <div class="logo-cont">   
            <p>
                <input type="phone" v-model="phoneNumber" maxlength="13" placeholder="请输入您的手机号" class="input1">
            </p>
            <p>
                <input type="number" v-model="verifyCode"  oninput="if(value.length>4)value=value.slice(0,4)"  placeholder="请输入验证码" class="input2"> 
                <button  @click="sendCode" class="verification" >{{btnText}}</button>
            </p>      
        </div>
        <div style="padding:15px;margin-top:30px;">
            <div v-on:click="login"><x-button  type="primary" class="x-button"> 登录 </x-button></div>
            <div class="registered"><span class="registered_span">没有账号？</span><label v-on:click="settlein" class="registered_label">申请入住</label></div>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import { mapMutations } from 'vuex'
import $ from 'jquery'
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入sha1加密方法
import {hex_sha1} from '../../assets/js/sha1.js'
export default {
    name: 'Login',
    data() {
        return {
            btnText: '获取验证码',
            disabled: false,
            time: 0,
            memname: '',
            username:'',
            phoneNumber: '',
            verifyCode: '',
            smsCode: '',
            BaseUrl: '',
            JsApiData: '',
            code_num: '',
            phoneNumber: ''
        }
    },

    created() {
    },
    deactivated () {
        this.$destroy()
    },
    activated() {
    },
    mounted() {
    },
    methods: {
        ...mapMutations(['UPDATE_USERINFO']),
        sendCode() {
            console.log('点击验证码触发')
            const reg = /^1[34578]\d{9}$/ // 手机号正则校验
            if (!this.phoneNumber) {
                this.$vux.toast.text('请输入手机号~', 'middle')
                return
            }
            if (!reg.test(this.phoneNumber)) {
                this.$vux.toast.text('手机号格式不正确~', 'middle')
                return
            }
              const url =`${myPub.URL}/merchant/Sendcodes/sms`;
              var params = new URLSearchParams();
              params.append('mobile',this.phoneNumber);
              params.append('token',localStorage.currentUser_token);
              params.append('type','1');
              if(!localStorage.sessionid){
                console.log(params)
             }else{
                params.append('session_id',localStorage.sessionid);
             }
              axios.post(url,params).then(response => {
                if (response.data.status == '1008') {
                    this.$vux.alert.show({
                        content: `手机号不存在，请立即申请`
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
                }
                if (response.data.status == '200') {
                    console.log(response)
                    alert(response.data.code)
                    const sessionid = response.data.sessionid
                    console.log(sessionid)
                    localStorage.setItem('sessionid',sessionid);
                    this.time = 120
                    this.timer()
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
        timer() {
            if (this.time > 0) {
                this.time--
                this.btnText = this.time + 's后重新获取'
                setTimeout(this.timer, 1000)
                $('.verification').attr('disabled',true)
                $('.verification').css('color',"#ddd")
            } else {
                this.time = 0
                this.btnText = '获取验证码'
                $('.verification').attr('disabled',false)
                $('.verification').css('color',"#3333333")
            }
        },
        login(){
             const _this=this;
             //令牌过期  _this.getData();
              _this.$loading.show();//显示
             const url =`${myPub.URL}/merchant/Shop/login`;
              var params = new URLSearchParams();
              params.append('mobile',this.phoneNumber);
              params.append('token',localStorage.currentUser_token);
              params.append('open_id',localStorage.openid);
              params.append('code',this.verifyCode);
              if(localStorage.sessionid){
                 params.append('session_id',localStorage.sessionid);
             }else{
             }
              axios.post(url,params).then(response => {
                console.log(response)
                const status = response.data.status;
                const identity =  response.data.type;
                console.log(status)
                // token失效
                if (response.data.status =='1004') {
                  _this.getData()
                }
                if (status == "200") {
                    //登陆成功存储登录状态
                    localStorage.setItem('login_static','true');
                    // 存储是店员or店长登录字段
                    // response.data.type=1  店长 取值localStorage.Identity
                    localStorage.setItem('Identity',identity);
                    // 重定向到首页或者登录前的页面
                    let redirect = decodeURIComponent(
                        this.$route.query.redirect || '/'
                    )
                    setTimeout(() => {
                        _this.$loading.hide();//隐藏
                        this.$router.push({
                            path: redirect
                        })
                    }, 2000)
                    // this.$router.push({ path: 'page/shopCenter'})
                }else{
                     _this.$loading.hide();//隐藏
                    this.$vux.alert.show({
                        content: response.data.msg
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                        // location.reload()
                    }, 3000)

                }
              }).catch((err) => {
                console.log(err)
              })
          },
        settlein(){
            this.$router.push({ path: '/settlein'})
        }

    },
    components: {
        XInput,
        XButton,
        Group,
        Cell,
        Toast
    }
}
</script>
<style type="text/css">
    .weui-btn{color: #ffffff;}
    .weui-dialog{background: #ffffff;}
    .weui-cells{padding: 0 10px;}
    .weui-cells input{font-size: 0.9rem;}
    .weui-cells:before{border-top: 0!important;}
    .weui-cells:after{width: 92%;left: 1.5rem!important;}
    .weui-btn_mini {
    display: inline-block;
     padding: 0 0.5rem!important;;
    line-height: 2.3;
    font-size: 13px;
    }
</style>
<style scoped lang="less">
.login {
    height: 100%;
    text-align: center;
    overflow: hidden;
    .logo-wrap {
        margin:50px 0 12px 0;
        height:45px;
        .logo_box{
            margin:0 auto;
            width:80%;
            height:100%;
            display:flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content:space-between;
            .logo_imgbox{
                width:45%;
                height:100%;
                .app-logo {
                    width: 100%;
                    height: 100%;
                }
            }
            .m_bor{
                    width:auto;
                    height:100%;
                    box-sizing:border-box;
                    padding:10px;
                   /* border:1px solid #333;*/
                    .m_bor_box{
                         width:1.5px;
                        height:100%;
                        background-color: #c2c2c2;
                    }
            }
            .logo-app-name{
                width:45%;
                height: 100%;
                line-height: 45px;
                font-family:PingFangSC-Semibold;
                font-size:18px;
                font-weight:600;
                color:#333333;
                letter-spacing:0;
                text-align:left;
                vertical-align: top;
            }
        }
    }
    .login—prompt{
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#999999;
        letter-spacing:0;
        line-height: 20px;
    }
    .x-button{
        background:#ff8134;
        border-radius:2px;
    }
    .verification{
        border:1px solid #eeeeee;
        background:#ffffff;
        height:34px;
        color:#333;
        line-height:34px;
        margin-top: 8px;
        float: right;
        padding: 0 5px;
    }
    .registered{
        width:100%;
        margin-top:16px;
        text-align:right;
        font-family:PingFangSC-Regular;
        font-size:14px;
        color:#999999;
        letter-spacing:0;
        label{
            color:#ff8134;
        }
    }
}

/*重构样式*/
.logo-cont{
    width:100%;
    height:150px;
    /*border:1px solid red;*/
    box-sizing:border-box;
    padding:15px;
    p{
        height:53px;
        border-bottom: 1px solid #E7E7E7;
        box-sizing:border-box;
        .input1{
            font-size:1rem;
            line-height:30px;
            color:#333333;
            width:100%;
            border: 0px;outline:none;cursor: pointer;
            margin-top: 10px;
        }
        .input2{
            font-size:1rem;
            line-height:30px;
            color:#333333;
            width:40%;
            float:left;
            border: 0px;outline:none;cursor: pointer;
            margin-top: 10px;
        }
        span{
            float:right;
            font-size:1rem;
            height:33px;
            margin-top:10px;
            line-height:33px;
            color:#cccccc;
            width:auto;
            padding:0px 5px;
            box-sizing:border-box;
            border: 1px solid #E7E7E7;
        }

    }
}
</style>