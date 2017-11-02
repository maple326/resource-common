<template>
    <div class="list">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="userName"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" state="success"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
        <mt-field label="网站" placeholder="请输入网址" type="url"></mt-field>
        <mt-field label="数字" placeholder="请输入数字" type="number" ></mt-field>
        <mt-field label="生日" placeholder="请输入生日" type="date"></mt-field>
        <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="value"></mt-field>
        <button  @click="sayHello">dddd</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Field } from 'mint-ui';
    Vue.component(Field.name,Field);
    export default {
        name:'my-list',
        props:['title','data','self','modal'],
        data(){
            return {
                userName: '张三',
                value : this.self.$store.state.list.number,
            }
        },

        computed:   {
        },
        methods: {
            sayHello(){
                this.modal.close();
                this.self.$store.dispatch('updateNumber',this.value);
            }
        },
        mounted(){

            //this.value = this.store.state.list.number;
        }
    }
</script>