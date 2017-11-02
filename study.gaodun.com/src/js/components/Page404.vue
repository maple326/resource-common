<template>
    <div class="container">
        <img src="../../images/404.jpg" width="385" height="197"/>
        <p class="message">
            非常抱歉，您访问的页面不存在，或者已经被删除。<el-button type="text" @click="goHome">返回首页</el-button>
        </p>
    </div>
</template>
<style scoped>
    .container{
        position:fixed;
        text-align:center;
        top:40%;
        left:50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        -moz-transform: translate3d(-50%, -50%, 0);
        -ms-transform: translate3d(-50%, -50%, 0);
        -o-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
    }
    .message{
        color:#999;
    }
    .back_button{
        color:#4fb8e7;
    }
    .back_button:hover{
        color:#6ec4ea;
    }
</style>
<script>
    import { CRM_CURRENT_LEVEL_ONE_MENU } from '../util/keys';
    export default {
        methods : {
            // 返回首页
            goHome() {
                this.$router.go(-1);
                // localStorage.setItem(CRM_CURRENT_LEVEL_ONE_MENU,488);
                // this.$router.push({
                //     path: '/'
                // });
            }
        }
    }
</script>
