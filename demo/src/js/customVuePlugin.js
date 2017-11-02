import Vue from 'vue';
import App from './containers/CustomVuePlugin.vue';
import store from './store/index';
import '../css/index.css';
new Vue({
    store,
    render: h=> h(App),
}).$mount('#app');
/*
$.ajax({
    url: '/demoUrl',
    type:'get',
    dataType:'JSON',
    success:function(result){
        debugger;
    }
})*/
