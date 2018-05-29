<template>
  <div id='accident'>
    <div class="accident_title">
        <p class="list_title">{{list.title}}</p>
        <p class="list_desc" style="font-size: 0.9rem;">{{list.desc}}</p>
    </div>
<!--       
      <input title="负责人" v-model="contact" placeholder="请输入负责人名字" class="contact"></input>
      <input title="联系电话" type="number" placeholder="请输入负责人电话" v-model="mobile" class="mobile"></input> -->
    <div class="oinputs">
      <p><span>店铺名称</span><input  v-model="shopname" placeholder="请输入店铺名称"></input></p>
      <p><span>负责人</span><input v-model="contact" placeholder="请输入负责人名字"></input></p>
      <p><span>联系电话</span><input type="number" placeholder="请输入负责人电话" v-model="mobile"></input></p>
    </div>
      <!--  营业执照 -->
    <div class="wrapper license">
        <p class="license-border"></p>
       <span>营业执照</span><ossFile :imgs='license' :message="msg"></ossFile>
    </div>
     <box gap="10px 10px">
        <div v-on:click="submit"><x-button class="apply_btn">立即申请</x-button></div>
        <x-button show-loading  style="display:none;">立即申请</x-button>
        <div v-on:click="login" style="margin-top: 0.5rem;"><x-button class="set_login_btn" >立即登录</x-button></div>
      </box>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,Panel, Radio,XButton,Box} from 'vux'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入上传图片组键
import ossFile from '../../components/oss_file'
function getFileUrl(obj) {
  let url;
  url = window.URL.createObjectURL(obj.files.item(0));
  return url;
}
  export default {
    name: 'accident',
    components: {
      Group,
      GroupTitle,
      Cell,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch,
      Panel,
      Radio,
      XButton,
      Box,
     ossFile
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        login(){
          this.$router.push({ path: '/login'})
        },

        //提交信息到后台
        submit(){
          console.log('11')
            if(this.shopname==""){
              this.$vux.alert.show({
                      title: '操作失败',
                      content: '店铺名称不能为空'
                  })
              setTimeout(() => {
                      this.$vux.alert.hide()
              }, 3000)
              return false;
            }
            if(this.contact==""){
              this.$vux.alert.show({
                      title: '操作失败',
                      content: '店铺负责人不能为空'
                  })
              setTimeout(() => {
                      this.$vux.alert.hide()
              }, 3000)
                return false;
            }
            if(this.mobile==""){
              this.$vux.alert.show({
                      title: '操作失败',
                      content: '联系电话不能为空'
                  })
              setTimeout(() => {
                      this.$vux.alert.hide()
              }, 3000)
                return false;
            }
            if(sessionStorage.getItem('bulicense_url')==null||sessionStorage.getItem('bulicense_url')==undefined||sessionStorage.getItem('bulicense_url')==""){
              this.$vux.alert.show({
                      title: '操作失败',
                      content: '营业执照不能为空'
                  })
              setTimeout(() => {
                      this.$vux.alert.hide()
              }, 3000)
                return false;
            }
            console.log('提交')
            const url =`${myPub.URL}/merchant/Shop/apply`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',localStorage.openid);
            params.append('shopname',this.shopname);
            params.append('contact',this.contact);
            params.append('mobile',this.mobile);
            params.append('img_src',sessionStorage.getItem('bulicense_url'));
            axios.post(url,params).then(response => {
              // token失效
              if (response.data.status =='1004') {
                _this.getData()
              }
              if (response.data.status =='200') {
                  this.$router.push({ path: '/page/sh_success'})
                  sessionStorage.setItem('bulicense_url',null);
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
    data () {
      return {
        addressData: ChinaAddressData,
        value1: '',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        time1: '2017-06-01',
        numberValue: 0,
        imgNum:1,    //上传的照片数量，可根据实际情况自定义
        type: '1',
        msg:'set',
        //店铺名称
        shopname:'',
        // 负责人
        contact:'',
        // 联系电话
        mobile:'',
        // 营业执照
        img_src:'',
        list: {
          title: '商家申请入驻',
          desc: '成功入驻店家圈，即可开启线上引客之路。',
        },
        license:'http://www.pingminjie.cn/yyzz.jpg',
      }
    },
    //页面加载后执行
    mounted(){
    }
  }
</script>
<style type="text/css">
  .weui-cell{padding:13px 0px 10px 0px!important;}
  .weui-btn:after{border: 0!important;}
  .weui-cell:before{left: 0!important;}
  .weui-cells:before{border-top: 0!important;}
  .vux-x-input label{font-size: 0.9rem;color: #333;text-align: left!important;}
  .vux-x-input input{font-size: 0.9rem;color: #ccc;}
  .weui-cells:after{border:0 !important;}
  .weui-cells:after{background: #FFFFFF;}

.container{
    width:70%!important;
    height:135px!important;
    position:relative;
    float:right;
}
#selectfiles{
    width:100%!important;
    height:100%!important;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    border:1px solid #e7e7e7;
}
#imgId{
     width:100%!important;
    height:100%!important;
    position:absolute;
    top:0;
    left:0;
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
  #accident {
  padding:30px 21px 50px 21px;
  .weui-panel:before,.weui-panel:after {
  border:0;
}
.accident_title {
  width:100%;
  .list_title {
  font-family:PingFangSC-Semibold;
  font-size:1.3rem;
  color:#333333;
  letter-spacing:0;
  font-weight:600;
}
.list_desc {
  font-family:PingFangSC-Regular;
  font-size:0.8rem;
  color:#999999;
  letter-spacing:0;
  margin-top: 0.5rem;
}
}.apply_btn {
  background:#ff8134;
  border-radius:4px;
  width:100%;
  height:45px;
  font-family:PingFangSC-Regular;
  font-size:1rem;
  color:#ffffff;
  letter-spacing:0;
  text-align:center;
}
.set_login_btn {
  width:40%;
  float:right;
  font-family:PingFangSC-Regular;
  font-size:1rem;
  color:#ff8134;
  letter-spacing:0;
  background:#ffffff;
  ::after {
  border:0!important;
}
}.license {
  padding:0px 10px 30px 0px;
  min-height:150px;
  position:relative;
  color: #333333;
  font-size: 1rem;
  #addTextForm {
  border:1px solid #e7e7e7;
  width:60%;
  height:150px;
  position:absolute;
  right:15px;
  top:1.5rem;
  z-index:100;
  opacity:0;
}
.license-border{
    width:100%;
    height:1px;
    background-color:transparent;
    margin-bottom:13px;
  }
#img-wrapper {
  border:1px solid #e7e7e7;
  width:60%;
  height:150px;
  position:absolute;
  right:15px;
  top:1.5rem;
  box-sizing:border-box;
  padding:20px;
  /*        background:url(~@/assets/img/shangchuan.jpg);
  background-size:80% 80%;
  background-position:center;
  background-repeat:no-repeat;
  */
}
}}.weui-media-box__title {
  font-weight:400;
  font-size:32px!important;
  width:auto;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-wrap:normal;
  word-wrap:break-word;
  word-break:break-all;
}

.oinputs{
  width:100%;
  margin-top:15px;
  p{
    height:54px;
    font-size:1rem;
    color:#333333;
    line-height:54px;
    border-bottom: 1px solid #D9D9D9;
    input{
      float:right;
      width:70%;
      height:54px;
      font-size:1rem;
      line-height:54px;
      color:#333333;
      border: 0px;outline:none;cursor: pointer;
    }
  }
}
</style>
