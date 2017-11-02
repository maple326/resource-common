<template>
    <el-dialog :visible.sync="showDialog" @close="closeDialog">
        <Guidance :inDialog="true"></Guidance>
    </el-dialog>
</template>
<style>
    .inDialog.rectangle {
        position: static;
        background: none;
    }

    .inDialog .spbox {
        width: auto;
        position: static;
        -webkit-transform: translate(0, 0);
        -moz-transform: translate(0, 0);
        -ms-transform: translate(0, 0);
        -o-transform: translate(0, 0);
        transform: translate(0, 0);
    }

    .inDialog .spbox .spline {
        display: none;
    }

    .inDialog .spbox .spatit {
        padding-top: 0;
    }
</style>
<script>
    import {verify, getSurvey, saveSurvey} from '../api/home';
    import Guidance from '../components/GuidanceModuleDialog.vue';
    import VM from '../common/Vue';
    export default {
        components:{
            Guidance
        },
        data(){
            return {
                showDialog : true,
            }
        },
        methods: {
            async closeDialog() {
                let ret = await verify({verify:2});
                this.$router.push({
                    path: '/'
                })
            }
        },
        created(){
			
        },
    }
</script>
