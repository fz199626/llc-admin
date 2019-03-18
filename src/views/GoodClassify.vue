<template>
  <div class="goodClassify">
    <div class="goodClassify-header">
      <div>商品分类</div>
      <div class="goodList-header-right">
        <div class="starts"><span v-for="(tab,index) in tabs" @click="status(index)" :class="{choice:tabIndex == index}">{{tab.title}}</span></div>
        <div class="addClassify-btn" @click="addClassify">添加分类</div>
        <add-classify v-show="isShow" :editData="edit" @refres="onRefres"></add-classify>
      </div>
    </div>
    <el-table :data="tableData" height="80%" width="100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="sort" label="排序"></el-table-column>
      <!--<el-table-column prop="status" label="状态"></el-table-column>-->
      <el-table-column label="操作" width="180">
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
        tabs: [{"title": "隐藏"},{"title": "显示"}],
        tabIndex: 1,
        tableData: [],
        total: 0,
        pagesize: 10,
        edit: '',
        isShow: false,
        currentPage: 1
      }
    },
    mounted() {
      this.classifyList(this.pagesize, 1, 1);
    },
    methods: {
      classifyList(pagesize, currentPage, status) {
        let classifyListUrl = "http://linlinchi-admin.auteng.cn/category/list?limit="+ pagesize +"&current_page="+ currentPage +"&status="+ status +"&name="
        this.axios.get(classifyListUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
      status(index) {
        this.tabIndex = index
        this.classifyList(this.pagesize, 1, index)
      },
      addClassify() {
        this.isShow = !this.isShow
      },
      onRefres() {
        this.isShow = !this.isShow
        this.classifyList(this.pagesize, this.currentPage, 1)
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
      .goodList-header-right {
        display: flex;
        justify-content: space-between;
        .starts {
          font-size: 14px;
          font-weight: inherit;
          color: #ccc;
          span {
            cursor: pointer;
            margin: 2px 10px;
            padding: 4px 10px;
            border-radius: 10px;
            border: 1px solid #ccc;
          }
          .choice {
            background: #666;
          }
        }
        .addClassify-btn {
          color: #fff;
          cursor: pointer;
          font-size: 12px;
          font-weight: initial;
          background: cornflowerblue;
          padding: 5px 10px;
          border-radius: 3px;
          margin-left: 50px;
        }
      }
    }
    .el-table{
      padding: 1% 30px 0;
    }
    .goodClassify-bottom{
      height: 7%;
      .el-pagination{
        text-align: center;
        margin-top: 10px;
      }
    }
  }
</style>
