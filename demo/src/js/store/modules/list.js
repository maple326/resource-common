import {ADD,UPDATE_NUMBER} from '../mutation-types'; // 'ADD' , 'SUBTRACT'
const state = {
    number: 122,
    checkoutNumber:'checkoutNumber'
};
const getters = {
    checkoutNumber: state => {
        return state.number + 3
    }
}
// 方法调用逻辑
const actions = {
    updateNumber({commit},value){
        commit(UPDATE_NUMBER,value);
    },
    actionsAdd({commit,state,dispatch},p){
        commit(ADD,"your parameters");
    },
    actionsSubtract({commit,state},p){
        //commit(ADD,"your parameters")
    },
};
// 逻辑代码
const mutations = {
    [ADD](state,a){
        state.number += 1;
    },
    [UPDATE_NUMBER](state,value){
        state.number = value;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}