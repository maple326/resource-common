import axios from 'axios';
import { getEnv } from '../util/config';
import { Message } from 'element-ui';
let siteEnv = getEnv();
axios.defaults.baseURL = `//${siteEnv}v.gaodun.com`;
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
    // 非登录和获取login接口
    return Promise.resolve(config);
}, function(error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function(response) {
    if (response.data && response.data.status === 401) {
        location.href = `//${siteEnv}v.gaodun.com/member/login.html`;
       /*Message({
            message: response.data.msg,
            showClose: true,
            type: 'warning'
        });*/
        return Promise.reject(response.data);
    }
    return Promise.resolve(response.data);
}, function(error) {
    return Promise.reject(error);
});
export default class CRMAxios {
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
const instanceAxios = new CRMAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);