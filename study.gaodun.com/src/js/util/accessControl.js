import { CRM_USER_INFO } from '../util/keys';

export default{
    install(Vue,options)
    {
        Vue.prototype.unlocking = (key)=> {
            let userInfo = localStorage.getItem(CRM_USER_INFO);
            userInfo = JSON.parse(userInfo);
            if(userInfo){
                var { SysFunctions }  = userInfo;
            }
            for(var i in SysFunctions){
                if(SysFunctions[i].FunctionKey == key){
                    return true;
                }
            }
            return false;
        }
    }
}