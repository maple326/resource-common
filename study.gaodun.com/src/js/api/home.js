import {post, get} from '../util/studyAxios';

export const getHomeData = params => get('/spaceapi/home', params);

// 日历接口
export const getMyLive = params => get('/spaceapi/my_live', params);

//
export const getInterest = () => get('/spaceapi/myInterest');

// 每日签到
export const pCheckin = params => post('/spaceapi/check-in', params);

//
export const changeAttention = params => get('/spaceapi/clickInterest', params);

export const getAllInterest = () => get('/spaceapi/interest');

export const verify = (params={}) => get('/spaceapi/survey/verify',params);

export const getSurvey = () => get('/spaceapi/survey');

export const saveSurvey = params => post('/spaceapi/survey', params);

export const getRadar = (url) => get(url);

export const reCommended = params => get('/spaceapi/get/recommended/courses', params);    // 为我推荐课程

export const getCheckBook = params => get('/spaceapi/check-booking', params);    // 私教预约

export const sort = (url, params) => post(url, params);   // 排序

export const setMyExamDate = params => post('/spaceapi/setMyExamDate', params);   // 添加考试时间

export const getMyExamProject = params => get('/spaceapi/getMyExamProject', params);   // 添加考试项目

export const getMyExamSubject = params => get('/spaceapi/getMyExamSubject', params);   // 添加考试项目

export const getStudentExamDate = params => get('/spaceapi/getStudentExamDate', params);   // 获取用户已设置的考试日期

export const deleteMyExamDate = params => get('/spaceapi/deleteMyExamDate', params);   // 用户删除考试日期

export const updateMyExamDate = params => post('/spaceapi/updateMyExamDate', params);   // 更新用户已设置的考试日期

export const getExamDateBySubjectId = params => get('/spaceapi/getExamDateBySubjectId', params);   // 更新用户已设置的考试日期

export const getQrcode = params => get('/spaceapi/get/qrcode', params);   // 微信二维码

export const getStudentInfo = params => get('/spaceapi/student/info', params);   // 头部学生信息

export const getNoticeNum = (params={}) => get('/class/noreviewMessageNum.html', params);   // 未读消息数

export const getStartStudy = params => get('/Class/startstudy', params);   // 延迟排课












