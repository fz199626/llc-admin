<template>
  <div class="goodClassify">
    <div class="goodClassify-header">
      <div>商品分类</div>
      <div class="addClassify-btn" @click="addClassify">添加分类</div>
      <add-classify v-show="isShow" :editData="edit" @refres="onRefres"></add-classify>
    </div>
    <el-table :data="tableData" height="80%" width="100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="classifyEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="goodClassify-bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="page"></el-pagination>
    </div>
  </div>
</template>

<script>
  import AddClassify from '@/components/AddClassify.vue';

  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        pagesize: 10,
        edit: '',
        isShow: false,
        currentPage: ''
      }
    },
    mounted() {
      this.classifyList(this.pagesize, 1);
    },
    methods: {
      classifyList(pagesize, currentPage) {
        let classifyListUrl = "http://linlinchi-admin.auteng.cn/category/list?limit="+ pagesize +"&current_page="+ currentPage +"&status=1&name="
        this.axios.get(classifyListUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
      addClassify() {
        this.isShow = !this.isShow
      },
      onRefres() {
        this.isShow = !this.isShow
        this.classifyList(this.pagesize, this.currentPage)
      },
      page(currentPage) {
        this.currentPage = currentPage
        this.classifyList(this.pagesize, currentPage);
      },
      classifyEdit(index, row) {
        this.isShow = !this.isShow
        this.edit = row
      },
    },
    components: {
      AddClassify,
    }
  }
</script>

<style scoped lang="less">
  .goodClassify{
    height: 100%;
    background: #fff;
    .goodClassify-header{
      height: 12%;
      padding: 0 30px;
      border-radius: 10px;
      background: #000;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      .addClassify-btn{
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        font-weight: initial;
        background: cornflowerblue;
        padding: 5px 10px;
        border-radius: 3px;
      }
    }
    .el-table{
      padding: 1% 30px 0;
    }
    .goodClassify-bottom{
      height: 7%;
      .el-pagination{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
