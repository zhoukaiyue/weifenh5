<template>
  <div id='storeInfo'>
    <!--  店铺logo -->
    <div class='finish_room2'>
       <div class='room_add_btn'>
            <img v-lazy="imgs" alt="" style="width:100%;height:100%;border-radius:50%;">
        </div>
    </div>
    <p class="store_name">{{datas.name}}</p>
    <ul class="store-list">
      <li class="clearfix">
        <span class="fl">店铺名称</span><span class="fr"><b>{{datas.name}}</b></span>
      </li>
      <li class="clearfix">
        <span class="fl">品牌名称</span><span class="fr"><b>{{datas.brand_name}}</b></span>
      </li>
      <li class="clearfix">
        <span class="fl">公司模式</span><span class="fr"><b>{{type}}</b></span>
      </li>
      <li class="clearfix">
        <span class="fl">店铺地址</span><span class="fr"><b>{{datas.address}}</b></span>
      </li>
      <li class="clearfix">
        <span class="fl">负责人</span><span class="fr"><b>{{datas.contact}}</b></span>
      </li>
      <li class="clearfix" :data1='datas.mobile'>
        <span class="fl">修改手机号</span><span class="fr"><input type="text" class="mobile"  v-model="type2" disabled="disabled" style="background:#fff;"/></span>
      </li>
      <li class="clearfix">
        <span class="fl">店铺介绍</span><span class="fr"><div class="test_box" contenteditable="true">{{datas.description}}</div></span>
      </li>
      <!-- 营业执照 -->
      <li class="zz_box clearfix">
        <span class="zz_text">营业执照</span>
        <div class='finish_zhizhao license_img'>
          <img src="~@/assets/img/renzheng.png" alt="" class="oimgyy">
               <div  class='zhizhao_img'>
                  <img v-lazy="datas.img_src">
               </div>
           </div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from 'jquery'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,Panel, Radio,XButton,Box} from 'vux'
import axios from 'axios'

import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入上传图片组键
// import ossFile from '../../components/oss_file'

  export default {
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
      Box
      // ossFile
    },
     created() {
     console.log(this.pass1 =this.$route.query.num)
     },
    computed:{
          // console.log('computed')
    },
    deactivated () {
        this.$destroy()
    },
    methods:{
        // 店铺中心
        binfo_data(){
          const _this= this;
          const url =`${myPub.URL}/merchant/Clerk/shopInfo`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  this.$router.push({path: '/login'});
              }, 3000)
            }
            const data = response.data.data
            const str=data.mobile;
            const str2 = str.substr(0,3)+"****"+str.substr(7);
            console.log(str2)
            _this.type2=str2
            _this.datas=data
            _this.mobile = data.mobile;
            _this.imgs = data.head_pic
            console.log(data)
            if (data.company_model == '1') {
              _this.type = '直营分店'
            }
            if (data.company_model == '2') {
              _this.type = '加盟'
            }
          }).catch((err) => {
            console.log(err)
          })
        },
    },
    data () {
      return {
        value1: '西贝筱面古北店',
        imgs:'',
        img_zhi:'',
        datas:{},
        type2:'',
        type:'',
        mobile:'',
        pass1:'',
        msg:'store'
      }
    },
    //页面加载后执行
    mounted(){
     this.binfo_data()
    }
  }
</script>
<style type="text/css">
.container{
    width:150px!important;
    height:150px!important;
    position:relative;
        border-radius: 50%;
}
#selectfiles{
    width:150px!important;
    height:150px!important;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
        border-radius: 50%;
}
#imgId{
    width:150px!important;
    height:150px!important;
    position:absolute;
    top:0;
    left:0;
        border-radius: 50%;
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
  #storeInfo {
    position: relative;
  padding:10px 21px 10px 21px;
  .weui-panel:before,.weui-panel:after {
  border:0;}
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
.fl{float: left;}
.fr{float: right;}
.tr{text-align: right;}
.store-list{
  padding: 0;margin-top: 1rem;
  li{list-style: none;padding:0.5rem;border-bottom: 1px solid #dddddd;font-size:0.8rem;.fr{color: #999999;width: 70%;text-align: right;line-height: 1.2rem;font-size: 0.8rem;position:relative;
    img{position: absolute;width: 0.6rem;top: 0.2rem;}
    b{font-weight: normal;display: inline-block;width: 80%;}
    .mobile{border: 0;text-align: right;color: #999999}
    }
  }
}

