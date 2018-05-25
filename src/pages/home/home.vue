<template>
    <div class="home_index">
        <storeHome v-if="storeshow"></storeHome>
        <shopAssistant v-if="shopshow"></shopAssistant>
    </div>
</template>

<script>
//引入商家端首页
import storeHome from '../../components/storeHome'
// 引入店员端首页
import shopAssistant from '../../components/shopAssistant'
export default {
    name: 'home_index',
    data() {
        return {
            storeshow:true,
            shopshow:false,
        }
    },
    created() {
        const _this =this;
        //此方法打开的是店家端
        if(localStorage.Identity==1){
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
</style>