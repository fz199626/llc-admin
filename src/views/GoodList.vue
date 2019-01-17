<template>
  <div class="goodList">
    <div class="goodList-header">
      <div>商品列表</div>
      <div class="addGood-btn" @click="addGood">添加商品</div>
      <add-good v-show="isShow" :editData="edit" @refres="onRefres"></add-good>
    </div>
    <el-table :data="tableData.filter(data => !search || data.date.toLowerCase().includes(search.toLowerCase()))" height="80%" width="100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input class="search" v-model="search" size="mini" placeholder="输入编号搜索"/>
        </template>
        <el-table-column prop="id" label="编号" width="60"></el-table-column>
        <el-table-column prop="category_id" label="所属分类" width="180"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="cost" label="成本"></el-table-column>
        <el-table-column prop="preferential_price" label="优惠价"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="goodEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="goodList-bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="page"></el-pagination>
    </div>
  </div>
</template>

<script>
  import AddGood from '@/components/AddGood.vue'

  export default {
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        search: '',
        edit: '',
        isShow: false,
        total: 0,
        pagesize: 10,
        currentPage: ''
      }
    },
    mounted() {
      this.goodList(this.pagesize, 1)
    },
    methods: {
      addGood() {
        this.isShow = !this.isShow
      },
      goodList(pagesize, currentPage) {
        let goodListUrl = "http://linlinchi-admin.auteng.cn/goods/list?limit="+ pagesize +"&current_page="+ currentPage +"&status=0&name="
        this.axios.get(goodListUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
      page(currentPage) {
        this.currentPage = currentPage
        this.goodList(this.pagesize, currentPage);
      },
      onRefres() {
        this.isShow = !this.isShow
        this.goodList(this.pagesize, this.currentPage)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      goodEdit(index, row) {
        this.isShow = !this.isShow
        this.edit = row
      },
    },
    components: {
      AddGood,
    }
  }
</script>

<style scoped lang="less">
  .goodList{
    height: 100%;
    background: #fff;
    .goodList-header{
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
      .addGood-btn{
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
      .search{
        width: 240px;
      }
    }
    .goodList-bottom{
      height: 7%;
      .el-pagination{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
