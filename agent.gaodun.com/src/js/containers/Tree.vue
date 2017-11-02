<template>
	<div class="clues-search-tree">
		<div @click.stop="onTriggerTree" class="tree-wrapper">
			<div style="position: relative">
				<i @click.stop="resetChecked" v-show="isRemove" class="tree-circle-close el-icon-circle-close"></i>
				<el-input class="tree-input-disabled" :placeholder="placeholder ? placeholder : '请选择'" :style="{'width': width}" :disabled="true" v-model="treeUserName" :title="treeUserName" size="small"></el-input>
			</div>
			<div v-if="!showTree" class="tree-box" :style="{'minWidth' : width}">
				<div style="width: 100%;position: relative;">
					<el-tree class="filter-tree" @check-change="checkChangeTree" :data="getUserData" empty-text="加载中..." :props="defaultProps" node-key="Id" show-checkbox accordion @getCheckedNodes="onSelectNode" :filter-node-method="filterNode" ref="tree" :highlight-current="true">
					</el-tree>
					<input size="small" placeholder="输入关键字进行过滤" :value="currentValue" @input="handleInput" class="search-text">
					</input>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.tree-wrapper {
	display: inline-block;
	position: relative;
}

.tree-wrapper .el-icon-circle-close {
	position: absolute;
    right: 6px;
    top: 8px;
    z-index: 9;
    font-size: 14px;
    color: #9ca9c6;
    cursor: pointer;
}

.tree-box {
	position: absolute;
	top: 32px;
	z-index: 99999;
	display: none;
}

.tree-filter {
	font-size: 12px;
	border: 1px solid #ccc;
	height: 30px;
	line-height: 30px;
	border-radius: 3px;
	outline: none;
	padding: 0px 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	position: relative;
	top: -5px;
}
</style>
<script>
import Vue from 'vue';
import { GetAllowedUserTree, getchannels, GetCustomerSourceTree, GetSourceDetailsTree } from '../api/cluesManage';
import { GetPublicUserTree } from '../api/SaleManage';
import { checkedUserTree } from '../util/util';
import { AGENT_USER_INFO } from '../util/keys';

export default {
	props: {
		width: String, // 人员树的宽度
		currentValue: String, // 当前输入的值
		treeType: String, // 树的类型
		callback: Function, // 获取当前树所选的值
		reset: Function, // 重置
		placeholder: String, // 自定义提示文案
		allSelected: Function,//数据选中以后触发
	},
	data() {
		return {
			showTree: false,
			currentValue: this.value,
			userInfo: '',
			treeUserName: '',
			treeUserId: [],
			isRemove: false,
			hasChange: false,
			getUserData: [], // 人员
			defaultProps: {
				label: 'Name',
				children: 'ChildrenList'
			},
		}
	},
	watch: {
		currentValue(val) { // 过滤搜索
			this.$refs.tree.filter(val);
		}
	},
	methods: {
		handleInput(event) { // 获取输入值
			const value = event.target.value;
			this.$emit('input', value);
			this.$emit('change', value);
			this.currentValue = value;
		},
		async onGetUserTree() { // 人员树接口
			let ret = await GetAllowedUserTree({ userId: this.userInfo.UserId });
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
		async onGetchannelsTree() { // 渠道接口
			let ret = await getchannels();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
		async onGetCustomerSourceTree() { // 客户来源接口
			let ret = await GetCustomerSourceTree();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
		async onGetPublicUserTree() { // 获取公池数据树
			let ret = await GetPublicUserTree();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
		async onGetSourceDetailsTree() { // 营销计划
			let ret = await GetSourceDetailsTree();
			if (ret.status === 0) {
				this.getUserData = ret.result;
			}
		},
		onTriggerTree(event) { // 显示Tree      
			event.cancelBubble = true;
			this.showTree = false;
			var tree = document.body.querySelectorAll('.tree-box');
			for (let i = 0; i < tree.length; i++) {
				tree[i].style.display = 'none';
			}
			// document.body.querySelector('.content-container').style.overflowY = 'hidden';
			this.$el.querySelector('.tree-box').style.display = 'block';
			switch (this.treeType) {
				case 'source':
					if (this.getUserData.length == 0) { // 渠道接口
						this.onGetchannelsTree();
					}
					break;
				case 'channels':
					if (this.getUserData.length == 0) { // 客户来源接口
						this.onGetCustomerSourceTree();
					}
					break;
				case 'public':
					if (this.getUserData.length == 0) { // 获取公池数据树接口
						this.onGetPublicUserTree();
					}
					break;
				case 'marketing':
					if (this.getUserData.length == 0) { // 营销计划接口
						this.onGetSourceDetailsTree();
					}
					break;
				default:
					if (this.getUserData.length == 0) { // 人员树接口
						this.onGetUserTree();
					}
			}
		},
		checkChangeTree() { // 所选节点的内容
			let getTreeData = this.$refs.tree.getCheckedNodes();
			this.treeUserId = checkedUserTree(getTreeData).userId;
			this.treeUserName = checkedUserTree(getTreeData).userName;
			this.callback(this.treeUserId);
			this.hasChange = true;
		},
		filterNode(value, data) { // 过滤搜索
			if (!value) return true;
			return data.Name.indexOf(value) !== -1;
		},
		onSelectNode(node) { // 被选中的节点所组成的数组
			this.defaultKeys = node.Id;
		},
		resetChecked(event) { // 清空选项
            event.stopPropagation();
			this.callback(null);
			this.$el.querySelector('.tree-box').style.display = 'none';
			setTimeout(()=>{
				this.showTree = true;
			},10)
			setTimeout(()=>{
				this.showTree = false;
			},20)
			this.treeUserName = '';
			this.treeUserId = [];
			this.currentValue = '';
            
			if (typeof this.allSelected === 'function') {
				this.allSelected();
			}
		}
	},
	updated() {
		if (this.treeUserName.length) {
			this.isRemove = true;
		} else {
			this.isRemove = false;
		}
	},
	created() {
		this.userInfo = JSON.parse(localStorage.getItem(AGENT_USER_INFO));
	},
	mounted() {
		this.$nextTick(function() {
			this.$on('resetTree', function() {
				this.callback(null);
				setTimeout(()=>{
				this.showTree = true;
				},10)
				setTimeout(()=>{
					this.showTree = false;
				},20)
				this.treeUserName = '';
				this.treeUserId = [];
				this.currentValue = '';
			})
		});
		document.body.onclick = (function() { // 隐藏人员树
			var tree = document.body.querySelectorAll('.tree-box');
			// document.body.querySelector('.content-container').style.overflowY = 'auto';
			for (let i = 0; i < tree.length; i++) {
				tree[i].style.display = 'none';
			}
			if (this.hasChange) {
				if (typeof this.allSelected === 'function') {
					this.allSelected();
				}
				this.hasChange = false;
			}

		}.bind(this));
	}
}
</script>