.store_tishi{
    font-family: PingFangSC-Regular;
    font-size: 0.6rem;
    line-height: 2rem;
    color: #F54321;
    letter-spacing: 0;
    text-align: center;
    font-weight: 600;
}
/*蒙版*/
.bg{width: 100%;height: 100%;position: absolute;background: rgba(0,0,0,.6);top: 0;left: 0;display: none;}
.apply_btn {
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
  font-size:0.8rem;
  color:#ff8134;
  letter-spacing:0;
  background:#ffffff;
  ::after {
  border:0!important;
}
}}.store_name {
  font-family:PingFangSC-Regular;
  font-size:1rem;
  line-height:3rem;
  color:#333333;
  letter-spacing:0;
  text-align:center;
  font-weight:600;
}
/*上传店铺logo样式*/
.finish_room2 {
  width:150px;
  height:150px;
  box-sizing:border-box;
  padding-top:2.5px;
  padding-bottom:2.5px;
  border-radius:50%;
  /* border:1px solid red;
  */
     position:relative;
  margin:auto;
}
.finish_room2>.room_img {
  width:140px;
  height:140px;
  position:absolute;
  top:5px;
  left:5px;
  border-radius:50%;
}
.finish_room2>.room_img>img {
  width:140px;
  height:140px;
  border-radius:50%;
}
.room_add_btn {
  width:150px;
  height:150px;
  position:absolute;
  top:0;
  left:0;
  /*border:1px solid #000;
  */
        border-radius:50%;
  padding-top:5px;
  padding-bottom:5px;
  box-sizing:border-box;
}
.room_add_btn input {
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  z-index:99999;
  opacity:0;
}
.room_opacity {
  width:150px;
  height:150px;
  position:absolute;
  top:0;
  left:0;
  background:#000;
  border-radius:50%;
  opacity:.3;
}
.room_box {
  width:150px;
  height:150px;
  position:absolute;
  top:0;
  left:0;
}
#img-change2 {
  border-radius:50%;
  border:1px solid #e7e7e7;
  width:150px;
  height:150px;
  position:absolute;
  right:0px;
  top:0;
  box-sizing:border-box;
  z-index:10;
}
.img-changeImg {
  width:40%;
  height:40%;
  margin:20px auto;
  background:url(~@/assets/img/xiangji.png) no-repeat
                        right center;
  background-size:100% 100%;
}
.img-changeText {
  font-family:PingFangSC-Regular;
  font-size:1rem;
  color:#ffffff;
  letter-spacing:0;
  text-align:center;
}
/*营业执照样式*/
   .zz_box {
  width:100%;
  height:auto;
  border:0!important;
  box-sizing:border-box;
  padding:10px 15px;
}
.finish_zhizhao {
  float:right;
  width:58%;
  height:100px;
  box-sizing:border-box;
  padding-top:2.5px;
  padding-bottom:2.5px;
  /* border:1px solid red;
  */
  position:relative;
  top: 0;
}
.finish_zhizhao>.zhizhao_img {
  width:100%;
  height:95px;
  position:absolute;
  top:1%;
  left:1%;
}
.finish_zhizhao>.zhizhao_img>img {
  width:99%!important;
  height:89px;
}
.zhizhao_add_btn {
  width:100%;
  height:95px;
  position:absolute;
  top:0;
  left:0;
  padding-top:2.5px;
  padding-bottom:2.5px;
  box-sizing:border-box;
}
.zhizhao_add_btn input {
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  z-index:99999;
  opacity:0;
}
.zhizhao_opacity {
  width:100%;
  height:95px;
  position:absolute;
  top:0;
  left:0;
  background:#000;
  opacity:.3;
}
.room_box {
  width:100%;
  height:95px;
  position:absolute;
  top:0;
  left:0;
}
#img-changeZZ {
  border:1px solid #e7e7e7;
  width:100%;
  height:95px;
  position:absolute;
  right:0px;
  top:0;
  box-sizing:border-box;
  z-index:10;
}
.img-changeImgZZ {
  width:58px;
  height:52px;
  margin:5px auto;
  background:url(~@/assets/img/xiangji.png) no-repeat
                        right center;
  background-size:100% 100%;
}
.img-changeTextZZ {
  font-family:PingFangSC-Regular;
  font-size:1rem;
  line-height:1.5rem;
  color:#ffffff;
  letter-spacing:0;
  text-align:center;
}
.zz_text {
  float:left;
  width:4.5em;
  margin-right:2em;
}


.license_img{
  position: relative;
  right:0;
  z-index:0;
  border:1px solid #eeeeee;
}


.oimgyy{
  position:absolute;
  z-index:1;
  width:45px;
  height:35px;
}
.clearfix-li{
  height:200px;
}


.test_box {
    width: 100%; 
    min-height: 1.2rem; 
    max-height: auto;
    _height: 120px; 
    margin-left: auto; 
    margin-right: auto; 
    outline: 0; 
    border:0; 
    font-size: 0.8rem; 
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    _overflow-y: visible;
}
</style>
