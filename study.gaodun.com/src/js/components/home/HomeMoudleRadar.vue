<template>
    <div class="perbox">
        <template v-if="loadExam">
            <div class="nullexam"></div>
        </template>
        <!--<div v-if="!curseInfo && !loadExam">无数据</div>-->
        <div class="statistics" v-show="!loadExam">
            <div>
                <div class="statit"  v-show="diagnose_status == 2">
                    <span :class="{'calne':true,'calnelft':true,'disabled':this.num === 0}" @click="preCourse()" v-if="examTimeList.length > 1"></span>
                    <span class="subname" :title="curseInfo.project_name +'-'+ curseInfo.subject_name">{{curseInfo.project_name}} - {{curseInfo.subject_name}}</span>
                    <span :class="{'calne':true,'calnergt':true,'disabled':this.num === examTimeList.length - 1}" @click="nextCourse()" v-if="examTimeList.length > 1"></span>
                    <span class="setexamtime" @click="chetCourse">{{chartmif ? '设置' : '关闭'}}</span>
                </div>
                <el-dialog :visible.sync="showDialog" :title="beEditing ? '编辑考试': '添加考试'" size="tiny">
                    <div class="examitem">
                        <p class="tp1">
                            <el-select clearable v-model="examProjectValue" :loading="examProjectLoading" placeholder="你要参加什么考试" @change="changeExamProject">
                                <el-option v-for="item in examProject" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </p>
                        <p class="tp1">
                            <el-select clearable v-model="examSubjectValue" :loading="examSubjectLoading" placeholder="考试科目" :disabled="!examProjectValue" @change="changeExamSubject">
                                <el-option v-for="item in examSubject" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </p>
                        <p class="tp1" v-if="datePickerIsShow">
                            <el-date-picker clearable :disabled="disabledDate" v-model="examTimeValue" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                        </p>
                        <p class="tp1" v-else="datePickerIsShow">
                            <el-select clearable v-model="examDateSelectValue" :disabled="disabledDate" placeholder="选择日期">
                                <el-option
                                        v-for="item in examDateSelect"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </p>
                    </div>
                    <div class="saveset">
                        <el-button type="success" @click="saveExam" :loading="inTheSubmission">{{inTheSubmission ? '提交中...' : '保存设置'}}</el-button>
                    </div>
                </el-dialog>
                <div class="courseechart" v-show="chartmif">
                    <div class="statcom" v-show="diagnose_status == 2">
                        <div class="stascore"><span class="corepe"><b></b>距考试还有</span> <span class="coreday" v-for="i in coreday">{{i}}</span> 天</div>
                        <div class="chartexam">
                            <div v-show="curseInfo.is_passed ==0">
                                <div class="stascore"><span class="corepe"><b></b>学习诊断</span></div>
                                <div class="staechart" v-loading="loading" element-loading-customClass="text-green" element-loading-text="拼命加载中">
                                    <div id="main" style="width: 300px;height: 280px;margin:0 auto;"></div>
                                    <div class="statinfo" v-for="value in radarDescriptions">
                                        <p class="sta1">{{value}}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Begin 考试时间失效，课程未过期 -->
                            <div class="empchart" v-if="curseInfo.is_passed !=0">
                                <div class="emp1">倒计时失效啦~</div>
                                <div class="emp2">
                                    <span class="empkep" @click="adjustExam">调整一下</span>
                                    <span class="empdel" @click="deleteExam">删 除</span>
                                </div>
                            </div>
                            <!-- End 考试时间失效，课程未过期 -->
                        </div>
                    </div>
                    <!-- Begin 未付费用户 and 购买课程，但课程无考试 1,4-->
                    <div class="diagnose" v-if="diagnose_status == 1 || diagnose_status == 4">
                        <div class="diagtit">VIP尊享特权</div>
                        <div class="diapp1">
                            购买指定课程后<br/>可享每日考试提醒及学习诊断建议
                        </div>
                        <div class="diann">
                            <a href="//kf.gaodun.com/LR/Chatpre.aspx?id=KEV39534957&skid=23" class="diannose" target="_blank">升级到VIP</a>
                        </div>
                    </div>
                    <!-- End 未付费用户 and 购买课程，但课程无考试 -->

                    <!-- Begin 购买课程，但未设置考试时间 3 -->
                    <div class="diagnose" v-if="diagnose_status == 3">
                        <div class="diagtit">即刻享受<br/>专业学习诊断</div>
                        <div class="diapp2">
                            <span class="addscroe" @click="addExam">添加考试时间</span>
                        </div>
                    </div>
                    <!-- End 购买课程，但未设置考试时间 -->
                </div>
	            <!--新手引导动画3-->
                <transition name="fadeLeft">
    	            <div class="guide" v-show="$store.state.home.bGuide">
                        <div class="triangle3"></div>
                       <span>
                           <i>3</i>
                       </span>
                       <p>为你分析学习状况<br/>给予更精准的学习建议</p>
                   </div>
                </transition>   
            </div>

            <div class="courseset" v-show="!chartmif">
                <div class="examll">
                    <div class="examup" v-for="o in examTimeList">
                        <span class="exambox" :title="o.project_name+'-'+o.subject_name+'；考试时间：'+o.exam_date">{{o.project_name}}-{{o.subject_name}}；考试时间：{{o.exam_date}}</span>
                        <span class="setbtn update" @click="editExam(o)"></span>
                        <span class="setbtn deldata" @click="deleteMyExamDate(o.id)"></span>
                    </div>
                </div>
                <div class="addexam">
                    <span class="exambtn" @click="addExam">添加考试时间</span>
                </div>
            </div>
            <!--<exam-time v-show="!chartmif"></exam-time>-->
        </div>
    </div>
