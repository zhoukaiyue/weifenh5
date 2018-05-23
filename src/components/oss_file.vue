<template>
    <div id="container" class="container">
      <div id="selectfiles"></div>
      <img  :src=imgs  alt="图片显示失败" id='imgId'>
      <!--<ul>
        <li v-for="file in files">{{file}}</li>
      </ul> -->
    </div>
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'
    import * as openId from '@/assets/js/opid_public.js' 
    export default {
      name: 'container',
       data() {
                return {
                    accessid: 'LTAIcTf7VMuMkUsa', //改成你自己的accessid
                    accesskey: 'PMl8IRafp7jH4I3NGjMFmsvbylFVUj', //改成你自己的accesskey
                    host: 'https://weifenshops.oss-cn-shanghai.aliyuncs.com', //改成你自己的host
                    policyText: {
                        "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
                        "conditions": [
                            ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
                        ]
                    },
                    signature: '',
                    files: [],
                    uploader: {}
                }
            },
            props:{'imgs':String  ,message:String},
            created() {console.log(this.message)},
            mounted() {
                const self = this;
                var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'selectfiles',
                    //multi_selection: false,
                    container: document.getElementById('container'),
                    flash_swf_url: '/test/lib/plupload/js/Moxie.swf',
                    silverlight_xap_url: '/test/lib/plupload/js/Moxie.xap',
                    url: 'http://oss.aliyuncs.com',
                    init: {
                        PostInit: function() {},

                        FilesAdded: function(up, files,event) {
                            console.log(this.message)
                            //上传成功前
                            // console.log(files)
                            self.files = files;
                            //此处是当选中图片之后触发向服务器提交的方法
                            self.selectFile()
                        },

                        BeforeUpload: function(up, file) {
                            console.log('上传前'+file)
                            //修改图片名称
                            //生成文件夹名称
                            var d = new Date();
                            var curr_date = d.getDate();
                            var curr_month = d.getMonth() + 1; 
                            var curr_year = d.getFullYear();
                            String(curr_month).length < 2 ? (curr_month = "0" + curr_month): curr_month;
                            String(curr_date).length < 2 ? (curr_date = "0" + curr_date): curr_date;
                            var yyyyMMdd = curr_year + "" + curr_month +""+ curr_date;
                            // 文件夹名称
                            console.log(yyyyMMdd)
                           var n1=Math.floor(Math.random()*10+1);
                            if(this.message='set'){
                                 // 文件名称
                                var imgurl =localStorage.openid;
                                console.log(imgurl)
                                file.name = imgurl+n1+'.png'
                                //将营业执照图片地址存储起来 `${openId.open_id}`
                                console.log(yyyyMMdd+'/'+file.name)
                                var bulicense_url='user/'+yyyyMMdd+'/'+file.name;
                                console.log('存儲營業執照')
                                sessionStorage.setItem('bulicense_url',bulicense_url);
                                console.log(sessionStorage.getItem('bulicense_url'))
                                self.set_upload_param(up, 'user/'+yyyyMMdd+'/'+file.name, true);
                            }
                            if(this.message='store'){
                                 // 文件名称
                                var imgurl =localStorage.openid+'1';
                                console.log(imgurl)
                                file.name=imgurl+'.png'
                                //将营业执照图片地址存储起来 `${openId.open_id}`
                                console.log(yyyyMMdd+'/'+file.name)
                                var bulicense_url1=yyyyMMdd+'/'+file.name;
                                console.log('存儲商鋪圖像')
                                sessionStorage.setItem('store_imgurl',bulicense_url1);
                                self.set_upload_param(up, 'user/'+yyyyMMdd+'/'+file.name, true);
                                self.photo()

                            }
                            
                            // self.set_upload_param(up, 'user/'+yyyyMMdd+'/'+file.name, true);
                            // 上传前
                        },

                        UploadProgress: function(up, file) {
                            // 可以在此设置上传进度
                        },

                        FileUploaded: function(up, file, info) {
                            // console.log(up, file, info)

                            // 上传成功之后，文件的url为: host + file.name
                            if (info.status == 200) {
                                console.log('上传成功了')
                            }
                        },

                        Error: function(up, err) {
                            // 上传错误
                        }
                    }
                });
                self.uploader = uploader;
                self.uploader.init();
            },
            methods: {
                // 修改商铺头像
                photo(){
                  const url =`${myPub.URL}/merchant/Shop/editInfo`;
                  const img_src = $(".select").find("option:selected").val();
                  console.log(company_model)
                  const params = new URLSearchParams();
                  params.append('token',localStorage.currentUser_token);
                  params.append('open_id','oo1Fj0hcOBHHOfVJWV-zz-zyflE4');
                  params.append('img_src',sessionStorage.getItem('store_imgurl'));
                  axios.post(url,params).then(response => {
                    console.log("向后台上传商铺图像")
                    console.log(response.data)
                    const _this = this
                    _this.$loading.show();//显示
                    setTimeout(function(){  //模拟请求
                          _this.$loading.hide(); //隐藏
                          sessionStorage.setItem('store_imgurl',null);

                    },2000)
                    location.reload()
                  }).catch((err) => {
                    console.log(err)
                  })
                },
                selectFile() {
                    this.set_upload_param(this.uploader, '', false);
                },
                set_upload_param(up, filename, ret) {
                    // console.log('可以改变图片路径了')
                    // this.imgs =this.host+'/'+filename
                    // console.log(this.imgs)

                    var me = this;
                    me.$loading.show()
                    setTimeout(function(){
                    console.log(me.host)
                        $('#imgId').attr('src',me.host+'/'+filename)
                         me.$loading.hide()
                    },2000);//延时3秒


                    var policyBase64 = Base64.encode(JSON.stringify(this.policyText));
                    var message = policyBase64;
                    var bytes = Crypto.HMAC(Crypto.SHA1, message, this.accesskey, {
                        asBytes: true
                    });
                    var signature = Crypto.util.bytesToBase64(bytes);
                    var new_multipart_params = {
                        'Filename': filename,
                        'key': filename,
                        'policy': policyBase64,
                        'OSSAccessKeyId': this.accessid,
                        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                        'signature': signature,
                    };
                    up.setOption({
                        'url': this.host,
                        'multipart_params': new_multipart_params
                    });

                    up.start();
                }
            }
    }
</script>
<style lang="less">
.container{
    width:200px;
    height:200px;
    position:relative;
}
#selectfiles{
    width:200px;
    height:200px;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
}
#imgId{
    width:200px;
    height:200px;
    position:absolute;
    top:0;
    left:0;
}
</style>