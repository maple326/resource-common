<template>
    <div class="perbox">
        <template v-if="!nickName">
            <div class="nullper"></div>
        </template>
        <template class="aa" v-if="nickName">
            <div class="permil">
                <div class="perimg">
                  <a :href="'//' + pre +'v.gaodun.com/Newaccount/headinfo#anchorCls'" target="_blank">
                    <img :src="$store.state.home.picture_url" @error="getImageUrl">
                  </a>
                </div>
                <div class="perinfo">
                    <p class="nickname">{{$store.state.home.nickname}}</p>
                    <p class="permon">
                    <span class="monprice">
                      <a :href="'//' + pre +'v.gaodun.com/newgaoduncoin/index'" target="_blank" class="mon">高顿币 {{$store.state.home.gaodun_coin_nums}}</a>
                      <em class="add-animation" v-show="showsign">+{{$store.state.home.earn_coin}}</em>
                    </span>
                        |
                        <span class="filprice">
	                      <a :href="'//' + pre +'v.gaodun.com/newgaodunjf/index'" target="_blank" class="film">高盾 {{$store.state.home.point_nums}}</a>
                      <em class="add-animation" v-show="showsign">+{{$store.state.home.earn_point}}</em>
                    </span>
                    </p>
                </div>
                <span class="persign" :class="clamm" @click="persign()" >{{message}}</span>
            </div>

            <div class="pernal">
                <span class="nalitem nalmenber">加入高顿<br/> <b>{{$store.state.home.joined_days}}</b> 天</span>
                <span class="nalitem nalline"></span>
                <!-- <span class="nalitem nalmenber">累计学习<br/> <b>2</b> 小时</span>
                <span class="nalitem nalline"></span> -->
                <span class="nalitem nalmenber">累计做题<br/> <b>{{$store.state.home.item_done}}</b> 道</span>
            </div>
        </template>
    </div>
</template>
<style>
.bullet{
    width:6px;
    height:6px;
    border-radius: 50%;
    background:#ff0;
    position:absolute;
}
</style>
<script>
    import base from 'base';
    import {getEnv} from '../../util/config';
    import {pCheckin} from '../../api/home';
    import Bullet from "../fireworks/bullet.js"
    export default {
        components: {},
        data(){
            return {
                message: '签到',
                //check_in_done:0,
                clamm: 'persign',
                pre: getEnv(),
                showsign: false,
                showperson: true,
                jjj:'',
            }
        },
        computed: {
            checksignent(){
                return this.$store.state.home.checksign
            },
            nickName() {
                return this.$store.state.home.nickname;
            },
            check_in_done() {
              if (this.$store.state.home.check_in_done == 0) {
                this.message = '签到';
              } else {
                this.message = '已签到'
                this.clamm = "signover"
              }
              return this.$store.state.home.nickname;
            },
        },
        watch: {
            checksignent(){
                this.showsign = true;

            },
            check_in_done(){

            }
        },
        methods: {
            checkindone(){
                if (this.$store.state.home.check_in_done == 0) {
                    this.message = '签到';
                } else {
                    this.message = '已签到'
                    this.clamm = "signover"
                }
                this.showperson = false;
                return this.$store.state.home.check_in_done;
            },
            persign() {
                // this.message = '已签到'
                // this.clamm = "signover";
                // this.showsign = true;
                if (this.$store.state.home.check_in_done == 0) {
                    this.$store.dispatch('pcheckin').then(() => {
                        this.message = '已签到'
                        this.clamm = "signover";
                        for( var i = 1; i < 100; i++ ){
                            let irad = Math.floor(Math.random()*360);
                            new Bullet(event.clientX, event.clientY, irad);
                        }
                    });
                }
            },
            getImageUrl(data) {
                data.currentTarget.src = '//simg01.gaodunwangxiao.com/v/Uploads/avatar/default.jpg'
            }
        },
        mounted() {
            this.checkindone();
        }
    }
</script>
