<template>
    <div :class="$route.query.nw == 1 ? 'crm-navigation pointer-events' : 'crm-navigation'">
        <div class="header-logo">
            <div style="text-align: center;margin-right: 20px;margin-top: -3px">
                <img src="../../images/logo.png">
            </div>
        </div>
        <el-tabs :value="parseInt(menuID)" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in menu" :key="item.NavigationId" :item="item" :label="item.Title" :name="item.NavigationId">{{item}}
            </el-tab-pane>
        </el-tabs>
        <div class="user-info">
            <div class="can-work">
                <el-dropdown trigger="hover" @command="handleCommands">
                    <span class="el-dropdown-link-2">
                        {{this.TrueName}}
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">注销退出</el-dropdown-item>
                        <el-dropdown-item command="passwordModify">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import { setCookie } from 'cookieUtils';
import { parseUrl } from 'base';
import { getEnv } from '../util/config';
import Modal from 'vueModal';
import { userLogout } from '../api/user';

import {
    AGENT_MENU,
    AGENT_USER_INFO,
    AGENT_TOKEN,
    AGENT_CURRENT_LEVEL_ONE_MENU,
    AGENT_USERLOGOUT_ACTION_ID,
    AGENT_INDEX_ID
} from '../util/keys';
export default {
    data() {
        return {
            name: 'linxin',
            callNum: '',
            userInfo: '',
            signIn: false,
            singOut: true,
            setIdle: true,
            setBusy: true,
            setMonitor: true,
            setHangup: true,
            setOnLine: true,
            activeName: '',
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(AGENT_USER_INFO));
        this.$store.dispatch('initCurrentLevelOneId');  // 记录一级菜单ID
        this.$store.dispatch('updateCurrentSubMenu', this.$store.state.navigation.currentLevelOneId);   // 根据一级菜单ID找到二级菜单
    },
    mounted() {
        let nid = localStorage.getItem(AGENT_CURRENT_LEVEL_ONE_MENU)
        if (parseUrl().nw != 1 && !nid) {
            nid = AGENT_INDEX_ID;
            for (var i in this.menu) {
                if (this.menu[i].NavigationId == nid) {
                    this.updateCurrentSubMenu(this.menu[i]);
                    break;
                }
            }
        }
    },
    computed: {
        menu() {
            return JSON.parse(localStorage.getItem(AGENT_MENU))
        },
        TrueName() {
            return this.userInfo.TrueName
        },
        ...mapState({
            duration: state => state.navbar.callDuration,
            callCount: state => state.navbar.callCount,
            extStatus: state => {
                return state.navigation.extStatusName
            },
            extStatusId: state => {
                return state.navigation.extStatusId;
            }
        }),
        ...mapGetters(['menuID'])
    },
    watch: {
        extStatusId: function(val) {
            this.setExtStatus(val);
        }
    },
    methods: {
        handleClick(tab) {
            for (let i in this.menu) {
                if (tab.name == this.menu[i].NavigationId) {
                    this.updateCurrentSubMenu(this.menu[i]);
                    return;
                }
            }
        },
        updateCurrentSubMenu(item) {
            if (item.ChildNavigations) {
                let path = item.ChildNavigations[0].ChildNavigations ? item.ChildNavigations[0].ChildNavigations[0].Url : item.ChildNavigations[0].Url;
                this.$store.dispatch('updateCurrentSubMenu', item.NavigationId);
                this.$store.dispatch('updateCurrentSubMenuPath', path);
                this.$router.push({
                    path,
                });                
            }
        },
        async handleCommands(command) {
            let prefix = getEnv();
            if (command == 'logout') {
                await userLogout();
                let exp = new Date();
                exp.setTime(exp.getTime() - 1);
                setCookie(AGENT_TOKEN, undefined, {
                    expires: exp
                });
                setCookie(`${prefix}GDSID`, undefined, {
                    expires: exp
                })                
                this.$store.state.navigation.currentLevelOneId = AGENT_INDEX_ID;
                this.$router.push({ path: '/login' });
                localStorage.clear();
            } else if (command == 'passwordModify') {
                require.ensure([], (require) => {
                    let PasswordModify = require("./PasswordModify.vue");
                    Modal.openComponent(PasswordModify, {
                        title: '修改密码',
                        showCancelButton: false,
                        showConfirmButton: false,
                        width: '500px',
                        self: this,
                    });
                }, 'passwordModify');
            }
        },
    }
}
</script>
<style>
ul,
ol {
    list-style: none;
}

@media screen and (max-width: 800px) {
    .info-messge {
        display: none;
    }
}

.crm-navigation .el-tabs {
    float: left;
}

.crm-navigation .el-dropdown-menu__item {
    text-align: center;
}

.crm-navigation .el-tabs__item {
    color: #fff;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    transition: all .5s;
    width: 80px;
    text-align: center;
}

.crm-navigation .el-tabs__content {
    display: none;
}

.crm-navigation .el-tabs__active-bar {
    width: 80px;
    text-align: center;
    height: 50px;
    z-index: 0;
    background: #1796cf;
    top: -1px;
}

.crm-navigation .el-tabs__item:hover {
    color: #fff;
    background: #17A7E8;
}

.crm-navigation .el-tabs__header {
    border: 0 none;
}

.crm-navigation .el-tabs__item.is-active {
    color: #fff;
}
</style>