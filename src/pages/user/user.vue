<template>
    <div class="user">
            <span>我的页面</span>
    </div>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {
            BaseUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?",
            JsApiData:"",

            GetCodes:{
                //公众号的唯一标识
                AppId:"wxb7146031bd5bbc93",
                //授权后重定向的回调链接地址(填当前页)
                GetCodes:"http%3A%2F%2Fdist.weifenvip.com%2Fuser",
                //返回类型，请填写code
                Response_type: "code",
                //应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
                Scope: "snsapi_base",
                //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
                State:"STATE",
                //必须带此参数
                Wechat_Redirect:"#wechat_redirect"
            }
        }
    },
    created(){
       alert('截取到code')
       

       if(localStorage.a == undefined){
            this.GetCode()
            localStorage.setItem('a','aaa');//本地存储token
       }

    },
    deactivated () {
        this.$destroy()
    },
    computed: {

    },
    mounted() {

    },
    methods: {
            //拼接获取code的地址
            ReturnGetCodeUrl(){
                return this.BaseUrl + "appid=" + this.GetCodes.AppId + "&redirect_uri="
                    + this.GetCodes.GetCodes + "&response_type="
                    + this.GetCodes.Response_type + "&scope=" + this.GetCodes.Scope + "&state="
                    + this.GetCodes.State + this.GetCodes.Wechat_Redirect
            },

            //获取地址栏code参数
            GetQueryString(name){
                console.log(name)
                var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var newUrl = window.location.search.substr(1).match(url);
                if (newUrl != null) {
                    return unescape(newUrl[2]);
                } else {
                    return false;
                }
            },

            //获取code
            GetCode(){
                //如果有code参数，那么GetOpenId获取openid
                if (this.GetQueryString("code")) {
                    alert("有code")
                    
                    localStorage.setItem('openid',this.GetQueryString("code"));
                //没有那么重定向去获取
                } else {
                    console.log("没有code")
                    /**
                     * 具体参考微信获取code文档 ：http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
                     * 官方接口：
                     * https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
                     */
                    //重定向去微信来获取code
                    window.location.href = this.ReturnGetCodeUrl()
                     // localStorage.setItem('openid',this.GetQueryString("code"));
                }
            },
    },

}
</script>

<style scoped lang="less">
.user {
    background-color: #ededed;
    .user-header {
        background-color: #ab956d;
        color: #ffffff;
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 14px;
        .avatar {
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
        .nickname {
            margin-left: 10px;
        }
    }
    .user-address {
        background-color: #ffffff;
        .add-new-address {
            padding: 10px 0;
            width: 100%;
            color: #989898;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            .icon-add {
                font-style: normal;
                margin-right: 5px;
            }
        }
        .address-info {
            .address-title {
                font-weight: normal;
                padding: 10px 0;
                color: #999999;
                text-align: center;
                border-bottom: 1px solid #ededed;
                font-size: 14px;
                background-color: #ffffff;
                position: relative;
                .icon-arrow {
                    position: absolute;
                    transform: rotate(270deg);
                    height: 24px;
                    width: 24px;
                    right: 5px;
                    top: 10px;
                    background: url(~@/assets/icon/arrow@right.png) no-repeat;
                    background-size: 100% 100%;
                    display: block;
                }
            }
            .address-main {
                .text-row {
                    padding: 10px 15px 10px 0;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #e9e9e9;
                    margin-left: 15px;
                    height: 45px;
                    font-size: 14px;
                    color: #7c7c7c;
                    box-sizing: border-box;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
    .user-order {
        margin-top: 10px;
        .order-title {
            font-weight: normal;
            padding: 10px 0;
            color: #999999;
            text-align: center;
            border-bottom: 1px solid #ededed;
            font-size: 14px;
            background-color: #ffffff;
            position: relative;
        }
        .order-item {
            margin-bottom: 10px;
            color: #777777;
            background-color: #ffffff;
            font-size: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .order-header {
                margin-left: 15px;
                border-bottom: 1px solid #ededed;
                padding: 10px 0;
                .order-no {
                    margin-left: 5px;
                }
            }
            .order-main {
                display: flex;
                height: 75px;
                color: #6d6d6d;
                padding: 10px 15px;
                .item-left {
                    flex-basis: 75px;
                    height: 100%;
                    background-color: #f5f6f5;
                    border-radius: 2px;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
                .item-middle {
                    flex: 1;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    div {
                        margin: 5px 0;
                    }
                }
                .item-right {
                    display: flex;
                    flex-basis: 60px;
                    align-items: center;
                    justify-content: flex-end;
                    color: #b42f2d;
                }
            }
            .order-footer {
                margin-left: 15px;
                border-top: 1px solid #ededed;
                height: 45px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #2f2f2f;
                .pay {
                    width: 85px;
                    height: 30px;
                    margin-right: 15px;
                    background-color: #b42f2d;
                    border-radius: 2px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 30px;
                    border: none;
                    outline: none;
                    &:active {
                        background-color: #9a211f;
                    }
                }
            }
        }
        .no-data {
            display: flex;
            height: 40px;
            font-size: 13px;
            color: #ccc;
            align-items: center;
            justify-content: center;
            background: #ffffff;
        }
    }
}
</style>
