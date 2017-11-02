import {
    post
} from '../util/agentAxios';

// 资金账户类型
export const getAccountType = () => post('/api/open', {
    action_id: 8005,
});

// 资金账户流水类型
export const getAccountFlowType = () => post('/api/open', {
    action_id: 8006,
});

// 资金流水列表
export const getAccountFlowList = params => post('/api/open', {
    action_id: 8007,
    ...params
});