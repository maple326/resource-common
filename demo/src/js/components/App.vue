<template>
    <div id="app">
        <!--getters: {{deriveStateNumber}}<br/>-->
        state: {{count}}
        <div>
            <button @click="triggerAdd">加</button>
            <button>减</button>
        </div>
        <div id="tt"></div>
        ------------------------------
        <list></list>
    </div>
</template>
<style scoped>
    ul,ol{list-style:none;}
</style>
<script>
    import 'jquery';
    import 'easyuiCss';
    import 'easyParse';
    import 'easyTree';
    import 'easyDraggable';
    import 'easyDroppable';
    import List from './List.vue';
    import { mapState,mapGetters,mapMutations,mapActions} from 'vuex';
    export default {
        props:['inputValue'],
        components: {List},
        methods:{
            triggerAdd(){
                this.$store.dispatch('actionsAdd')
            }
        },
        computed: {
            ...mapState({
                count:state=>{
                    return state.list.number;
                }
            }),
            ...mapGetters([
                'deriveStateNumber',
            ])
           /* count(){
                console.log(this)
                return store.state.list.message
            }*/
        },
        mounted(){
            $('#tt').tree({
                data:[{
                    "id":1,
                    "text":"My Documents",
                    "children":[{
                        "id":11,
                        "text":"Photos",
                        "state":"closed",
                        "children":[{
                            "id":111,
                            "text":"Friend"
                        },{
                            "id":112,
                            "text":"Wife"
                        },{
                            "id":113,
                            "text":"Company"
                        }]
                    },{
                        "id":12,
                        "text":"Program Files",
                        "children":[{
                            "id":121,
                            "text":"Intel"
                        },{
                            "id":122,
                            "text":"Java",
                            "attributes":{
                                "p1":"Custom Attribute1",
                                "p2":"Custom Attribute2"
                            }
                        },{
                            "id":123,
                            "text":"Microsoft Office"
                        },{
                            "id":124,
                            "text":"Games",
                            "checked":true
                        }]
                    },{
                        "id":13,
                        "text":"index.html"
                    },{
                        "id":14,
                        "text":"about.html"
                    },{
                        "id":15,
                        "text":"welcome.html"
                    }]
                }]
            });
        }
    }
</script>
