import { ADD_TABS, REMOVE_TAB, SELECTED_TABLE, ADD_HOME, GET_GE_CLUEBASE_LIST, GET_USER_TREE } from '../mutation-types'; // 'ADD' , 'SUBTRACT'
import { AGENT_CURRENT_TAB, AGENT_OPEN_TABS, AGENT_INDEX_ID } from '../../util/keys';
const state = {
    addTabs: [], // 添加Tab标签
    currentTab: AGENT_INDEX_ID, // 显示当前的Tab
    selectedTable: [1, 4, 11, 22], // 添加线索Table
    addHome: [], // 主页Tab
    getUserTree: [], // 人员树
}
const getters = {}
    // 方法调用逻辑
const actions = {
    addTabs({ commit, state, dispatch }, add) {
        commit(ADD_TABS, add);
    },
    removeTab({ commit, state }, tabName) {
        commit(REMOVE_TAB, tabName);
    },
    addHome({ commit, state, dispatch }, add) {
        commit(ADD_HOME, add);
    },
    selectedTable({ commit, state, dispatch }, table) {
        commit(SELECTED_TABLE, table);
    },
    updateCurrentTab({commit,state},pageId){
        state.currentTab = pageId;
        sessionStorage.setItem(AGENT_CURRENT_TAB,state.currentTab);
    },
    getUserTree({ commit, state, dispatch }, tree) { // 人员树
        commit(GET_USER_TREE, tree);
    }
};
// 逻辑代码
const mutations = {
    [ADD_TABS](state, add) {
        function isInArray(arr, value) {
            let res = 0;
            for (var i = 0; i < arr.length; i++) {
                if (value.NavigationId == arr[i].NavigationId ) {
                    if(arr[i].content == 'tab-default'){
                        Object.assign(arr[i],value,{Title:arr[i].Title});
                        res = 2;
                    }else{
                        res = 1;
                    }
                    break;
                }
            }
            return res;
        }
        let res = isInArray(state.addTabs, add);
        if (res === 0) {
            state.addTabs.push(add);
            sessionStorage.setItem(AGENT_OPEN_TABS, JSON.stringify(state.addTabs));
        }
        state.currentTab = add.NavigationId;
        sessionStorage.setItem(AGENT_CURRENT_TAB,state.currentTab);
    },
    [ADD_HOME](state, add) {
        state.addHome.push(add);
        sessionStorage.setItem('crmOpenHome', JSON.stringify(state.state.addHome));
    },
    [REMOVE_TAB](state, pageId) {
        if (state.addTabs.length === 1) {
            return;
        }
        state.addTabs.forEach((item, index) => {
            if (pageId == item.NavigationId) {
                state.addTabs.splice(index, 1);
                let nextTab = state.addTabs[index + 1] || state.addTabs[index - 1];
                if (nextTab) {
                    state.currentTab = nextTab.NavigationId;
                    sessionStorage.setItem(AGENT_CURRENT_TAB,state.currentTab);
                }
                return;
            }
        });
        sessionStorage.setItem(AGENT_OPEN_TABS, JSON.stringify(state.addTabs));
    },
    [SELECTED_TABLE](state, table) {
        state.selectedTable = table;
    },
    [GET_USER_TREE](state, tree) {
        state.getUserTree = tree;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}