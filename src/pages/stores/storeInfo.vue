<template>
  <div id='storeInfo'>
    <!--  店铺logo -->
    <div class='finish_room2'>
        <img v-lazy="imgs" alt="" class="shop_logo" style="margin-top:1rem;">
    </div>
    <p class="store_name" style="margin-top:1rem;font-size:1.5rem;">{{datas.name}}</p>

    <ul class="store-list">
      <li class="clearfix-top">基本信息</li>
      <li class="clearfix">
        <span class="fl">店铺名称</span><span class="fr"><b style="color:#333333;">{{datas.name}}</b>&emsp;<img style="opacity: 0;" src="~@/assets/icon/goods-left.png"></span>
      </li>
      <li class="clearfix" v-on:click="logo(datas.brand_name)">
        <span class="fl">品牌名称</span><span class="fr"><b>{{datas.brand_name}}</b>&emsp;<img src="~@/assets/icon/goods-left.png"></span>
      </li>
      <li class="clearfix" v-on:click="shop" style="border:none;">
        <span class="fl">公司模式</span><span class="fr"><input type="text" class="mobile" v-model="type"/>&emsp;<img src="~@/assets/icon/goods-left.png"></span>
      </li>
    </ul>
    <ul class="store-list">
      <li  class="clearfix-top">店铺信息</li>
      <li class="clearfix">
        <span class="fl">店铺地址</span><span class="fr"><b>{{datas.address}}</b>&emsp;<img style="opacity: 0;" src="~@/assets/icon/goods-left.png"></span>
      </li>
      <li class="clearfix" v-on:click="people(datas.contact)">
        <span class="fl">负责人</span><span class="fr"><b>{{datas.contact}}</b>&emsp;<img src="~@/assets/icon/goods-left.png"></span>
      </li>
      <li class="clearfix" :data1='datas.mobile'  @click='changephone(datas.mobile)'>
        <span class="fl">修改手机号</span><span class="fr"><input type="text" class="mobile"  v-model="type2"/>&emsp;<img src="~@/assets/icon/goods-left.png"></span>
      </li>
      <li class="clearfix" v-on:click="shopinfo(datas.description)">
        <span class="fl">店铺介绍</span><span class="fr"><b class="shop1">{{datas.description}}</b>&emsp;<img src="~@/assets/icon/goods-left.png"></span>
      </li>

      <!-- 营业执照 -->
      <li class="zz_box clearfix clearfix-li">
        <span class="zz_text">营业执照</span>
          <!--  营业执照 -->
        <div class="wrapper license license_img">
            <img src="~@/assets/img/renzheng.png" alt="" class="oimgyy">
           <ossFile1 :imgs='license' :message="msg"></ossFile1>
        </div>
      </li>
    </ul>

    <!-- 公司模式 -->
    <div class="shop">
      <h5>公司模式</h5>
      <div class="select">
        <select>
          <option value="1">直营分店</option>
          <option value="2">加盟</option>
        </select>
        <img src="~@/assets/icon/arrow@right.png">
      </div>
      <div class="clearfix btn">
        <span v-on:click="cancel" class="fl">取消</span><span v-on:click="company_model" class="fr">确认</span>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import { GroupTitle, Group, Cell, XInput, Selector, PopupPicker, Datetime, XNumber, ChinaAddressData, XAddress, XTextarea, XSwitch,Panel, Radio,XButton,Box} from 'vux'
import axios from 'axios'

