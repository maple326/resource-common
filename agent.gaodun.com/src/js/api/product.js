import { post,get } from '../util/agentAxios';

//获取商品列表数据
export const getData = parameters => post('/api/open', {
    action_id: 3000,
    ...parameters
});
//新增商品
export const addProduct = parameters => post('/api/open', {
    action_id: 3001,
    ...parameters
});
//编辑商品
export const editProduct = parameters => post('/api/open',{
	action_id:3003,
	...parameters
})
//删除商品
export const deleteProduct = parameters => post('/api/open',{
	action_id:3005,
	...parameters
})
//保存编辑的商品
export const saveProduct = parameters => post('/api/open',{
	action_id:3004,
	...parameters
})
//选择代理商模糊查询
export const selectAgent = parameters => post('/',{
	action_id:1014,
	...parameters
})

//选择课程模糊查询
export const selectCourse = parameters => post('/api/open',{
	action_id:5009,
	...parameters
})
//根据课程模糊查询的结果返回的id获取v站对应的课程价格
export const getVprice = parameters => post('/api/open',{
	action_id:5011,
	...parameters
})
//获取课程分组
export const getCourseGroup = parameters =>post('/api/open',{
	action_id:6009,
	...parameters
})
//获取渠道
export const getChannel = parameters => post('/api/open',{
	action_id: 4002,
	...parameters
})
//获取项目列表
export const getProject = parameters => post('/api/open',{
	action_id:5051,
	...parameters
})
//计算折扣值是否合法
export const discountLegal =parameters => post('/api/open',{
	action_id:3002,
	...parameters
})
//按组添加保存数据
export const accordingGroup = parameters => post('/api/open',{
	action_id:3006,
	...parameters
})
//按组添加保存数据之前某个组下有多少代理商
export const queryAgentNumber = parameters => post('/api/open',{
	action_id:6010,
	...parameters
})

//代理商类型
export const agentType = parameters => post('/',{
	action_id: 4005,
	...parameters
})

//创建订单
export const createOrder = parameters => post('/api/open',{
	action_id:7000,
	...parameters
})

