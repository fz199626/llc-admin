<template>
  <div class="addClassify">
    <el-form ref="formData" :model="addForm" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="addForm.status" size="mini">
          <el-radio-button label="1">显示</el-radio-button>
          <el-radio-button label="0">隐藏</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="addForm.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formData')" size="small">确定</el-button>
        <el-button @click="cancel('formData')" size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addForm: {
          id: 0,
          name: '',
          status: '1',
          sort: '',
        }
      }
    },
    props: [
      'editData'
    ],
    watch: {
      editData() {
        this.addForm = this.editData
      }
    },
    methods: {
      onSubmit(formData) {
        let loginUrl = "http://linlinchi-admin.auteng.cn/category/add"
        let data = this.addForm
        this.axios.post(loginUrl, data).then( res => {
          if(res.data.success){
            this.$emit('refres')
            this.$refs[formData].resetFields()
            this.$message({showClose: true, message: '添加成功！', type: 'success'})
          }else {
            this.$message({showClose: true, message: '请填写完成信息！', type: 'error'})
          }
        })
      },
      cancel(formData) {
        this.$emit('refres')
        this.$refs[formData].resetFields()
      }
    }
  }
</script>

<style scoped lang="less">
  .addClassify{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form{
      background: #fff;
      width: 450px;
      padding: 30px 30px 30px 10px;
      border-radius: 10px;
      .el-form-item{
        margin-bottom: 10px;
        /deep/ .el-upload-list{
          width: 70%;
          float: right;
        }
      }
    }
  }
</style>
