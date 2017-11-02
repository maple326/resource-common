<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules">
			<el-form-item label="增加额度" :label-width="formLabelWidth" prop="addcredit">
				<el-input v-model="form.addcredit"></el-input>
			</el-form-item>
            <el-form-item label="tips:" :label-width="formLabelWidth">
				<span>有信用额度的可先开课后结账</span>
			</el-form-item>
			<el-form-item :label-width="formLabelWidth">
				<el-button type="primary" @click="saveCredit('form')">保存</el-button>
				<el-button @click="oncancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import Vue from "vue";
import { MessageBox } from "element-ui";
import { creatCredit } from "../../api/agentFinance";

export default {
  props: ["modal", "agentInfo", "parent"],
  data() {
    var validateCredit = (rule, value, callback) => {
      /^\d*$/.test(this.form.addcredit)
        ? callback()
        : callback(new Error("仅可输入大于等于0的正整数"));
    };
    return {
      form: {
        addcredit: ""
      },
      formLabelWidth: "120px",
      rules: {
        addcredit: [
          { required: true, message: "请输入增加的额度" },
          { validator: validateCredit }
        ]
      }
    };
  },
  computed: {},
  methods: {
    //关闭弹层
    oncancel() {
      this.modal.close();
    },

    //增加额度
    saveCredit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          creatCredit({
            agentId: this.agentInfo.agentId,
            amount: this.form.addcredit
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
};
</script>