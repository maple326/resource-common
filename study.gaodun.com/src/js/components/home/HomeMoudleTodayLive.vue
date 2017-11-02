<template>
    <div class="todaylive">
        <template v-if="loading">
            <div class="livenullimg"></div>
        </template>
        <template v-if="!loading">
            <div class="livetit">
                <span class="liveimg">今日直播</span>
                <span class="livedata"><!-- 2017年09月19日 -->{{todycom}}</span>
                <!-- <a :href="[`/space/#/live`]" target="_blank" class="livedataicon">全部直播</a> -->
                <!-- <span class="livedataicon" @click="urlto">全部直播</span> -->
                <a href="#/live" target="_blank" class="livedataicon">全部直播</a>
	            <transition name="fadeRight">
		            <div class="guide" v-show="$store.state.home.bGuide">
                        <div class="triangle1"></div>
                        <span>
                            <i>1</i>
                        </span>
                        <p>直接进入今日直播<br/>不错过任何一场直播~</p>
                    </div> 
	            </transition>
            </div>
            <div class="livebox">
                <!-- End 预约 -->
                <div class="livemilbox">
                    <div class="livemiline"></div>
                    <template v-if="$store.state.home.today_live != '' && $store.state.home.today_live != null">
                        <template v-for="(event, index) in $store.state.home.today_live">
                            <div class="liveempty" v-if="event.show_type == 3">
                                <span class="showline"></span>
                                <span class="livenoinfo">您还没有预约过直播哦，以下是为您推荐的优质直播，快去预约吧~</span>
                            </div>
                            <div class="liveitem emptylive" v-if="event.show_type == 2 && $store.state.home.today_live.length == 1">
                                <span class="livemib">今日无直播</span>
                            </div>
                            <div class="liveitem">
                                <span class="livemib" v-if="event.show_type == 2">下一场直播</span>
                                <a :href="event.path" target="_blank" class="livename">
                                    <span class="livetime"><!-- 09-19 15:30-16:00 -->{{event.datemm}} {{event.starttimeo}}-{{event.endtimeo}}</span>
                                    <span class="liveline">|</span>
                                    <span class="teachname">{{event.teacher_name}}</span>
                                    <span class="classname">{{event.title}}</span>
                                </a>
                                <span class="goclw" v-if="event.status == '3'">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <a :href="event.path" target="_blank" class="livebtn already" v-if="event.status == '4'">查看详情</a>
                                <span class="livebtn noback" v-else-if="event.status == '1'">暂无回放</span>
                                <a :href="event.url" target="_blank" class="livebtn golack" v-else-if="event.status == '3'">去上课</a>
                                <a :href="event.url" target="_blank" class="livebtn backlock" v-else-if="event.status == '2'">看回放</a>
                                <a :href="event.path" target="_blank" class="livebtn golack" v-else>预约</a>
                            </div>
                        </template>
                    </template>
                    <template v-else>
                        <div class="liveitem emptylive">
                            <span class="livemib">今日无直播</span>
                        </div>
                    </template>
                </div>
                <!-- End 预约 -->
            </div>
        </template>
    </div>
</template>

<script>
    import base from 'base';
    export default {
        components: {},
        data(){
            return {
                //todaylivemou:[]
                todycom: base.formatDate(new Date,'yyyy年MM月dd日').format,
                loading:true,
            }
        },
        computed: {
            list(){
                return this.$store.state.home.today_live
            }
        },
        created(){
            
        },
        mounted(){
            this.getperson();
        },
        watch: {
            list(){
                this.loading = false;
            }
        },
        methods: {
            getperson() {
                this.$store.dispatch('getperson').then(() => {
                    
                });
            },
            urlto(){
                this.$router.push({ path: '/live' })
            }
        }
    }
</script>
