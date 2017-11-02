<template>
    <div id="app">
        <Header v-if="showHeader()"/>
        <div class="content-box">
            <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
        <Hoolbar/>
    </div>
</template>

<script>
    import Header from '../components/public/Header.vue';
    import Hoolbar from '../components/public/Hoolbar.vue';

    export default {
        data(){
            return {

            }
        },
        components:{
            Header,
            Hoolbar,
        },
        created(){
            var DEFAULT_VERSION = "8.0";
            var ua = navigator.userAgent.toLowerCase();
            var isIE = ua.indexOf("msie")>-1;
            var safariVersion;
            if(isIE){
                safariVersion =  ua.match(/msie ([\d.]+)/)[1];
                if(safariVersion <= DEFAULT_VERSION ){
                    // 跳转至页面1
                }
            }
        },
        methods : {
            showHeader() {
                let path = this.$route.path;
                switch(path){
                    case '/guidance':
                        return false;
                    default:
                        return true;
                }
            }
        }
    }
</script>
