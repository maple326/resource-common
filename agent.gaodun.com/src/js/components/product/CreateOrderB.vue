<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="学员手机号" :label-width="formLabelWidth" prop="phone">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="支付价" :label-width="formLabelWidth" prop="payPrice">
                <el-input v-model="form.payPrice"></el-input>
            </el-form-item>
            <el-form-item label="订单号" :label-width="formLabelWidth" prop="orderNo">
                <el-input v-model="form.orderNo"></el-input>
            </el-form-item>
            <el-form-item label="付款时间" :label-width="formLabelWidth" class="datepicker" prop="payTime">
                <el-date-picker size="large" v-model="form.payTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="submit('form')" size="small">立即创建</el-button>
            <el-button @click="oncancel" size="small">取消</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import { MessageBox } from 'element-ui';
import cluesModal from "vueModal";
import { createOrder } from '../../api/product';
import { number2DateTime } from "../../util/util";

export default {
    props: ['modal','goodsInfo'],
    data() {
        var validatePhone = (rule, value, callback) => {
			/^1(3|4|5|7|8)\d{9}$/.test(this.form.phone)? callback():callback(new Error('请输入11位有效的手机号'))
		};
        var validatePayPrice = (rule,value,callback) =>{
           /^0$|^\+?[1-9][0-9]*$/.test(this.form.payPrice)?callback():callback(new Error('价格请输入大于等于0的整数'));
        };
        return {
            form: {
                phone:'',
                payPrice:'',
                orderNo:'',
                payTime:'',
            },
            formLabelWidth: '120px',
            rules: {
                phone: [
                    { required: true, message: '请输入手机号' },
                    { validator: validatePhone}
                ],
                payPrice: [
                    { required: true, message: '请输入支付价' },
                     { validator: validatePayPrice}
                ],
                orderNo: [
                    {required: true, message : '请输入订单号'},
                    {min:1, max:50, message:'订单号为50个字符以内'}
                ],
                payTime: [
                    { required: true, message: '请输入付款时间'},
                ],
            },
        }
    },
    computed: {
    },
    methods: {
        oncancel() {
            //关闭弹层
            this.modal.close();
            console.log(number2DateTime(this.form.payTime))
        },
        submit(formName) {
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    	require.ensure(
                	[],
					require => {
						let OrderB = require("./OrderB.vue");
						cluesModal.openComponent(OrderB, {
						title: "创建订单",
						goodsInfo:{
                            goodsId:this.goodsInfo.goodsId,
                            phone:this.form.phone,
                            payPrice:this.form.payPrice,
                            orderNo:this.form.orderNo,
                            payTime:number2DateTime(this.form.payTime),
                            courseName:this.goodsInfo.courseName,
                            coursePrice:this.goodsInfo.coursePrice
                        }
							});
						},
						"OrderB"
				 );	
				this.oncancel();
                }
            });
        },
        //重置
        resetForm() {
            this.$refs["ruleFormProduct"].resetFields();
        },
    },
    mounted() {
       


    }

}
</script>

<style scoped>
.el-icon-loading:before{
	content: '';
}
</style>
