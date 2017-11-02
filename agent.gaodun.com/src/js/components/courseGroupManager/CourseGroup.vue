<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" label-width="120px">
            <el-form-item label="分组名称：" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button type="primary" @click="save('form')" size="small">保存</el-button>
            <el-button @click="cancel" size="small">取消</el-button>
        </div>
    </div>
</template>

<script>
import { addCourseGroup, editCourseGroup } from '../../api/courseGroup';

export default {
    data() {
        let validateName = (rule, value, callback) => {
            /\s+/.test(value) ? callback(new Error('分组名称中不可有空格')) : callback();
        };
        return {
            form: {
                id: '',
                name: ''
            },
            rules: {
                name: [
                    { required: true, message: '分组名称不可为空' },
                    { min: 0, max: 20, message: '分组名称20个字符以内' },
                    { validator: validateName }
                ],
            }
        };
    },
    props: ['modal', 'courseGroup', 'parent'],
    methods: {
        save(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.courseGroup) {
                        editCourseGroup({
                            groupid: this.form.id,
                            groupname: this.form.name
                        })
                            .then(result => {
                                if (result.code === 0) {
                                    this.$message({
                                        message: '保存成功！',
                                        type: 'success'
                                    });
                                    this.cancel();
                                    this.parent.refreshDate();
                                }
                            });
                    } else {
                        addCourseGroup({
                            groupname: this.form.name
                        })
                            .then(result => {
                                if (result.code === 0) {
                                    this.$message({
                                        message: '保存成功！',
                                        type: 'success'
                                    });
                                    this.cancel();
                                    this.parent.refreshDate();
                                }
                            });
                    }
                }
            });
        },
        cancel() {
            this.modal.close();
        },
    },
    created() {
        if (this.courseGroup) {
            this.form.id = this.courseGroup.id;
            this.form.name = this.courseGroup.name;
        }
    }
}
</script>
