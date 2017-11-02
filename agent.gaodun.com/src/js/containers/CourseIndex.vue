<template>
	<div>
		<el-row>
			<el-col>
				<span>项目：</span>
				<el-select size="small" v-model="projectID">
					<el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
				<el-select size="small" v-model="searchTypeValue">
					<el-option v-for="item in seachTypeList" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
				<div class="input">
					<el-input size="small" v-model="searchText"></el-input>
				</div>
				<el-button size="small" type="primary" icon="search" @click="searchHandler">搜索</el-button>
				<el-button v-if="unlocking('Course_addDo')" size="small" type="primary" icon="plus" @click="getAdd" class="addBtn">新增</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading">
				<el-table-column prop="id" label="课程ID">
				</el-table-column>
				<el-table-column prop="name" label="课程名称">
				</el-table-column>
				<el-table-column prop="project_name" label="项目">
				</el-table-column>
				<el-table-column prop="vPrice" label="课程价格">
          <template scope="scope">
              <el-popover trigger="hover" placement="top">
                  <p>官方有营销活动，活动期间可能课程价格*折扣不等于代理价</p>
                  <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.vPrice }}</el-tag>
                  </div>
              </el-popover>
          </template>
				</el-table-column>
				<el-table-column prop="discount" label="最低折扣">
				</el-table-column>
				<el-table-column prop="price" label="最低价格">
				</el-table-column>
				<el-table-column prop="baiyi_code" label="CRM课程码" min-width="85px">
				</el-table-column>
				<el-table-column prop="vcourse_id" label="课程包ID">
				</el-table-column>
				<el-table-column prop="course_status" label="上下架">
				</el-table-column>
				<el-table-column prop="add_at" min-width="125px" label="创建时间">
				</el-table-column>
				<el-table-column v-if="unlocking(['Course_addToAgent','Course_upCourse','Course_downCourse','Course_editCse','Course_delCourse'])" align="center" label="操作" min-width="165px">
					<template scope="scope">
						<el-button v-if="unlocking('Course_addToAgent')" type="text" @click="addAgent(scope.$index)" size="small">加入代理商</el-button>
						<el-button v-if="unlocking('Course_upCourse') && scope.row.course_status === '已下架'" type="text" @click="up(scope.$index)" size="small">上架</el-button>
						<el-button v-if="unlocking('Course_downCourse') && scope.row.course_status === '已上架'" type="text" @click="down(scope.$index)" size="small">下架</el-button>
						<el-button v-if="unlocking('Course_editCse')" type="text" @click="handleEdit(scope.$index)" size="small">编辑</el-button>
						<el-button v-if="unlocking('Course_delCourse')" type="text" @click="deleteCourse(scope.$index)" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<el-row>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="totalNum" layout="prev, pager, next">
				</el-pagination>
			</div>
		</el-row>
	</div>
</template>

<script>
import modal from "vueModal";
import {
  getCourseList,
  getProjectList,
  getCourse,
  removeCourse,
  getAgentNum,
  upCourse,
  downCourse
} from "../api/course";
import { AGENT_USER_TYPE } from "../util/keys";

export default {
  data() {
    return {
      projectList: [],
      projectID: "",
      seachTypeList: [
        {
          id: 1,
          name: "课程名称"
        },
        {
          id: 2,
          name: "CRM课程码"
        },
        {
          id: 3,
          name: "课程包id"
        }
      ],
      searchTypeValue: 1,
      searchText: "",
      currentPage: 1,
      pageSize: 10,
      totalNum: "",
      tableData: [],
      loading: false
    };
  },
  computed: {
    userType() {
      return Number(localStorage.getItem(AGENT_USER_TYPE));
    }
  },
  methods: {
    //新增课程
    getAdd() {
      require.ensure(
        [],
        require => {
          let Course = require("../components/courseManager/Course.vue");
          modal.openComponent(Course, {
            title: "新增课程",
            parent: this
          });
        },
        "Course"
      );
    },
    // 编辑课程
    handleEdit(index) {
      require.ensure(
        [],
        require => {
          console.log(this);
          let Course = require("../components/courseManager/Course.vue");
          let courseInfo = this.tableData[index];
          modal.openComponent(Course, {
            title: "编辑课程",
            courseInfo: {
              id: courseInfo.id,
              name: courseInfo.name,
              coursePackageID: courseInfo.vcourse_id,
              price: courseInfo.vPrice,
              project: courseInfo.project_name,
              code: courseInfo.baiyi_code,
              discount: courseInfo.discount
            },
            parent: this
          });
        },
        "Course"
      );
    },
    // 删除课程
    async deleteCourse(index) {
      try {
        await this.$confirm("确定删除该课程？", "提示", {
          type: "warning"
        });
        let id = this.tableData[index].id;
        let result = await getAgentNum({ id });
        result.code === 0 &&
          result.data > 0 &&
          (await this.$confirm(`该课程已分配给${result.data}家代理商，确定删除？`, "提示", {
            type: "warning"
          }));
        result = await removeCourse({ id });
        if (result.code === 0) {
          this.MessageBox("删除成功！", "success");
          this.refreshDate();
        }
      } catch (err) {}
    },
    //上架
    async up(index) {
      try {
        await this.$confirm("确认要上架？", "上架", {
          type: "warning"
        });
        let result = await upCourse({
          id: this.tableData[index].id
        });
        if (result.code === 0) {
          this.MessageBox("上架成功！", "success");
          this.refreshDate();
        }
      } catch (err) {}
    },
    //下架
    async down(index) {
      try {
        await this.$confirm("确认要下架？", "下架", {
          type: "warning"
        });
        let result = await downCourse({
          id: this.tableData[index].id
        });
        if (result.code === 0) {
          this.MessageBox("下架成功！", "success");
          this.refreshDate();
        }
      } catch (err) {}
    },
    //搜索
    searchHandler() {
      this.refreshDate();
    },
    // 加入代理商
    addAgent(index) {
      require.ensure(
        [],
        require => {
          let AddAgent = require("../components/courseManager/AddAgent.vue");
          let courseInfo = this.tableData[index];
          modal.openComponent(AddAgent, {
            title: "加入代理商",
            parent: this,
            courseInfo: {
              id: courseInfo.id,
              price: courseInfo.vPrice
            }
          });
        },
        "AddAgent"
      );
    },
    async refreshDate() {
      this.loading = true;
      let courseList = await getCourseList({
        page: this.currentPage,
        pagesize: this.pageSize,
        projectid: this.projectID,
        searchmap: this.searchTypeValue,
        searchcontent: this.searchText
      });
      if (courseList.code === 0) {
        this.totalNum = Number(courseList.data.totalNums);
        this.tableData = courseList.data.list;
      }
      this.loading = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.refreshDate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshDate();
    },
    MessageBox(msg, typeIco) {
      this.$message({
        message: msg,
        type: typeIco
      });
    }
  },
  async created() {
    let result = await getProjectList();
    if (result.code === 0) {
      this.projectList = [
        {
          id: "",
          name: "全部"
        },
        ...result.data
      ];
    }
    this.refreshDate();
  }
};
</script>

<style scoped>
.addBtn {
  float: right;
}
</style>
