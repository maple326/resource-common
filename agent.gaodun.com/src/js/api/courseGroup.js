import {
    post
} from '../util/agentAxios';

// 获取课程分组列表
export const getCourseGroupList = parameters => post('/api/open', {
    action_id: 6000,
    ...parameters
});

// 新增分组
export const addCourseGroup = parameters => post('/api/open', {
    action_id: 6001,
    ...parameters
});

// 编辑分组
export const editCourseGroup = parameters => post('/api/open', {
    action_id: 6003,
    ...parameters
});

// 删除分组
export const removeCourseGroup = parameters => post('/api/open', {
    action_id: 6005,
    ...parameters
});

// 查询分组下有无课程
export const existCourse = parameters => post('/api/open', {
    action_id: 6004,
    ...parameters
});

// 获取某分组下所有课程
export const getCourseList = parameters => post('/api/open', {
    action_id: 6007,
    ...parameters
});

// 添加课程到某个组
export const addCourse = parameters => post('/api/open', {
    action_id: 6006,
    ...parameters
});

// 删除课程
export const removeCourse = parameters => post('/api/open', {
    action_id: 6008,
    ...parameters
});