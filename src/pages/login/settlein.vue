<template>
  <div id='accident'>
    <div class="accident_title">
        <p class="list_title">{{list.title}}</p>
        <p class="list_desc">{{list.desc}}</p>
    </div>
      <group label-width="4.5em" label-margin-right="2em" label-align="right" id="form_box">
        <x-input title="店铺名称" v-model="shopname" placeholder="请输入店铺名称" class="shopmame"></x-input>
        <x-input title="负责人" v-model="contact" placeholder="请输入负责人名字" class="contact"></x-input>
        <!-- <datetime title="申请时间" v-model="time1" value-text-align="left" ></datetime> -->
        <x-input title="联系电话" type="number" placeholder="请输入负责人电话" v-model="mobile" class="mobile"></x-input>
        <!-- <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
        <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea> -->
      </group>
      <!--  营业执照 -->
         <div class="wrapper license">
            <p class="license-border"></p>
           <span style="width: 4.5em; ">营业执照</span><ossFile :imgs='license'></ossFile>
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
  /**
* 从 file 域获取 本地图片 url
*/
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
         //根据点击上传按钮触发input
        change_input(){
            let inputArr=$('#addTextForm input');
            let add_inputId='';     //需要被触发的input
            for(let i=0;i<inputArr.length;i++){
                // 根据input的value值判断是否已经选择文件
              if(!inputArr[i].value){          //如果没有选择,获得这个input的ID
                 add_inputId=inputArr[i].id;
                 break;
              }
            }
            if(add_inputId){                   //如果需要被触发的input ID存在,将对应的input触发
              return  $("#"+add_inputId).click();
            }else{
              alert("最多选择"+this.imgNum+"张图片")
            }
        },
        //当input选择了图片的时候触发,将获得的src赋值到相对应的img
        setImg(e){
            let target=e.target;
            $('#img_'+target.id).attr('src',getFileUrl(e.srcElement));
        },
        //点击图片删除该图片并清除相对的input
        deleteImg(e){
            let target=e.target;
            let inputID='';       //需要清除value的input
            if(target.nodeName=='IMG'){
              target.src='';
              inputID=target.id.replace('img_','');    //获得需要清除value的input
              $('input#'+inputID).val("");
            }
        },

        //提交信息到后台
        submit(){
            console.log('提交')
            const url =`${myPub.URL}/merchant/Shop/apply`;
            var params = new URLSearchParams();
            params.append('token',localStorage.currentUser_token);
            params.append('open_id',`${openId.open_id}`);
            params.append('shopname',this.shopname);
            params.append('contact',this.contact);
            params.append('mobile',this.mobile);
            params.append('img_src',sessionStorage.getItem('bulicense_url'));
            axios.post(url,params).then(response => {
              // const currentUser_token = response.data.data //获取token
              // console.log(response)
              // next('/page/shopsuccess')
              if (status == "200") {
                  this.$router.push({ path: '/page/shopsuccess'})
              }else{
                  this.$vux.alert.show({
                      title: '操作失败',
                      content: response.data.msg
                  })
                  setTimeout(() => {
                      this.$vux.alert.hide()
                      location.reload()
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
        addressValue: ['陕西省', '西安市', '长安区'],
        value1: '',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        time1: '2017-06-01',
        numberValue: 0,
        imgNum:1,    //上传的照片数量，可根据实际情况自定义
        type: '1',
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
        license:'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1526556689&di=f790387d8684799e63556e887b7adfd3&src=http://docs.ebdoor.com/Image/CompanyCertificate/22/229544.JPG'
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
    width:12rem!important;
    height:10rem!important;
    position:relative;
    float:right;
    border:1px solid #e7e7e7;
}
#selectfiles{
    width:12rem!important;
    height:10rem!important;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    border:1px solid #e7e7e7;
}
#imgId{
    width:12rem!important;
    height:10rem!important;
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
  /*border-top:1px solid #D9D9D9;*/
  padding:0px 10px 30px 0px;
  min-height:150px;
  position:relative;
  color: #333;
  font-size: 0.9rem;
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
    background-color:#D9D9D9;
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

</style>
