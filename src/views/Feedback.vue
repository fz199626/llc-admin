<template>
  <div class="feedback">
    <div class="feedback-header">
      <div>用户反馈</div>
      <div class="starts">
        <span v-for="(tab,index) in tabs" @click="status(index)" :class="{choice:tabIndex == index}">{{tab.title}}</span>
      </div>
    </div>
    <el-table :data="tableData" height="80%" width="100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column prop="tel" label="手机号"></el-table-column>
      <el-table-column prop="content" label="反馈内容"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-show="isHandle" size="mini" @click="handle(scope.$index, tableData)">处理</el-button>
          <el-button v-show="isAdopt" size="mini" @click="adopt(scope.$index, tableData)">采纳</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="feedback-bottom">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pagesize" @current-change="page"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabs: [{"title": "未查看"},{"title": "已处理"},{"title": "已采纳"}],
        tabIndex: 0,
        tableData: [],
        total: 0,
        pagesize: 10,
        isHandle: true,
        isAdopt: true,
      }
    },
    mounted() {
      this.feedbackList(this.pagesize, 1, 0)
    },
    methods: {
      feedbackList(pagesize, currentPage ,status) {
        let feedbackListUrl = "http://linlinchi-admin.auteng.cn/feedback/list?limit="+ pagesize +"&current_page="+ currentPage +"&status="+ status
        this.axios.get(feedbackListUrl).then( res => {
          this.tableData = res.data.data.items
          this.total = parseInt(res.data.data.count)
        })
      },
      edit(index, rows, status) {
        let editUrl = "http://linlinchi-admin.auteng.cn/feedback/update-status"
        let data = {
          id: this.tableData[index].id,
          status: status
        }
        this.axios.post(editUrl, data).then( res => {
          if(res.data.success){
            rows.splice(index, 1);
          }
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
        this.feedbackList(this.pagesize, 1, status)
      },
      handle(index, rows){
        this.edit(index, rows, 1)
      },
      adopt(index, rows){
        this.edit(index, rows, 2)
      },
      page(currentPage) {
        this.currentPage = currentPage
        this.feedbackList(this.pagesize, currentPage);
      }
    }
  }
</script>

<style scoped lang="less">
  .feedback{
    height: 100%;
    background: #fff;
    .feedback-header{
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
    .feedback-bottom{
      height: 7%;
      .el-pagination{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
