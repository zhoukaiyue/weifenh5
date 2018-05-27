<template>
    <div class="shop_mine">
        <ul class="shop_mine_box">
            <li class="shop_mine_tx"><span>图像</span>
                <ossFile :imgs='min_tx' :message="msg" class="img"></ossFile>
            <li class="shop_mine_nc" @click="shopname"><span>昵称</span><label>{{min_nc}}</label></li>
            <li class="shop_mine_mb" @click="shopphone(min_mb)"><span>修改手机号</span><label>{{min_mb}}</label></li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios'
import * as myPub from '@/assets/js/public.js'
import * as openId from '@/assets/js/opid_public.js'
//引入上传图片组键
import ossFile from '../../components/oss_file'
export default {
    name: 'shop_mine',
    data() {
        return {
            min_tx:'',
            min_nc:'',
            min_mb:'',
            msg:'shop_min'
        }
    },
    created() {
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
        // 请求数据接口
        shopminedata(){
          const _this = this;
          const url =`${myPub.URL}/merchant/Clerk/info`;
          const params = new URLSearchParams();
          params.append('token',localStorage.currentUser_token);
          params.append('open_id',`${openId.open_id}`);
          axios.post(url,params).then(response => {
            //状态码
            const ost = response.data.status;
            // 当前状态为未登录状态 提示用户登录
            if(ost==1024||ost=='1024'){
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                    location.href = '/login'
                }, 2000)

            }
            //当前状态为登录状态 一切正常进行
            if(ost==200||ost=='200'){
                //店员信息
                const data = response.data.data;
                console.log(data)
                _this.min_tx=data.head_pic;
                _this.min_nc=data.truename;
                _this.min_mb=data.username;
            }
            //当前请求存在某些异常 页面弹出提示框提示用户异常详情
            else{
               this.$vux.alert.show({
                    title: '温馨提示',
                    content: response.data.msg
                })
                setTimeout(() => {
                    this.$vux.alert.hide()
                }, 2000)
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        //进入修改店员昵称页面
        shopname(){
            this.$router.push({ path: '/page/shop_name'})
        },
        // 进入修改手机号页面
        shopphone(a){
            console.log(a)
            this.$router.push({ path: '/page/shop_modifyphone',query: {mobile:a}})
        }
    },

    components: {
        ossFile
    },
    //页面加载后执行
    mounted(){
        this.shopminedata()
    }
}
</script>
<style scoped lang="less">
div{
    height:100%;
}
.shop_mine{
    .shop_mine_box{
        padding:0px 15px;
        list-style:none;
        .shop_mine_tx{
            height:68px;
            font-size:1rem;
            line-height:68px;
            color:#333333;
            border-bottom:1px solid #cccccc;
            .img,img{
                display:inline-block;
                width:50px;
                height:50px;
                border-radius:50%;
                background:#ccc;
                float:right;
                margin-top:9px;
            }
        }
        .shop_mine_mb,.shop_mine_nc{
            height:50px;
            font-size:1rem;
            line-height:50px;
            color:#333333;
            background:url(~@/assets/icon/goods-left.png) no-repeat right center;
            background-size:10px;
            padding-right:1rem;
            label{
                float:right;
                color:#999999;
            }
        }
    }
}
</style>