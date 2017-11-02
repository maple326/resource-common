export const getEnv = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return 't-'
    }
    let pre = location.host.match(/^.*-/);
    // 正式环境
    if (pre === null) {
        return '';
    }
    pre[0] = pre[0] == 'dev-' ? 't-' : pre[0];
    // 测试及预发布环境
    return pre[0];
}

export const getBaseUrl = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return 'http://192.168.60.235:6002';
    }
    let pre = location.host.match(/^.*-/);
    // 正式环境
    if (pre === null) {
        return '//v.gaodun.com';
    }
    // 测试及预发布环境
    //return `//${pre[0]}v.gaodun.com`;
    return `//t-v.gaodun.com`;
}