<template>
  <div class="allOrders">
    <div class="allOrders-header">
      <div>订单列表</div>
    </div>
    <el-table :data="tableData" height="80%" width="100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="name" label="手机号"></el-table-column>
      <el-table-column prop="name" label="手机号"></el-table-column>
      <el-table-column prop="name" label="手机号"></el-table-column>
      <el-table-column prop="name" label="手机号"></el-table-column>
      <el-table-column prop="status" label="订单"></el-table-column>
    </el-table>
    <div class="allOrders-bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        pagesize: 10,
        currentPage: ''
      }
    },
    mounted() {
      this.classifyList(this.pagesize, 1);
    },
    methods: {
      classifyList(pagesize, currentPage) {
        let classifyListUrl = "http://linlinchi-admin.auteng.cn/category/list?limit="+ this.pagesize +"&current_page="+ this.currentPage +"&status=1&name="
        this.axios.get(classifyListUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .allOrders{
    height: 100%;
    background: #fff;
    .allOrders-header{
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
    }
    .el-table{
      padding: 1% 30px 0;
    }
    .allOrders-bottom{
      height: 7%;
      .el-pagination{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
