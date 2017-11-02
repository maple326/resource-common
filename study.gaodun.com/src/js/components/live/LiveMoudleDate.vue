<template>
    <div>
        <div class="milbox">
            
        </div>
    </div>
</template>
<script>
    //import { getChannel } from '../api/channel';
    export default {
        components:{
            TodayLive,
            MyCourse,
            PersonalInfo,
        },
        data(){
            return {
                text : '首页',
                userId: 2,
                acurrentView:"MyCourse"
            }
        },
        computed:{
            id2 (state){
                return this.userId + 1
            }
        },
        async created(){
            //let ret = await getChannel({});
        },
        mounted(){

        },
        methods: {
            sayHello() {
                
                this.$store.dispatch('add',222);
            },
            ald(tabText){
                this.acurrentView = "MyCourse";
            }
        }
    }
</script>
