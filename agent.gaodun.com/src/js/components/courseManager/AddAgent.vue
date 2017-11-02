<template>
    <el-tabs type="border-card">
        <el-tab-pane label="添加单个代理商">
            <el-form :model="form" ref="form" :rules="rules" label-width="120px">
                <el-form-item v-if="parent.userType === 2" label="代理商" prop="agentID">
                    <el-autocomplete class="inline-input" v-model="form.agentInput" :fetch-suggestions="querySearch" :props="form.agent" placeholder="单个添加请输入查询并选择代理商" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item label="课程价格">
                    <span class="text">{{courseInfo.price}}</span>
                </el-form-item>
                <el-form-item label="折扣" prop="discount">
                    <el-input v-model="form.discount"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <span class="text">{{discountPrice}}</span>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="form.stock"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" style="padding-top: 15px">
                <el-button @click="submit('form')" type="primary" size="small">确认</el-button>
                <el-button @click="cancel" size="small">取消</el-button>
            </div>
        </el-tab-pane>
        <el-tab-pane label="添加全部代理商">
            <el-form :model="form" ref="form2" :rules="rules" label-width="120px">
                <el-form-item v-if="parent.userType === 2" label="渠道">
                    <el-select v-model="form.department" placeholder="批量添加请选择渠道">
                        <el-option v-for="item in form.departmentList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程价格">
                    <span class="text">{{courseInfo.price}}</span>
                </el-form-item>
                <el-form-item label="折扣" prop="discount">
                    <el-input v-model="form.discount"></el-input>
                </el-form-item>
                <el-form-item label="价格">
                    <span class="text">{{discountPrice}}</span>
                </el-form-item>
                <el-form-item label="库存" prop="stock">
                    <el-input v-model="form.stock"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" style="padding-top: 15px">
                <el-button @click="submit('form2')" type="primary" size="small">确认</el-button>
                <el-button @click="cancel" size="small">取消</el-button>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import {
  checkDiscount,
  getAgentNumByDepartment,
  addAgent
} from "../../api/course";
import { getDepartmentList, getAgentListByKeyword } from "../../api/user";

export default {
  data() {
    var validateAgent = (rule, value, callback) => {
      this.form.agentID === ""
        ? callback(new Error("请在下拉框中选择代理商"))
        : callback();
    };
    var validateDiscount = async function(rule, value, callback) {
      /^0$|^0.\d{1}$|^0.\d{2}$|^1$/.test(value)
        ? callback()
        : callback(new Error("仅可输入0~1的两位小数"));
    };
    var validateStock = (rule, value, callback) => {
      /^\d*$/.test(value) ? callback() : callback(new Error("仅可输入大于等于0的正整数"));
    };
    return {
      form: {
        departmentList: [],
        department: "",
        agent: {
          value: "id",
          label: "name"
        },
        agentInput: "",
        agentID: "",
        discount: "",
        stock: "" //库存
      },
      rules: {
        agentID: [{ validator: validateAgent }],
        discount: [
          { required: true, message: "最低折扣不可为空" },
          { validator: validateDiscount }
        ],
        stock: [
          { required: true, message: "库存不可为空" },
          { validator: validateStock }
        ]
      }
    };
  },
  props: ["modal", "courseInfo", "parent"],
  computed: {
    discountPrice() {
      return (this.courseInfo.price * this.form.discount).toFixed(2) || "";
    }    
  },
  methods: {
    async querySearch(queryString, cb) {
      this.form.agentID = "";
      let result = await getAgentListByKeyword({
        name: queryString
      });
      result.code === 0 && cb(result.data);
    },
    handleSelect(item) {
      this.form.agentID = item.id;
      this.form.agentInput = item.name;
    },
    submit(formName) {
      let self = this;
      this.$refs[formName].validate(async function(valid) {
        if (valid) {
          try {
            let result;
            if (formName === "form2") {
              result = await getAgentNumByDepartment({
                departs: self.form.department,
                courseid: self.courseInfo.id
              });
              if (result.code === 0) {
                if (Number(result.data) > 0) {
                  await self.$confirm(
                    `${result.data}家代理商已有该课程。确定将课程添加给没有该课程的代理商？`,
                    "提示",
                    {
                      type: "warning"
                    }
                  );
                }
              } else {
                return;
              }
            }
            result = await checkDiscount({
              courseid: self.courseInfo.id,
              discount: self.form.discount
            });
            result.code === 0 && self.addAgentHandler();
          } catch (err) {}
        }
      });
    },
    // 添加代理商
    async addAgentHandler() {
      let result = await addAgent({
        courseid: this.courseInfo.id,
        departs: this.form.department,
        agentid: this.form.agentID,
        discount: this.form.discount,
        counts: this.form.stock,
        nowprice: this.discountPrice
      });
      if (result.code === 0) {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
        this.cancel();
        this.parent.refreshDate();
      }
    },
    cancel() {
      this.modal.close();
    }
  },
  async created() {
    let result = await getDepartmentList();
    if (result.code === 0) {
      let list = result.data;
      this.form.departmentList = list;
    }
  }
};
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
