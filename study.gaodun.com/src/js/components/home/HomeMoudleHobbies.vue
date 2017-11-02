<template>
    <div class="hobbies">
        <template v-if="nullhomehobb">
            <div class="nullhomehobb"></div>
        </template>
        <template v-if="!nullhomehobb">
            <div class="hobox">
                <div class="hobbiesitem" v-for="o in interest">
                    <div class="hobtit">{{o.interest_name}}<span
                            :class="controlAttentionClass(o.is_interest)"
                            @click="changeAttentionState(o)" title="点击取消关注">已关注</span></div>
                    <div class="hobpane">
                        <div class="hobcpy">
                            <div :title="o.course_title" v-if="o.address" class="hasdrs"><a :href="o.course_details_url" target="_blank">{{o.course_title}}</a></div>
                            <div :title="o.course_title" v-else><a :href="o.course_details_url" target="_blank">{{o.course_title}}</a></div>
                            <span class="hobadderss" v-if="o.address">{{o.address}}</span></div>
                        <div class="hobinfo">
                            <a :href="o.course_details_url" :title="o.course_introduce" target="_blank">{{o.course_introduce}}</a>
                            <a :href="o.course_list_url" target="_blank" class="more">更多></a>
                        </div>
                    </div>
                </div>
                <!-- <div class="notitem" @click="goHobbiesPage">
                    <div class="hobmore">添加更多兴趣模块</div>
                </div> -->

                <div class="notitem">
                    <a href="#/hobbies" class="hobmore">添加更多兴趣模块</a>
                    <!-- 新手引导动画5-->
                    <transition name="fadeDown">
    	                <div class="guide" v-show="$store.state.home.bGuide">
                            <div class="triangle5"></div>
                           <span>
                               <i>5</i>
                           </span>
                           <p>根据自身需要<br/>定制"兴趣模板"</p>
                       </div>
                   </transition>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
    import {changeAttention} from '../../api/home';
    export default {
        data(){
            return {
                nullhomehobb: true,
            }
        },
        computed: {
            interest(){
                return this.$store.state.home.myInterest;
            }
        },
        watch: {
            interest(){
                this.nullhomehobb = false;
            }
        },
        mounted(){
            this.$store.dispatch('getInterest');
        },
        methods: {
            goHobbiesPage(){
                this.$router.push({
                    path: '/hobbies'
                })
            },
            async changeAttentionState(o) {
                this.removeFrom(o);
                let ret = await changeAttention({
                    section_id: o.id,
                    is_interest: o.is_interest
                })
                if (ret && ret.status === 0) {
                    this.$store.dispatch('getInterest');
                }
            },
            removeFrom(o){
                let {interest} = this;
                for (let i = 0; i < interest.length; i++) {
                   if(o.id === interest[i].id){
                       interest.splice(i,1);
                       break;
                   }
                }
                this.$store.dispatch('updateInterest',interest);
            },
            controlAttentionClass(bool){
                if (bool) {
                    return 'hotmy hobconcern';
                }
                return 'hotmy noconcern';
            },
        }
    }
</script>
