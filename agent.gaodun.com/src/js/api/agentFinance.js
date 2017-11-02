import { post,get } from '../util/agentAxios';

//获取商品列表数据
export const getAgentCount = parameters => post('/api/open', {
    action_id: 8000,
    ...parameters
});

//获取渠道
export const getChannel = parameters => post('/api/open',{
	action_id: 4002,
	...parameters
})

//选择代理商模糊查询
export const selectAgent = parameters => post('/',{
	action_id:1014,
	...parameters
})

//充值接口
export const pay = parameters => post('/',{
	action_id: 8001,
	...parameters
})

//增加额度的接口
export const creatCredit = parameters => post('/',{
	action_id:8002,
	...parameters
})

//减少额度的接口
export const upCredit = parameters => post('/',{
	action_id:8003,
	...parameters
})


// 资金流水列表
export const getAccountFlowList = params => post('/api/open', {
    action_id: 8007,
    ...params
});