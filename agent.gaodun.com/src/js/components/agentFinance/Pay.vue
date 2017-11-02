<template>
	<div>
		<el-form ref="form" :model="form" :rules="rules">
			<el-form-item label="账户类型" :label-width="formLabelWidth">
				<el-radio class="radio" v-model="finance_id" label="1">信用账户</el-radio>
  				<el-radio class="radio" v-model="finance_id" label="2">现金账户</el-radio>
			</el-form-item>
			<el-form-item label="充值金额"  :label-width="formLabelWidth" prop="money">
				<el-input v-model="form.money"></el-input>
			</el-form-item>
			<el-form-item :label-width="formLabelWidth" >
				<el-button type="primary" @click="savePay('form')">保存</el-button>
				<el-button  @click="oncancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import Vue from "vue";
import { MessageBox } from "element-ui";
import { pay, accountType, getAgentCount } from "../../api/agentFinance";

export default {
  props: ["modal", "financeId", "parent"],
  data() {
    var validateMoney = (rule, value, callback) => {
      /^\d*$/.test(this.form.money)
        ? callback()
        : callback(new Error("仅可输入大于等于0的正整数"));
    };
    return {
      finance_id: "2", //信用余额资金账户id
      // 1 代表现金账户  2代表信用账户
      form: {
        money: "" //充值金额
      },
      formLabelWidth: "120px",
      rules: {
        money: [
          { required: true, message: "请输入充值金额" },
          { validator: validateMoney }
        ]
      }
    };
  },
  methods: {
    //关闭弹层
    oncancel() {
      this.modal.close();
    },
    //保存充值金额
    async savePay(formName) {
      var self = this;
      if (this.finance_id === "2") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //现金账户
            this.$confirm(
              `确定为${this.financeId.agent_name}代理商${this.financeId
                .accountType}充值${this.form.money}元吗?`,
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            ).then(() => {
              pay({
                agentId: self.financeId.agentId, //代理商id
                amount: self.form.money, //充值金额
                financeId: self.financeId.accountBalancefinanceId //资金账户id
              }).then(result => {
                if (result.code === 0) {
                  self.$message({
                    message: result.message,
                    type: "success"
                  });
                  self.oncancel();
                  self.parent.RefreshDate();
                }
              });
            });
          }
        });
      } else if (this.finance_id === "1") {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //信用账户
            this.$confirm(
              `确定为${this.financeId.agent_name}代理商${this.financeId
                .creditType}充值${this.form.money}元吗?`,
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            ).then(() => {
              pay({
                agentId: self.financeId.agentId, //代理商id
                amount: self.form.money, //充值金额
                financeId: self.financeId.creditBalancefinanceId //资金账户id
              }).then(result => {
                if (result.code === 0) {
                  self.$message({
                    message: result.message,
                    type: "success"
                  });
                  self.oncancel();
                  self.parent.RefreshDate();
                }
              });
            });
          }
        });
      }
    }
  },
  mounted() {
    this.parent.RefreshDate();
  }
};
</script>