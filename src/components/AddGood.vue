<template>
  <div class="addGood">
      <el-form ref="formData" :model="addForm" label-width="80px">
        <el-form-item label="种类" prop="category_id">
          <el-select v-model="addForm.category_id" placeholder="请选择种类">
            <el-option v-for="classifyLists in classifyList" :label="classifyLists.name" :value="classifyLists.id">{{classifyLists.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="describe">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" v-model="addForm.describe" placeholder="简介"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload class="upload-demo" action="http://linlinchi-admin.auteng.cn/goods/upload" ref="upload" :on-success="uploadSuccess" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed">
            <el-button size="small" type="primary" v-model="addForm.image">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addForm.sort" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="addForm.price" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="成本" prop="cost">
          <el-input v-model="addForm.cost" placeholder="成本"></el-input>
        </el-form-item>
        <el-form-item label="优惠价" prop="preferential_price">
          <el-input v-model="addForm.preferential_price" placeholder="优惠价"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="addForm.status" size="mini">
            <el-radio-button label="0">上架</el-radio-button>
            <el-radio-button label="1">下架</el-radio-button>
            <el-radio-button label="2">售罄</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formData')" size="small">立即创建</el-button>
          <el-button  @click="cancel('formData')" size="mini">取消</el-button>
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
        category_id: '',
        name: '',
        describe: '',
        image: '',
        sort: '',
        price: '',
        cost: '',
        preferential_price: '',
        status: '0',
      },
      classifyList: [],
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
  mounted() {
    this.classify();
  },
  methods: {
    classify() {
      let classifyListUrl = "http://linlinchi-admin.auteng.cn/category/list?limit=1000&current_page=1&status=1&name="
      this.axios.get(classifyListUrl).then( res => {
        this.classifyList = res.data.data.items
      })
    },
    uploadSuccess(data){
      this.addForm.image = data.data.url
    },
    handleExceed() {
      this.$message.warning(`亲爱的特工灵灵柒，只能选择一张图片哦！`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSubmit(formData) {
      let addUrl = "http://linlinchi-admin.auteng.cn/goods/add"
      let data = this.addForm
      this.axios.post(addUrl, data).then( res => {
        if(res.data.success){
          this.$emit('refres')
          this.$refs[formData].resetFields()
          this.$refs.upload.clearFiles()
          this.$message({showClose: true, message: '添加成功！', type: 'success'})
        }else {
          this.$message({showClose: true, message: '请填写完成信息！', type: 'error'})
        }
      })
    },
    cancel(formData) {
      this.$emit('refres')
      this.$refs[formData].resetFields()
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped lang="less">
  .addGood{
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
