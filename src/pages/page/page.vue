<template>
    <div>
        <!-- 店家端 -->
        <div class="page-view">
            <view-box ref="viewBox"
                      body-padding-top="46px"
                      :body-padding-bottom="isPaddingBottom">
                <keep-alive>
                    <router-view class="router-view" style="height:100%;"/>
                </keep-alive>
                <tabbar slot="bottom"
                        style="position:fixed"
                        v-if="!isShowTabbar">
                    <tabbar-item link="/page/home"
                                 :selected="$route.path === '/page/home'">
                        <span class="icon icon-home"
                              slot="icon"></span>
                        <span slot="label">首页</span>
                    </tabbar-item>
                    <tabbar-item link="/page/category"
                                 :selected="$route.path === '/page/category'">
                        <span class="icon icon-category"
                              slot="icon"></span>
                        <span slot="label">店铺营销</span>
                    </tabbar-item>
                    <tabbar-item link="/page/data"
                                 :selected="$route.path === '/page/data'">
                        <span class="icon icon-cart"
                              slot="icon"></span>
                        <span slot="label">数据统计</span>
                    </tabbar-item>
                    <tabbar-item link="/page/about"
                                 :selected="$route.path === '/page/about'">
                        <span class="icon icon-user"
                              slot="icon"></span>
                        <span slot="label">商家中心</span>
                    </tabbar-item>
                </tabbar>
            </view-box>
        </div>
    </div>
</template>

<script>
import {
    Tabbar,
    TabbarItem,
    ViewBox,
    Actionsheet,
    TransferDom
} from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'page',
    directives: {
        TransferDom
    },
    data() {
        return {
            showMenu: false,
        }
    },
    created() {
    },
    computed: {
        ...mapState(['title']),
        leftOptions() {
            return {
                showBack: this.$route.path !== '/page/home'
            }
        },
        rightOptions() {
            return {
                showMore: true
            }
        },
        isShowTabbar() {
            if(/detail|ceshi|storeer|store_users|addgoods|storeInfo|shop|order|commodityData|logo|people|changephone|changestore|sh_success|storesuccess|addGoods|dyinvite|Customer|storearmketingdetails|shop_mine|phone|shopdata|shop_storeinfo/.test(this.$route.path)) {
                return true
            }
               return false
        },
        isPaddingBottom() {
            // if (/detail|theme|order|address|about/.test(this.$route.path)) {
            //     return '0'
            // }
            // return '53px'
        }
    },
    methods: {
        onClickMore() {
            this.showMenu = true
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        ViewBox,
        Actionsheet,
        TransferDom
    }
}
</script>
<style type="text/css">
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{color: #f54321!important;}
</style>
<style scoped lang="less">
.page-view {
    height: 100%;
    .weui-tabbar__item {
        .icon {
            width: 27px;
            height: 27px;
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.icon-home {
                background-image: url(~@/assets/toolbar/home.png);
            }
            &.icon-category {
                background-image: url(~@/assets/toolbar/category.png);
            }
            &.icon-cart {
                background-image: url(~@/assets/toolbar/cart.png);
            }
            &.icon-user {
                background-image: url(~@/assets/toolbar/my.png);
            }
        }
        &.weui-bar__item_on {
            .icon {
                &.icon-home {
                    background-image: url(~@/assets/toolbar/home@selected.png) !important;
                }
                &.icon-category {
                    background-image: url(~@/assets/toolbar/category@selected.png) !important;
                }
                &.icon-cart {
                    background-image: url(~@/assets/toolbar/cart@selected.png) !important;
                }
                &.icon-user {
                    background-image: url(~@/assets/toolbar/my@selected.png) !important;
                }
            }
        }
    }
}

</style>
