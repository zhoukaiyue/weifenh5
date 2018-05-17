<template>
    <div id="container" class="container">
      <button id="selectfiles">选择</button>
      <button @click="selectFile">开始上传</button>
      <ul>
        <li v-for="file in files">{{file}}</li>
      </ul>
    </div>
</template>
<script>
    import axios from 'axios'
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
            mounted() {
                const self = this;
                var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: 'selectfiles',
                    //multi_selection: false,
                    container: document.getElementById('container'),
                    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
                    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
                    url: 'http://oss.aliyuncs.com',

                    init: {
                        PostInit: function() {},

                        FilesAdded: function(up, files) {
                            console.log(files)
                            self.files = files;
                        },

                        BeforeUpload: function(up, file) {
                            console.log('上传前'+file)

                            self.set_upload_param(up, '此处定义文件名称/'+file.name, true);
                            // 上传前
                        },

                        UploadProgress: function(up, file) {

                            // 可以在此设置上传进度
                        },

                        FileUploaded: function(up, file, info) {
                         console.log(up, file, info)
                            // 上传成功之后，文件的url为: host + file.name
                            if (info.status == 200) {
                                alert('上传成功了')
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
                selectFile() {
                    console.log(this.uploader)
                    this.set_upload_param(this.uploader, '', false);
                },
                set_upload_param(up, filename, ret) {
                    var policyBase64 = Base64.encode(JSON.stringify(this.policyText));
                    var message = policyBase64;
                    var bytes = Crypto.HMAC(Crypto.SHA1, message, this.accesskey, {
                        asBytes: true
                    });
                    var signature = Crypto.util.bytesToBase64(bytes);

                    var new_multipart_params = {
                        'Filename': 'abc/' + filename,
                        'key': filename,
                        'policy': policyBase64,
                        'OSSAccessKeyId': this.accessid,
                        'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                        'signature': signature,
                    };
                    console.log(new_multipart_params)
                    up.setOption({
                        'url': this.host,
                        'multipart_params': new_multipart_params
                    });

                    up.start();
                }
            }
    }
</script>
<style lang="less"></style>