import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入sha1加密方法
import {hex_sha1} from '../../assets/js/sha1.js'
export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
          const url =`${myPub.URL}/merchant/Baseapi/auth`;
          const date = new Date();
          const time1 = date.getTime();
          const sh = "wxedd78c056ac05c2b66dc6h84cb028560"+time1
          const sha = hex_sha1(sh)
          const params = new URLSearchParams();
          params.append('appid','wxedd78c056ac05c2b66dc6h84cb0285');
          params.append('time',time1);
          params.append('sign',sha);
          axios.post(url,params).then(response => {
          console.log('tooken失效从新获取')
          const currentUser_token = response.data.data //获取token
          console.log(currentUser_token)
          localStorage.setItem('currentUser_token',currentUser_token);//本地存储token
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}