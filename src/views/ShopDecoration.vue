<template>
  <div class="shopDecoration">
    <div class="banner">
      <div class="banner-title">
        <span>灵灵柒banner</span> <div @click="add">新增</div>
      </div>
      <div class="banner-box">
        <div v-for="(item,index) in bannerArr" :key="item.id" class="banner-alone">
          <img :src="item.image"/>
          <p>{{item.title}}：{{item.jump_url}}</p>
          <div @click="edit(index)">编辑</div>
        </div>
      </div>
    </div>
    <div class="isEdit" v-show="isEdit">
      <el-form ref="formData" :model="addForm" label-width="50px">
        <el-form-item label="名称" prop="title">
          <el-input v-model="addForm.title" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="网址" prop="jump_url">
          <el-input v-model="addForm.jump_url" placeholder="网址"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <el-upload class="upload-demo" action="http://linlinchi-admin.auteng.cn/banner/upload" ref="upload" :on-success="uploadSuccess" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed">
            <el-button size="small" type="primary" v-model="addForm.image">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formData')" size="small">立即创建</el-button>
          <el-button  @click="cancel('formData')" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerArr: [],
        addForm: {
          'id': 0,
          'title': '',
          'jump_url': '',
          'image': ''
        },
        isEdit: false
      }
    },
    mounted() {
      this.banner()
    },
    methods: {
      banner(){
        let bannerUrl = "http://linlinchi-admin.auteng.cn/banner/list?limit=10&current_page=1"
        this.axios.post(bannerUrl).then( res => {
          this.bannerArr = res.data.data.items
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
      add(){
        this.isEdit = true
        this.addForm = {
          'id': 0,
          'title': '',
          'jump_url': '',
          'image': ''
        }
      },
      edit(index){
        this.isEdit = true
        this.addForm = this.bannerArr[index]
      },
      onSubmit(formData) {
        let addUrl = "http://linlinchi-admin.auteng.cn/banner/add"
        let data = this.addForm
        this.axios.post(addUrl, data).then( res => {
          if(res.data.success){
            this.isEdit = false
            this.banner()
            this.$refs.upload.clearFiles()
            this.$message({showClose: true, message: '编辑成功！', type: 'success'})
          }else {
            this.$message({showClose: true, message: '请填写完成信息！', type: 'error'})
          }
        })
      },
      cancel(formData) {
        this.isEdit = false
        this.$refs.upload.clearFiles()
        this.banner()
      }
    }
  }
</script>

<style scoped lang="less">
  .el-popover{
    background: red;
  }
  .shopDecoration{
    /deep/
    .banner{r
      .banner-title{
        background: #ddd;
        padding: 5px 20px 5px 10px;
        display: flex;
        justify-content: space-between;
        color: #666;
        div{
          cursor: pointer;
          font-size: 15px;
          color: #409EFF;
        }
      }
      .banner-box{
        display: flex;
        .banner-alone{
          margin: 10px;
          img{
            width: 300px;
          }
          p{
            margin: 10px 0;
            color: #333;
            width: 300px;
            overflow: hidden;
          }
          div{
            width: 60px;
            margin: auto;
            text-align: center;
            line-height: 30px;
            background: #ddd;
            border-radius: 5px;
            font-size: 15px;
            color: #333;
            cursor: pointer;
          }
        }
      }
    }
    .isEdit{
      background: rgba(0,0,0,.3);
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-form{
        background: #fff;
        width: 320px;
        padding: 30px 20px 30px 10px;
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
  }
</style>

