import {ADD_COMPONENT} from '../mutation-types'; // 'ADD' , 'SUBTRACT'
const state = {
    components:[],
    editableTabsValue2: '2',
    editableTabs2: [],
    tabIndex: 2,
};
const getters = {
    numberEdit: state => {
        return Number(state.editableTabsValue2);
    }
};
// 方法调用逻辑
const actions = {
    addComponent({commit,state,rootState},component){
        commit(ADD_COMPONENT,{
            component,
            rootState
        });
    },
};
// 逻辑代码
const mutations = {
    [ADD_COMPONENT](state,{component,rootState}){
        let now = Date.now().toString();
        rootState.list.number = state.tabIndex++ ;
        state.editableTabs2.push({
            title: 'ss',
            name:now,
            content: component
        });
        state.editableTabsValue2 = now
        //state.number += 1;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}