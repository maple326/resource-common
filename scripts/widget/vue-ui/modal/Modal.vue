<template>
    <transition name="msgbox-bounce">
        <div style="position:absolute" class="mint-msgbox-wrapper">
            <div class="pop" @click="handleAction('pop')"></div>
                <div class="mint-msgbox v-modal-enter" :style="{'width':width,'height': height}">
                <div class="mint-msgbox-header" v-if="title !== ''">
                    <div class="mint-msgbox-title">{{ title }}</div>
                    <span v-if="showFullScreenButton" @click="changeModalSize" :class="fullScreenClasses"></span>
                    <span title="关闭" class="btn-close" @click="handleAction('cancel')"></span>
                </div>
                <div class="mint-msgbox-content" :style="{'height':height - 60}">
                    <div class="mint-msgbox-message" gd-modal-content></div>
                </div>
                <div class="mint-msgbox-btns" v-if="showCancelButton || showConfirmButton">
                    <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{cancelButtonText}}</button><button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
    body{font-family:'微软雅黑'}
    .v-modal-enter{animation:none;}
    .pop{
        position:fixed;
        width:100%;
        height:100%;
        top:0;left:0;
        z-index:999;
        transition:1s;
        background:rgba(0,0,0,0.7);
    }
    .mint-msgbox-content{max-height:500px;}
    .mint-msgbox{
        z-index:1000;
        width:auto;
        -webkit-touch-callout: default;
        user-select:text;
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 3px;
        font-size: 16px;
        overflow: hidden;
        -webkit-transition: .2s;
        transition: .2s;
    }
    .mint-msgbox-header{
        background:#42aedf;
        padding:0 15px;
        position:relative;
    }
    .mint-msgbox-title{
        font-weight:normal;
        color:#fff;
        font-size:14px;
        height:40px;
        line-height:40px;
        text-align:left;
    }
    .mint-msgbox-content{
        border-bottom:0 none;
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
        overflow-y:auto;
    }
    .mint-msgbox-btns{
        display:block;
        text-align:right;
        padding:0 25px;
        margin:10px 0;
    }
    .mint-msgbox-btns button{font-size:16px;padding:0 25px;}
    .mint-msgbox-btns button.mint-button--default{margin-right:15px;}
    .mint-button{height:30px;}
    .mint-button--primary{background:#42aedf;}
    .mint-msgbox-message{color:#333;}
    .btn-full-screen{transition:all,0.3s;background:url('./full_screen.png') no-repeat 5px 4px;cursor:pointer;position:absolute;right:35px;top:11px;display:block;width:21px;height:20px;}
    .btn-full-screen:hover{background-color:#2693c4;}
    .full-screen{top:11px;background:url('./full_screen1.png') no-repeat 4px 4px;width:21px;}
    .btn-close{transition:all,0.3s;cursor:pointer;position:absolute;right:12px;top:10px;display:block;width:20px;height:20px;background:url('./close.png') no-repeat 4px 4px;}
    .btn-close:hover{background-color:#2693c4;}
</style>
<script>
    /*import 'mint-ui/lib/message-box/style.css';*/
    import 'mint-ui/lib/button/style.css';
    var defaults = {
        title: '提示',
        showCancelButton: true,
        showConfirmButton: true,
        width: 'auto',
        height: 'auto',
        disablePopEvent: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        isMaximization : false,
        showFullScreenButton: false,
    }
    var memoryWidth = '';
    var memoryHeight = '';
    export default {
        props: {
            title: String,
            callback: {
                type: Function
            },
            showCancelButton: {
                type: Boolean
            },
            showConfirmButton:{
                type: Boolean
            },
            width:String,
            height:String,
            disablePopEvent:Boolean,
            confirmButtonText: String,
            showFullScreenButton: Boolean,
        },
        data() {
            let data = {
            };
            for(let i in defaults){
                data[i] = this[i] === undefined ? defaults[i] : this[i];
            }
            memoryWidth = data.width;
            memoryHeight = data.Height;
            return data;
        },
        computed: {
            confirmButtonClasses() {
                let classes = 'mint-button mint-button--primary mint-button--normal ' + this.confirmButtonClass;
                if (this.confirmButtonHighlight) {
                    classes += ' mint-msgbox-confirm-highlight';
                }
                return classes;
            },
            cancelButtonClasses() {
                let classes = 'mint-button mint-button--default mint-button--normal ' + this.cancelButtonClass;
                if (this.cancelButtonHighlight) {
                    classes += ' mint-msgbox-cancel-highlight';
                }
                return classes;
            },
            fullScreenClasses() {
                let classes = 'btn-full-screen';
                if(this.isMaximization){
                    classes += ' full-screen';
                }
                return classes
            }
        },
        methods: {
            handleAction(flag){
                let callbackRet = undefined;
                if(flag === 'pop' && this.disablePopEvent){
                    return;
                }
                if(this.callback){
                    callbackRet = this.callback(flag,this);
                }
                if(callbackRet === undefined){
                    setTimeout(()=>{
                        this.$el.querySelector('.mint-msgbox').className += ' v-modal-leave';
                        this.$el.querySelector('.pop').className += ' v-modal-leave';
                        this.$el.parentNode.removeChild(this.$el);
                    },200);
                }
                document.body.style.overflow = "auto";
            },
            close(){
                this.handleAction('cancel')
            },
            changeModalSize(){
                this.isMaximization = !this.isMaximization
                if(this.isMaximization){
                    this.width = '100%';
                    this.height = '100%';
                    return;
                }
                this.width = memoryWidth;
                this.height = memoryHeight;
            }
        },
        mounted() {
            document.body.style.overflow = "hidden";
        }
    }
</script>