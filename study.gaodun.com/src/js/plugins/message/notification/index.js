import './css/style.css';
export default class Notify {
    constructor(opts = {}) {
        this.options = {
            confirmButtonText:'查看',
            duration: 0,
            message: '',
            onClose:function(){},
            onConfirm:function(){},
            title: '标题',
            type: 'warning',
            zIndex: 2000,
            ...opts
        }
        this.id = Math.random();
        this.dom = document.createElement('div');
        this.dom.className = 'el-notification crm-notification';
        this.dom.style.zIndex = this.options.zIndex;
        this.template = `
                            <div class="el-notification__group is-with-icon">
                                <h2 class="el-notification__title"><i class="crm-notification-icon__red"></i>&nbsp;&nbsp;<span class="crm-notification-icon__title">${this.options.title}</span></h2>
                                <div class="el-notification__content">
                                    <i class="crm-notification-icon crm-notification-icon_${this.options.type}"></i>
                                    <div class="crm-notification-content_message">${this.options.message}</div>
                                </div>
                            </div>
                            <div class="crm-notification-area_button"><button class="el-button el-button--primary el-button--mini"><span>${this.options.confirmButtonText}</span></button></div>
                            <div class="el-notification__closeBtn el-icon-close" title="关闭"></div>`;
        this.create();
    }
    create() {
        this.dom.innerHTML = this.template;
        document.body.appendChild(this.dom);
        this._events();
        this._remove();
    }
    _destroy() {
        this.dom && document.body.removeChild(this.dom);
        this.options.factory :: this.options.factory.hook('removeInstance',this.id);
        this.options.factory :: this.options.factory.hook('distributeTop');
        this.dom = null;
    }
    _events() {
        this._btnClose();
        this._btnConfirm();
    }
    _btnClose() {
        this.dom.querySelector('.el-notification__closeBtn').onclick = e =>{
            this.options.onClose();
            this._destroy();
        }
    }
    _btnConfirm() {
        this.dom.querySelector('.el-button').onclick = e => {
            let ret = this.options.onConfirm();
            if(ret !== false){
                this._destroy();
            }
        }
    }
    // 定时删除
    _remove() {
        if(this.options.duration === 0){
            return;
        }
        setTimeout(()=>{
            this._destroy();
        },this.options.duration);
    }
    setDomTop(value) {
        this.dom.style.top = value;
    }
}