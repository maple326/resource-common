import { AGENT_MENU, AGENT_CURRENT_LEVEL_ONE_MENU, AGENT_USER_INFO } from './keys';

export const startMarquee = (lh, speed, delay, id) => { // 消息滚动
    let t;
    let p = false;
    const o = document.getElementById(id);
    o.innerHTML += o.innerHTML + o.innerHTML + o.innerHTML;
    o.onmouseover = function() {
        p = true;
    }
    o.onmouseout = function() {
        p = false;
    }
    o.scrollTop = 0;

    function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.scrollTop += 2;
    }

    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 2;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}
export function padding(v) {
    let value = v + '';
    if (value.length < 2) {
        value = '0' + value;
    }
    return value;
}
export function format(d) { //时间转换 => YYYY-MM-dd
    return !!d && typeof d !== 'string' ? (d.getFullYear() + '-' + padding(d.getMonth() + 1) + '-' + padding(d.getDate())) : d;
}
export function number2DateTime(value, fmt = 'yyyy-MM-dd HH:mm:ss') { // yyyy-MM-dd HH:mm:ss
    if (isNaN(value)) return '';
    const date = new Date(Number(value));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return fmt.replace('yyyy', year.toString())
        .replace('yy', (year % 100).toString())
        .replace('MM', month > 9 ? month.toString() : ("0" + month))
        .replace('dd', day > 9 ? day.toString() : ("0" + day))
        .replace('HH', hour > 9 ? (hour).toString() : ("0" + hour))
        .replace('mm', minute > 9 ? (minute).toString() : ("0" + minute))
        .replace('ss', second > 9 ? (second).toString() : ("0" + second));
}
export function trim(str) { // 去空格
    return str.replace(/\s/g, '');
}
export function isPhone(str) { // 手机号验证
    var reg = /^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}
export function isEmail(str) { // 邮箱验证
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    // var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}
export function isNumber(value) { // 数字验证
    var patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
export function isMoney(value) { // 验证输入金额
    var patrn = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
export function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card)) {
        return false;
    } else {
        return true;
    }
}

/** 
 * 获取本周、本季度、本月、上月的开端日期、停止日期 
 */
var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay(); //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0;

//获得某月的天数 
export function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

//获得本周的开端日期 
export function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
    return format(weekStartDate);
}
//获得本周的停止日期 
export function getWeekEndDate() {
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
    return format(weekEndDate);
}
//获得本月的开端日期 
export function getMonthStartDate() {
    var monthStartDate = new Date(nowYear, nowMonth, 1);
    return format(monthStartDate);
}

//获得本月的停止日期 
export function getMonthEndDate() {
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
    return format(monthEndDate);
}

export function checkedUserTree(getclues) { // 获取当前所选中的姓名及ID方法
    let getCluesId = [];
    let objUserTree = {
        userId: [],
        userName: []
    };
    for (let i = 0; i < getclues.length; i++) {
        getCluesId.push(getclues[i].Id);
        if (Number(getCluesId[i]) == parseFloat(getCluesId[i])) {
            objUserTree.userId.push(getCluesId[i]);
            objUserTree.userName.push(getclues[i].Name);
        }
    }
    return objUserTree;
}
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
                // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function(...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
            // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}

// 拨打电话
/** 
 * { this, Uid, 号码,   号码类型,   CustomGuid, Guid}
 */
export function getCallUp(self, Uid, mobile, phoneType, CustomGuid, Guid) {
    let userInfo = JSON.parse(localStorage.getItem(AGENT_USER_INFO));
    let queryParm = { UserNo: userInfo.UserId, ExtNo: userInfo.PartialPhone };
    self.$store.dispatch('getExtStatus', queryParm);
    let callStatus = self.$store.state.navigation.extStatusId;

    if (Guid && callStatus == 2) {
        let trackingGuid = {
            CustomGuid,
            Guid,
            Uid
        }
        self.$store.dispatch('isTracking', true);
        self.$store.dispatch('getTrackingIds', trackingGuid);
    }
    if (callStatus == 1) {
        self.$message({
            message: '请先签入,再拨打电话',
            type: 'warning'
        });
        return;
    } else if (callStatus == 3) {
        self.$message({
            message: '请先置闲，再拨打电话',
            type: 'warning'
        });
        return;
    } else if (callStatus == 4) {
        self.$message({
            message: '通话中, 请稍后再试',
            type: 'warning'
        });
        return;
    } else if (callStatus == 2) {
        let sendCall = {
            Uid,
            mobile,
            phoneType
        }
        if (mobile.indexOf('*') == -1) {
            self.$store.dispatch('callUp', {
                UserNo: userInfo.UserId,
                FromNo: userInfo.PartialPhone,
                ToNo: mobile
            })
            setTimeout(() => {
                self.$store.dispatch('getExtStatus', queryParm);
            }, 2500);
        } else {
            GetContactByUid(sendCall).then(ret => { // 获取手机号码明文
                if (ret.status === 0) {
                    self.$store.dispatch('callUp', {
                        UserNo: userInfo.UserId,
                        FromNo: userInfo.PartialPhone,
                        ToNo: ret.result
                    })
                    setTimeout(() => {
                        self.$store.dispatch('getExtStatus', queryParm);
                    }, 2500);
                } else {
                    self.$message({
                        message: '拨打电话失败，请稍后再试',
                        type: 'warning'
                    });
                    return;
                }
            }).catch(() => {
                self.$message({
                    message: '拨打电话失败，请稍后再试',
                    type: 'warning'
                });
            });
        }
    } else {
        self.$message({
            message: '服务未处理异常',
            type: 'warning'
        });
    }
}