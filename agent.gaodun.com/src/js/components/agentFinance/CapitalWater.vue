<template>
	<div>
		<el-row>
			<el-col>
        <div v-if="userType === 2" class="inline-block">
          <span>渠道:</span>
          <el-select size="small" v-model="departmentID">
            <el-option v-for="item in departmentList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </div>
        <div v-if="userType === 2" class="inline-block">
          <span>代理商:</span>
				  <el-autocomplete size="small" v-model="agentName" :fetch-suggestions="querySearch" :props="agent" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
        </div>		
				<span>账户:</span>
				<el-select size="small" v-model="accountTypeID">
					<el-option v-for="item in accountType" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
				<span>类型:</span>
				<el-select size="small" v-model="flowTypeID">
					<el-option v-for="item in flowType" :key="item.id" :value="item.id" :label="item.name"></el-option>
				</el-select>
			</el-col>
		</el-row>
		<el-row>
			<span>时间段:</span>
			<el-date-picker size="small" v-model="startTime" type="date" placeholder="开始时间"></el-date-picker>
			<span>至</span>
			<el-date-picker size="small" v-model="endTime" type="date" placeholder="结束时间"></el-date-picker>
			<el-button size="small" type="primary" icon="search" @click="searchHandler">搜索</el-button>
		</el-row>
		<el-row>
			<el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange">
				<el-table-column prop="agent_name" label="代理商">
				</el-table-column>
				<el-table-column prop="finnace_id" label="资金账户">
				</el-table-column>
				<el-table-column prop="flow_id" label="流水号">
				</el-table-column>
				<el-table-column prop="order_id" label="订单号">
				</el-table-column>
				<el-table-column prop="remark" label="事项">
				</el-table-column>
				<el-table-column prop="type" label="类型">
				</el-table-column>
				<el-table-column prop="status" label="借贷">
				</el-table-column>
				<el-table-column prop="amount" label="金额">
				</el-table-column>
				<el-table-column prop="create_time" label="时间" min-width="90px">
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
import { getDepartmentList, getAgentListByKeyword } from "../../api/user";
import {
  getAccountType,
  getAccountFlowType,
  getAccountFlowList
} from "../../api/capitalFlow";
import { AGENT_USER_TYPE } from "../../util/keys";
import { format } from "../../util/util";

export default {
  data() {
    return {
      departmentList: [],
      departmentID: "",
      agent: {
        value: "id",
        label: "name"
      },
      agentID: "",
      agentName: "",
      accountType: [],
      accountTypeID: "",
      flowType: [],
      flowTypeID: "",
      startTime: "",
      endTime: "",
      currentPage: 1,
      pageSize: 10,
      tableData: [],
      loading: false
    };
  },
  computed: {
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
    },
    userType() {
      return Number(localStorage.getItem(AGENT_USER_TYPE));
    }
  },
  methods: {
    async querySearch(queryString, cb) {
      this.agentID = "";
      let result = await getAgentListByKeyword({
        name: queryString
      });
      result.code === 0 && cb(result.data);
    },
    handleSelect(item) {
      this.agentID = item.id;
      this.agentName = item.name;
    },
    //搜索
    searchHandler() {
      this.refreshDate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.refreshDate();
    },
    async refreshDate() {
      this.loading = true;
      let result = await getAccountFlowList({
        page: this.currentPage,
        pageSize: this.pageSize,
        departId: this.departmentID,
        agentId: this.agentName ? this.agentID : "",
        accountType: this.accountTypeID,
        flowType: this.flowTypeID,
        startTime: this.formatStartTime,
        endTime: this.formatEndTime
      });
      if (result.code === 0) {
        this.totalNum = Number(result.data.totalNums);
        this.tableData = result.data.list;
      }
      this.loading = false;
    }
  },
  async created() {
    let result = await getDepartmentList();
    if (result.code === 0) {
      this.departmentList = result.data;
    }
    result = await getAccountType();
    if (result.code === 0) {
      this.accountType = [
        {
          id: "",
          name: "全部"
        },
        ...result.data
      ];
    }
    result = await getAccountFlowType();
    if (result.code === 0) {
      this.flowType = [
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
.inline-block {
  display: inline-block;
}
</style>
