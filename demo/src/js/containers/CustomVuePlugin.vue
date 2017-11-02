<template>
    <div id="app">
        <h1>Custom Vue Modal Plug-in</h1>
        <mt-button @click="triggerAdd" type="primary">Test </mt-button>
        {{this.$store.state.list.number}}
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import Vue from 'vue';
    import { Button } from 'mint-ui';
    import modal from 'vueModal';
    import List from '../components/List.vue';
    import { mapActions ,mapState ,mapGetters } from 'vuex';
    Vue.component(Button.name,Button);
    export default {
        methods:{
            triggerAdd(){
                modal.openComponent(List,{
                    title:'打开Vue组件的模态框',
                    showCancelButton:true,
                    showConfirmButton:true,
                    self: this,
                    data:this.$store.state.list,
                    callback:(flag,self)=>{
                        //this.$store.dispatch('updateNumber',self.content.value);
                        console.log(flag)
                    }
                }).then((modal)=>{
                });
            }
        },
        computed: {

        },
        mounted(){
        }
    }
</script>
