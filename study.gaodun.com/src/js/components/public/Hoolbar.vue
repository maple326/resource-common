w<template>
    <div class="litrgt">
        <div class="littoolbar toolcom">
            <template v-if="$store.state.home.booklist.length > 1">
                <span class="toolmit booking">
                    <span class="icon"></span>
                    <span class="toolfont" @click="getbooklist">私教<br/>预约</span>
                </span>
            </template>
            <template v-for="(eventbook,index) in $store.state.home.booklist" v-else>
                <span class="toolmit booking">
                    <a :href="'//' + pre + 'v.gaodun.com/Booking/index?project_id=' + eventbook.project_id " target="_blank" v-for="events in $store.state.home.booklist">
                        <span class="icon 55"></span>
                        <span class="toolfont">私教<br/>预约</span>
                    </a>
                </span>
            </template>
            <span class="toolmit tiku">
                <a :href="'//' + pre +'v.gaodun.com/newclass/mytiku'" target="_blank">
                    <span class="icon"></span><span class="toolfont">我的<br/>题库</span>
                </a>
            </span>
            <span class="toolmit answerqions">
                <a :href="'//' + pre +'v.gaodun.com/newclass/question'" target="_blank">
                    <span class="icon"></span><span class="toolfont">我的<br/>答疑</span>
                </a>
            </span>
            <span class="toolmit replaceexam">
                <a :href="'//' + pre +'v.gaodun.com/newcfaexam/index'" target="_blank">
                    <span class="icon"></span><span class="toolfont">考试<br/>代报名</span>
                </a>
            </span>
            <span class="toolmit gdapp" @mouseover="appShow" @mouseout="appHide">
                <span class="icon"></span><span class="toolfont">网校<br/>APP</span>
                <span class="isshowdrop" v-show="isshowapp">
                    <span class="appfont qqcode">随时随地 移动学习</span>
                    <span class="appimg"><img src="../../../images/appimg.png"></span>
                </span>
            </span>
            <span class="toolmit wechat" @mouseover="wechatShow" @mouseout="wechatHide">
                <span class="icon"></span><span class="toolfont">网校<br/>微信</span>
                <span class="isshowdrop" v-show="isshowwechat">
                    <span class="appfont">关注微信 及时通知</span>
                    <!-- <span class="appimg"><img src="../../../images/appimg.png"></span> -->
                    <span class="appimg"><img :src="$store.state.home.qrcode"></span>
                </span>
            </span>
            <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAxMTczNl80Njg1MzJfNDAwMTY4ODgxMV8yXw" target="_blank" class="toolmit customer">
                <span class="icon"></span><span class="toolfont">售后<br/>服务</span>
            </a>
        </div>
        <div class="littoolbar toolbtm">
            <span class="toolmit suggest">
                <a href="//wj.qq.com/s/1566872/b7ea" target="_black" title="">
                    <span class="icon"></span><span class="toolfont">新版<br/>反馈</span>
                </a>
            </span>
            <span class="toolmit oldversion">
                <a :href="'//' + pre +'v.gaodun.com/class/index'">旧版</a>
            </span>
        </div>
        <!-- 新手引导动画4 -->
        <transition name="fadeLeft2">
    	    <div class="guide" v-show="$store.state.home.bGuide">
                <div class="triangle3"></div>
                <span>
                    <i>4</i>
                </span>
                <p>实用工具栏<br/>私教,题库, 考试代报名...</p>
            </div>
        </transition>
        <span class="toolold">点我可以回到旧版学习空间哦~</span>
        <!-- Begin 预约私教 -->
        <div class="bookbg" v-show="bookclose"></div>
        <div class="bookbox" id="bookbox" v-show="bookclose">
            <h1 class="tit1 titbook">请选择您现在要预约的项目<span class="bookclose close" @click="clbook"></span></h1>
            <div class="couple" id="bookproject">
                <template v-for="(eventbook,index) in $store.state.home.booklist">
                    <!-- <a :href="'//'+pre+'v.gaodun.com/Booking/index?project_id='+eventbook.project_id+'" target="_blank"> --><!-- </a> -->
                    <a :data-info="eventbook.project_id" :href="'//' + pre + 'v.gaodun.com/Booking/index?project_id=' + eventbook.project_id " target="_blank">{{eventbook.project_name}}</a>
                </template>
                
            </div>
        </div>
        <!-- End 预约私教 -->
    </div>
</template>
<style>
</style>
<script>
    import axios from 'axios';
    import {getEnv,getBaseUrl} from '../../util/config';
    // import {getCheckBook} from '../../api/home';

    // var instance = axios.create({
    //     baseURL: getBaseUrl(),
    // });

    //私教预约
    //const getCheckBook = params => instance.post( '/class/ajaxCheckIsBooking',params);
    export default {
        data(){
            return {
                isshowapp:false,
                isshowwechat:false,
                pre: getEnv(),
                booklist:[],
                bookicon:true,
                bookclose:false,
            }
        },
        methods : {
            appShow () {
                this.isshowapp = !this.isshowapp
            },
            appHide () {
                this.isshowapp = !this.isshowapp
            },
            wechatShow () {
                this.isshowwechat = !this.isshowwechat
            },
            wechatHide () {
                this.isshowwechat = !this.isshowwechat
            },
            async checkbook(){
                //let ret = await getCheckBook();
                // if (ret.status == 1) {
                //     if (ret.data.booking_nums.length >= 1) {
                //         this.bookicon = true;
                //         console.log(ret.data.booking_nums);
                //         this.booklist = ret.data.booking_nums;
                //     }else{
                //         this.bookicon = false;
                //     }
                // }

                this.$store.dispatch('getbook').then(() => {
                    
                });
            },
            getqrcode(){
                this.$store.dispatch('getqrcode').then(() => {
                    
                });
            },
            getbooklist(){
                this.bookclose=true;
            },
            clbook(){
                this.bookclose=false;
            }
        },
        created(){
            this.checkbook();
            this.getqrcode();
        }
    }
</script>
