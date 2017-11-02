import { AGENT_USER_INFO, AGENT_CURRENT_LEVEL_ONE_MENU, AGENT_CURRENT_SUBMENU, AGENT_MENU, AGENT_USER_FUNCTION } from '../util/keys';

export default {
    install(Vue, options) {
        Vue.prototype.unlocking = (key) => {
            let userFuntion = localStorage.getItem(AGENT_USER_FUNCTION);
            userFuntion = JSON.parse(userFuntion);
            if (key instanceof Array) {
                let operation = false;
                for (var j in key) {
                    for (var i in userFuntion) {
                        if (key[j] == userFuntion[i].FunctionKey) {
                            operation = true;
                            break;
                        }
                    }
                }
                return operation;
            }
            for (var i in userFuntion) {
                if (userFuntion[i].FunctionKey == key) {
                    return true;
                }
            }
            return false;
        }
        Vue.prototype.push = ({ path, context }) => {
            let menu = JSON.parse(localStorage.getItem(AGENT_MENU));
            let matchingPath = (m) => {
                for (let i in m) {
                    if (path && m[i].Url === path) {                        
                        context.$store.dispatch('updateCurrentSubMenu', m[i].NavigationId);
                        context.$store.dispatch('updateCurrentSubMenuPath', path);
                        context.$router.push({ path });
                        return;
                    } else if(!path && m[i].Url) {
                        context.$store.dispatch('updateCurrentSubMenu', m[i].NavigationId);
                        context.$store.dispatch('updateCurrentSubMenuPath', m[i].Url);
                        context.$router.push(m[i].Url);
                        return;
                    }
                    if (m[i].ChildNavigations) {
                        matchingPath(m[i].ChildNavigations);
                    }
                }
            }
            matchingPath(menu);
        }
        Vue.prototype.existMenu = ({ path, routes }) => {
            let menu = JSON.parse(localStorage.getItem(AGENT_MENU)) || [];
            for (let i = 0, len = menu.length; i < len; i++) {
                if (menu[i].Url === path) {
                    return true;
                }
                let subMenu = menu[i].ChildNavigations || [];
                for (let j = 0, subLen = subMenu.length; j < subLen; j++) {
                    if (subMenu[j].Url === path) {
                        return true;
                    }
                }
            }
            return false;
        }
        Vue.prototype.getBaseUrl = () => {
            let host = location.host;
            // 开发环境
            if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
                return 'http://192.168.60.235:6002';
            }
            let pre = location.host.match(/^.*-/);
            // 正式环境
            if (pre === null) {
                return '//agentapi.gaodun.com';
            }
            // 测试及预发布环境
            return `${pre[0]}agentapi.gaodun.com`;
        }
    }
}