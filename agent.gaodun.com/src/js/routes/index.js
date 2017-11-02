import Entry from '../containers/Entry.vue';
// 课程管理
const CourseIndex = resolve => {
    require.ensure(['../containers/CourseIndex.vue'], (require) => {
        resolve(require('../containers/CourseIndex.vue'))
    },'CourseIndex')
}
// 课程分组管理
const CourseGroup = resolve => {
    require.ensure(['../containers/CourseGroup.vue'], (require) => {
        resolve(require('../containers/CourseGroup.vue'))
    },'CourseGroup')
}
// 商品管理
const ProductIndex = resolve => {
    require.ensure(['../containers/ProductIndex.vue'], (require) => {
        resolve(require('../containers/ProductIndex.vue'))
    },'ProductIndex')
}
// 订单管理
const OrderManage = resolve => {
    require.ensure(['../containers/OrderManage.vue'], (require) => {
        resolve(require('../containers/OrderManage.vue'))
    },'OrderManage')
}
// 代理商财务
const AgentFinance = resolve => {
    require.ensure(['../containers/AgentFinance.vue'], (require) => {
        resolve(require('../containers/AgentFinance.vue'))
    },'AgentFinance')
}
// 资金流水
const CapitalWater = resolve => {
    require.ensure(['../components/agentFinance/CapitalWater.vue'], (require) => {
        resolve(require('../components/agentFinance/CapitalWater.vue'))
    },'CapitalWater')
}
// 登录
const Login = resolve => {
    require.ensure(['../containers/Login.vue'], (require) => {
        resolve(require('../containers/Login.vue'))
    },'Login')
}
// 404
const Page404 = resolve => {
    require.ensure(['../components/Page404.vue'], (require) => {
        resolve(require('../components/Page404.vue'))
    },'Page404')
}
// 中转页面
const Stage = resolve => {
    require.ensure(['../containers/Stage.vue'], (require) => {
        resolve(require('../containers/Stage.vue'))
    },'Stage')
}
// 查看课程
const CourseList = resolve => {
    require.ensure(['../components/courseGroupManager/CourseList.vue'], (require) => {
        resolve(require('../components/courseGroupManager/CourseList.vue'))
    },'CourseList')
}


export const routes = [
	{ path: '/', name:'550',component: Entry ,children: [
		{ path: '/Course/lists',meta:{ title:'课程管理' }, name:'664',component: CourseIndex }, // 课程管理
		{ path: '/CourseGroup/lists',meta:{ title:'课程分组管理' }, name:'665',component: CourseGroup }, // 课程分组管理
		{ path: '/Goods/lists',meta:{ title:'商品管理' }, name:'666',component: ProductIndex }, // 商品管理
		{ path: '/Order/lists',meta:{ title:'订单管理' }, name:'668',component: OrderManage }, // 订单管理
		{ path: '/Finance/agent',meta:{ title:'代理商财务' }, name:'670',component: AgentFinance }, // 代理商财务
		{ path: '/Finance/flow',meta:{ title:'资金流水' }, name:'671',component: CapitalWater }, // 资金流水
		{ path: '/CourseGroup/view/:groupID',meta:{ title:'查看课程' }, name:'10015',component: CourseList }, // 查看课程
	]},
	{ path: '/login',meta:{ title:'登录' }, name:'10000',component: Login }, // 登录
	{ path: '*',meta:{ title:'404' }, name:'10009',component: Page404 }, // 404
	{ path: '/stage',meta:{ title:'中转页面' }, name:'10014',component: Stage }, // 中转页面
]