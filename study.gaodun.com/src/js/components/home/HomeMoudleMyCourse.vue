<template>
    <div class="todaylive">
        <template v-if="nullcourselist">
            <div class="nullcourselist"></div>
        </template>

        <template v-if="!nullcourselist">
            <div class="livetit">
                <span class="mycourse">我的课程</span>
                <span class="courselist">
           			<span class="coursetab mycourselist" :class="{'current':selectMyClass}" @click="mycourselist()">我的课程</span>|<span class="coursetab remmlist" :class="{'current':!selectMyClass}" @click="remmlist()">为我推荐</span>
           		</span>
            </div>
            <div class="coursepane">
                <!--新手引导动画 -->
                <transition name="fadeUP">
                    <div class="guide" v-show='$store.state.home.bGuide'>
                        <div class="triangle2"></div>
                        <span>
                            <i>2</i>
                        </span>
                        <p>点击"开始学习"<br/>马上进入学习页面！</p>
                   </div>
                </transition>
                <div class="courseall" v-if="selectMyClass" >
                    <template v-if="allCourse.length > 0">
                        <div class="coursebox" v-for="(ev,index) in allCourse">
                            <template v-if="ev.is_big == true">
                                <div class="coursemin">
                                    <div class="courseimg">
                                        <template v-if="ev.ware_status == 2">
                                            <template v-if="ev.link === underfind">
                                                <img :src='ev.cover' @error="getImageUrl">
                                                <div class="coursebg"></div>
                                                <span class="courseurl" @click="toggle(ev)">{{ev.show ? "收起课程" : "展开课程"}}</span>
                                            </template>
                                            <template v-else>
                                                <img :src='ev.cover' @error="getImageUrl">
                                                <div class="coursebg"></div>
                                                <span class="courseurl notstudy" @click="emcourse">开始学习</span>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <template v-if="ev.link === underfind">
                                                <img :src='ev.cover' @error="getImageUrl">
                                                <div class="coursebg"></div>
                                                <template v-if="ev.is_audition_course == 1">
                                                    <a :href="ev.link" class="courseurl" v-if="finished_course > 0">开始试学</a>
                                                </template>
                                                <template v-else>
                                                    <a :href="ev.currentStudyUrl" class="courseurl" v-if="finished_course > 0">继续学习</a>
                                                    <span class="courseurl" @click="toggle(ev)" v-else>{{ev.show ? "收起课程" : "展开课程"}}</span>
                                                </template>
                                            </template>
                                            <template v-else>
                                                <a :href="ev.link">
                                                    <img :src='ev.cover' @error="getImageUrl">
                                                    <div class="coursebg"></div>
                                                </a>
                                                <template v-if="ev.is_audition_course == 1">
                                                    <a :href="ev.link" class="courseurl" v-if="finished_course > 0">开始试学</a>
                                                </template>
                                                <template v-else>
                                                    <a :href="ev.link" class="courseurl" v-if="finished_course > 0">继续学习</a>
                                                    <a :href="ev.link" class="courseurl" v-else>开始学习</a>
                                                </template>
                                            </template>
                                        </template>

                                        <!-- <span class="pointupdate" v-if="ev.ware_status == 2">即将更新</span>
                                        <span class="updatemin" v-if="ev.ware_status == 1">更新中...</span> -->

                                        <p class="coursebill">剩余学习时间 {{ev.left_days}} 天</p>
                                    </div>
                                    <div class="coursergt">
                                        <div class="coursename">
                                            <template v-if="ev.ware_status == 2">
                                                <span class="namecourse nullcourse" @click="emcourse">{{ev.name}}</span>
                                            </template>
                                            <template v-else>
                                                <span class="namecourse" v-if="ev.link === underfind">{{ev.name}}</span>
                                                <span class="namecourse" v-else><a :href="ev.link">{{ev.name}}</a></span>
                                            </template>
                                            <span class="coursetype bigclass">大包</span>
                                            <span class="listen" v-if="ev.is_audition_course == 1">试学</span>
                                        </div>
                                        <template v-if="ev.link === underfind">
                                            <div class="coursebig bigfill"><!-- 还没开始学习，马上开始吧~ -->
                                                <template v-if="ev.finished_course > 0">
                                                    <span class="cbiglft">上次学习位置：</span><span class="cbigrgt">
                                                        <template v-if="ev.ware_status == 2">
                                                            <span class="warecur" @click="emcourse">{{ev.currentStudySubject}}</span>
                                                        </template>
                                                        <template v-else>
                                                            <template v-if="ev.appoint_type == 1">
                                                                <a @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)">{{ev.currentStudySubject}}</a>
                                                            </template>
                                                            <template>
                                                                <a :href="ev.currentStudyUrl">{{ev.currentStudySubject}}</a>
                                                            </template>
                                                        </template>
        						       				</span>
                                                </template>
                                                <template v-else>
                                                    还没开始学习，马上开始吧~
                                                </template>
                                            </div>
                                            <div class="studytimenum">
                                                <span class="studytime">内含 <b>{{ev.children.length}}</b> 个小课程</span>
                                                <span class="studyfinsh">已完成 <b>{{ev.finished_course}}</b> 个</span>
                                                |
                                                <span class="studynumbig">学习 <b>{{ev.learning_course}}</b> 个</span>
                                                |
                                                <span class="studymerbig">未学 <b>{{ev.not_start_course}}</b> 个</span>

                                                <span class="bigall" :class="{bold:isFolder}" @click="toggle(ev)"><!-- {{seenmsg}} -->{{ev.show ? "收起课程" : "展开课程"}}</span>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <template v-if="ev.link === underfind">
                                    <div class="bigcoursesmall" v-show="ev.show">
                                        <div class="coursesmalltit">
                                            {{ev.name}} - 共 {{ev.children.length}} 科
                                            <span class="updateorder" @mouseover="showtip(ev)" @mouseout="showtip(ev)">调整顺序</span>
                                            <span class="wotip" v-show="ev.bitip">上下拖动即可调整课程学习顺序</span>
                                        </div>
                                        <div class="coursesmallbox">
                                            <draggable v-model="ev.children" :options="{group:'people'}" element="div" @end="dragEnd(ev,ev.children)">
                                                <div class="smallitem" v-for="(smevent,indexkk) in ev.children">
                                                    <span class="smallspace smallmil1">{{indexkk + 1}}</span>
                                                    <span class="smallspace smalltit">
                                                        <template v-if="smevent.ware_status == 2">
                                                            <span class="smalltype uptype" @click="emcourse">即将更新</span>
                                                            <span class="upses" @click="emcourse">{{smevent.name}}</span>
                                                        </template>
                                                        <template v-if="smevent.ware_status == 1 || smevent.ware_status == 0">
                                                            <span class="smalltype nong" v-if="smevent.ware_status == 1">更新中...</span>
                                                            <template v-if="smevent.appoint_type == 1 && smevent.ware_status != 1">
                                                                <a @click="pointstudy(smevent.id,smevent.course_type,smevent.start_date,smevent.end_date,ev.cycle)">{{smevent.name}}</a>
                                                            </template>
                                                            <template v-else>
                                                                <a :href="smevent.link">{{smevent.name}}</a>
                                                            </template>
                                                            
                                                        </template>
                                                    </span>
                                                    <span class="smallspace smallline">
                                                        <span class="linetab">
                                                            <span class="linehover" :style="{width:smevent.progress +'%'}"></span>
                                                        </span>
                                                        <span class="linesize">{{smevent.progress}}%</span>
                                                    </span>
                                                    <template v-if="smevent.ware_status == 2">
                                                        <span class="smallspace smallbtn" @click="emcourse">开始本课</span>
                                                    </template>
                                                    <template v-else>
                                                        <template v-if="smevent.appoint_type == 1">
                                                            <a class="smallspace smallbtn listengo" v-if="smevent.progress > 0" @click="pointstudy(smevent.id,smevent.course_type,smevent.start_date,smevent.end_date,smevent.cycle)">继续学习</a>
                                                            <a class="smallspace smallbtn" @click="pointstudy(smevent.id,smevent.course_type,smevent.start_date,smevent.end_date,smevent.cycle)" v-else>开始本课</a>
                                                        </template>
                                                        <template v-else>
                                                            <a :href="smevent.currentStudyUrl" class="smallspace smallbtn listengo" v-if="smevent.progress > 0">继续学习</a>
                                                            <a :href="smevent.link" class="smallspace smallbtn" v-else>开始本课</a>
                                                        </template>
                                                    </template>
                                                </div>
                                            </draggable>

                                        </div>
                                    </div>
                                </template>
                            </template>

                            <template v-if="ev.is_big == false">
                                <div class="courseimg" :data-info="ev.id">
                                    <template v-if="ev.ware_status == 2">
                                        <img :src="ev.cover" @error="getImageUrl">
                                        <span class="courseurl notstudy" @click="emcourse">开始学习</span>
                                        <div class="coursebg"></div>
                                    </template>
                                    <template v-else>
                                        <template v-if="ev.progress > 0">
                                            <template v-if="ev.appoint_type == 1">
                                                <img :src="ev.cover" @error="getImageUrl">
                                                <a class="courseurl" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)" v-if="ev.is_audition_course == 1">开始试学</a>
                                                <a class="courseurl" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)" v-else>继续学习</a>
                                                <div class="coursebg" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)"></div>
                                            </template>
                                            <template v-else>
                                                <a :href="ev.currentStudyUrl">
                                                    <img :src="ev.cover" @error="getImageUrl">
                                                    <a :href="ev.link" class="courseurl" v-if="ev.is_audition_course == 1">开始试学</a>
                                                    <a :href="ev.currentStudyUrl" class="courseurl" v-else>继续学习</a>
                                                    <div class="coursebg"></div>
                                                </a>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <template v-if="ev.appoint_type == 1">
                                                <img :src="ev.cover" @error="getImageUrl">
                                                <a class="courseurl" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)">开始学习</a>
                                                <div class="coursebg" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)"></div>
                                            </template>
                                            <template v-else>
                                                <a :href="ev.link">
                                                    <img :src="ev.cover" @error="getImageUrl">
                                                    <a :href="ev.link" class="courseurl ">开始学习</a>
                                                    <div class="coursebg"></div>
                                                </a>
                                            </template>
                                        </template>
                                    </template>
                                    <p class="coursebill">剩余学习时间 {{ev.left_days}} 天</p>
                                    <span class="pointupdate" v-if="ev.ware_status == 2">即将更新</span>
                                    <span class="updatemin" v-if="ev.ware_status == 1">更新中...</span>
                                </div>
                                <div class="coursergt">
                                    <div class="coursename">
                                        <template v-if="ev.ware_status != 2">
                                            <template v-if="ev.appoint_type == 1">
                                                <a class="namecourse" @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)">{{ev.name}}</a>
                                            </template>
                                            <template v-else>
                                                <a :href="ev.link" class="namecourse">{{ev.name}}</a>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <span class="namecourse nullcourse" @click="emcourse">{{ev.name}}</span>
                                        </template>
                                        <span class="coursetype epicon" v-if="ev.course_type == 3">EP</span>
                                        <span class="coursetype bettercl" v-if="ev.course_type == 1 || ev.course_type == 2">任务制</span>
                                        <span class="coursetype gliveicon" v-if="ev.course_type == 4">Glive</span>
                                        <!-- <span class="coursetype smartsch" v-if="ev.course_type == ">smart school</span> -->
                                        <span class="listen" v-if="ev.is_audition_course == 1">试学</span>
                                    </div>
                                    <div class="courseline">
    				       				<span class="studyline">
    					       				<span class="studyalready" :style="{width:ev.progress +'%'}"></span>
    					       			</span>
                                        <span class="pross">{{ev.progress ? ev.progress : 0}}%</span>
                                    </div>
                                    <div class="coursemib">
                                        <template v-if="ev.progress > 0">上次学习位置：
                                            <template v-if="ev.ware_status == 2">
                                                <span class="warecur" @click="emcourse">{{ev.currentStudySubject}}</span>
                                            </template>
                                            <template v-else>
                                                <template v-if="ev.appoint_type == 1">
                                                    <a @click="pointstudy(ev.id,ev.course_type,ev.start_date,ev.end_date,ev.cycle)">{{ev.currentStudySubject}}</a>
                                                </template>
                                                <template v-else>
                                                    <a :href="ev.currentStudyUrl">{{ev.currentStudySubject}}</a>
                                                </template>
                                            </template>
                                            
                                        </template>
                                        <template v-else>
                                            还没开始学习，马上开始吧~
                                        </template>
                                    </div>
                                    <div class="studytimenum">
                                        <span class="studytime" v-if="ev.course_type==4">已完成 <b>第{{ev.finishedChapter}}节</b>/{{ev.allChapter}} 节</span>
                                        <span class="studytime" v-else>已完成 <b>{{ev.finishedChapter}}</b>/{{ev.allChapter}} 章节</span>
                                        <!-- |
                                        <span class="studynum">班级学员数 <b>{{ev.student_num}}</b> 人</span> -->
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>

                    <div class="recommentnull" v-else>
                        <div class="recomm">暂无我的课程哦~快去选课中心看看吧！</div>
                        <div class="recombot"><a :href="'//' + pre + 'v.gaodun.com/course'" target="_blank">选课中心</a></div>
                    </div>
                </div>
                <div class="recomment" v-if="!selectMyClass">
                    <div class="recommentlist" v-if="remment.length > 0">
                        <div class="u-c-courseBlo" v-for="(recommevent,index) in remment" v-if="index < 3">
                            <a :href="recommevent.buy_link">
                                <div class="d-pic">
                                    <img class="lazy" width="240" height="150" :src="recommevent.cover" @error="getImageUrl" style="display: inline;">
                                </div>
                                <div class="d-border-w">
                                    <div class="d-tit">{{recommevent.name}}</div>
                                    <div class="m-cLst-mgs">
                                        <span class="d-price"><i>¥</i>{{recommevent.real_price}}</span>
                                        <span class="d-tag" v-if="recommevent.discount < 10"><i class="d-sale">{{recommevent.discount}}折</i></span>
                                    </div>
                                    <div class="d-tip">
                                        已有{{recommevent.students_num}}人买过
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!-- <span class="morecourse" v-if="$store.state.home.recommend.length >= 3">更多></span> -->
                    </div>
                    <div class="recommentnull" v-else>
                        <div class="recomm">暂无推荐课程哦~快去选课中心看看吧！</div>
                        <div class="recombot"><a :href="'//' + pre + 'v.gaodun.com/course'" target="_blank">选课中心</a></div>
                    </div>
                </div>

                <div class="notbg" v-if="showcourse"></div>
                <div class="notcourse" v-if="showcourse">
                    <div class="cofont">老师正在加紧制作课程<br/>请耐心等待~</div>
                    <div class="cobtn"><span class="coclose" @click="notaleardy">我知道了</span></div>
                </div>
                <!-- Begin 开课确认 -->
                <div class="delaybg" v-show="appoint_typeshow"></div>
                <div class="delaycourse" v-show="appoint_typeshow">
                    <div class="delaytit">开课确认</div>
                    <div class="delaybox">
                        <div class="delayp1">您确定现在开始学习本课吗？<br/>课程有效期{{cycle}}个月，从当前时间开始计算哦。</div>
                        <div class="delaytime">课程时间：{{startdate}} 至 {{enddate}}</div>
                        <div class="delaybtm">
                            <span class="delaywri deixt" @click="appoint_typeclose">我再想想</span>
                            <!-- <span class="delaywri okeixt" @click="appoint_typeok">马上学习</span> -->
                            <span class="delaywri okeixt" @click="appoint_typeok">马上学习</span>
                            <!-- <a :href="'//'+pre+'v.gaodun.com/task/'+ courseid" @click="appoint_typeurl"></a> -->
                        </div>
                        <div class="delaycm">请您合理安排时间，建议您同一时间不要开通多门课程哦！</div>
                    </div>
                </div>
                <!-- End 开课确认 -->

            </div>
        </template>
    </div>
