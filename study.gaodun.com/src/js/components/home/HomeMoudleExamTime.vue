<template>
    <div class="courseset">
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
                    <el-date-picker clearable v-model="examTimeValue" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
                </p>
                <p class="tp1" v-else="datePickerIsShow">
                    <el-select clearable v-model="examDateSelectValue"  placeholder="选择日期">
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

        <div class="examll">
            <div class="examup" v-for="o in examTimeList">
                {{o.project_name}}-{{o.subject_name}}；考试时间：{{o.exam_date}}<span class="setbtn update" @click="editExam(o)"></span><span class="setbtn deldata" @click="deleteMyExamDate(o.id)"></span>
            </div>
        </div>
        <div class="addexam">
            <span class="exambtn" @click="addExam">添加考试时间</span>
        </div>
    </div>
</template>
<style>
</style>
<script>
    import {setMyExamDate, getMyExamProject, getMyExamSubject, getStudentExamDate, deleteMyExamDate, updateMyExamDate, getExamDateBySubjectId} from '../../api/home';
    export default {
        components: {},
        name: 'exam-time',
        data(){
            return {
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
                datePickerIsShow: true,               // 默认显示日历
                examDateSelect : [],                //
                examDateSelectValue: '',
                pickerOptions: {                    // 考试时间控件配置
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        methods: {
            async getStudentExamDate() {
                let sids = this.getIdsByName('subject');
                let ret = await getStudentExamDate({
                    subject_ids: sids
                });
                if (ret && ret.status === 0) {
                    this.examTimeList = ret.result.exam_date;
                }
            },
            async getMyExamProject() {
                let ids = this.getIdsByName('project');
                let ret = await getMyExamProject({
                    project_ids: ids
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
            /**
             *
             *
             * */
            changeExamSubject(value){
                if(value == ""){
                    return;
                }
                this.getExamDate(value);
            },
            getExamDate(subject_id) {
                return new Promise((resolve,reject)=>{
                    getExamDateBySubjectId({subject_id}).then(ret=>{    // 获取考试时间select列表
                        this.datePickerIsShow = ret.result.subject.is_assigned === 1 ? false : true;  // 显示列表或者时间控件
                        this.setExamDateSelect(ret.result.exam_dates);  // 设置时间select列表
                        resolve(ret)    // 编辑的时候回调用来设置时间值
                    });
                })
            },
            setExamDateSelect(options) {
                let opts = [];
                for(let value of options){
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
                try{
                    ret = this.beEditing ?

                        await updateMyExamDate({
                            project_id: this.examProjectValue,
                            subject_id: this.examSubjectValue,
                            exam_date: this.datePickerIsShow ? `${this.examTimeValue.getFullYear()}-${this.examTimeValue.getMonth() + 1}-${this.examTimeValue.getDate()}` : this.examDateSelectValue ,
                            id: this.beEditingExamId
                        }) :

                        await setMyExamDate({
                            project_id: this.examProjectValue,
                            subject_id: this.examSubjectValue,
                            exam_date: this.datePickerIsShow ? `${this.examTimeValue.getFullYear()}-${this.examTimeValue.getMonth() + 1}-${this.examTimeValue.getDate()}`  : this.examDateSelectValue
                        });
                }catch(e){

                }

                this.inTheSubmission = false;
                if (ret.status === 0) {
                    this.$message({
                        type: 'success',
                        message: this.beEditing ? '修改成功' : '添加成功'
                    });
                    this.showDialog = false;
                    this.getStudentExamDate();
                }
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
                            this.getStudentExamDate();
                        }
                    });
                })
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
                    this.getExamDate(examData.subject_id).then(ret=>{
                        if(ret.result.subject.is_assigned == 1){
                            this.examDateSelectValue = examData.exam_date;
                        }else{

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
                this.showDialog = true;
            }
        },
        computed: {
            course() {
                return this.$store.state.home.course_list;
            }
        },
        watch: {
            course() {
                this.getMyExamProject();
                this.getStudentExamDate();
            }
        },
        mounted(){

        },
    }
</script>
