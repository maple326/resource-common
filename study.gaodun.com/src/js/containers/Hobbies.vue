<template>
    <div class="milbox">
        <el-dialog :visible.sync="showDialog" @close="closeDialog">
            <Guidance :inDialog="true" from="Hobbies"></Guidance>
        </el-dialog>

        <template v-if="showhbb">
            <div class="hobbisebg"></div>
        </template>
        <template v-if="!showhbb">
            <div class="hobber">
                <span class="bobt">你的近期目标</span>
                <span class="bono"
                      v-for="o in tag">{{o.name}}</span>
                <el-button type="success" class="sethob" title="设置" @click="showDialog = true"></el-button>
            </div>
            <div class="bobo">
                <div class="bobotit">
                    添加兴趣板块<span>对我感兴趣，想每天follow我？为我点亮红心吧~</span>
                </div>
                <div class="homit">
                    <div class="hobbiesitem"
                         v-for="o in data">
                        <div class="hobtit">
                            {{o.interest_name}}
                            <span :class="controlAttentionClass(o.is_interest)"
                                  @click="changeAttentionState(o)"
                                  :title="filterAttentionText(o.is_interest)">{{o.is_interest === 1 ? '已关注' : '未关注'}}</span>
                        </div>
                        <div class="hobpane">
                            <div class="hobconn">
                                <!-- {{o.course_title}}<br/> -->
                                <span :title="o.interest_remark" class="remark" v-html="o.interest_remark"></span>
                            </div>
                            <div class="hobpre"
                                 v-if="o.interest_num">
                                {{o.interest_num}}人感兴趣
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div class="bobosave">
            <a href="javascript:;"
               @click="goIndex">返回学习空间</a>
        </div>
    </div>
</template>
<script>
    import Guidance from '../components/GuidanceModuleDialog.vue';
    import VM from '../common/Vue';
    import {
        getAllInterest,
        changeAttention
    } from '../api/home';
    export default {
        data(){
            return {
                data: [],
                tag: [],
                ids:[],
                showDialog: false,
                showhbb:true
            }
        },
        components:{
            Guidance
        },
        created(){
            this.getAllInterest();
            VM.$on('closeDialog',(value)=>{
                this.showDialog = value;
                this.getAllInterest();
            })
        },
        methods: {
            closeDialog(){
                this.showDialog = false;
            },
            async getAllInterest() {
                let ret = await getAllInterest();
                this.data = ret.result;
                this.tag = ret.tag;
                this.showhbb = false;
            },
            goIndex() {
                this.$router.push({
                    path: '/'
                })
            },

            /**
             * 关注按钮的提示文字
             * @param bool
             * @returns {String} 提示文字
             */
            filterAttentionText(bool) {
                if (bool) {
                    return '点击取消关注'
                }
                return '点击关注'
            },
            /**
             * 关注、取消关注的按钮样式控制
             * @param bool {Boolean} 当前关注的状态
             * @returns {String} 样式名
             */
            controlAttentionClass(bool){
                if (bool) {
                    return 'hotmy hobconcern';
                }
                return 'hotmy noconcern';
            },
            async changeAttentionState(o) {
                let state = o.is_interest;
                o.is_interest = o.is_interest == 1 ? 0 : 1;
                let ret = await changeAttention({
                    section_id: o.id,
                    is_interest: state
                });
                if (ret && ret.status !== 0) {
                    this.getAllInterest();
                }
            },
            goGuidancePage() {
                this.$router.push({
                    path: '/guidance',
                    query: {
                        from: 'index'
                    }
                })
            }
        }
    }
</script>
<style>
    .remark {
        display: inline-block;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 230px;
    }
</style>