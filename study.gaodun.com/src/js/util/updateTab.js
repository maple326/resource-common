import Vue from 'vue';
import DefaultComponent from '../components/Default.vue';
import { CRM_CURRENT_TAB } from './keys';
export function updateTabs(tabInfo, isFromStorage) {
    var vueComponent = '';
    new Promise((resolve, reject) => {
        tabInfo.NavigationId = tabInfo.NavigationId.toString();
        let currentTab = sessionStorage.getItem(CRM_CURRENT_TAB);
        if (isFromStorage && currentTab != tabInfo.NavigationId) {
            return resolve({ vueComponent: DefaultComponent, objTab: tabInfo });
        }
        let NavigationId = tabInfo.NavigationId.split('-')[0];
        /*require.ensure([], (require) => {
            vueComponent = require(`../${tabInfo.Url}.vue`);
            resolve({ vueComponent, objTab: tabInfo })
        });*/
        require(`bundle-loader?lazy&name=[name]!../file.js`);
        import (`../${tabInfo.Url}.vue`).then(imp => {
            resolve({ vueComponent: imp, objTab: tabInfo })
                //debugger;
        })
        switch (NavigationId) {
            case '488': // 首页

                break;
                /*case '535': // 渠道来源管理
                    require.ensure([], (require) => {
                        vueComponent = require("../containers/Channel.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'channel');
                    break;
                case '536': // 分配规则
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleAssignRule.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluesModuleAssignRule');
                    break;
                case '537': // 线索回收
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleAssignRuleRecovery.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluesModuleAssignRuleRecovery');
                    break;
                case '520': // 线索管理
                    require.ensure([], (require) => {
                        vueComponent = require("../containers/CluesIndex.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluesIndex');
                    break;
                case '521': // 新增线索
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleNewUsers.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluesModuleNewusers');
                    break;
                case '492': // 销售电话工作台
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleSalesTracking.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluesModuleSalesTracking');
                    break;
                case '8888': // 创建订单
                    require.ensure([], (require) => {
                        vueComponent = require("../components/order/OrderModuleCreate.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'orderModuleCreate');
                    break;
                case '525': // 所属人查询
                    require.ensure([], (require) => {
                        let SubordinateQuery = require("../components/cluesManage/CluesModaISubordinateQuery.vue");
                        modal.openComponent(SubordinateQuery, {
                            title: '所属人查询',
                            showCancelButton: false,
                            showConfirmButton: false,
                            width: '590px',
                            self: this,
                            callback: (flag, self) => {}
                        });
                    }, 'subordinateQuery');
                    break;
                case '31106': // 分配规则
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleAssignRule.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'AssignRules');
                    break;
                case '10000': // 线索回收
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleAssignRuleRecovery.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'AssignRuleRecovery');
                    break;
                case '31107': // 线索跟进
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleTracking.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluestracking');
                    break;
                case '31108': // 线索跟进
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleDetails.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'cluestracking');
                    break;
                case '510':
                    require.ensure([], (require) => {
                        vueComponent = require("../containers/ProductIndex.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'productIndex');
                    break;
                case '10010':
                    require.ensure([], (require) => {
                        vueComponent = require("../components/cluesManage/CluesModuleNewUsers.vue");
                        resolve({ vueComponent, objTab: tabInfo })
                    }, 'productIndex');
                    break;*/
        }

    }).then(({ vueComponent, objTab }) => {
        Vue.component(vueComponent.name, vueComponent);
        objTab.content = vueComponent.name;
        this.$store.dispatch('addTabs', objTab);
    });
}