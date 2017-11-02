import Vue from 'vue';
import App from './containers/dynamic.vue';
import store from './store/index';
import '../css/index.css';

new Vue({
    store,
    render: h=> h(App),
}).$mount('#app');
/*fetch.get('/test/getJSON').then(v=>{
    console.log(v);
})*/
/*
$.ajax({
    url: '/demoUrl',
    type:'get',
    dataType:'JSON',
    success:function(result){
        debugger;
    }
})*/
