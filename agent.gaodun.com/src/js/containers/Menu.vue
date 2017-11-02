<template>
    <div>
        <el-menu :default-active="subMenuPath" @select="selectMenuHandler" :unique-opened="true" :router="true" class="el-menu-vertical-demo">
            <el-submenu :index="item.Url" v-if="item.ChildNavigations" v-for="(item,index) in subMenu" :key="item.NavigationId">
                <template slot="title">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.Iconurl"></use>
                </svg>
                    {{item.Title}}
                </template>
                <el-menu-item :key="item2.NavigationId" :route="{path:`${item2.Url}`}" v-for="(item2,index2) in item.ChildNavigations" :index="item2.Url">
                    <span>{{item2.Title}}</span>
                </el-menu-item>
            </el-submenu>
            <!-- 没有二级菜单的 -->
            <el-menu-item v-if="!item3.ChildNavigations" :key="item3.NavigationId" :route="{path:`${item3.Url}`}" v-for="(item3,index3) in subMenu" :index="item3.Url">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item3.Iconurl"></use>
                </svg>
                <span>{{item3.Title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style>
</style>
<script>
    import Vue from 'vue';
    import { mapGetters  } from 'vuex';
    import { AGENT_CURRENT_LEVEL_ONE_MENU, AGENT_MENU } from '../util/keys';
    export default {
        name:'agent-menu',
        computed:{
            ...mapGetters (['subMenu', 'subMenuPath'])
        },
        methods: {
            selectMenuHandler(index) {
                this.$store.dispatch('updateCurrentSubMenuPath', index);
            }
        }
    }
</script>