</template>
<style>
</style>
<script>
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/radar';
    import 'echarts/lib/chart/pie';
    import {getRadar, setMyExamDate, getMyExamProject, getMyExamSubject, getStudentExamDate, deleteMyExamDate, updateMyExamDate, getExamDateBySubjectId} from '../../api/home';
    import 'echarts/lib/component/tooltip';
    import ExamTime from './HomeMoudleExamTime.vue';
    export default {
        components: {
            ExamTime,
        },
        data(){
            return {
                diagnose_status: '',
                curseInfo: {},
                loadExam: true,
                loading: true,
                num: 0,
                chartmif: true,
                radarDescriptions: [],
                beEditing: false,                   // 是否正在编辑考试
                inTheSubmission: false,             // 提交中
                beEditingExamId: '',                // 正在编辑的考试ID
                showDialog: false,                  // 是否显示弹层
                examTimeList: [],                   // 考试时间列表
                examProject: [],                    // 考试项目列表
                examSubject: [],                    // 考试科目列表
                examProjectValue: '',               // 考试项目值
                examSubjectValue: '',               // 考试科目值
                examTimeValue: '',                  // 考试时间
                examProjectLoading: true,           // 正在加载考试项目列表
                examSubjectLoading: true,           // 正在加载考试科目列表
                datePickerIsShow: true,             // 默认显示日历
                examDateSelect: [],                // 日期select下拉option值
                examDateSelectValue: '',            // 下拉选择值
                disabledDate: true,                // 是否禁用日期选择
                pickerOptions: {                    // 考试时间控件配置
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        computed: {
            curseName() {
                if (this.$store.state.home.exam_date.length == 0) {
                    return '';
                }
                return this.$store.state.home.exam_date[this.num].subject_name;
            },
            exam(){
                return this.$store.state.home.exam_date;
            },
            coreday() {
                let {left_days} = this.curseInfo;
                if(left_days == undefined){
                    left_days = "???"
                }
                left_days = String(left_days).split('');
                return left_days
            },
            course() {
                return this.$store.state.home.course_list;
            }
        },
        watch: {
            exam(){
                //this.getRadarData()
                //this.loadExam = false;
            },
            course() {
                this.getMyExamProject();
                this.getStudentExamDate();
            }
        },
        async created(){
        },
        mounted(){
            this.charts = echarts.init(document.getElementById('main'))
        },
        methods: {
            //
            preCourse(){
                if (this.loading || this.num == 0) {
                    return;
                }
               /* if (this.num == 0) {
                    this.num = this.examTimeList.length - 1;
                } else {
                    this.num = this.num > 0 ? this.num - 1 : this.num;
                }*/
                this.num = this.num > 0 ? this.num - 1 : this.num;
                this.computedCourseInfo(this.num);
                this.getRadarData();
            },
            //
            nextCourse(){
                if (this.loading || this.num == this.examTimeList.length - 1) {
                    return;
                }
                let len = this.examTimeList.length;
                /*if (this.num == len - 1) {
                    this.num = 0;
                } else {
                    this.num = this.num < len - 1 ? this.num + 1 : this.num;
                }*/
                this.num = this.num < len - 1 ? this.num + 1 : this.num;
                this.computedCourseInfo(this.num);
                this.getRadarData();
            },
            //
            computedCourseInfo(num) {
                //this.curseInfo = this.$store.state.home.exam_date[num] || {};
                this.curseInfo = this.examTimeList[num] || {};
            },
            async getRadarData() {
                if (this.examTimeList.length > 0) {
                    let id = this.examTimeList[this.num].subject_id;
                    let is_passed = this.examTimeList[this.num].is_passed;
                    let url = `/spaceapi/subject/${id}/radar/index`;

                    this.loading = true;
                    let ret = await getRadar(url);
                    // console.log(ret);
                    // this.$store.dispatch('updateradar',true);   //保存雷达图已响应
                    this.loading = false;
                    if (is_passed == 1) {
                        return;
                    }
                    this.drawPie(ret);
                }
            },
            /**
             *
             * @param data
             * @returns {Array}
             */
            buildRadarOptions(data){
                let indicator = [];
                let value = [];
                let name = [];
                this.radarDescriptions = []; // 清空建议记录
                for (let o of data) {
                    indicator.push({
                        name: o.name,
                        max: 100
                    });
                    value.push(o.value);
                    name.push(o.name);
                    o.description && this.radarDescriptions.push(o.description);
                }
                return {indicator, value, name};
            },
            drawPie(data){
                let {indicator, value, name} = this.buildRadarOptions(data);
                this.charts.setOption({
                        title: {
                            text: '学习诊断'
                        },
                        tooltip: {
                            formatter(params, ticket, callback) {
                                let str = '';
                                let {data: {name, value}} = params;
                                let len = name.length;
                                for (let i = 0; i < len; i++) {
                                    str += `${name[i]}：${value[i]}%<br/>`
                                }
                                return str;
                            }
                        },
                        color: ['rgba(53,194,94,0.5)'],
                        legend: {
                            data: ['学习诊断']
                        },
                        radar: {
                            shape: 'circle',
                            name: {
                                textStyle: {
                                    color: 'gray',
                                    borderRadius: 3,
                                    padding: [3, 5]
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['rgba(255, 255, 255, 1)',
                                        'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)',
                                        'rgba(255, 255, 255, 1)'],
                                }
                            },
                            splitNumber: 4,
                            axisLine: {            // 坐标轴线
                                show: true,        // 默认显示，属性show控制显示与否
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'rgba(53,194,94,0.3)',
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: 'rgba(53,194,94,0.3)'
                                }
                            },
                            radius: 85,
                            indicator
                        },
                        series: [{
                            name: '学习诊断',
                            type: 'radar',
                            areaStyle: {normal: {}},

                            data: [

                                {
                                    value,
                                    name,
                                }
                            ]
                        }]
                    }
                )
            },
            chetCourse(){
                this.chartmif = !this.chartmif;
            },
            async getStudentExamDate() {
                let sids = this.getIdsByName('subject');
                let ret = await getStudentExamDate({
                    subject_ids: sids
                });
                if (ret && ret.status === 0) {
                    this.examTimeList = ret.result.exam_date || [];
                    this.diagnose_status = ret.result.diagnose_status;
                    this.computedCourseInfo(this.num);
                    this.getRadarData();
                    this.loadExam = false;
                    this.$store.dispatch("saveRadar");  //发送雷达数据回来的状态
                }
            },
            async getMyExamProject() {
                let ids = this.getIdsByName('project');
                let sids = this.getIdsByName('subject');
                let ret = await getMyExamProject({
                    project_ids: ids,
                    subject_ids: sids,
                });
                if (ret && ret.status === 0) {
                    this.examProjectLoading = false;
                    this.examSubjectLoading = true;
                    this.examSubjectValue = '';
                    this.setProject(ret.result.projects)
                }
            },
            getIdsByName(name) {
                let ar = [];
                let list = this.$store.state.home.course_list;
                for (let o of list) {
                    if(o.is_audition_course == 1){
                        break;
                    }
                    if(name === 'subject' && o.children && o.children.length > 0){
                        for(let p of o.children){
                            ar.push(p.subject.id);
                        }
                    }
                    ar.push(o[name].id);
                }

                return ar;
            },
            /**
             *
             * @param data {Object}
             */
            setProject(data) {
                let ar = [];
                for (let o of data) {
                    ar.push({
                        label: o.project_name,
                        value: o.project_id
                    })
                }
                this.examProject = ar;
            },
            changeExamProject(value) {
                this.examSubjectValue = '';
                this.examTimeValue = '';
                this.examDateSelectValue = '';
                this.disabledDate = true;
                if (value == "") {
                    return;
                }
                this.getMyExamSubject(value);
            },
            getMyExamSubject(project_id) {
                return new Promise((resolve, reject) => {
                    let ids = this.getIdsByName('subject');
                    getMyExamSubject({
                        project_id,
                        subject_ids: ids
                    }).then((ret) => {
                        if (ret && ret.status === 0) {
                            this.examSubjectLoading = false;
                            this.setSubject(ret.result.subject);
                            resolve(ret);
                        }
                    });
                });
            },
            /**
             *
             * @param data {Object}
             */
            setSubject(data) {
                let ar = [];
                for (let o of data) {
                    ar.push({
                        label: o.subject_name,
                        value: o.subject_id
                    })
                }
                this.examSubject = ar;
            },
            changeExamSubject(value){
                this.examTimeValue = '';
                this.examDateSelectValue = '';
                if (value == "") {
                    return;
                }
                this.getExamDate(value);
            },
            getExamDate(subject_id) {
                return new Promise((resolve, reject) => {
                    getExamDateBySubjectId({subject_id}).then(ret => {    // 获取考试时间select列表
                        this.datePickerIsShow = ret.result.subject.is_assigned === 1 ? false : true;  // 显示列表或者时间控件
                        if(!this.datePickerIsShow){
                            this.setExamDateSelect(ret.result.exam_dates);  // 设置时间select列表
                        }
                        this.disabledDate = false;
                        resolve(ret)    // 编辑的时候回调用来设置时间值
                    });
                })
            },
            setExamDateSelect(options) {
                let opts = [];
                for (let value of options) {
                    opts.push({
                        label: value.exam_date,
                        value: value.exam_date
                    })
                }
                this.examDateSelect = opts;
            },
            /**
             * 提交数据前验证
             * @returns {boolean}
             */
            checkExamData() {
                if (!this.examProjectValue) {
                    this.$message({
                        type: 'error',
                        message: '请选择你要参加的考试名称！'
                    });
                    return false;
                }
                if (!this.examSubjectValue) {
                    this.$message({
                        type: 'error',
                        message: '请选择你要参加的考试科目名称！'
                    });
                    return false;
                }
                /*if(this.datePickerIsShow && !this.examTimeValue){
                 this.$message({
                 type: 'error',
                 message: '请选择你要参加的考试时间！'
                 });
                 }else if(!this.datePickerIsShow && this.examDateSelectValue){

                 }*/
                if ((this.datePickerIsShow && !this.examTimeValue) || (!this.datePickerIsShow && !this.examDateSelectValue)) {
                    this.$message({
                        type: 'error',
                        message: '请选择你要参加的考试时间！'
                    });
                    return false;
                }
                return true;
            },
            async saveExam() {
                let ret = '';
                let bool = this.checkExamData();
                if (!bool) {
                    return;
                }
                this.inTheSubmission = true;
                try {
                    ret = this.beEditing ?

                        await updateMyExamDate({
                            project_id: this.examProjectValue,
                            subject_id: this.examSubjectValue,
                            exam_date: this.datePickerIsShow ? `${this.examTimeValue.getFullYear()}-${this.examTimeValue.getMonth() + 1}-${this.examTimeValue.getDate()}` : this.examDateSelectValue,
                            id: this.beEditingExamId
                        }) :

                        await setMyExamDate({
                            project_id: this.examProjectValue,
                            subject_id: this.examSubjectValue,
                            exam_date: this.datePickerIsShow ? `${this.examTimeValue.getFullYear()}-${this.examTimeValue.getMonth() + 1}-${this.examTimeValue.getDate()}` : this.examDateSelectValue
                        });
                } catch (e) {

                }

                this.inTheSubmission = false;
                if (ret.status === 0) {
                    this.$message({
                        type: 'success',
                        message: this.beEditing ? '修改成功' : '添加成功'
                    });
                    this.showDialog = false;
                    this.getStudentExamDate();
                }else{
                    this.$message({
                        type: 'warning',
                        message: '科目已存在！'
                    });
                }
            },
            deleteExam() {
                let o = this.examTimeList[this.num];
                this.deleteMyExamDate(o.id)
            },
            /**
             * 删除考试
             * @param id
             * @returns {Promise.<void>}
             */
            deleteMyExamDate(id) {
                this.$confirm('确定删除该科目的考试吗？删除后将无法查看该科目的倒计时及学习诊断。', '温馨提示', {
                    confirmButtonText: '确定',
                    confirmButtonClass: 'bg_green',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMyExamDate({
                        id,
                    }).then(ret => {
                        if (ret && ret.status === 0) {
                            this.num = 0;
                            this.getStudentExamDate();
                        }
                    });
                })
            },
            adjustExam() {
                let o = this.examTimeList[this.num];
                this.editExam(o);
            },
            /**
             *
             * @param examData {Object}
             */
            editExam(examData) {
                this.beEditing = true;
                this.beEditingExamId = examData.id;
                this.examProjectValue = examData.project_id;
                this.getMyExamSubject(examData.project_id).then(value => {
                    this.examSubjectValue = examData.subject_id;
                    this.getExamDate(examData.subject_id).then(ret => {
                        if (ret.result.subject.is_assigned == 1) {
                            this.examDateSelectValue = examData.exam_date;
                        } else {

                            this.examTimeValue = new Date(examData.exam_date);
                        }
                        this.showDialog = true;
                    })
                })
            },
            addExam(){
                this.beEditing = false;
                this.examProjectValue = '';
                this.examSubjectValue = '';
                this.examTimeValue = '';
                this.examDateSelectValue = '';
                this.showDialog = true;
                this.disabledDate = true;
            },
            upgradeToVip() {
                location.href = '//kf.gaodun.com/LR/Chatpre.aspx?id=KEV39534957&skid=23';
            }
        }
    }
</script>