</template>
<style>
</style>
<script>
    import draggable from 'vuedraggable';
    import {sort,getStartStudy} from '../../api/home';
    import {getEnv} from '../../util/config';

    export default {
        name: 'index',
        components: {
            draggable,
        },
        data(){
            return {
                selectMyClass: true,
                seenmsg: "展开课程",
                isshow: false,
                open: true,
                nullcourselist:true,
                showcourse:false,
                pre:getEnv(),
                appoint_typeshow:false,
                courseid:'',
                course_type:'',
                startdate:'',
                enddate:'',
                cycle:''
            }
        },
        mounted(){
            
        },
        computed: {
            remment(){
                return this.$store.state.home.recommend
            },
            allCourse(){
                if (this.$store.state.home.course_list.length > 0) {
                    this.selectMyClass = true;
                } else {
                    this.selectMyClass = false;
                }
                return this.$store.state.home.course_list
            },
        },
        async created(){
            this.remmover();
        },
        watch: {
            allCourse(){
                this.nullcourselist = false;
            }
        },
        methods: {
            mycourselist(){
                this.selectMyClass = true;
            },
            remmlist(){
                this.selectMyClass = false;
            },
            remmover(){
                this.$store.dispatch('recommended').then(() => {

                })
            },
            toggle: function (isshow) {
                //this.seenmsg:"收起课程"
                isshow.show = !isshow.show;
            },
            showtip(bitip){
                bitip.bitip = !bitip.bitip;
            },
            getImageUrl(data) {
                data.currentTarget.src = '//'+this.pre+'simg01.gaodunwangxiao.com/v/Uploads/Course/default.jpg'
            },
            async dragEnd(pkg, data) {
                let {pkgId, cids} = this.getSortData(pkg, data);
                let ret = await sort(`/spaceapi/package/${pkgId}/change/sort`,{
                    course_id_list: cids
                });
                console.log(ret);
            },
            getSortData(pkg, data) {
                let cids = [];
                for (let value of data) {
                    cids.push(value.id);
                }
                return {pkgId: pkg.id, cids}
            },
            emcourse(){
                this.showcourse = true;
            },
            notaleardy(){
                this.showcourse = false;
            },
            pointstudy(courseid,course_type,startdate,enddate,cycle){
                //延迟排课
                this.appoint_typeshow = !this.appoint_typeshow;
                this.courseid = courseid;
                this.course_type = course_type;
                this.startdate = startdate;
                this.enddate = enddate;
                this.cycle = cycle;
            },
            async appoint_typeok(){
                let rets = await getStartStudy({
                    course_id:this.courseid.toString()
                });
                console.log(rets.status);
                if(rets.status == 1){
                    if(this.course_type == 2){
                        window.location.href = "//" + this.pre+"v.gaodun.com/task/"+this.courseid;
                    }else{
                        window.location.href = "//" + this.pre+"v.gaodun.com/class/"+this.courseid;
                    }
                }
            },
            appoint_typeclose(){
                this.appoint_typeshow = !this.appoint_typeshow;
            }
        }
    }
</script>
