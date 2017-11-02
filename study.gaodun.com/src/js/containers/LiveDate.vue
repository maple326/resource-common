<template>
    <div class="milbox">
        <div class="livedatetit">全部我的直播</div>
        <div class="canner">
            <span class="datehas"><b></b>当日有直播</span>
            <vue-event-calendar :events="events" @day-changed="changeDay" @month-changed="changeMonth" :current="selectedDay" :startDate="selectedDay">
                <template scope="props">
                    <span class="datenum">共 <b>{{selectedDayEvents.length}}</b> 场直播</span>
                    <div class="databox">
                        <template v-if="liveshow">
                            <div class="liveload">
                                <div class="spinner">
                                    <div class="spinner-container container1">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container2">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                    <div class="spinner-container container3">
                                        <div class="circle1"></div>
                                        <div class="circle2"></div>
                                        <div class="circle3"></div>
                                        <div class="circle4"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-if="!liveshow">
                            <div class="dataline" v-if="selectedDayEvents.length"></div>

                            <div v-if="selectedDayEvents.length" v-for="(event, index) in selectedDayEvents" class="data-item">
                                <p class="datatime">{{event.start_hour}} - {{event.end_hour}}</p>
                                <p class="dataname">
                                    <!-- <span v-if="event.status == '1'">{{event.title}}</span>
                                    <a :href="event.path" target="_blank" v-else>{{event.title}}</a> -->
                                    <a :href="event.path" target="_blank">{{event.title}}</a>
                                </p>
                                <p class="datastatus">
                                    <a :href="event.path" target="_blank" class="livebtn already" v-if="event.status == '4'">查看详情</a>
                                    <span class="livebtn noback" v-else-if="event.status == '1'">暂无回放</span>
                                    <a :href="event.url" target="_blank" class="livebtn golack" v-else-if="event.status == '3'">去上课</a>
                                    <a :href="event.url" target="_blank" class="livebtn backlock" v-else-if="event.status == '2'">看回放</a>

                                    <span class="goclw" v-if="event.status == '3'">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </span>
                                </p>
                            </div>
                            <template v-if="!selectedDayEvents.length">
                                <div class="nulllive">今日无直播<br/>休息一下吧</div>
                            </template>
                        </template>
                    </div>
                </template>
            </vue-event-calendar>
            <div class="morelive">
                <a :href="'//' + pre +'zhibo.gaodun.com'" target="_blank" class="moreurl"><span>查看更多网校直播</span></a>
            </div>
        </div>
    </div>

    <!-- <div v-for="(event, index) in $store.state.home.livedate">
        {{event.date}}
    </div> -->
</template>
<script>
    import Vue from 'vue';
    import base from 'base';
    import '../plugins/vue-event-calendar/dist/style.css'
    import {getChannel, getMyLive} from '../api/home';
    import vueEventCalendar from '../plugins/vue-event-calendar';
    import {getEnv} from '../util/config';
    Vue.use(vueEventCalendar, {locale: 'zh', color: ' #f29543', className: 'iseventlive'}); //可以设置语言，支持中文和英文
    export default {
        components: {},
        data(){
            return {
                events: [],
                dateStr: base.formatDate(new Date, 'yyyy/MM/dd').format,
                selectedDay: base.formatDate(new Date, 'yyyy/MM/dd').format,
                selectedDayEvents:[],
                eventsGroup: {},
                pre:getEnv(),
                liveshow:true
            }
        },
        computed: {},
        mounted(){
            this.getLive();
        },
        methods: {
            getLive() {
                getMyLive({"date": this.dateStr}).then(ret => {
                    let {result} = ret;
                    result = result || [];
                    for (let i in result) {
                        result[i].start_time *= 1000;
                        result[i].end_time *= 1000;
                        this.buildEventsGroup(result[i]);
                    }
                    this.events = ret.result || [];
                    this.initSelectDate(this.events);
                    this.liveshow = false;
                });
            },
            changeDay(date){
                let newDate = new Date(date.date);
                this.selectedDay = date.date;
                this.selectedDayEvents = this.eventsGroup[base.formatDate(newDate,'yyyy/MM/dd').format] || [];
            },
            buildEventsGroup(data) {
                let key = base.formatDate(new Date(data.start_time), 'yyyy/MM/dd').format;
                this.eventsGroup[key] = this.eventsGroup[key] || [];
                this.eventsGroup[key].push(data);
            },
            changeMonth(month){
                /*getMyLive({"date": month}).then(ret => {
                 this.demoEvents = ret.result;
                 });*/
            },
            // 默认选中当月第一条数据
            initSelectDate(data) {
                for(let o of this.events){
                    let oDate = base.formatDate(new Date(o.start_time),'yyyyMMdd').format;
                    let currentDate = base.formatDate(new Date,'yyyyMMdd').format;
                    if(oDate == currentDate){
                        this.selectedDay = base.formatDate(new Date(o.start_time),'yyyy/MM/dd').format;
                        this.initSelectDateEvents(this.selectedDay);
                        break;
                    }

                }
            },
            initSelectDateEvents(date) { //
                this.selectedDayEvents = this.eventsGroup[date];
            }

        }
    }
</script>
