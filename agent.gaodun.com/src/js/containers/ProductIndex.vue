<template>
	<div>
		<div>
			<div>
				<div style="padding-bottom: 21px">
					<div>
						<el-row>
							<el-col :span="18" style="font-size: 0" >
                <el-col :span="12" v-if="userType===2">
								<span style="width: 40px;height: 28px;display:inline-block; font-size:16px;">渠道:</span>
								<el-select placeholder="请选择" v-model="channel">
									<el-option v-for="item in channelInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
								<span style="width: 60px;height: 28px;display:inline-block; font-size:16px;">代理商:</span>
								<el-autocomplete class="inline-input" v-model="queryAgent" :value="queryAgentId" :fetch-suggestions="querySearch" :trigger-on-focus="false" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
                </el-col>
                <el-col  :span="6">
                <span style="width: 40px;height: 28px;display:inline-block; font-size:16px;">项目:</span>
								<el-select placeholder="请选择" v-model="projectId">
									<el-option v-for="item in projectInfo" :key="item.id" :label="item.name" :value="item.id"></el-option>
								</el-select>
                </el-col>
							</el-col>
							<el-col :span="2">
								<el-button @click="searchHandle()">搜索</el-button>
							</el-col>
							<el-col :span="2">
								<el-button v-if="unlocking('Goods_addGroupToAgent')" @click="getAddGroup()">按组添加</el-button>
							</el-col>
							<el-col :span="2">
								<el-button v-if="unlocking('Goods_addGoods')" @click="getAdd()">添加</el-button>
							</el-col>
						</el-row>
					</div>
					<div style="margin-top: 14px;">
            <el-row>
						<el-table border :row-class-name="tableRowClassName" :data="tableData" ref="multipleTable" v-loading="loading" @selection-change="handleSelectionChange" style="width: 100%">
							<el-table-column prop="id" min-width="100" fixed label="商品id">
							</el-table-column>
							<el-table-column prop="agent_name" min-width="160" fixed label="代理商名称">
							</el-table-column>
							<el-table-column prop="course_name" min-width="140" label="课程名称">
							</el-table-column>
							<el-table-column prop="project_name" min-width="125" label="项目">
							</el-table-column>
							<el-table-column min-width="110" label="课程价格">
								<template scope="scope">
									<el-popover trigger="hover" placement="top">
										<p>官方有营销活动，活动期间可能课程价格*折扣不等于代理价</p>
										<div slot="reference" class="name-wrapper">
											<el-tag>{{ scope.row.vPrice }}</el-tag>
										</div>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column prop="discount" min-width="80" label="折扣">
							</el-table-column>
							<el-table-column prop="price" label="代理价" min-width="120">
							</el-table-column>
							<el-table-column prop="counts" label="库存" min-width="120">
							</el-table-column>
							<el-table-column prop="course_status" min-width="110" label="上下架">
							</el-table-column>
							<el-table-column min-width="160" label="操作" v-if="unlocking(['Goods_editGoods','Goods_delGoods','Order_addDo'])">
								<template scope="scope">
									<el-button v-if="unlocking('Goods_editGoods')" size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
									<el-button v-if="unlocking('Goods_delGoods')" type="text" size="small" @click="handleDelete(scope.$index)">删除</el-button>
									<el-button v-if="scope.row.course_status === '已上架'  && unlocking('Order_addDo')"  size="small" type="text" @click="CreateOrder(scope.$index)">创建订单</el-button>
								</template>
							</el-table-column>
						</el-table>
            </el-row>
            <el-row>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next" :total="totalLength">
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
import cluesModal from "vueModal";
import { MessageBox } from "element-ui";
import {
  deleteProduct,
  getData,
  getChannel,
  getProject,
  selectAgent,
  editProduct,
  agentType
} from "../api/product";
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
      projectId: "",
      projectInfo: [],
      tableData: [
        {
          id: "",//商品id
          course_id: "",
          agent_id: "",
          project_name: "",
          agent_name: "",
          course_name: "",//课程名称
          vPrice: "", //原价
          discount: "",
          price: "", //折后价格,代理价
          counts: "", //库存
          course_status: "" //上下架
        }
	  ],
      formLabelWidth: "120px",
      multipleSelection: [], //选中列表高亮显示的参数
      currentPage: 1,
      totalLength:'',
      pageSize: 10,
      loading: false //加载表格的参数
    };
  },
  async created() {
    //获取商品列表的数据
    let resultData = await getData({
        page:this.currentPage,
        pagesize:this.pageSize
    });
    if(resultData.code === 0){
      // console.log(resultData.data)
      this.tableData = resultData.data.list;
      //总条数
      this.totalLength =Number(resultData.data.totalNums);
    }
    //获取渠道信息
    getChannel().then(result => {
      if (result.code === 0) {
        this.channelInfo = result.data;
      }
    });
    //获取项目列表
    getProject().then(result => {
      this.projectInfo = result.data;
      this.projectInfo.unshift({
        id:null,
        name:'全部'
      })
    });
  },
  computed:{
    userType(){
      return Number(localStorage.getItem(AGENT_USER_TYPE));
    }
  },
  methods: {
    //点击添加弹出窗口
    getAdd() {
      require.ensure(
        [],
        require => {
          let AddProduct = require("../components/product/AddProduct.vue");
          cluesModal.openComponent(AddProduct, {
            title: "添加商品",
            //向子组件传值
            parent: this
          });
        },
        "addProduct"
      );
    },
    //点击按组添加弹出框
    getAddGroup() {
      require.ensure(
        [],
        require => {
          let AddGroup = require("../components/product/AddProductAccordingGroup.vue");
          cluesModal.openComponent(AddGroup, {
            title: "按组添加商品",
            parent: this
          });
        },
        "addGroup"
      );
    },
    //创建订单
    CreateOrder(index) {
      agentType({
        agentId: this.tableData[index].agent_id
      }).then(result => {
        if (result.code === 0) {
          var type = result.data.agentTypeName;
		      var type2 = result.data.agentPayType;
          if (type === "内部代理") {
            if (type2) {
              require.ensure(
                [],
                require => {
                  let CreateOrderC = require("../components/product/CreateOrderC.vue");
                  cluesModal.openComponent(CreateOrderC, {
                      title: "创建订单",
                      payType: result.data.agentPayType,
                      goodsInfo:{
                          goodsId:this.tableData[index].id,
                          courseName:this.tableData[index].course_name,
                          coursePrice:this.tableData[index].vPrice,
                      },
                  });
                },
                "createOrderC"
              );
            } else {
                 require.ensure(
              [],
              require => {
                let CreateOrderB = require("../components/product/CreateOrderB.vue");
                cluesModal.openComponent(CreateOrderB, {
                  title: "创建订单",
                  payType: result.data.agentPayType,
                  goodsInfo:{
                      goodsId:this.tableData[index].id,
                      courseName:this.tableData[index].course_name,
                      coursePrice:this.tableData[index].vPrice,
                    },
                  });
            },
              "createOrderB"
            );
            }
          }else if (type === "外部代理") {
              require.ensure(
                [],
                require => {
                  let CreateOrderA = require("../components/product/CreateOrderA.vue");
                  cluesModal.openComponent(CreateOrderA, {
                    title: "创建订单",
                    goodsInfo:{
                      goodsId:this.tableData[index].id,
                      courseName:this.tableData[index].course_name,
                      coursePrice:this.tableData[index].vPrice,
                      payPrice:this.tableData[index].price
                      },
                    parent:this
                  });
                },
                "createOrderA"
              );
          }
        }
      });
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
            let result = await getData({
            channel: this.channel,
            page: this.currentPage,
            pagesize: this.pageSize,
            project: this.projectId
          });
        if (result.code === 0) {
          this.tableData = result.data.list;
          this.totalLength = Number(result.data.totalNums);
        }
      }else{
        this.RefreshDate();
      }
    },
    //删除功能
    async handleDelete(index) {
      try {
        await this.$confirm("确定删除该课程？", "提示", {
          type: "warning"
        });
        await deleteProduct({
          courseid: this.tableData[index].course_id,
          agentid: this.tableData[index].agent_id
        }).then(result => {
          if (result.code === 0) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.RefreshDate();
          }
        });
      } catch (err) {}
    },
    //编辑功能
    handleEdit(index, row) {
      require.ensure(
        [],
        require => {
          let EditeProduct = require("../components/product/EditeProduct.vue");
          editProduct({
            courseid: this.tableData[index].course_id
          }).then(result => {
            if (result.code === 0) {
              cluesModal.openComponent(EditeProduct, {
                title: "编辑商品",
                courseInfo: this.tableData[index],
                parent: this
              });
            }
          });
        },
        "editeProduct"
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
      //console.log(this.currentPage)
      this.RefreshDate();
    },
    //刷新列表
    async RefreshDate() {
      let result = await getData({
        agent: this.queryAgentId,
        channel: this.channel,
        page: this.currentPage,
        pagesize: this.pageSize,
        project: this.projectId
      });
      if (result.code === 0) {
        this.tableData = result.data.list;
        this.totalLength = Number(result.data.totalNums);
      }
    }
  },
  mounted() {
    //初始化刷新数据
    this.RefreshDate();
  }
};
</script>