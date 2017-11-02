import {
    post
} from '../util/agentAxios';

// 获取订单列表
export const getOrderList = parameters => post('/api/open', {
    action_id: 7001,
    ...parameters
});