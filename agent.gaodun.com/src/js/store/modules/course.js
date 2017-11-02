import {
    SET_CURRENT_COURSE_GROUP,
    GET_CURRENT_COURSE_GROUP
} from '../mutation-types';
import {
    CURRENT_GROUP_NAME
} from '../../util/keys';

const state = {
    courseGroup: {}
};

const getters = {
    currentGroupName: state => state.courseGroup.name ? state.courseGroup.name : localStorage.getItem(CURRENT_GROUP_NAME)
};

const actions = {
    setCurrentCourseGroup({
        commit
    }, payload) {
        commit(SET_CURRENT_COURSE_GROUP, payload);
    },
    getCurrentCourseGroup({
        commit
    }, payload) {
        commit(GET_CURRENT_COURSE_GROUP);
    }
};

const mutations = {
    [SET_CURRENT_COURSE_GROUP](state, payload) {
        state.courseGroup = { ...state.courseGroup,
            name: payload.name
        }
        localStorage.setItem(CURRENT_GROUP_NAME, payload.name);
    },
    [GET_CURRENT_COURSE_GROUP](state) {
        return state.courseGroup;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}