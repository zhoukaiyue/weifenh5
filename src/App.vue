<template>
    <div id="app">
        <keep-alive>
            <router-view  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
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
@import '~vux/src/styles/weui/widget/weui_tab/weui_tab.less';
@import '~vux/src/styles/weui/widget/weui_tab/vux-tabbar.less';
html,
body {
    height:100%;
    width: 100%;
    padding-bottom:53px;
    overflow-x: hidden;
}
/*针对iPhone X底部footer做适配*/
@media only screen and (device-width: 375px) and (device-height:812px) and (-webkit-device-pixel-ratio:3) {
    .weui-tabbar{
        padding-bottom:34px;
    }
    body{padding-bottom:87px;}
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
.weui-tab__panel{
    padding-bottom:0px;
}
</style>
