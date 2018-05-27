<template>
    <div class="home_index">
        <!--商家端店铺营销 -->
        <category  v-if="storeshow"></category>
        <!--店家端端店铺营销 -->
        <shopCategory  v-if="shopshow"></shopCategory>
    </div>
</template>

<script>
//引入商家端店铺营销
import category from '../../components/StoreMarketing/category'
// 引入店员端商铺营销
import shopCategory from '../../components/StoreMarketing/shopCatgory'
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
        category,
        shopCategory
    },
    //页面加载后执行
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
</style>