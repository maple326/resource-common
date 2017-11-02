<template>
    <div style="background:#f0f2f5;margin-top: -20px;">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" src="../../images/404/404.png" alt="404">
                <img class="pic-404__child left" src="../../images/404/404_cloud.png" alt="404">
                <img class="pic-404__child mid" src="../../images/404/404_cloud.png" alt="404">
                <img class="pic-404__child right" src="../../images/404/404_cloud.png" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">OOPS!</div>
                <div class="bullshit__info">版权所有
                    <a class='link-type' href='/' target='_blank'>高顿网校</a>
                </div>
                <div class="bullshit__headline">{{ message }}</div>
                <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
                <router-link :to="{path: '/index'}" class="bullshit__return-home">返回首页</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    },
    computed: {
        message() {
            return '特朗普说这个页面你不能进......'
        }
    },
}
</script>
