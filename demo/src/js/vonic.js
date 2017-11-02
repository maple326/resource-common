import Vue from 'vue';
import Fetch from 'BaseFetch';
import App from './containers/Vonic.vue';
import store from './store/index';
import '../css/index.css';
let fetch = new Fetch;
new Vue({
    store,
    render: h=> h(App),
}).$mount('#app');
fetch.get('/test/getJSON').then(v=>{
    console.log(v)
})
/*
$.ajax({
    url: '/demoUrl',
    type:'get',
    dataType:'JSON',
    success:function(result){
        debugger;
    }
})*/
