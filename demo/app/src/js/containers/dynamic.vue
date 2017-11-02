<template>
    <div id="app">
        <h1>Custom Vue Modal Plug-in</h1>
        <el-tabs v-model="tabsValue" type="card" closable>
            <el-tab-pane
                    v-for="(item, index) in this.tab2"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
            >
                <mycontent :content="item.content"></mycontent>
            </el-tab-pane>
        </el-tabs>
        <mt-button @click="triggerAdd" type="primary">Test </mt-button>{{numberEdit}}
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import Vue from 'vue';
    import { Button } from 'mint-ui';
    import { Tabs ,TabPane} from 'element-ui';
    import { mapActions ,mapState ,mapGetters } from 'vuex';
        //import List from '../components/List.vue';
    Vue.component(Button.name,Button);
    Vue.component(Tabs.name,Tabs);
    Vue.component(TabPane.name,TabPane);
    Vue.component('mycontent', {
        props: ['content'],
        data() {
            return {
                coms: [],
            }
        },
        render: function(h) {
            let self = this;
            var ar = ['']
            var result = ar.map(function(componentName) {
                return h(self.content);
            });
            return h('div',result)
        },
    });
    export default {
        methods:{
            triggerAdd(){
                require.ensure([], (require)=>{
                    let List = require("../components/List.vue");
                    Vue.component(List.name,List);
                    this.addComponent(List.name);
                }, 'test');
            },
            ...mapActions([
                'addComponent'
            ])
        },
        computed: {
            ...mapState({
                components: state => state.dynamic.components,
                tabsValue: state => state.dynamic.editableTabsValue2,
                tab2 : state => state.dynamic.editableTabs2
            }),
            ...mapGetters([
                'numberEdit'
            ])
        },
        mounted(){
            debugger;
        }

    }
</script>
