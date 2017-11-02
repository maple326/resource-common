<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules">
			<el-form-item label="减少额度" :label-width="formLabelWidth" prop="upcredit">
				<el-input v-model="form.upcredit"></el-input>
			</el-form-item>
            <el-form-item label="tips:" :label-width="formLabelWidth">
				<span>有信用额度的可先开课后结账</span>
			</el-form-item>
			<el-form-item :label-width="formLabelWidth">
				<el-button type="primary" @click="saveCredit('form')">保存</el-button>
				<el-button  @click="oncancel()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import Vue from "vue";
import { MessageBox } from "element-ui";
import { upCredit } from "../../api/agentFinance";

export default {
  props: ["modal", "agentInfo", "parent"],
  data() {
    var validateCredit = (rule, value, callback) => {
      /^\d*$/.test(this.form.upcredit)
        ? callback()
        : callback(new Error("仅可输入大于等于0的正整数"));
    };
    return {
      form: {
        upcredit: ""
      },
      formLabelWidth: "120px",
      rules: {
        upcredit: [
          { required: true, message: "请输入减少的额度" },
          { validator: validateCredit }
        ]
      }
    };
  },
  methods: {
    //关闭弹层
    oncancel() {
      this.modal.close();
    },
    //保存
    saveCredit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          upCredit({
            agentId: this.agentInfo.agentId,
            amount: this.form.upcredit
          }).then(result => {
            if (result.code === 0) {
              this.$message({
                message: result.message,
                type: "success"
              });
              this.oncancel();
              this.parent.RefreshDate();
            }
          });
        }
      });
    }
  },
  mounted() {}
};
</script>