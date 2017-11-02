import { CURRENT_SUB_MENU, SIGNIN_OUT, EXT_STATUS, HANGUP_CALL, SET_SUBMENU_PATH } from '../mutation-types';
import { AGENT_MENU, AGENT_CURRENT_SUBMENU, AGENT_CURRENT_SUBMENU_PATH, AGENT_CURRENT_LEVEL_ONE_MENU, AGENT_INDEX_ID } from '../../util/keys';
const state = {
    currentLevelOneId: '',
    currentSubMenu: [],
    currentSubMenuPath: '',
    currentTabId: 0,
    extStatusId: 0,
    extStatusName: ""
};
const getters = {
    menuID: state => state.currentLevelOneId ? state.currentLevelOneId : localStorage.getItem(AGENT_CURRENT_LEVEL_ONE_MENU),
    subMenu: state => state.currentSubMenu.length > 0 ? state.currentSubMenu : JSON.parse(localStorage.getItem(AGENT_CURRENT_SUBMENU)),
    subMenuPath: state => state.currentSubMenuPath ? state.currentSubMenuPath : localStorage.getItem(AGENT_CURRENT_SUBMENU_PATH)
    }
    // 方法调用逻辑
const actions = {
    // 初始化一级菜单选中的ID
    initCurrentLevelOneId() {
        state.currentLevelOneId = localStorage.getItem(AGENT_CURRENT_LEVEL_ONE_MENU) || AGENT_INDEX_ID;
    },
    // 更新二级菜单
    updateCurrentSubMenu({ commit, state }, nid) {
        let menu = JSON.parse(localStorage.getItem(AGENT_MENU)) || [];
        let subMenuId = nid || state.currentLevelOneId;
        for (let i = 0, len = menu.length; i < len; i++) {
            if (menu[i].NavigationId === subMenuId) {
                commit(CURRENT_SUB_MENU, menu[i]);
                break;
            }
            let subMenu = menu[i].ChildNavigations || [];
            for (let j = 0, subLen = subMenu.length; j < subLen; j++) {
                if (subMenu[j].NavigationId === subMenuId) {
                    commit(CURRENT_SUB_MENU, menu[i]);
                    break;
                }
            }
        }
    },
    updateCurrentSubMenuPath({ commit, state }, path) {
        commit(SET_SUBMENU_PATH, path);
    },
    async signOperate({ commit }, parmSignInfo) {
        let ret = await signOperate(parmSignInfo);
        if (ret && ret.status === 0) {
            commit(SIGNIN_OUT, ret.result);
            let queryPrm = { ExtNo: parmSignInfo.ExtNo };
            let extInfo = await getSingleExtStatus(queryPrm);
            commit(EXT_STATUS, extInfo.result);
        }
    },
    async hangupCall({ commit }, parm) {
        let ret = await hangup(parm);
        if (ret && ret.status === 0) {
            commit(HANGUP_CALL, ret.result);
        }
    }
};
// 逻辑代码
const mutations = {
    /**
     * 更新当前一级菜单ID，二级菜单内容
     * @param state { Object }
     * @param ChildNavigations { Array } 二级菜单
     * @param NavigationId { Number } 一级菜单ID
     */
    [CURRENT_SUB_MENU](state, { ChildNavigations, NavigationId }) {
        state.currentSubMenu = ChildNavigations;
        state.currentLevelOneId = NavigationId;
        localStorage.setItem(AGENT_CURRENT_SUBMENU, JSON.stringify(state.currentSubMenu));
        localStorage.setItem(AGENT_CURRENT_LEVEL_ONE_MENU, state.currentLevelOneId)
    },
    [SET_SUBMENU_PATH](state, path) {
        state.currentSubMenuPath = path;
        localStorage.setItem(AGENT_CURRENT_SUBMENU_PATH, path);        
    },
    [SIGNIN_OUT](state, recult) {

    },
    [EXT_STATUS](state, result) {
        state.extStatusId = result.StatusId;
        state.extStatusName = result.Status;
    },
    [HANGUP_CALL](state, result) {

    }
};
export default {
    state,
    getters,
    actions,
    mutations
}