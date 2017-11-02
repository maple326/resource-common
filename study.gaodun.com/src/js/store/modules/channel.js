import { GET_CHANNEL_DATA ,UPDATE_CURRENT_CHANNEL} from '../mutation-types';
import { getChannel, updateNodeName, addChannelNode, deleteChannelNode } from '../../api/home';
import { Message } from 'element-ui';
const state = {
	treeData:[],
    currentNode:{
        Name:'',
        ChannelNo:'',
		Id:null,
        Flag: 1		// 0: 保存，1: 新增
    },
};
const getters = {

}
// 方法调用逻辑
const actions = {
    /**
     * 初始化渠道数据
     * @param commit { Function }
     */
	async loadTreeData({ commit }) {
	    let ret = await getChannel();
        if(ret.status === 0){
            commit(GET_CHANNEL_DATA,ret.result);
        }
	},
    /**
     * 更新当前选中节点值
     * @param commit
     * @param obj { Object } 节点信息
     */
	updateCurrentNode({commit},obj){
        commit(UPDATE_CURRENT_CHANNEL,obj);
	},
	// 修改选中的节点名称
	async updateChannelName({state,dispatch}){
		if(state.currentNode.Name === '' || state.currentNode.Id === null){
			return;
		};
		// 选中的保存
		if(state.currentNode.Flag === 0){
            let ret = await updateNodeName(state.currentNode);
            let opts = ret.status === 0 ? {
                type:'success',
                message:'修改成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
		}else{
            let ret = await addChannelNode({
                Name: state.currentNode.Name,
                ParentChannelId: state.currentNode.Id
            });
            let opts = ret.status === 0 ? {
                type:'success',
                message:'新增成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
		}

	},
    /**
     * 删除节点
     * @param dispatch
     * @param Id
     */
	deleteChannelNode({dispatch },Id){
        deleteChannelNode(Id).then(ret => {
            let opts = ret.status === 0 ? {
                type:'success',
                message:'删除成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
        });
	}
};
// 逻辑代码
const mutations = {
	[GET_CHANNEL_DATA](state, result) {
	    state.treeData = result;
	},
    [UPDATE_CURRENT_CHANNEL](state,obj) {
		Object.assign(state.currentNode,obj)
    }
};
export default {
	state,
	getters,
	actions,
	mutations
}