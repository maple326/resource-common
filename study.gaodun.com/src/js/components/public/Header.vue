w<template>
    <div class="comm">
        <div class="commhead">
            <div class="chlft"><a :href="'//' + pre +'www.gaodun.com'" target="_blank">高顿网校</a>|<span class="chsp">学习空间</span></div>
            <div class="chrgt">
                <span class="felbox myaccount" @mouseover="personshow" @mouseout="personhide">个人中心

                    <div class="persondrop" v-show="isshowperson">
                        <div class="personimg">
                            <div class="perlft">
                                <div class="perimg">
                                    <a :href="'//' + pre +'v.gaodun.com/Newaccount/headinfo#anchorCls'" target="_blank">
                                        <img :src="'//'+$store.state.home.picture_url">
                                    </a>
                                </div>
                            </div>
                            <div class="perrgt">
                                <p class="per1">{{$store.state.home.nickname}}</p>
                                <p class="per2"><a :href="'//' + pre +'v.gaodun.com/newgaoduncoin/index'" class="mon" target="_blank">高顿币 {{$store.state.home.gaodun_coin_nums}}</a> | <a :href="'//' + pre +'v.gaodun.com/newgaodunjf/index'" class="film" target="_blank">高盾 {{$store.state.home.point_nums}}</a></p>
                            </div>
                        </div>

                        <div class="permiltab">
                            <a :href="'//' + pre +'v.gaodun.com/newclass/myorder'" target="_blank" class="permilurl">我的订单</a>
                            <a :href="'//' + pre +'v.gaodun.com/newaccount/coupon'" target="_blank" class="permilurl">我的优惠券</a>
                            <a :href="'//' + pre +'v.gaodun.com/Newaccount/card/t/money'" target="_blank" class="permilurl">卡券激活</a>
                            <a :href="'//' + pre +'v.gaodun.com/help/detail/id/182'" target="_blank" class="permilurl">帮助中心</a>
                            <a :href="'//' + pre +'v.gaodun.com/newaccount/index'" target="_blank" class="permilurl">账号设置</a>
                            <span class="permillogin"><a :href="'//' + pre +'v.gaodun.com/Member/logout'" class="pereixt">安全退出</a></span>
                        </div>
                    </div>

                </span>
                <span class="felbox feline">|</span>
                <span class="felbox chnewinfo">
                    <a :href="'//' + pre +'v.gaodun.com/Newclass/notice/id/2'" target="_blank">消息</a>
                    <span class="newicon" v-if="$store.state.home.noticNum>0"></span>
                </span>
                <!-- <span class="felbox selbox">
                    <span class="seldress">所在项目</span>
                    <span class="selject">
                        <select>
                            <option>ACCA</option>
                            <option>CFA</option>
                            <option>CMA</option>
                            <option>CPA</option>
                        </select>
                    </span>
                </span> -->
            </div>
        </div> 
    </div>
    <!-- <div class="container">
       我是HOME的子组件ddd：Echarts {{userId}}
    </div> -->
</template>
<style>
</style>
<script>
    import {getEnv} from '../../util/config';
    export default {
        data(){
            return{
                isshowperson:false,
                pre: getEnv()
            }
        },
        methods : {
            personshow(){
                this.isshowperson = !this.isshowperson;
            },
            personhide(){
                this.isshowperson = !this.isshowperson;
            },
            headper(){
                this.$store.dispatch('getstudentinfo').then(() => {
                    
                });
                this.$store.dispatch('getNoticeNum').then(() => {
                    
                });
            }
        },
        created(){
            this.headper();
        }
    }
</script>
