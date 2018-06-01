import axios from 'axios'
import WechatAuth from 'vue-wechat-auth'
import router from './router'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入sha1加密方法
import {hex_sha1} from '../../assets/js/sha1.js'
export default{
  install(Vue,options)
  {
    Vue.prototype.getopenid = function () {
        Vue.use(WechatAuth , {
        router, // 路由实例对象
        appid: 'wxb7146031bd5bbc93', // 您的微信appid
        responseType: 'code',  // 返回类型，请填写code
        scope: 'snsapi_userinfo', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
        getCodeCallback (code, next) {
          console.log("此时拿到code")
          // alert(code)
          localStorage.setItem('code',code);
          console.log(next)
          // 用户同意授权后回调方法
          // code：用户同意授权后，获得code值
          // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
          // next： 无论access_token是否获取成功,一定要调用该方法
          // next说明：next方法接收两个参数
          // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
          // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
          const url = `${myPub.URL}/merchant/Token/getToken`
          const params = new URLSearchParams();
          params.append('code',code);
          axios.post(url,params).then(response => {
                  console.log('向后台传输code1')
                  console.log(response)
                  console.log('获取到openid')
                  const openid = response.data.openid
                  localStorage.setItem('openid',openid);
                  console.log('这是openid'+`${openId.open_id}`)
                  console.log('这是本地存储openid'+localStorage.openid)
                  next('/page/home')
            }).catch((err) => {
                axios.post(url,params).then(response => {
                  console.log('向后台传输code2')
                  const openid = response.data.openid
                  localStorage.setItem('openid',openid);
                  console.log('获取到openid')
                  console.log(localStorage.openid)
                  console.log(`${openId.open_id}`)
                  next('/page/home')
            })
          })
        }
      })
    }
  }
}