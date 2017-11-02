<template>

        <div :class="{'todaylive':true,'rectangle':true,'inDialog':true}">
            
            <div class="spbox">
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
                        已选择 <span class="messdt" title="点击取消选择" v-for="o in selectDirectionItem" @click="removeSelectDirection(o)">{{o.name}}</span>
                    </div>

                    <div class="spjon">
                        <span class="spjonlft" @click="goPre()">上一步</span>
                        <span class="spjonpiont"><span class="mitpoint"></span><span
                                class="mitpoint current"></span></span>
                        <span class="spjonrgt" @click="saveSurvey">完成</span>
                    </div>
                </div>


                <div class="spane" v-if="showLoadingModal">
                    <div class="spline"></div>
                    <div class="spatit" v-if="from">
                        <p class="pp1">正在保存您的近期目标</p>
                        <p class="pp2">目标要明确，信念要坚定。</p>
                    </div>
                    <div class="spatit" v-else>
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
    .inDialog.rectangle{
        position:static;
        background:none;
    }
    .inDialog .spbox{
        width:auto;
        position:static;
        -webkit-transform: translate(0,0);
        -moz-transform: translate(0,0);
        -ms-transform: translate(0,0);
        -o-transform: translate(0,0);
        transform: translate(0,0);
    }
    .inDialog .spbox .spline{
        display:none;
    }
    .inDialog .spbox .spatit{
        padding-top:0;
    }
</style>
<script>
    import {verify, getSurvey, saveSurvey} from '../api/home';
    import VM from '../common/Vue';
    export default {
        props: {
            inDialog: Boolean,
            closeCallback : Function,
            from: String
        },
        data(){
            return {
                inDlg: this.inDialog,
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
                showModal: false,             // 弹层
                showLoadingMsg:false,
            }
        },
        computed: {},
        methods: {
            async changeModalState(){
                let ret = await verify({verify:1});
                if (ret.result.identity == 1 || this.inDlg === true) {
                    this.showModal = true;
                    this.showCareerModal = true;
                    return;
                }
                this.$router.push({
                    path: '/',
                });
                location.reload();
            },
            async getSurvey() {
                let ret = await getSurvey();
                //this.reset(ret.result);
                if(ret.result.student_setting.career){
                     this.showLoadingMsg = true;
                }else {
                     this.showLoadingMsg = false;
                }
                this.survey = ret.result.list_item;
            },
            reset(result) {
                let {student_setting, list_item} = result;
                if (!this.inDlg) {
                    return;
                }
                this.showCareerModal = true;
                this.showGoalModal = false;
                this.careerId = student_setting.career;
                this.resetGoal(list_item, student_setting.career);
                this.resetDirection(student_setting.direction);
            },
            resetGoal(item, goal) {
                this.careerId = goal;
                let gl = goal.split(',');
                for (let i of gl) {
                    for (let v of item) {
                        if (v.id == i) {
                            this.goal = v.children;
                            return;
                        }
                    }
                }
            },
            resetDirection(direction) {
                this.selectDirection = direction.split(',');
                let dc = direction.split(',');
                let ar = [];
                for (let i of dc) {
                    for (let j of this.goal) {
                        for (let k of j.children) {
                            if (k.id == i) {
                                ar.push(k);
                                break;
                            }
                        }
                    }
                }
                this.selectDirectionItem = ar;
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
                // 清空
                this.selectDirectionItem = [];
                this.selectDirection = [];
                this.direction = [];

                this.setGoal(children)
            },
            setGoal(data){
                this.goal = data;
            },
            setGoalId({id, children}){
                this.goalId = id;
                this.setDirection(children);
            },
            /**
             * 根据课程ID反推目标IDS
             * @param directionIds 课程IDS
             * @returns {Array}
             */
            getGoalIds(directionIds = []) {
                let gids = [];
                for (let did of directionIds) {
                    for (let gItem of this.goal) {
                        if (gids.indexOf(gItem.id) > -1) {
                            continue;
                        }
                        for (let c of gItem.children) {
                            if (did === c.id) {
                                gids.push(gItem.id);
                            }
                        }
                    }
                }
                return gids;
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
                    this.$message({
                        message: '最多只能选择三个目标哦！',
                        type: 'warning'
                    });
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
            check(goal,direction){
                if(!goal.length || !direction.length){
                    return; false;
                }
                return true;
            },
            async saveSurvey() {
                let goal = this.getGoalIds(this.selectDirection);
                if(!this.check(goal,this.direction)){
                    this.$message({
                        type: 'warning',
                        message: '请选择您近期的目标'
                    })
                    return;
                }
                this.showCareerModal = false;
                this.showGoalModal = false;
                this.showLoadingModal = true;
                let ret = await saveSurvey({
                    career: this.careerId,
                    goal: goal.join(','),
                    direction: this.selectDirection.join(',')
                });
                this.showModal = false;
                this.showLoadingModal = false;
                if (ret && ret.status == 0) {
                    if(this.$route.path === '/guidance'){
                        this.$router.push({
                            path: '/'
                        });
                        location.reload();
                    }else{
                        this.showCareerModal = true;
                        this.showModal = true;
                        VM.$emit('closeDialog',false);
                    }
                }
            },
            async closeDialog(){
                this.showModal = false;
                if(this.$route.path == '/guidance'){
                    this.$router.push({
                        path: '/'
                    });
                    location.reload();
                }
            }
        },
        created(){
            this.changeModalState();
            this.getSurvey();
        },
    }
</script>
