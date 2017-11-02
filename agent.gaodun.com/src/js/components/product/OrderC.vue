<template>
	<div>
		<el-form :model="form" ref="form">
			<el-form-item label="课程名称" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;width:200px;height:36px">{{form.course_name}}</span>
			</el-form-item>
      <el-form-item label="课程价格" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;width:200px;height:36px">{{form.course_price}}</span>
			</el-form-item>
      <el-form-item label="支付价" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;width:200px;height:36px">{{form.agent_price}}</span>
			</el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;width:200px;height:36px">{{form.phone}}</span>
			</el-form-item>
            <el-form-item label="支付方式" :label-width="formLabelWidth">
				<span class="text" style="display:inline-block;width:200px;height:36px">{{form.pay_type}}</span>
			</el-form-item>
		</el-form>
    <div style="margin-left:50px;width:250px;margin-bottom:20px">
      创建订单后没有高顿账号会自动以手机号创建高顿账户,并自动开课,短信通知学生,确定创建?
		</div>
		<div class="dialog-footer">
			<el-button type="primary" @click="submit('form')" size="small">确定</el-button>
			<el-button  @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>

<script>
import Vue from "vue";
import { MessageBox } from "element-ui";
import {createOrder} from "../../api/product";
import cluesModal from "vueModal";
export default {
  props: ["modal","goodsInfo"],
  data() { 
    return {
      form: {
        course_name:this.goodsInfo.courseName,
        course_price:this.goodsInfo.coursePrice,
        agent_price:this.goodsInfo.payPrice,
        pay_type:this.goodsInfo.type,  //支付方式
        phone: this.goodsInfo.phone
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
      //关闭弹窗
      oncancel(){
          this.modal.close();
      },
      //提交
      submit(formName){
          var self=this;
          this.$refs[formName].validate((valid)=>{
            console.log(this.goodsInfo.typeId)
            if(valid){
              createOrder({
                phone:this.form.phone,
                goodsId:this.goodsInfo.goodsId,
                payPrice:this.goodsInfo.payPrice,
                payOrderid:this.goodsInfo.orderNo,
                payTime:this.goodsInfo.payTime,
                payType:this.goodsInfo.typeId
              }).then(result=>{
                console.log(this.goodsInfo.typeId)
                if(result.code===0){
                    self.$message({
                      message:result.message,
                      type:'success'
                    });
                    self.oncancel();
                }
              });
            }
          })
      }
  },
  mounted() {}
};
</script>
