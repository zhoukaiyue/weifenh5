<template>
    <div class="home_index">
        <storeHome v-if="storeshow"></storeHome>
        <shopAssistant v-if="shopshow"></shopAssistant>
    </div>
</template>

<script>
//引入商家端首页
import storeHome from '../../components/Home/storeHome'
// 引入店员端首页
import shopAssistant from '../../components/Home/shopAssistant'
export default {
    name: 'home_index',
    data() {
        return {
            //显示商家端字段
            storeshow:true,
            // 显示店员端字段
            shopshow:false,
        }
    },
    created() {
        const _this =this;
        
        if(localStorage.Identity==1){

            //此方法打开的是店家端
            _this.storeshow=true;
            _this.shopshow=false;
        }else{
            //此方法打开的是店员端
            _this.storeshow=false;
            _this.shopshow=true;  
        }
    },
    deactivated () {
        this.$destroy()
    },
    methods: {
    },

    components: {
        storeHome,
        shopAssistant
    },
    //页面加载后执行
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
.home_index{
    background: #f8f7f7;
}
</style>