import BaseFetch from 'BaseFetch'
import {setCookie,getCookie} from 'cookieUtils';

class Fetch extends BaseFetch{
	constructor(...args){
		super(...args)
	}
	checkCode(response){
		//可以根据后端返回的status 进行处理
		switch(response.status){
			case 0:
				return Promise.resolve(response);
			case default:
				if(response.Msg)
					alert(response.Msg);
				return Promise.reject(response);
		}
		return Promise.resolve(response);
	}
	
	/*@description 对url进行处理,此方法需子类重写*/
	handleUrl(url){
		url=(window.apiBase||'')+url;
		return url;
	}

}

const fetchInstance=new Fetch({
	configs:{
		credentials:'omit',//cookies是否发送服务端 "omit"（默认）,"same-origin"以及"include"
		mode:"cors",//是否跨域 属性值为 same-origin ， no-cors （默认）以及 cors
		headers:{
			token: getCookie('token')
		}//请求报文的头信息
	},
	hasLoading:false
});

export default fetchInstance;
export const post=fetchInstance.post.bind(fetchInstance);
export const get=fetchInstance.get.bind(fetchInstance);
export const fetch=fetchInstance.fetch.bind(fetchInstance);
