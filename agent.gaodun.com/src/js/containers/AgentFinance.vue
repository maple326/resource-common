<template>
	<div>
		<div>
			<div>
				<div>
					<div style="margin-bottom:10px;">
						<el-row>
							<el-col :span="6" v-if="userType===2">
								<span style="width: 50px;height: 28px;display:inline-block; font-size:16px;">渠道:</span>
								<el-select placeholder="请选择" v-model="channel">
									<el-option v-for="item in channelInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
							</el-col>
							<el-col :span="18" style="font-size: 0" v-if="userType===2">
								<span style="width: 70px;height: 28px;display:inline-block; font-size:16px; margin-left:10px;">代理商:</span>
								<el-autocomplete class="inline-input" v-model="queryAgent" :value="queryAgentId" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
                <el-button style="width:100px; margin-left:20px;" @click="searchHandle()">搜索</el-button>
            </el-col>
            </el-row>
					</div>
					<div style="margin-top: 14px;">
            <el-row>
						<el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange" style="width: 100%">
							<el-table-column prop="agent_name" min-width="160" fixed label="代理商">
							</el-table-column>
							<el-table-column prop="depart_name" min-width="120" label="渠道">
							</el-table-column>
							<el-table-column prop="accountBalance" min-width="80" label="账户余额">
							</el-table-column>
							<el-table-column prop="creditBalance" min-width="80" label="信用余额">
							</el-table-column>
							<el-table-column prop="payAmmount" min-width="80" label="充值总额">
							</el-table-column>
							<el-table-column prop="courseAmmount" label="购课总额" min-width="80">
							</el-table-column>
							<el-table-column prop="creditLine" label="授信额度" min-width="80">
							</el-table-column>
							<el-table-column min-width="280" label="操作" v-if="unlocking(['Finance_recharge','Finance_creditInc','Finance_creditDec'])">
								<template scope="scope">
									<el-button v-if="unlocking('Finance_recharge')" type="text" size="small" @click="pay(scope.$index, scope.row)">充值</el-button>
									<el-button v-if="unlocking('Finance_creditInc')" size="small" type="text" @click="IncreaseCreditLimit(scope.$index, scope.row)">增加信用额度</el-button>
									<el-button v-if="unlocking('Finance_creditDec')" size="small" type="text" @click="DecreaseCreditLimit(scope.$index, scope.row)">减少信用额度</el-button>
								</template>
							</el-table-column>
						</el-table>
            </el-row>
            <el-row>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout=" prev, pager, next" :total="totalLength">
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
import Vue from "vue";
import { getAgentCount, getChannel, selectAgent } from "../api/agentFinance";
import cluesModal from "vueModal";
import { AGENT_USER_TYPE } from "../util/keys";
export default {
  name: "daili-product-index",
  data() {
    return {
      channel: "",
      channelInfo: [
        {
          id: "",
          name: ""
        }
      ],
      queryAgent: "", //查询代理商
      queryAgentId: "", //查询代理商id
      tableData: [
        {
          agent_id:'',
          agent_name: "", //代理商名称
          depart_name: "", //渠道
          accountBalance: "", //账户余额
          accountBalancefinanceId: "",
          creditBalance: "", //信用余额
          creditBalancefinanceId: "",
          payAmmount: "", //充值总额
          payAmmountfinanceId: "",
          courseAmmount: "", //购课总额
          courseAmmountfinanceId: "",
          creditLine: "", //授信额度
          creditLinefinanceId: ""
        }
      ],
      currentPage: 1,
      totalLength: '',
      pageSize: 10,
      loading: false, //加载表格的参数
      disbtnEable: true 
    };
  },
  async created() {
    //获取资金账户列表
    let agentList = await getAgentCount();
    if (agentList.code === 0) {
      var list = agentList.data.list;
      var res = [];
      for (var i = 0; i < list.length; i++) {
        res.push({
          agent_id: list[i].agent_id,
          agent_name: list[i].agent_name,
          depart_name: list[i].depart_name,
          accountBalance: list[i].userAccounts[0].amount, //账户余额即现金账户
          accountBalancefinanceId: list[i].userAccounts[0].finance_id,
          accountType:list[i].userAccounts[0].remark,
          creditBalance: list[i].userAccounts[1].amount, //信用余额
          creditBalancefinanceId: list[i].userAccounts[1].finance_id,
          creditType:list[i].userAccounts[1].remark,
          payAmmount: list[i].userAccounts[2].amount, //充值总额
          payAmmountfinanceId: list[i].userAccounts[2].finance_id,
          courseAmmount: list[i].userAccounts[3].amount, //购课总额
          courseAmmountfinanceId: list[i].userAccounts[3].finance_id,
          creditLine: list[i].userAccounts[4].amount, //授信额度
          creditLinefinanceId: list[i].userAccounts[4].finance_id
        });
      }
      this.tableData = res;
      this.totalLength = Number(agentList.data.totalNums)
    };

    //获取渠道信息
    getChannel().then(result => {
      if (result.code === 0) {
        this.channelInfo = result.data;
      }
    });
  },
  computed:{
     userType(){
      return Number(localStorage.getItem(AGENT_USER_TYPE));
      console.log(this.$store.state.user.userType);
    }
  },
  methods: {
    //充值
    pay(index, row) {
      require.ensure(
        [],
        require => {
          let pay = require("../components/agentFinance/Pay.vue");
          cluesModal.openComponent(pay, {
            title: "充值",
            financeId: {
              agent_name:this.tableData[index].agent_name,
              agentId: this.tableData[index].agent_id,
              accountBalancefinanceId: this.tableData[index]
                .accountBalancefinanceId,
                accountType:this.tableData[index].accountType,
              creditBalancefinanceId: this.tableData[index]
                .creditBalancefinanceId,
                creditType:this.tableData[index].creditType,
              payAmmountfinanceId: this.tableData[index].payAmmountfinanceId,
              courseAmmountfinanceId: this.tableData[index]
                .courseAmmountfinanceId,
              creditLinefinanceId: this.tableData[index].creditLinefinanceId
            },
            parent:this
          });
        },
        "pay"
      );
    },
    //增加额度
    IncreaseCreditLimit(index, row) {
      require.ensure(
        [],
        require => {
          let addCredit = require("../components/agentFinance/IncreaseCreditLimit.vue");
          cluesModal.openComponent(addCredit, {
            title: "增加信用额度",
            agentInfo:{
                agentId:this.tableData[index].agent_id
            },
            parent:this
          });
        },
        "addCredit"
      );
    },
    //减少额度
    DecreaseCreditLimit(index, row) {
      require.ensure(
        [],
        require => {
          let upCredit = require("../components/agentFinance/DecreaseCreditLimit.vue");
          cluesModal.openComponent(upCredit, {
            title: "增加信用额度",
            agentInfo:{
                agentId:this.tableData[index].agent_id
            },
            parent:this
          });
        },
        "upCredit"
      );
    },
    //修改每页数量
    handleSizeChange(val) {
      this.pageSize = val;
      this.RefreshDate();
    },
    //跳页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.RefreshDate();
    },
    //模糊查询代理商
    async querySearch(queryString, cb) {
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
    handleSelect(item) {
      this.queryAgent = item.value;
      this.queryAgentId = item.id;
    },
    //搜索功能
    async searchHandle() {
      if(this.queryAgent===''){
          let agentList = await getAgentCount({
          departId: this.channel,
          page:this.currentPage,
          pageSize:this.pageSize
            });
          if (agentList.code === 0) {
            var list = agentList.data.list;
            var res = [];
            for (var i = 0; i < list.length; i++) {
              res.push({
                agent_id: list[i].agent_id,
                agent_name: list[i].agent_name,
                depart_name: list[i].depart_name,
                accountBalance: list[i].userAccounts[0].amount, //账户余额即现金账户
                accountType:list[i].userAccounts[0].remark,
                accountBalancefinanceId: list[i].userAccounts[0].finance_id,
                creditBalance: list[i].userAccounts[1].amount, //信用余额
                creditType:list[i].userAccounts[1].remark,
                creditBalancefinanceId: list[i].userAccounts[1].finance_id,
                payAmmount: list[i].userAccounts[2].amount, //充值总额
                payAmmountfinanceId: list[i].userAccounts[2].finance_id,
                courseAmmount: list[i].userAccounts[3].amount, //购课总额
                courseAmmountfinanceId: list[i].userAccounts[3].finance_id,
                creditLine: list[i].userAccounts[4].amount, //授信额度
                creditLinefinanceId: list[i].userAccounts[4].finance_id
              });
            }
            this.tableData = res;
            this.totalLength=Number(agentList.data.totalNums)
            // console.log(this.totalLength)
          }
      }else{
          this.RefreshDate();
      } 
      
    },
    //刷新列表
    async RefreshDate() {
      let agentList = await getAgentCount({
          agentId: this.queryAgentId,
          departId: this.channel,
          page:this.currentPage,
          pageSize:this.pageSize
      });
      if (agentList.code === 0) {
        var list = agentList.data.list;
        var res = [];
        for (var i = 0; i < list.length; i++) {
          res.push({
            agent_id: list[i].agent_id,
            agent_name: list[i].agent_name,
            depart_name: list[i].depart_name,
            accountBalance: list[i].userAccounts[0].amount, //账户余额即现金账户
            accountType:list[i].userAccounts[0].remark,
            accountBalancefinanceId: list[i].userAccounts[0].finance_id,
            creditBalance: list[i].userAccounts[1].amount, //信用余额
            creditType:list[i].userAccounts[1].remark,
            creditBalancefinanceId: list[i].userAccounts[1].finance_id,
            payAmmount: list[i].userAccounts[2].amount, //充值总额
            payAmmountfinanceId: list[i].userAccounts[2].finance_id,
            courseAmmount: list[i].userAccounts[3].amount, //购课总额
            courseAmmountfinanceId: list[i].userAccounts[3].finance_id,
            creditLine: list[i].userAccounts[4].amount, //授信额度
            creditLinefinanceId: list[i].userAccounts[4].finance_id
          });
        }
        this.tableData = res;
        this.totalLength=Number(agentList.data.totalNums)
        // console.log(this.totalLength)
      }
    }
  },
  mounted() {
    //初始化刷新数据
    this.RefreshDate();
  }
};
</script>
