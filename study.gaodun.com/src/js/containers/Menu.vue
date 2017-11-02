<template>
    <div>
        <el-menu :default-active="activeId" :unique-opened="true" :router="true" class="el-menu-vertical-demo">
            <el-submenu :index="item.Url" v-if="item.ChildNavigations" v-for="(item,index) in menu" :key="item.NavigationId">
                <template slot="title">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.Iconurl"></use>
                </svg>
                    {{item.Title}}
                </template>
                <el-menu-item :key="item2.NavigationId" :route="{path:`${item2.Url}`}" v-for="(item2,index2) in item.ChildNavigations" :index="item2.Url">
                    <a v-if="item2.AppId != 130555 " href="http://www.baidu.com" style="display:block;">{{item2.Title}}</a>
                    <span v-if="item2.AppId == 130555">{{item2.Title}}</span>
                </el-menu-item>
            </el-submenu>
            <!-- 没有二级菜单的 -->
            <el-menu-item v-if="!item3.ChildNavigations" :key="item3.NavigationId" :route="{path:`${item3.Url}`}" v-for="(item3,index3) in menu" :index="item3.Url  || Math.random()">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item3.Iconurl"></use>
                </svg>
                <a v-if="item3.AppId != 130555 " href="http://www.baidu.com" style="display:block;">{{item3.Title}}</a>
                <span v-if="item3.AppId == 130555">{{item3.Title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style>
</style>
<script>
    import Vue from 'vue';
    import { mapState } from 'vuex';
    import { parseUrl } from 'base';
    import { CRM_CURRENT_LEVEL_ONE_MENU, CRM_MENU } from '../util/keys';
    import { Row, Col, Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui';
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);
    Vue.component(Menu.name, Menu);
    Vue.component(Submenu.name, Submenu);
    Vue.component(MenuItem.name, MenuItem);
    Vue.component(MenuItemGroup.name, MenuItemGroup);
    export default {
        name:'crm-menu',
        computed:{
            ...mapState({
                menu: state=> state.navigation.currentSubMenu
            }),
            activeId(){
                return this.$store.state.navigation.currentTabId;
            }
        },
        mounted() {
            //this.$store.dispatch('updateCurrentTabId',parseUrl().nid)
            this.$store.dispatch('updateCurrentTabId',this.$route.path);
        }
    }
</script>
