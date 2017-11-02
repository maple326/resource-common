<template>
	<div>
		<el-form :model="form" ref="form" :rules="rules">
			<el-form-item label="选择代理商" :label-width="formLabelWidth">
				<el-autocomplete class="inline-input" :trigger-on-focus="false" v-model="queryAgent" :value="queryAgentId" :fetch-suggestions="querySearchAgent" placeholder="请输入内容" @select="handleSelectAgent"></el-autocomplete>
			</el-form-item>
			<el-form-item label="课程分组" :label-width="formLabelWidth">
				<el-select v-model="form.groupId" placeholder="请选择">
					<el-option v-for="item in form.CourseGroup" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="折扣" :label-width="formLabelWidth" prop="Discount">
				<el-input v-model="form.Discount"></el-input>
			</el-form-item>
			<el-form-item label="库存" :label-width="formLabelWidth" prop="Stock">
				<el-input v-model="form.Stock"></el-input>
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button type="primary" @click="submitProduct('form')" size="small">确定</el-button>
			<el-button @click="oncancel" size="small">取消</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import Vue from "vue";
import { MessageBox } from "element-ui";
import {
  saveProduct,
  selectAgent,
  getCourseGroup,
  accordingGroup,
  queryAgentNumber,
  getData
} from "../../api/product";

export default {
  props: ["modal",'parent'],
  data() {
    var validateDiscount = (rule, value, callback) => {
      /^0$|^0.\d{1}$|^0.\d{2}$|^1$/.test(this.form.Discount)
        ? callback()
        : callback(new Error("仅可输入0~1的两位小数"));
    };
    var validateStock = (rule, value, callback) => {
      /^\d*$/.test(this.form.Stock)
        ? callback()
        : callback(new Error("仅可输入大于等于0的正整数"));
    };
    return {
      queryAgent: "",
      queryAgentId: "",
      form: {
        CourseGroup: [],
        groupId: "",
        AgentName: "",
        Discount: "",
        Stock: ""
      },
      formLabelWidth: "120px",
      rules: {
        Discount: [
          { required: true, message: "最低折扣不可为空" },
          { validator: validateDiscount }
        ],
        Stock: [
          { required: true, message: "库存不可为空" },
          { validator: validateStock }
        ]
      }
    };
  },
  created() {
    //this.parent.RefreshDate();
    //获取课程分组
    getCourseGroup().then(result => {
      this.form.CourseGroup = result.data;
    });
  },
  methods: {
    //关闭弹层
    oncancel() {
      this.modal.close();
    },
    //模糊查询代理商
    async querySearchAgent(queryString, cb) {
      let result = await selectAgent({
        name: queryString
      });
      let arr = [{ value: "1" }];
      result.code === 0 && cb(result.data.map(this.createFilter));
    },
    createFilter(item) {
      return {
        id: item.id,
        value: item.name
      };
    },
    handleSelectAgent(item) {
      this.queryAgent = item.value;
      this.queryAgentId = item.id;
    },
    //提交表单
    submitProduct(formName) {
      var self = this;
      this.$refs[formName].validate(async function(valid) {
        if (valid) {
          try {
            let result;
            result = await queryAgentNumber({
              groupid: self.form.groupId,
              agentId: self.queryAgentId
            });
            if (result.code === 0) {
              if (Number(result.data) > 0) {
                self
                  .$confirm(`该代理商已有${result.data}门该课程。确定将未分配的课程分配给代理商？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  })
                  .then(() => {
                    accordingGroup({
                      agentid: self.queryAgentId,
                      group_id: self.form.groupId,
                      discount: self.form.Discount,
                      counts: self.form.Stock
                    }).then(result => {
                      if (result.code === 0) {
                        self.$message({
                          message: "添加成功",
                          type: "success"
                        });
                        self.oncancel();
                        self.parent.RefreshDate();
                      }
                    });
                  });
              }else{
                   accordingGroup({
                    agentid: self.queryAgentId,
                    group_id: self.form.groupId,
                    discount: self.form.Discount,
                    counts: self.form.Stock
                  }).then(result => {
                    if (result.code === 0) {
                      self.$message({
                        message: "添加成功",
                        type: "success"
                      });
                      self.oncancel();
                      self.parent.RefreshDate();
                    }
                  });
              }
            }
          } catch (error) {}
        }
      });
    },
  },
  mounted() {
    this.parent.RefreshDate();
  }
};
</script>
