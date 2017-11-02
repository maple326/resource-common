import {
    post
} from '../util/agentAxios';

// 查询课程
export const getCourseList = parameters => post('/api/open', {
    action_id: 5000,
    ...parameters
});

// 搜索课程
export const searchCourseList = parameters => post('/api/open', {
    action_id: 5009,
    ...parameters
});

// 添加课程
export const addCourse = parameters => post('/api/open', {
    action_id: 5002,
    ...parameters
});

// 编辑课程
export const editCourse = parameters => post('/api/open', {
    action_id: 5004,
    ...parameters
});

// 查询课程分配给了多少代理商
export const getAgentNum = parameters => post('/api/open', {
    action_id: 5005,
    ...parameters
});

// 删除课程
export const removeCourse = parameters => post('/api/open', {
    action_id: 5006,
    ...parameters
});

// 通过v站课程包id获取课程详情
export const getCourse = parameters => post('/api/open', {
    action_id: 5001,
    ...parameters
});

// 课程上架
export const upCourse = parameters => post('/api/open', {
    action_id: 5007,
    ...parameters
});

// 课程下架
export const downCourse = parameters => post('/api/open', {
    action_id: 5008,
    ...parameters
});

// 查询课程已分配部门下多少代理商
export const getAgentNumByDepartment = parameters => post('/api/open', {
    action_id: 3007,
    ...parameters
});

// 加入代理商
export const addAgent = parameters => post('/api/open', {
    action_id: 5010,
    ...parameters
});

// 获取项目列表
export const getProjectList = parameters => post('/api/open', {
    action_id: 5051,
    ...parameters
});

// 查询折扣值是否合法
export const checkDiscount = parameters => post('/api/open', {
    action_id: 3002,
    ...parameters
});