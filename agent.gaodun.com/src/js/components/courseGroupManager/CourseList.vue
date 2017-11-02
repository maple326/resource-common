<template>
    <div>
        <div class="content-tabs product-index-style">
            <div class="module-clues-content">
                <div class="clues-content-label" style="padding-bottom: 21px">
                    <div>
                        <el-row>
                            <el-col>
                                <el-button v-if="unlocking('CourseGroup_addCourseToGroup')" type="primary" size="small" icon="plus" @click="addCourse">添加课程</el-button>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="clues-table producttable" style="margin-top: 14px;">
                        <el-row>
                          <el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading">
                              <el-table-column prop="course_id" label="课程ID">
                              </el-table-column>
                              <el-table-column prop="groupName" label="分组名称">
                              </el-table-column>
                              <el-table-column prop="name" min-width="140" label="课程名称">
                              </el-table-column>
                              <el-table-column prop="create_at" min-width="115" label="添加时间">
                              </el-table-column>
                              <el-table-column v-if="unlocking('CourseGroup_courseDelete')" align="center" label="操作" min-width="120px">
                                  <template scope="scope">
                                      <el-button type="text" @click="deleteCourse(scope.$index)" size="small">删除</el-button>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "vueModal";
import { getCourseList, removeCourse } from "../../api/courseGroup";
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      loading: false
    };
  },
  computed: mapGetters(['currentGroupName']),
  methods: {
    addCourse() {
      require.ensure(
        [],
        require => {
          let Course = require("./Course.vue");
          modal.openComponent(Course, {
            title: "添加课程",
            groupID: this.$route.params.groupID,
            parent: this
          });
        },
        "CourseGroup"
      );
    },
    // 删除课程
    async deleteCourse(index) {
      try {
        await this.$confirm("确定删除该课程？", "提示", {
          type: "warning"
        });
        let result = await removeCourse({
          groupid: this.$route.params.groupID,
          courseid: this.tableData[index].course_id
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
    async refreshDate() {
      this.loading = true;
      let result = await getCourseList({
        groupid: this.$route.params.groupID,
        page: this.currentPage,
        pagesize: this.pageSize
      });
      if (result.code === 0) {
        let tableData = result.data.list || [];
        this.totalNum = Number(result.data.totalNums);
        this.tableData = tableData.map(item => ({
          ...item,
          groupName: this.currentGroupName
        }));
      }
      this.loading = false;
    }
  },
  created() {
    this.refreshDate();
  }
};
</script>