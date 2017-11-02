import './css/style.css';
export default class Animation {
    constructor(opts) {
        this.options = {
            type: 'plane',
            message: '',    // 恭喜 XX 团队的 <span>Honey</span> <br/>成功收款 <span>20000元</span>
            time: 20000
        }
        if(opts){
            Object.assign(this.options,opts);
        };
        let type = this.options.type;
        let content = document.createElement('div');
        content.className = "message-content";
        this[type] = document.createElement('div');
        this[type].title = "点击关闭";
        this[type].className = `c-m-modal crm-${type}`;
        this[type].appendChild(content);
        this.create();
    }
    create() {
        let { type, message } = this.options;
        this[`${type}`].querySelector('.message-content').innerHTML = `${message}`;
        this[`${type}`].className += ' c-m-modal-move';
        document.body.appendChild(this[`${type}`]);
        this._bindClick();
        this.destroy();
    }
    destroy() {
        setTimeout(()=>{
            this._remove();
        },this.options.time);
    }
    _bindClick() {
        this[`${this.options.type}`].onclick = ()=> this._remove();
    }
    _remove() {
        if(!this[`${this.options.type}`]){
            return;
        }
        document.body.removeChild(this[`${this.options.type}`]);
        this[`${this.options.type}`] = undefined;

    }
}
