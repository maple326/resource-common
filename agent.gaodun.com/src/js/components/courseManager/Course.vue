<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules" label-width="120px">
			<el-form-item label="课程名称" prop="name">
				<el-input v-model="form.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="课程包ID" prop="coursePackageID">
				<el-input v-if="!this.courseInfo" v-model="form.coursePackageID" @blur="getCourseHandler" auto-complete="off"></el-input>
				<span v-if="this.courseInfo" class="text">{{form.coursePackageID}}</span>
			</el-form-item>
			<el-form-item v-show="form.price" label="课程价格">
				<span class="text">{{form.price}}</span>
			</el-form-item>
			<el-form-item v-show="form.project" label="项目">
				<span class="text">{{form.project}}</span>
			</el-form-item>
			<el-form-item v-show="form.code" label="CRM课程码">
				<span class="text">{{form.code}}</span>
			</el-form-item>
			<el-form-item label="最低折扣" prop="discount">
				<el-input v-model="form.discount" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="最低价格">
				<span class="text">{{minPrice}}</span>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button type="primary" @click="submit('form')" size="small">保存</el-button>
			<el-button @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>

<script>
import { addCourse, editCourse, getCourse } from '../../api/course';

export default {
	data() {
		let validatePackageID = (rule, value, callback) => {
			/^\d*$/.test(this.form.coursePackageID) ? callback() : callback(new Error('非数字不可输入'));
		};
		let validateDiscount = (rule, value, callback) => {
			/^0$|^0.\d{1}$|^0.\d{2}$|^1$/.test(this.form.discount) ? callback() : callback(new Error('仅可输入0~1的两位小数'));
		};
		return {
			form: {
				id: '',
				name: '',
				coursePackageID: '',
				price: '',
				project: '',
				code: '',
				discount: '',
			},
			rules: {
				name: [
					{ required: true, message: '课程产品名称不能为空' },
					{ min: 1, max: 100, message: '课程名称100个字符以内' },
				],
				coursePackageID: [
					{ required: true, message: '课程包id不可为空' },
					{ validator: validatePackageID }
				],
				discount: [
					{ required: true, message: '最低折扣不可为空' },
					{ validator: validateDiscount }
				]
			}
		}
	},
	props: ['modal', 'courseInfo', 'parent'],
	computed: {
		minPrice() {
			return (this.form.price * this.form.discount).toFixed(2) || '';
		}
	},
	methods: {
		getCourseHandler() {
			this.form.price = '';
			this.form.project = '';
			this.form.code = '';
			getCourse({
				courseid: this.form.coursePackageID
			})
				.then(result => {
					if (result.code === 0) {
						this.form.price = result.data.vprice;
						this.form.project = result.data.projectName;
						this.form.code = result.data.crmCode;
					}
				});
		},
		oncancel() {
			//关闭弹层
			this.modal.close();
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.courseInfo) {
						editCourse({
							id: this.form.id,
							courseid: this.form.coursePackageID,
							name: this.form.name,
							discount: this.form.discount,
							nowprice: this.minPrice
						})
							.then(result => {
								if (result.code === 0) {
									this.MessageBox('保存成功！', 'success');
									this.oncancel();
									this.parent.refreshDate();
								}
							});
					} else {
						addCourse({
							courseid: this.form.coursePackageID,
							name: this.form.name,
							discount: this.form.discount,
							nowprice: this.minPrice
						})
							.then(result => {
								if (result.code === 0) {
									this.MessageBox('添加成功！', 'success');
									this.oncancel();
									this.parent.refreshDate();
								}
							});
					}
				} else {
					return false;
				}
			});
		},
		MessageBox(msg, typeIco) {
			this.$message({
				message: msg,
				type: typeIco
			});
		},
	},
	created() {
		if (this.courseInfo) {
			this.form = Object.assign({}, this.form, this.courseInfo);
		}
	}
}
</script>

<style scoped>
.el-form {
	width: 400px;
}

.el-select,
.el-autocomplete {
	width: 100%;
}
</style>

