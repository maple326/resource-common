export const getEnv = () => {
    let host = location.host;
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
        return 'dev-'
    }
    let pre = location.host.match(/^.*-/);
    // 正式环境
    if (pre === null) {
        return '';
    }
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
        return '//baiyiapi.gaodun.com';
    }
    // 测试及预发布环境
    return `//${pre[0]}baiyiapi.gaodun.com`;
}
export const setWindowNID = (menu, path) => {
    menu = menu || [];
    for (let i = 0, len = menu.length; i < len; i++) {
        if (menu[i].Url === path) {
            window.nid = menu[i].NavigationId
        }
        if (menu[i].ChildNavigations) {
            setWindowNID(menu[i].ChildNavigations, path);
        }
    }
}