<template>
    <div class="todaylive" v-if="showModal">
        <div class="spbg"></div>
        <div class="spbox">
            <div class="spane" v-if="!isNewUser">
                <div class="spacetop"></div>
                <div class="spacom">
                    <span class="spaicon sp1"></span>
                    <span class="spaicon sp2"></span>
                    <span class="spaicon sp3"></span>
                </div>
                <div class="spabtn">
                    <input type="button" class="libtn" value="立即进入" name="">
                </div>
            </div>
            <div v-if="isNewUser">
                <div class="spane" v-if="showCareerModal">
                    <div class="spline"></div>
                    <div class="spatit">
                        <p class="pp1">欢迎来到高顿网校</p>
                        <p class="pp2">我们将根据您的目标为您推荐最好的课程</p>
                        <p class="pp3">您现在的职业？</p>
                    </div>

                    <div class="sptab">
                        <span :class="echoClassName(o.name)" v-for="o in survey"
                              @click="setCareerId(o)">{{o.name}}</span>
                    </div>
                    <div class="spjon"><span class="mitpoint current"></span><span class="mitpoint"></span></div>
                </div>

                <div class="spane" v-if="showGoalModal">
                    <div class="spline"></div>
                    <div class="spatit">
                        <p class="pp1">您近期的目标是什么？</p>
                        <p class="pp2">最多可挑选三个近期目标</p>
                    </div>
                    <div class="sptab">
                        <div class="spbbdrop">
                            <span :class="'sppmib'+echoGoalClass(o)" v-for="o in goal"
                                  @click="setGoalId(o)">{{o.name}}</span>
                        </div>
                        <div class="spboxinfo" v-if="direction.length">
                            <span :class="'smallsp '+ echoCurrentClass(o)" v-for="o in direction"
                                  @click="setDirectionId(o)">{{o.name}}</span>
                        </div>
                    </div>
                    <div class="spmess" v-if="selectDirectionItem.length">
                        已选择 <span class="messdt" v-for="o in selectDirectionItem" @click="removeSelectDirection(o)">{{o.name}}</span>
                    </div>

                    <div class="spjon">
                        <span class="spjonlft" @click="goPre()">上一步</span>
                        <span class="spjonpiont"><span class="mitpoint"></span><span
                                class="mitpoint current"></span></span>
                        <span class="spjonrgt" @click="saveSurvey">完成</span>
                    </div>
                </div>
            </div>


            <div class="spane" style="display:none;">
                <div class="spline"></div>
                <div class="spatit">
                    <p class="pp1">正在为您选择最优课程</p>
                    <p class="pp2">选择结束自动添加至学习空间</p>
                </div>
                <div class="spaneloading">
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
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import {verify, getSurvey, saveSurvey} from '../../api/home';
    export default {
        props: {},
        data(){
            return {
                careerId: 0,
                goalId: 0,
                directionId: 0,
                survey: [],
                goal: [],
                direction: [],
                selectDirection: [],
                selectDirectionItem: [],
                isNewUser: false,
                showCareerModal: false,
                showGoalModal: false,
                showDirection: false,
                showLoadingModal: false,
                showModal: false             // 弹层
            }
        },
        computed: {},
        methods: {
            async changeModalState(){
                let ret = await verify();
                if (ret.result.identity == 2) {
                    this.showModal = true;
                    this.isNewUser = true;
                    this.showCareerModal = true;
                }
            },
            async getSurvey() {
                let ret = await getSurvey();
                this.survey = ret.result.list_item;
            },
            echoClassName(name) {
                let className = '';
                switch (name) {
                    case '在校生':
                        className = 'spitem spbt1';
                        break;
                    case '上班族':
                        className = 'spitem spbt2';
                        break;
                    default:
                        className = 'spitem spbt3';
                        break;
                }
                return className;
            },
            setCareerId({id, children}){
                this.careerId = id;
                this.showCareerModal = false;
                this.showGoalModal = true;
                this.setGoal(children)
            },
            setGoal(data){
                this.goal = data;
            },
            setGoalId({id, children}){
                this.goalId = id;
                this.setDirection(children);
            },
            echoGoalClass({id}){
                if (this.goalId == id) {
                    return ' current';
                }
                return ' ';
            },
            setDirection(data){
                this.direction = data;
            },
            setDirectionId(o){
                let {id} = o;
                let index = this.selectDirection.indexOf(id);
                if (index > -1 || this.selectDirection.length === 3) {
                    return;
                }
                this.selectDirection.push(id);
                this.selectDirectionItem.push(o);
            },
            echoCurrentClass({id}){
                if (this.selectDirection.indexOf(id) > -1) {
                    return 'current'
                }
                return '';
            },
            removeSelectDirection({id}){
                let index = this.selectDirection.indexOf(id);
                this.selectDirection.splice(index, 1);
                this.selectDirectionItem.splice(index, 1);
            },
            goPre(){
                this.showCareerModal = true;
                this.showGoalModal = false;
            },
            async saveSurvey() {
                this.showCareerModal = false;
                this.showGoalModal = false;
                this.showLoadingModal = true;
                let ret = await saveSurvey({
                    career:this.careerId,
                    goal: this.goalId,
                    direction: this.selectDirection
                });
                this.showModal = false;
                /*if(ret && ret.status == 0){
                    this.$router.push({
                        path: '/index'
                    })
                }*/
            }
        },
        created(){
            this.changeModalState();
            this.getSurvey();
        }
    }
</script>
