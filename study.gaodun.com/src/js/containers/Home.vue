<template>
    <div>
        <div class="milbox">
            <div class="millft">
                
                <TodayLive></TodayLive>
                <MyCourse></MyCourse>
                <!-- 兴趣版块 -->
                <Hobbies></Hobbies>
                <!-- 欢迎弹层 -->
                <Welcome></Welcome>
            </div>
            <div class="milrgt">
                <PersonalInfo></PersonalInfo>
                <Statistics></Statistics>
            </div>
            <!-- <div class="spbg"></div>
            <div class="loading">
                <span class="loader-inner ball-spin-fade-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div> -->
            <div class="guide_shade" v-show="$store.state.home.bGuide"></div>
        </div>
    </div>

</template>
<script>
    import TodayLive from '../components/home/HomeMoudleTodayLive.vue';
    import MyCourse from '../components/home/HomeMoudleMyCourse.vue';
    import PersonalInfo from '../components/home/HomeMoudlePersonalInfo.vue';
    import Hobbies from '../components/home/HomeMoudleHobbies.vue';
    import Welcome from '../components/home/HomeMoudleWelcome.vue';
    import Statistics from '../components/home/HomeMoudleRadar.vue';

    import Guidance from '../components/home/HomeMoudleWelcome.vue';
    import {getChannel} from '../api/home';
    import VM from "../common/Vue.js"
    import '../../css/main.css';

    export default {
        components: {
            TodayLive,
            MyCourse,
            PersonalInfo,
            Hobbies,
            Welcome,
            Statistics,
        },
        data(){
            return {
                showWelcome: false,
	            timer:null
            }
        },
        computed:{},
        async created(){
           
        },
        mounted(){
            this.controlWelcomeModal();
             //新手引导动画显示隐藏
            let vfs;
            let rds;
            let nub;
            this.timer = setInterval(()=>{
                vfs = this.$store.state.home.verifyState;
                rds = this.$store.state.home.radarState;
                nub = this.$store.state.home.newUserBoot;
                if (vfs===3&&rds===true&&nub===false) {
                    let _this = this;
                    clearInterval(_this.timer);  
                    VM.$on("closeWel",function(){
                        _this.$nextTick(()=>{
                            _this.$store.dispatch("showGuide")
                            _this.timer = setTimeout(()=>{
                                _this.$store.dispatch("hideGuide");
                            },8000)
                        }) 
                    })
                }else if(vfs===2&&rds===true&&nub===false){
                    clearInterval(this.timer);
                    this.$nextTick(()=>{
                        this.$store.dispatch("showGuide")
                        this.timer = setTimeout(()=>{
                            this.$store.dispatch("hideGuide");
                        },8000)
                    }) 
                }else if(nub===true){
                    clearInterval(this.timer);
                }
            },500)
        },
        destroyed(){
            clearInterval(this.timer);
            this.$store.dispatch("save_user_boot","");   //清楚用户是否第一次进入的状态
        },
        methods: {
            controlWelcomeModal(){
                this.showWelcome = this.$route.query.welcome
            },
        }
    }
</script>