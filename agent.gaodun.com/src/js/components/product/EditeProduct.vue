<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="课程" :label-width="formLabelWidth">
				<span class="text">{{courseInfo.course_name}}</span>
			</el-form-item>
			<el-form-item label="课程价格" :label-width="formLabelWidth">
				<span class="text">{{courseInfo.vPrice}}</span>
			</el-form-item>
			<el-form-item label="折扣" :label-width="formLabelWidth" prop="discount">
				<el-input v-model="form.discount" auto-complete="off" size="small"></el-input>
			</el-form-item>
			<el-form-item label="最低价格" :label-width="formLabelWidth">
				<span class="text">{{discountPrice}}</span>
			</el-form-item>
			<el-form-item label="库存" :label-width="formLabelWidth" prop="stock">
				<el-input v-model="form.stock" auto-complete="off" size="small"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button type="primary" @click="subitProduct('form')" size="small">保存</el-button>
			<el-button  @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>


<script type="text/javascript">
import Vue from 'vue';
import { MessageBox } from 'element-ui';
import { saveProduct } from '../../api/product';

export default {
	props: ['modal', 'courseInfo', 'parent'],
	data() {
		var validateDiscount = (rule, value, callback) => {
			/^0$|^0.\d{1}$|^0.\d{2}$|^1$/.test(this.form.discount) ? callback() : callback(new Error('仅可输入0~1的两位小数'));
		};
		var validateStock = (rule, value, callback) => {
			/^\d*$/.test(this.form.stock) ? callback() : callback(new Error('仅可输入大于等于0的正整数'));
		};
		return {
			form: {
				course_name: '',
				course_price: '',
				discount: this.courseInfo.discount,
				discountPrice:'',
				stock: this.courseInfo.counts
			},
			formLabelWidth: '120px',
			rules: {
				discount: [
					{ required: true, message: '最低折扣不可为空' },
					{ validator: validateDiscount }
				],
				stock: [
					{ required: true, message: '库存不可为空' },
					{ validator: validateStock }
				],
			}
		}
	},
	computed: {
		discountPrice() {
			this.form.discountPrice = (this.courseInfo.vPrice * this.form.discount).toFixed(2) || ''
			return (this.courseInfo.vPrice * this.form.discount).toFixed(2) || ''
		},
	},
	methods: {
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		//保存提交商品
		subitProduct(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					saveProduct({
						agentid: this.courseInfo.agent_id,
						courseid: this.courseInfo.course_id,
						discount: this.form.discount,
						counts: this.form.stock,
						nowprice:this.form.discountPrice
					}).then(result => {
						if (result.code === 0) {
							this.$message({
								message: '编辑成功',
								type: 'success'
							})
							this.oncancel();
							this.parent.RefreshDate();
						}
					})
				}
			})
		},
	},
}
</script>