<template>
    <div style="overflow:hidden;background-color:#0b131e">
        <div class="canvaszz"></div>
        <canvas id="canvasPIXI"></canvas>
        <div class="login-wrap">
            <div class="login-box">
                <div style="margin-right: 4px">
                    <img src="../../images/login/login-logo.png">
                </div>
                <div class="box-conten">
                    <el-form :model="ruleForm" :rules="rules" autoComplete="on" ref="ruleForm" style="text-align: center">
                        <el-form-item>
                            <span class="container_login">
                                <img src="../../images/login/user-icon.png"></img>
                            </span>
                            <el-input class="login_bnt" type="text" v-model="ruleForm.account" @keyup.enter.native="submitForm('ruleForm')" autoComplete="on" placeholder="手机／邮箱"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <span class="container_login">
                                <img style="width: 13px" src="../../images/login/password-icon.png"></img>
                            </span>
                            <el-input class="login_bnt" type="Password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" autoComplete="on" placeholder="密码"></el-input>
                        </el-form-item>
                        <div style="margin-bottom: 0">
                            <el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="submitForm('ruleForm')">{{loading ? '登录中' : '登录'}}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
            <div class="Copyright" style="text-align: center">
                <span style="color:#a4a4a4;font-size: 14px">Copyright © 2006-2017 高顿网校, All Rights Reserved.</span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import 'element-ui/lib/theme-default/index.css';
import { Form, Input, FormItem, Button } from 'element-ui';
import { post } from '../util/agentAxios';
import { getCookie, setCookie } from 'cookieUtils';
import { userLogin, getToken, getLoginUserInfo, getCurrentUserMenuTree } from '../api/user';
import { stringify } from 'queryString';
import { AGENT_MENU, AGENT_USER_INFO, AGENT_USER_FUNCTION, AGENT_TOKEN, AGENT_USER_TYPE } from '../util/keys';
import { getEnv } from '../util/config';
import { parseUrl } from 'base';
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);
Vue.component(Button.name, Button);
let prefix = getEnv();
export default {
    data: function() {
        return {
            isRest: false,
            ruleForm: {
                account: '',
                password: ''
            },
            loading: false
        }
    },
    methods: {
        async submitForm() {
            this.loading = true;
            let result = await userLogin({
                ...this.ruleForm,
                GDSID: getCookie(`${prefix}GDSID`)
            });
            if (result.code === 0) {
                setCookie(AGENT_TOKEN, result.data.agentToken);
                localStorage.setItem(AGENT_USER_INFO, JSON.stringify(result.data.userInfo));
                let menu = result.data.userNavigations;
                localStorage.setItem(AGENT_MENU, JSON.stringify(menu));
                localStorage.setItem(AGENT_USER_FUNCTION, JSON.stringify(result.data.userFunctions));
                localStorage.setItem(AGENT_USER_TYPE, result.data.userType);
                this.push({
                    path: '/Finance/agent',
                    context: this
                });
                this.push({
                    context: this
                });
            } else {
                this.loading = false;
                return;
            }
        },
        loadSSIDJS() {
            let script = document.createElement('script');
            script.src = `//${prefix}s.gaodun.com/web/sso/gdssid_v2.js`;
            document.getElementsByTagName('head')[0].appendChild(script);
        },
        reWriteEmptyUrl(menu) {
            for (var i in menu) {
                if (menu[i].Url === "") {
                    menu[i].Url = Math.random().toString();
                }
                if (menu[i].Url.indexOf('Report') > -1) {
                    menu[i].Url = menu[i].Url.replace(/http.*key=/, '/Report/');
                }
                if (menu[i].ChildNavigations) {
                    this.reWriteEmptyUrl(menu[i].ChildNavigations)
                }
            }
        },
        async restPassword() {
            this.isRest = true;
        },
        loadCanvas() {
            var canvas = document.getElementById('canvasPIXI'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = document.body.offsetWidth,
                h = canvas.height = document.body.offsetHeight - 4,

                hue = 200,
                stars = [],
                count = 0,
                maxStars = 330;//星星数量

            var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
            canvas2.width = 100;
            canvas2.height = 100;
            var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
            gradient2.addColorStop(0.025, '#CCC');
            gradient2.addColorStop(0.1, 'hsl(' + hue + ', 11%, 33%)');
            gradient2.addColorStop(0.25, 'hsl(' + hue + ', 14%, 6%)');
            gradient2.addColorStop(1, 'transparent');

            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();


            function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }

                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            function maxOrbit(x, y) {
                var max = Math.max(x, y),
                    diameter = Math.round(Math.sqrt(max * max + max * max));
                return diameter / 2;
                //星星移动范围，值越大范围越小，
            }

            var Star = function() {

                this.orbitRadius = random(maxOrbit(w, h));
                this.radius = random(60, this.orbitRadius) / 8;
                //星星大小
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 500000;
                //星星移动速度
                this.alpha = random(2, 10) / 1;

                count++;
                stars[count] = this;
            }

            Star.prototype.draw = function() {
                var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.05;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.05;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
            }

            for (var i = 0; i < maxStars; i++) {
                new Star();
            }

            function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.5; //尾巴
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                }
                ;

                window.requestAnimationFrame(animation);
            }

            animation();
        },
    },
    async created() {
        const GDSID = parseUrl().gdsid;
        if (GDSID) {
            setCookie(`${prefix}GDSID`, GDSID);
            let loginRet = await getToken(stringify({
                grant_type: 'password'
            }));
            if (loginRet.access_token) {
                setCookie(AGENT_TOKEN, loginRet.access_token);
            }
            let ret = await getLoginUserInfo();
            if (ret.status == 0) {
                localStorage.setItem(AGENT_USER_INFO, JSON.stringify(ret.result));
                let menuRet = await getCurrentUserMenuTree();
                this.$router.push({ path: '/', query: { nid: 550 } })
            }
            return;
        }
        this.loadSSIDJS();
    },
    mounted() {
        this.loadCanvas();
    }
}
</script>

<style>
.login-wrap .el-input__inner:focus {
    outline: 0;
    border-radius: 5px;
    -webkit-box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
    -moz-box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
    box-shadow: 0px 0px 8px rgba(232, 237, 250, 0.6), 0 0px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #888787;
}

.login-wrap .el-input__inner {
    height: 36px !important;
    line-height: 36px !important;
}

.login-wrap .Copyright {
    text-align: center;
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
}
</style>