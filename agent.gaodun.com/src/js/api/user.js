import {
    post
} from '../util/agentAxios';
import {
    AGENT_USERLOGIN_ACTION_ID,
    AGENT_USERLOGOUT_ACTION_ID
} from '../util/keys';

// 登录
export const userLogin = parameters => post('/api/open', {
    action_id: AGENT_USERLOGIN_ACTION_ID,
    ...parameters
});

// 注销
export const userLogout = () => post('/api/open', {
    action_id: AGENT_USERLOGOUT_ACTION_ID
});

// 修改密码
export const modifyPassword = parameters => post('/api/open', {
    action_id: 4000,
    ...parameters
});

// 代理商列表
export const getAgentList = parameters => post('/api/open', {
    action_id: 1010,
    ...parameters
});

// 根据关键词获取代理商列表
export const getAgentListByKeyword = parameters => post('/api/open', {
    action_id: 1014,
    ...parameters
});

// 部门列表
export const getDepartmentList = parameters => post('/api/open', {
    action_id: 4002,
    ...parameters
});