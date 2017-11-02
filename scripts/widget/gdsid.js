var host2 = document.domain;
var prefix = getSysPrefix(host2);
var gdsid = getCookie(prefix + 'GDSID');
var script = document.createElement('script');
var host2 = document.domain;
var vigo_url = gethref(host2, 't-vigo.gaodun.com');
script.src = vigo_url + '/api/v1/makeidentity?callback=getGdSsid';
document.getElementsByTagName('head')[0].appendChild(script);
function getGdSsid(data){
	if(gdsid == null || gdsid != data.GDSID){
        setGdSsid(data.GDSID);
	}
}
function setGdSsid(value) {
	var domainList = ["com", "cn", "net", "gov", "ac", "org"];
	var host2 = document.domain;
	var hostList = host2.split('.');
	var domain = hostList[hostList.length-2] + "." + hostList[hostList.length-1];
	if (domainList.indexOf(hostList[hostList.length-2]) > -1) {
		domain = hostList[hostList.length-3] + "." + hostList[hostList.length-2] + "." + hostList[hostList.length-1]
	}
	//
    domain = document.domain;
	prefix = getSysPrefix(host2);
	setCookie(prefix + 'GDSID', value, 360, domain);
}


//JS操作cookies方法!
function getCookie(name)
{
	var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//写cookies
function setCookie(name,value, Days, domain)
{
	var exp = new Date();
	exp.setTime(exp.getTime() + Days*24*60*60*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + "; domain="+domain;
}

function getSysPrefix(href) {
    var env = href.split('.')[0];
    var env_ = href.split('-')[0];
    switch(env_) {
        case 't':
            return't-';
            break;
        case 'dev':
            return 'dev-';
            break;
        case 'pre':
            return 'pre-';
            break;
    }
    switch(env) {
        case 't':
            return 't-';
            break;
        case 'dev':
            return 'dev-';
            break;
        case 'pre':
            return 'pre-';
            break;
    }
    return '';
}

//不同环境下的接口url
function gethref(href, dns) {
    return "//" + getSysPrefix(href) + dns;
}
