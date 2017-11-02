<template>
    <div id="app">
        <h1 @click="triggerAdd">Vonic page</h1>
        <mt-cell title="标题文字" value="说明文字" ></mt-cell>
        <mt-list></mt-list>
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import Vue from 'vue';
    import { Cell,Toast,Indicator,MessageBox } from 'mint-ui';
    import 'mint-ui/lib/style.css';
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex';
    import List from '../components/List.vue';
    Vue.component(Cell.name,Cell);
    Vue.component(Toast.name,Toast);
    Vue.component(List.name,List);
    export default {
        methods:{
            triggerAdd(){
                //..
                MessageBox({
                    title: '提示',
                    message: '<h1>222</h1>',
                    showCancelButton: true
                });
            }
        },
        computed: {

        },
        mounted(){

        }
    }
</script>
