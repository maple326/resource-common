<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="学员手机号" :label-width="formLabelWidth" prop="phone">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button type="primary" @click="submit('form')" size="small">立即创建</el-button>
			<el-button  @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import cluesModal from "vueModal";
import { createOrder } from '../../api/product';

export default {
	props: [ 'modal','goodsInfo','parent'],
	data() {
		var validatePhone = (rule, value, callback) => {
			/^1(3|4|5|7|8)\d{9}$/.test(this.form.phone)? callback():callback(new Error('请输入11位有效的手机号'))
		};
		return {
			form: {
				phone:'',
			},
			formLabelWidth: '120px',
			rules: {
				phone: [
					{ required: true, message: '请输入手机号'},
					{validator:validatePhone}
				],
			}

		}
	},
	computed: {
	},
	methods: {
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		//提交的时候,验证表单的
		submit(formName) {
				require.ensure(
                	[],
					require => {
						let OrderA = require("./OrderA.vue");
						cluesModal.openComponent(OrderA, {
						title: "创建订单",
						goodsInfo:this.goodsInfo,
						phone:this.form.phone,
						parent:this.parent
							});
						},
						"OrderA"
				 );	
				this.oncancel();
		},
		//重置
		resetForm() {
			this.$refs["ruleFormProduct"].resetFields();
		},
	},
}
</script>
<style scoped>
.el-icon-loading:before{
	content: '';
}
</style>
