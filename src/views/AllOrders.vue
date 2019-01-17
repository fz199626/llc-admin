<template>
  <div class="allOrders">
    <div class="allOrders-header">
      <div>订单列表</div>
      <div class="starts">
        <span v-for="(tab,index) in tabs" @click="status(index)" :class="{choice:tabIndex == index}">{{tab.title}}</span>
      </div>
    </div>
    <el-table :data="tableData" height="80%" width="100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="contacts" label="姓名"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="remarks" label="备注"></el-table-column>
      <el-table-column prop="create_time" label="下单时间"></el-table-column>
      <el-table-column prop="distribution_fee" label="配送费"></el-table-column>
      <el-table-column prop="total_price" label="订单金额"></el-table-column>
      <el-table-column prop="order_num" label="订单号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
    </el-table>
    <div class="allOrders-bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="page"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs: [{"title": "待接单"},{"title": "已接单"},{"title": "配送中"},{"title": "已完成"}],
        tabIndex: 3,
        tableData: [],
        total: 0,
        pagesize: 10,
        currentPage: ''
      }
    },
    mounted() {
      this.allOrders(this.pagesize, 1, 4);
    },
    methods: {
      allOrders(pagesize, currentPage, status) {
        let allOrdersUrl = "http://linlinchi-admin.auteng.cn/order/list?limit=" + pagesize + "&current_page=" + currentPage + "&status=" +status
        this.axios.get(allOrdersUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
      status(status){
        this.tabIndex = status
        if(status == 0){
          this.isHandle = true
          this.isAdopt = true
        }else if(status == 1){
          this.isHandle = false
          this.isAdopt = true
        }else if(status == 2){
          this.isHandle = false
          this.isAdopt = false
        }
        this.allOrders(this.pagesize, 1, status)
      },
      page(currentPage) {
        this.currentPage = currentPage
        this.allOrders(this.pagesize, currentPage);
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
      .starts{
        font-size: 14px;
        font-weight: inherit;
        color: #ccc;
        span{
          cursor: pointer;
          margin: 0 10px;
          padding: 4px 10px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }
        .choice{
          background: #666;
        }
      }
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
