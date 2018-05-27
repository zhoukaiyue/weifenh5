<template>
    <div class="detail_index">
        <storeDetail v-if="storeshow"></storeDetail>
        <shopDatil v-if="shopshow"></shopDatil>
    </div>
</template>

<script>
//引入商家端详情
import storeDetail from '../../components/Details/storeDetail'

// 引入店员端详情
import shopDatil from '../../components/Details/shopDetail'
export default {
    name: 'detail_index',
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
        storeDetail,
        shopDatil
    },
    //页面加载后执行
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
</style>