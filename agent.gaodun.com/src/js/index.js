import Vue from 'vue';
import store from './store/index';
import App from './containers/App.vue';
import VueRouter from 'vue-router';
import {
    routes
} from './routes/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import '../css/main.less';
import '../css/animate.min.css';
import '../iconfont/iconfont.js';
import {
    setWindowNID
} from './util/config';
import {
    AGENT_TOKEN,
    AGENT_MENU,
    AGENT_INDEX_ID
} from './util/keys';
import {
    getCookie
} from 'cookieUtils';
Vue.use(ElementUI)
Vue.use(VueRouter);
const LOGIN_PATH = '/login';
const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (!getCookie(AGENT_TOKEN) && to.path !== LOGIN_PATH) {
        next(LOGIN_PATH);
    }
    if (!window.AGENTMENU) {
        window.AGENTMENU = JSON.parse(localStorage.getItem(AGENT_MENU));
    }
    if (to.path == '/index') {
        window.nid = AGENT_INDEX_ID;
    }
    if (to.path !== LOGIN_PATH && to.path.indexOf('/CourseGroup/view/') === -1 && !Vue.prototype.existMenu(to)) {
        next(false);
    } else {
        document.title = `Agent-代理系统 ${to.meta.title}` || 'Agent-代理系统'
        if (!to.query.url && from.query.url) {
            to.query.url = from.query.url
        }
        next();
    }
});
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');