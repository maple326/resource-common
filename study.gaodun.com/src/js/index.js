import Vue from 'vue';
import store from './store/index';
import App from './containers/App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

// import VueAwesomeSwiper from 'vue-awesome-swiper';
// Vue.use(VueAwesomeSwiper);

Vue.use(ElementUI)
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
});

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');