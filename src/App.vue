<template>
    <div id="app">
        <router-view  v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'app',
    computed: {
    },
    components: {
    }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
html,
body {
    height: 100%;
    width: 100%;
    overflow: auto;
}
#vux_view_box_body{
    padding-top:0 !important;
}
#app {
    height: auto;
}
.vux-slider .vux-icon-dot {
    width: 8px !important;
    height: 8px !important;
    border-radius: 4px !important;
}
.detail .vux-cell-value {
    color: #ffffff !important;
}
.detail .vux-cell-box::before {
    display: none;
}
.detail .vux-cell-box .weui-cell__ft::after {
    display: none;
}
</style>
