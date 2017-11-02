<template>
    <div>
        <el-row>
            <el-col>
                <el-button v-if="unlocking('CourseGroup_addDo')" type="primary" size="small" icon="plus" @click="addGroup" class="addBtn">新增</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading">
                <el-table-column prop="id" label="分组ID">
                </el-table-column>
                <el-table-column prop="name" min-width="140" label="分组名称">
                </el-table-column>
                <el-table-column prop="courseNum" label="课程数量" min-width="120">
                </el-table-column>
                <el-table-column prop="create_at" min-width="115" label="创建时间">
                </el-table-column>
                <el-table-column v-if="unlocking(['CourseGroup_courseList','CourseGroup_edit','CourseGroup_delete'])" align="center" label="操作" min-width="120px">
                    <template scope="scope">
                        <el-button v-if="unlocking('CourseGroup_courseList')" type="text" @click="viewCourse(scope.row)" size="small">查看课程</el-button>
                        <el-button v-if="unlocking('CourseGroup_edit')" type="text" @click="handleEdit(scope.$index)" size="small">编辑</el-button>
                        <el-button v-if="unlocking('CourseGroup_delete')" type="text" @click="deleteCourse(scope.$index)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <div class="block">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="prev, pager, next">
                </el-pagination>
            </div>
        </el-row>
    </div>
</template>

<script>
import modal from "vueModal";
import {
  getCourseGroupList,
  removeCourseGroup,
  existCourse
} from "../api/courseGroup";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalNum: "",
      tableData: [],
      loading: false
    };
  },
  methods: {
    // 查看课程
    viewCourse(row) {
      this.$store.dispatch("setCurrentCourseGroup", {
        name: row.name
      });
      this.$router.push({
        path: `/CourseGroup/view/${row.id}`
      });
    },
    // 新增分组
    addGroup() {
      require.ensure(
        [],
        require => {
          let Course = require("../components/courseGroupManager/CourseGroup.vue");
          modal.openComponent(Course, {
            title: "新增分组",
            parent: this
          });
        },
        "CourseGroup"
      );
    },
    // 编辑课程
    handleEdit(index) {
      require.ensure(
        [],
        require => {
          let Course = require("../components/courseGroupManager/CourseGroup.vue");
          let currentCourseGroup = this.tableData[index];
          modal.openComponent(Course, {
            title: "编辑分组",
            parent: this,
            courseGroup: {
              id: currentCourseGroup.id,
              name: currentCourseGroup.name
            }
          });
        },
        "CourseGroup"
      );
    },
    // 删除课程
    async deleteCourse(index) {
      try {
        await this.$confirm("确定删除该分组？", "提示", {
          type: "warning"
        });
        let groupid = this.tableData[index].id;
        let result = await existCourse({
          groupid
        });
        result.code === 0 &&
          Number(result.data) > 0 &&
          (await this.$confirm(`该分组下有${result.data}个课程，确定删除？`, "提示", {
            type: "warning"
          }));
        result = await removeCourseGroup({
          groupid
        });
        if (result.code === 0) {
          this.$message({
            message: "删除成功！",
            type: "success"
          });
          this.refreshDate();
        }
      } catch (err) {}
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshDate();
    },
    onCourseTypeChange() {
      this.searchCourseSubType = "";
      //获取项目
      this.$store.dispatch("GetCouserSubType", {
        parentId: this.searchCourseType
      });
    },
    onShowSearch() {
      if (this.isShowSearch) this.isShowSearch = false;
      else this.isShowSearch = true;
    },
    async refreshDate() {
      this.loading = true;
      let result = await getCourseGroupList({
        page: this.currentPage,
        pagesize: this.pageSize
      });
      if (result.code === 0) {
        this.totalNum = Number(result.data.totalNums);
        this.tableData = result.data.list;
      }
      this.loading = false;
    }
  },
  created() {
    this.refreshDate();
  }
};
</script>

<style>
.dialog-footer {
  text-align: center;
}
</style>
