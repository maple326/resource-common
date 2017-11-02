<template>
    <div class="deleteProduct">
        <div style="text-align: right; margin: 0">
            <el-button size="small"  @click="oncancel()">取消</el-button>
            <el-button type="primary" size="small" @click="saveHandle()">确定</el-button>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { MessageBox} from 'element-ui';
import {  } from '../../api/product';
export default {
    data() {
      props:['modal','courseInfo','parent']
      return {
        
      };
    },
    methods:{
      //关闭弹窗
      oncancel(){
        this.modal.close();
      },
      //保存确定
      saveHandle(){
        deleteProduct({
          agentid: this.courseInfo.agent_id,
					courseid: this.courseInfo.course_id,
        }).then(result =>{
            if(result.code ===0){
              this.$message({
                message:result.message,
                type:'success'
              })
            }
        });
      },
    }
  }
</script>

