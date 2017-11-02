import {GET_LIVE_TODAY, GET_LIVE_ALL, GET_PERSONALINFO, GET_LIVE_INTEREST,PER_CHECKIN,GET_RECOMMENDED,GET_CHECKBOOK,GET_QRCODE,GET_STUDENTINFO,SAVE_RADAR,SHOW_GUIDE,HIDE_GUIDE,SAVE_VERIFY,SAVE_USERBOOT,GET_NOTICENUM} from '../mutation-types';
import {getHomeData, getMyLive, getInterest,pCheckin,reCommended,getCheckBook,getQrcode,getStudentInfo,getNoticeNum} from '../../api/home';

const state = {
    homeData: {},
    course_id: '',
    course_name: '',
    live_time: '',
    live_status: '',
    conmt: [],
    nickname: '',
    joined_days:'',
    point_nums: '',
    gaodun_coin_nums: '',
    item_done: '',
    today_live: [],
    start_hour: '',
    end_hour: '',
    title: '',
    status: '',
    date: '',
    livedate: [],
    todayitem: [{
        show_type: '',
        teacher_name: '',
        title: '',
        status: '',
        todaydatemin: '',
        datestart: '',
        dateend: ''
    }],
    todaylist: [],
    course_list: [],
    myInterest: [], // 推荐
    checksign:[],
    show:'',
    picture_url:'',
    recommend:[],
    check_in_done:'',
    exam_date:[],
    earn_coin:'',
    earn_point:'',
    booklist:[],
    qrcode:'',
    bitip:'',
    bGuide:false,        //新手引导
    verifyState:"",       //新老用户判断
    newUserBoot:"",       //用户是否第一次进入
    radarState:"",      //雷达数据是否返回
    studentinfo:'',
    noticNum:0,
    typestudy:''
}

