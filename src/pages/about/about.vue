<template>
    <div class="about_index">
        <storeabout v-if="storeshow"></storeabout>
        <shopabout v-if="shopshow"></shopabout>
    </div>
</template>

<script>
//引入商家端店长中心
import storeabout from '../../components/Abouts/storeabout'
// 引入店员端店员中心
import shopabout from '../../components/Abouts/shopabout'
export default {
    name: 'about_index',
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
        storeabout,
        shopabout
    },
    //页面加载后执行
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
</style>