import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入上传图片组键
import ossFile1 from '../../components/oss_file1'

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
      Box,
      ossFile1
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
        logo(brand_name) {
            this.$router.push({ path: '/page/logo',query: {brand_name:brand_name}})
        },
        shopinfo(contact) {
            this.$router.push({ path: '/page/shopinfo',query: {contact:contact}})
        },
        changephone(a) {
          console.log(a)
           this.$router.push({ path: '/page/changephone',query: {mobile:a}})
        },
        people(user) {
            this.$router.push({ path: '/page/people',query: {user:user}})
        },
        shop() {
            $(".shop").show()
            $(".bg").show(  )
        },
        cancel() {
            $('.shop').hide()
            $(".bg").hide()
        } ,
        // 商铺数据接口
        binfo_data(){
          const _this= this;
          _this.$loading.show()
          const url =`${myPub.URL}/merchant/Shop/shopInfo`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          axios.post(url,params).then(response => {
            _this.$loading.hide()
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  this.$router.push({path: '/login'});
              }, 3000)
            }
            // token失效
            if (response.data.status =='1004') {
              _this.getData()
            }
            if (response.data.status =='200') {
               _this.$loading.hide();
              const data = response.data.data
              const str=data.mobile;
              const str2 = str.substr(0,3)+"****"+str.substr(7);
              console.log(str2)
              _this.type2=str2
              _this.datas=data;
              _this.mobile = data.mobile;
              _this.imgs = data.head_pic
              _this.license = data.img_src
              console.log(data)
              if (data.company_model == '1') {
                _this.type = '直营分店'
              }
              if (data.company_model == '2') {
                _this.type = '加盟'
              }
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
        // 更改公司模式
        company_model(){
          const _this = this;
           _this.$loading.show();//显示
          const url =`${myPub.URL}/merchant/Shop/editInfo`;
          const company_model = $(".select").find("option:selected").val();
          console.log(company_model)
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',localStorage.openid);
          params.append('company_model',company_model);
          axios.post(url,params).then(response => {
         _this.$loading.hide(); //隐藏
            if (response.data.status =='1024') {
              this.$vux.alert.show({
                  content: response.data.msg
              })
              setTimeout(() => {
                  this.$vux.alert.hide()
                  location.href = '/login'
              }, 3000)
            }
            console.log(response.data)
            $('.shop').hide()
            $(".bg").hide()
            location.reload()
          }).catch((err) => {
            console.log(err)
          })
        },
        // 处理手机号
        phone(){
        }
    },
    data () {
      return {
        value1: '西贝筱面古北店',
        imgs:'',
        datas:{},
        type2:'',
        type:'',
        mobile:'',
        pass1:'',
        msg:'store',
        license:'',
        msg:'sett'
      }
    },
    //页面加载后执行
    mounted(){
     this.binfo_data()
    }
  }
</script>
<style type="text/css">

</style>
<style scoped lang="less">
@import '~vux/src/styles/center.less';
#storeInfo {
    position: relative;
.weui-panel:before,.weui-panel:after {
      border:0;
    }
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
.clearfix-top{background:#faf8f8;border-bottom:none!important;}
.fl{float: left;}
.fr{float: right;}
.tr{text-align: right;}
.store-list{
/*   margin-top: 1rem;*/
  li{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    list-style: none;
    border-bottom: 1px solid #eeeeee;
    font-size: 0.9rem;
    /*height: 50px;*/
    padding: 0px 15px;
    line-height: 50px;
    .fr{color: #999999;width: 70%;text-align: right;line-height:50px;font-size: 14px;position:relative;
    img{width: 0.5rem;vertical-align: middle;}
    b{font-weight: normal;display: inline-block;width: 80%;}
    .shop{display: none;}
    .mobile{border: 0;text-align: right;color: #999999}
    }
  }
}
/*公司模式*/
.shop{
  display: none;
  position: absolute;width: 80%;background: #ffffff;
  top: 20%;
  border-radius: 10px;
  padding: 1rem;
  z-index: 2;
  left:10%;
  margin-left:-1rem;
  h5{line-height: 30px;text-align: center;color: #333;font-weight: normal;font-size: 1rem}
  .select{
    margin-top: 20px;
    position: relative;
    select{text-align: center;width: 100%;line-height: 40px;background: #f7f7f7;height: 40px;border: 0;border-radius: 4px;appearance:none;-moz-appearance:none;-webkit-appearance:none;padding-left: 1rem}
    img{position: absolute;right: 5px;top: 5px;}
  }
  .btn{
    margin-top: 20px;
    span{display: inline-block;width: 40%;text-align: center;line-height: 40px;}
    .fl{background: #f7f7f7;border-radius: 4px;color: #333;}
    .fr{background: #fd5536;border-radius: 4px;color: #ffffff;}
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
  text-align: center;
  width:140px;
  height:140px;
  box-sizing:border-box;
  padding-top:2.5px;
  padding-bottom:2.5px;
  border-radius:50%;
  position:relative;
  margin:auto;
  img{width: 100%;border-radius: 50%;}
}
.finish_room2>.room_img {
  width:140px;
  height:140px;
  position:absolute;
  top:5px;
  left:5px;
  border-radius:50%;
}
.finish_room2>img {
  width:100%;
  height:100%;
  border-radius:50%;
}
.room_add_btn {
  width:150px;
  height:150px;
  position:absolute;
  top:0;
  left:0;
  border-radius:50%;
  padding-top:5px;
  padding-bottom:5px;
  box-sizing:border-box;
  overflow: hidden;
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
  display:inline-block;
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

input{background: transparent;}
.license_img{
  position:absolute;
  right:15px;
  z-index:0;
  margin-top:25px;
  border:1px solid #eeeeee;
  padding:10px;
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
</style>
