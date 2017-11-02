<template>
	<div>
		<el-row>
			<el-col>
        <div v-if="userType === 2" class="inline-block">
          <span>渠道:</span>
          <el-select size="small" v-model="departmentID" placeholder="请选择">
            <el-option v-for="item in departmentList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </div>
        <div v-if="userType === 2" class="inline-block">
          <span>代理商:</span>
          <el-autocomplete size="small" v-model="agentName" :value="agentID" :fetch-suggestions="querySearch" :props="agent" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </div>
				<span>项目:</span>
				<el-select size="small" v-model="projectID" placeholder="全部">
					<el-option v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<span>订单创建时间:</span>
				<el-date-picker size="small" v-model="startTime" type="date" placeholder="选择日期"></el-date-picker>
				<span>至</span>
				<el-date-picker size="small" v-model="endTime" type="date" placeholder="选择日期"></el-date-picker>
				<span>订单状态:</span>
				<el-select size="small" v-model="statusID" placeholder="请选择">
					<el-option v-for="item in status" :key="item.id" :value="item.id" :label="item.text"></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<el-col>
				<span>学员手机号:</span>
				<div class="input">
					<el-input v-model="cellphone" size="small"></el-input>
				</div>
				<span>课程名称:</span>
				<div class="input">
          <el-autocomplete size="small" v-model="courseName" :value="courseID" :fetch-suggestions="courseQuerySearch" :props="course" :trigger-on-focus="false" @select="courseHandleSelect"></el-autocomplete>
				</div>
				<el-button size="small" type="primary" icon="search" @click="searchHandler">搜索</el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange" style="width: 100%">
				<el-table-column prop="pay_orderid" min-width="140" label="订单号">
				</el-table-column>
				<el-table-column prop="course_name" min-width="140" label="课程名称">
				</el-table-column>
				<el-table-column prop="project_name" min-width="125" label="项目">
				</el-table-column>
				<el-table-column prop="phone" min-width="110" label="手机号">
				</el-table-column>
				<el-table-column prop="price" min-width="80" label="课程价格">
				</el-table-column>
				<el-table-column prop="pay_price" label="代理价" min-width="120">
				</el-table-column>
				<el-table-column prop="agent_name" label="代理商" min-width="120">
				</el-table-column>
				<el-table-column prop="create_at" min-width="110" label="订单创建时间">
				</el-table-column>
				<el-table-column prop="update_at" min-width="110" label="最近修改时间">
				</el-table-column>
				<el-table-column prop="order_status" min-width="110" label="订单状态">
				</el-table-column>
				<el-table-column v-if="unlocking(['Order_refunds','Order_refundsCheck','Order_refundsCancle'])" align="center" label="操作" min-width="220px">
					<template scope="scope">
						<el-button v-if="unlocking('Order_refunds')" type="text" @click="refund(scope.$index)" size="small">退款</el-button>
						<el-button v-if="unlocking('Order_refundsCheck')" type="text" @click="refund(scope.$index)" size="small">审核退款</el-button>
						<el-button v-if="unlocking('Order_refundsCancle')" type="text" @click="refund(scope.$index)" size="small">取消退款</el-button>
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
import { getDepartmentList, getAgentListByKeyword } from "../api/user";
import { getProjectList, searchCourseList } from "../api/course";
import { getOrderList } from "../api/order";
import { format } from "../util/util";
import { AGENT_USER_TYPE } from "../util/keys";

export default {
  data() {
    return {
      departmentList: [],
      departmentID: "",
      agent: {
        value: "id",
        label: "name"
      },
      agentName: [],
      agentID: "",
      projectList: [],
      projectID: "",
      startTime: "",
      endTime: "",
      status: [
        {
          id: "",
          text: "全部"
        },
        {
          id: 1,
          text: "已支付"
        },
        {
          id: 2,
          text: "退款中"
        },
        {
          id: 3,
          text: "已退款"
        },
        {
          id: 4,
          text: "退款审核不通过"
        }
      ],
      statusID: "",
      cellphone: "",
      course: {
        value: "id",
        label: "name"
      },
      courseName: "",
      courseID: "",
      pageSize: 10,
      totalNum: "",
      tableData: []
    };
  },
  computed: {
    userType() {
      return Number(localStorage.getItem(AGENT_USER_TYPE));
    },
    formatStartTime() {
      let startTime = this.startTime;
      if (startTime) {
        return format(startTime);
      }
    },
    formatEndTime() {
      let endTime = this.endTime;
      if (endTime) {
        return format(endTime);;
      }
    }
  },
  methods: {
    async querySearch(queryString, cb) {
      this.agentID = "";
      let result = await getAgentListByKeyword({
        name: queryString
      });
      result.code === 0 && cb(result.data || []);
    },
    handleSelect(item) {
      this.agentID = item.id;
      this.agentName = item.name;
    },
    async courseQuerySearch(queryString, cb) {
      this.courseID = "";
      let result = await searchCourseList({
        groupname: queryString
      });
      result.code === 0 && cb(result.data || []);
    },
    courseHandleSelect(item) {
      this.courseID = item.id;
      this.courseName = item.name;
    },
    // 搜索
    searchHandler(ev) {
      this.refreshDate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshDate();
    },
    async refreshDate() {
      let result = await getOrderList({
        agentId: this.agentID,
        channelId: this.departmentID,
        projectId: this.projectID,
        page: this.currentPage,
        pageSize: this.pageSize,
        phone: this.cellphone,
        courseId: this.courseName ? this.courseID : "",
        orderStatus: this.statusID,
        startTime: this.formatStartTime,
        endTime: this.formatEndTime
      });
      if (result.code === 0) {
        this.totalNum = Number(result.data.totalNums);
        this.tableData = result.data.list;
      }
    },
    // 退款
    refund(index) {}
  },
  async created() {
    let result = await getDepartmentList();
    if (result.code === 0) {
      this.departmentList = result.data;
    }
    result = await getProjectList();
    if (result.code === 0) {
      this.projectList = result.data;
      this.projectList.unshift({
        id: null,
        name: "全部"
      });
    }
    this.refreshDate();
  }
};
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
</style>