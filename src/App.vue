<template>
  <div id="app">
    <el-container>
      <el-header>
        <img class="logo" src="./assets/logo.png"/>
        <audio src="http://linlinchi-img.auteng.cn/warningtone.mp3" id="audio" hidden></audio>
        <div class="head-portrait">
          <img src="./assets/head.png"/><div>灵灵柒</div>
          <el-switch v-model="closeShopValue" active-color="#13ce66" inactive-color="#ff4949" @change="closeShop" :active-text="valueText"></el-switch>
        </div>
      </el-header>
      <el-container>
        <el-aside style="width: 240px">
          <el-col :span="24">
            <el-menu default-active="2" :router="true" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/goodClassify">分类列表</el-menu-item>
                  <el-menu-item index="/goodList">商品列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-bell"></i>
                  <span slot="title">订单</span>
                  <span class="num" v-if="num > 0">{{num}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/order">订单</el-menu-item>
                  <el-menu-item index="/allOrders">订单列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-view"></i>
                  <span slot="title">统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/shopDecoration">店铺装修</el-menu-item>
                  <el-menu-item index="/feedback">用户反馈</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        num: 0,
        closeShopValue: true,
        valueText: '营业中'
      }
    },
    mounted() {
      this.news()
      this.shopStatus()
    },
    methods: {
      news(){
        let that =this
        newOreder()
        function newOreder(){
          let newOrederUrl = "http://linlinchi-admin.auteng.cn/order/is-update"
          that.axios.post(newOrederUrl).then( res => {
            if(res.data.success){
              let audio = document.getElementById('audio');
              audio.play()
              let ordersUrl = "http://linlinchi-admin.auteng.cn/order/list?limit=10&current_page=1&status=1"
              that.axios.get(ordersUrl).then( res => {
                that.num = res.data.data.count
              })
            }
          })
        }
        window.setInterval(newOreder, 30000);
      },
      shopStatus(){
        let closeShopUrl = "http://linlinchi-admin.auteng.cn/store/close-shop"
        this.axios.post(closeShopUrl).then( res => {
          if(res.data.data == 1){
            this.value1 = true
          }else{
            this.value1 = false
          }
        })
      },
      closeShop(val){
        let status
        val ? this.valueText = '营业中' : this.valueText = '休息中'
        val ? status = 1 : status = 0
        let closeShopUrl = "http://linlinchi-admin.auteng.cn/store/close-shop"
        var data = { status: status }
        this.axios.post(closeShopUrl,data).then( res => {
          this.$message({showClose: true, message: '操作成功！', type: 'success'})
        })
      }
    }
  }
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .el-container{
      height: 100%;
      .el-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0;
        .logo{
          height: 40px;
        }
        .head-portrait{
          display: flex;
          align-items: center;
          margin-right: 20px;
          color: #333;
          img{
            width: 40px;
            height: 40px;
            border-radius: 40px;
          }
          div{
            font-size: 15px;
            margin-left: 10px;
          }
        }
      }
      .el-container{
        .el-aside{
          background: #545c64;
          .num{
            background: red;
            width: 18px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            display: inline-block;
            border-radius: 18px;
            font-size: 12px;
            margin-left: 10px;
          }
          .el-menu-item{
            margin-left: 20px;
          }
          .el-menu-vertical-demo{
            border: 0;
            .el-menu-item-group__title{
              padding: 0;
            }
          }
        }
        .el-main{
          background: #eee;
        }
      }
    }
  }
}
</style>