const actions = {
    mylive({commit, state}, data) {
        getMyLive(data).then(function (res) {
            if (res.status == 0) {
                commit(GET_LIVE_ALL, res.result);
            }
        })
        // 做请求
    },
    getperson({commit, state}, data) {
        getHomeData(data).then(function (res) {
            for(let value of res.course_list){
                value.show = false;
                value.bitip = false;
            }

            if(res.today_live != '' && res.today_live != null){
                for(let objdate of res.today_live){
                    let d = new Date(parseInt(objdate.start_time) * 1000);
                    let e = new Date(parseInt(objdate.end_time) * 1000);

                    objdate.datemm = (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
                    objdate.starttimeo = (d.getHours() > 9 ? d.getHours() : '0' + (d.getHours())) + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
                    objdate.endtimeo = (e.getHours() > 9 ? e.getHours() : '0' + (e.getHours())) + ':' + (e.getMinutes() > 9 ? e.getMinutes() : '0' + e.getMinutes())
                }
            }
            commit(GET_PERSONALINFO, res);
        })
    },
    async getInterest({commit, state}){
        let ret = await getInterest();
        commit(GET_LIVE_INTEREST, ret.result);
    },
    updateInterest({commit,state},data){
        commit(GET_LIVE_INTEREST, data);
    },
    pcheckin({commit, state}, data) {  // 每日签到
        pCheckin(data).then(ret => {
            if(ret.status === 0){
                commit(PER_CHECKIN,ret.result);
            }
        })
    },
    recommended({commit, state}, data) {  // 为我推荐课程
        reCommended(data).then(ret => {
            if(ret.status === 0){
                commit(GET_RECOMMENDED,ret.data);
            }
        })
    },
    getbook({commit, state}, data) {  // 为我推荐课程
        getCheckBook(data).then(ret => {
            if(ret.status === 0){
                commit(GET_CHECKBOOK,ret.result.booking_nums);
            }
        })
    },
    getqrcode({commit, state}, data) {  // 微信二维码
        getQrcode(data).then(ret => {
            if(ret.status === 0){
                commit(GET_QRCODE,ret.data);
            }
        })
    },
    showGuide({commit,state},data){    //显示新手引导
        commit(SHOW_GUIDE)
    },
    hideGuide({commit,state},data){    //隐藏新手引导
        commit(HIDE_GUIDE)
    },
    verifyState({commit,state},data){     //新老用户状态判断
        commit(SAVE_VERIFY,data)
    },
    saveRadar({commit,state},data){     //保存雷达是否返回
        commit(SAVE_RADAR)
    },
    save_user_boot({commit,state},data){    //保存用户是否第一次进入
        commit(SAVE_USERBOOT,data)
    },
    getstudentinfo({commit, state}, data) {  // 微信二维码
        getStudentInfo(data).then(ret => {
            if(ret.status === 0){
                commit(GET_STUDENTINFO,ret);
            }
        })
    },
    getNoticeNum({commit, state}, data) {  //未读消息数
        getNoticeNum(data).then(ret => { 
            commit(GET_NOTICENUM,ret);
        })
    },
    // getStartStudy({commit, state}, data) {  //课程延迟
    //     getStartStudy(data).then(ret => {
    //         console.log(ret.status)
    //         if(ret.status === 0){
    //             commit(GET_STARTSTUDY,ret);
    //         }else{

    //         }
    //     })

    //     // let ret = await getStartStudy();
    //     // console.log(ret)
    //     // commit(GET_STARTSTUDY, ret);
    // },
}

const mutations = {
    [GET_LIVE_ALL](state, ret){
        state.conmt = ret;
        // 更新数据
    },
    [GET_PERSONALINFO](state, perinfo){
        state.homeData = perinfo;
        state.nickname = perinfo.student.nickname;
        state.joined_days = perinfo.student.joined_days;
        state.point_nums = perinfo.student.point_nums;
        state.picture_url = perinfo.student.picture_url;
        state.gaodun_coin_nums = perinfo.student.gaodun_coin_nums;
        state.item_done = perinfo.student_statistics.item_done;
        state.check_in_done = perinfo.check_in_done;
        state.today_live = perinfo.today_live;
        state.course_list = perinfo.course_list;
        state.exam_date = perinfo.exam_date
    },
    [GET_LIVE_INTEREST](state, data){
        state.myInterest = data;
    },
    [PER_CHECKIN](state, data){
        state.earn_coin = data.earn_coin;
        state.earn_point = data.earn_point;
        // state.gaodun_coin_nums += data.earn_coin;
        // state.point_nums += data.earn_point;
        state.gaodun_coin_nums = (state.gaodun_coin_nums*100 + data.earn_coin*100)/100;
        state.point_nums = (state.point_nums*100 + data.earn_point*100)/100;
        state.checksign = data;
    },
    [GET_RECOMMENDED](state, data){
        state.recommend = data;
    },
    [GET_CHECKBOOK](state, data){
        state.booklist = data;
    },
    [GET_QRCODE](state, data){
        state.qrcode = data.url;
    },
    [SHOW_GUIDE](state,data){
        state.bGuide = true;
    },
    [HIDE_GUIDE](state,data){
        state.bGuide = false;
    },
    [SAVE_VERIFY](state,data){
        state.verifyState = data;
    },
    [SAVE_RADAR](state,data){
        state.radarState = true;
    },
    [SAVE_USERBOOT](state,data){
        state.newUserBoot = data;
    },
    [GET_STUDENTINFO](state, data){
        state.nickname = data.result.nickname;
        state.picture_url = data.result.picture_url;
        state.gaodun_coin_nums = data.result.gaodun_coin_nums;
        state.point_nums = data.result.point_nums;
        state.studentinfo = data.result;
    },
    [GET_NOTICENUM](state, data){

        state.noticNum = data;
    },
    // [GET_STARTSTUDY](state, data){
    //     state.typestudy = data;
    // },
}

export default {
    state,
    actions,
    mutations,
}