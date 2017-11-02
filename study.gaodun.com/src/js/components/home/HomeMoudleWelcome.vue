<template>
    <div class="todaylive" v-if="showWelcome">
        <div class="spbg"></div>
        <div class="spbox">
            <div class="spane">
                <div class="spacetop"></div>
                <div class="spacom"><span class="spaicon sp1"></span> <span class="spaicon sp2"></span> <span
                        class="spaicon sp3"></span></div>
                <div class="spabtn"><input type="button" value="立即进入" @click="closeModal" class="libtn"></div>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import {verify} from '../../api/home';
    import VM from "../../common/Vue.js"
    export default {
        props: {},
        data(){
            return {
                showWelcome:false,
            }
        },
        computed: {},
        methods: {
            async controlWelcomeModal(){
                let ret = await verify();
                this.$store.dispatch("save_user_boot",ret.result.new_user_boot);   //用户是否第一次进入
                if(ret.result.identity === 3){
                    this.showWelcome = true;
                    this.$store.dispatch("verifyState",3)   //新老用户存状态管理
                }else if(ret.result.identity === 1){
                    this.$router.push({
                        path: '/guidance'
                    })
                }else if(ret.result.identity === 2){
                    this.$store.dispatch("verifyState",2)   //新老用户存状态管理
                }
            },
            async closeModal() {
                let ret = await verify({verify:2});
                this.showWelcome = false;
                VM.$emit("closeWel");   //发送关闭欢迎页的事件
            }
        },
        created(){
            this.controlWelcomeModal();
        }
    }
</script>
