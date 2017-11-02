import Notify from './notification';
import Animation from './animation';
let notificationFactory = {
    create(opts = {}) {
        let instance = '';
        switch(opts.type){
            case 'info':
            case 'warning':
                instance = new Notify({...opts,factory:this});
                this.list.push(instance);
                this.distributeTop();
                break;
            default:
                instance = new Animation(opts);
                break;
        }
        return instance;
    },
    /**
     * 钩子函数，工厂生产的实例需要触发工厂方法时调用
     * @param name { String } 工厂函数名
     * @param params 传递的参数
     */
    hook(name,params){
         this[name] && this[name](params);
    },
    /**
     * 删除实例
     * @param id { Number }实例id
     */
    removeInstance(id) {
        for(var i in this.list){
            if(this.list[i].id == id){
                this.list[i] = null;
                this.list.splice(i,1);
            }
        }
    },
    distributeTop() {
        for(let i in this.list){
            if(i == 0){
                this.list[i].setDomTop('20px');
            }else if(i == 1){
                this.list[i].setDomTop(40 + this.list[i-1].dom.clientHeight + 'px');
            }else{
                this.list[i].setDomTop(20 + this.list[i-1].dom.clientHeight + parseInt(this.list[i-1].dom.style.top) + 'px');
            }
        }
    },
    list:[]
}

export default notificationFactory;
