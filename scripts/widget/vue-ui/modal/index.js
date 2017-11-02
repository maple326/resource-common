/**
 * Created by Administrator on 2017/6/10.
 */
import Vue from 'vue';
import Modal from './Modal.vue';
const createElement =(marker,root,tag) => {
    let target = document.querySelector(root) || document.body;
    if(target.querySelectorAll(marker).length === 0){
        let el = document.createElement(tag || 'div');
        el.setAttribute(marker, '');
        target.appendChild(el);
    }
};
class ModalManager {
    constructor(){
        this.modals = [];
    }
    openComponent(vueComponent,options = {}){
        let modalId = `modal_${Math.random().toString().substr(3,10)}`;
        createElement(modalId);
        let ModalComponent = Vue.extend(Modal);
        let modal = new ModalComponent({
            propsData: options
        });
        modal.$mount(`[${modalId}]`);
        Object.assign(options,{modal})
        if(vueComponent.constructor === Object){
            let ContentComponent = Vue.extend(vueComponent);
            let content = new ContentComponent({
                propsData: options
            });
            modal.content = content;
            content.$mount(modal.$el.querySelector('[gd-modal-content]'));
        }else{
            modal.$el.querySelector('[gd-modal-content]').innerHTML = vueComponent;
        }
        this.modals[modalId] = modal;
        return new Promise((resolve,reject)=>{
            resolve(modal);
        });
    }
}
export default new ModalManager();