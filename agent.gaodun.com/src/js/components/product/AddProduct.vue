<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="选择代理商" :label-width="formLabelWidth">
			  	<el-autocomplete class="inline-input" v-model="queryAgent" :props="queryProps" :value="queryAgentId"  :fetch-suggestions="querySearchAgent" :trigger-on-focus="false" @select="handleSelectAgent"  placeholder="请输入内容"></el-autocomplete>
			</el-form-item>
			<el-form-item label="选择课程" :label-width="formLabelWidth">
				<el-autocomplete class="inline-input" v-model="queryCourse" :props="queryProps" :value="queryCourseId"  :fetch-suggestions="querySearchCourse" :trigger-on-focus="false" @select="handleSelectCourse"  placeholder="请输入内容"></el-autocomplete>
			</el-form-item>
			<el-form-item label="课程价格" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;border-radius:4px;width:190px; height:34px;border:1px solid #bfcbd9">{{form.CoursePrice}}</span>
			</el-form-item>
			<el-form-item label="折扣" :label-width="formLabelWidth" prop="Discount">
					<el-input v-model="form.Discount" @blur="countPrice()"></el-input>
			</el-form-item>
			<el-form-item label="最低价格" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;border-radius:4px;width:190px; height:34px;border:1px solid #bfcbd9">{{DiscountPrice}}</span>
			</el-form-item>
			<el-form-item label="库存" :label-width="formLabelWidth" prop="Stock">
				<el-input v-model="form.Stock"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button type="primary" @click="subitProduct('form')" size="small">保存</el-button>
			<el-button @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import Vue from 'vue';
import { MessageBox} from 'element-ui';
import { addProduct, getData, selectAgent, selectCourse, getVprice, discountLegal } from '../../api/product';
export default {
	props:['modal','parent'],
	data() {
		var validateDiscount = (rule, value, callback) => {
			/^0$|^0.\d{1}$|^0.\d{2}$|^1$/.test(this.form.Discount) ? callback() : callback(new Error('仅可输入0~1的两位小数'));
		};
		var validateStock = (rule ,value ,callback) => {
			 /^\d*$/.test(this.form.Stock) ? callback() : callback(new Error('仅可输入大于等于0的正整数'));
		};
		return {  
			queryProps: {
				value: 'name',
				label: 'name'
			},
			queryAgent:'',//查询代理商
			queryAgentId:'',//查询代理商id
			queryCourse:'',//查询课程
			queryCourseId:'',//查询课程id                         
			form: {
				AgentName: "",//代理商名称
				CourseName: "",//课程名称
				CoursePrice:'',//课程价格
				Discount: "",//折扣
				DiscountPrice: "",//折扣后的价格
				Stock: "",//库存
			},
			minDiscount:'',//最低折扣
			tips:'true',
			formLabelWidth: '120px',
			rules: {
				Discount: [
					{ required: true, message: '最低折扣不可为空'},
					{ validator: validateDiscount}
				],
				Stock: [
					{ required: true, message: '库存不可为空'},
					{ validator: validateStock}
				]
			},
		}
	},
	computed:{
		DiscountPrice(){
			this.form.DiscountPrice = (this.form.CoursePrice * this.form.Discount).toFixed(2) || '';
			return (this.form.CoursePrice * this.form.Discount).toFixed(2) || ''
		},
	},
	methods: {
		//关闭弹层
		oncancel() {
			this.modal.close();
		},
		//重置表单
		resetForm() {
			this.$refs["ruleFormProduct"].resetFields();
		},
		//模糊查询代理商
		async querySearchAgent(queryString, cb) {
            let result = await selectAgent({
                name: queryString
			});
            result.code === 0 && cb(result.data || []);
		},
        handleSelectAgent(item) {
            this.queryAgent = item.name;
            this.queryAgentId = item.id;
		},
		//模糊查询课程
		async querySearchCourse(queryString, cb) {
            let result = await selectCourse({
                groupname: queryString
            });
			result.code === 0 && cb(result.data || []);
        },
        handleSelectCourse(item) {
            this.queryCourse = item.name;
			this.queryCourseId = item.id;
			getVprice({
					courseid: this.queryCourseId
				}).then(result => {
					this.form.CoursePrice=result.data.vprice;
				});
		},
		//折扣输入框失去焦点的时候,自动计算价格,比较接口返回的价格和计算的价格是否相等
		countPrice() {
			discountLegal({
				discount: this.form.Discount,
				courseid: this.queryCourseId
			}).then(result => {
				if(result.code !=0){
					this.$message({
						message:result.message,
						type:'warning'
					})
				}
			});
		},
		//保存提交商品
		subitProduct(formName) {
			this.$refs[formName].validate((valid)=>{
				if(valid){
					addProduct({
						agentid:this.queryAgentId,
						courseid:this.queryCourseId,
						discount:this.form.Discount,
						counts:this.form.Stock,
						nowprice:this.form.DiscountPrice
					}).then(result => {
						if(result.code ===0){
							this.$message({
								message:'添加成功',
								type:'success'
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