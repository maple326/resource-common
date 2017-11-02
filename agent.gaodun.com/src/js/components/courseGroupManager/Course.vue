<template>
	<div class="addContent addPack" id="product-addcontent">
		<el-form label-width="100px" label-position="left">
			<el-form-item label="选择课程：">
				<el-autocomplete class="inline-input" v-model="form.name" :fetch-suggestions="querySearch" :props="form.course" :trigger-on-focus="false"></el-autocomplete>
			</el-form-item>
		</el-form>
		<div class="dialog-footer" style="padding-top: 15px">
			<el-button type="primary" @click="save" size="small">保存</el-button>
			<el-button @click="cancel" size="small">取消</el-button>
		</div>
	</div>
</template>

<script>
import { searchCourseList } from "../../api/course";
import { addCourse } from "../../api/courseGroup";

export default {
  data() {
    return {
      form: {
        name: "",
        course: {
          value: "name",
          label: "name"
        }
      }
    };
  },
  props: ["modal", "groupID", "parent"],
  methods: {
    async querySearch(queryString, cb) {
      let result = await searchCourseList({
        groupname: queryString
      });
      result.code === 0 && cb(result.data || []);
    },
    async save() {
      let result = await addCourse({
        groupid: this.groupID,
        coursename: this.form.name
      });
      if (result.code === 0) {
        this.$message({
          message: "添加成功！",
          type: "success"
        });
        this.cancel();
        this.parent.refreshDate();
      }
    },
    cancel() {
      this.modal.close();
    }
  }
};
</script>

<style scoped>

</style>
