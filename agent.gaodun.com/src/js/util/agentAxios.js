import axios from 'axios';
import {
    getEnv
} from '../util/config';
import {
    AGENT_TOKEN,
    AGENT_USER_INFO,
    AGENT_USERLOGIN_ACTION_ID,
    AGENT_USERLOGOUT_ACTION_ID
} from './keys';
import {
    getCookie,
    setCookie
} from 'cookieUtils';
import {
    Message
} from 'element-ui';
let prefix = getEnv();
let userInfo = localStorage.getItem(AGENT_USER_INFO);
if (userInfo) {
    userInfo = JSON.parse(userInfo);
}
if (prefix == 'dev-') {
    axios.defaults.baseURL = '//t-agentapi.gaodun.com'
    // axios.defaults.baseURL = '//192.168.50.231/'
} else {
    axios.defaults.baseURL = `//${prefix}agentapi.gaodun.com`;
}
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    let data;
    if (config.data) {
        data = JSON.parse(config.data);
        let agentToken = getCookie(AGENT_TOKEN);
        // 非登录且没有token，跳转登录页
        if (data.action_id !== AGENT_USERLOGIN_ACTION_ID && !agentToken) {
            localStorage.clear();
            location.href = '/#/login';
            location.reload();
        }
        data.agentToken = agentToken;
        config.data = JSON.stringify(data);
    }
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    if (response.data.code === 100) {
        localStorage.clear();
        location.href = '/#/login';
        location.reload();
    } else if (response.data.code !== 0) {
        Message({
            message: response.data.message,
            showClose: true,
            type: 'warning'
        });
    }
    return Promise.resolve(response.data);
}, function (error) {
    Message({
        message: error.message,
        showClose: true,
        type: 'warning'
    });
    return Promise.reject(error);
});
export default class agentAxios {
    constructor(options = {}) {
        this.options = options;
    }
    request(options) {
        return axios.request(options);
    }
    get(url, options = {}) {
        return this.request({
            url,
            params: {
                ...options
            }
        })
    }
    post(url, data, options = {}) {
        if (data instanceof Object) {
            data = JSON.stringify(data);
        }
        return this.request({
            method: 'post',
            url,
            data,
            ...options
        });
    }
}
const instanceAxios = new agentAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);