import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as home from './modules/home';
import * as channel from './modules/channel';
Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    modules: {
        channel,
        home,
    },
    strict: false
})