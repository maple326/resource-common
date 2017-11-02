<template>
    <div id="app">
        <Header/>
        <div class="content-box">
            <transition name="fade" mode="out-in" appear>
                <router-view></router-view>
            </transition>
        </div>
        <Hoolbar/>
    </div>
</template>
<style>
</style>
<script>
    import Header from '../components/public/Header.vue';
    import Hoolbar from '../components/public/Hoolbar.vue';
    export default {
        name: 'app',
        components: {
            Header,
            Hoolbar,
        },
        data() {
            return {}
        },
        methods: {
            // showHeader() {
            //     let path = this.$route.path;
            //     switch(path){
            //         case '/guidance':
            //             return false;
            //         default:
            //             return true;
            //     }
            // }
        },
    }
</script>
