import Entry from '../containers/Entry.vue';
// 登陆
import Login from '../containers/Login.vue';
// 首页
import Home from '../containers/Home.vue';
// 全部直播
import LiveDate from '../containers/LiveDate.vue';
// 兴趣板块
import Hobbies from '../containers/Hobbies.vue';
// 引导页
import Guidance from '../containers/Guidance.vue';


export const routes = [
    /*{
     path: '/', name: '550', component: Entry, redirect: '/guidance', children: []
     },*/
    {path: '/', name: '10001', component: Home}, // 首页
    {path: '/live', name: '10002', component: LiveDate}, // 全部直播
    {path: '/hobbies', name: '10003', component: Hobbies}, // 兴趣板块
    {path: '/guidance', name: '10004', component: Guidance,},
    {path: '/login', name: '10000', component: Login}, // 登陆
]