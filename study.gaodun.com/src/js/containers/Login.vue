<template>
    <div>
        这是登陆页
    </div>
</template>

<script>
import Vue from 'vue';
import { post } from '../util/studyAxios';
import { getCookie, setCookie } from 'cookieUtils';
import { stringify } from 'queryString';
import { parseUrl } from 'base';

export default {
    data: function() {
        return {
            color: 'red',
        }
    },
    methods: {
        

    },
    async created() {

    },
    mounted() {
        //this.loadSSIDJS();
    }
}
</script>

<style scoped>

</style>