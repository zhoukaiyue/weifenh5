<template>
    <div class="datas">
        <storeData v-if="storeshow"></storeData>
        <shopData v-if="shopshow"></shopData>
    </div>
</template>

<script>
//引入商家端数据图
import storeData from '../../components/Datas/storeDatas'
// 引入店员端数据图
import shopData from '../../components/Datas/shopDatas'
export default {
    name: 'datas',
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
        	console.log('店家端数据图')
            //此方法打开的是店家端
            _this.storeshow=true;
            _this.shopshow=false;
        }else{
        	console.log('店员端数据图')
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
        storeData, 
        shopData
    },
    //页面加载后执行
    mounted(){
        
    }
}
</script>

<style scoped lang="less">
</style>