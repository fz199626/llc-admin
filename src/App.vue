<template>
  <div id="app">
    <el-container>
      <el-header>
        <img class="logo" src="./assets/logo.png"/>
        <div class="head-portrait">
          <img src="./assets/logo.png"/><div>灵灵柒</div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-col :span="24">
            <el-menu default-active="2" :router="true" :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>商品</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/goodList">商品列表</el-menu-item>
                  <el-menu-item index="/goodClassify">商品分类</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-bell"></i>
                  <span slot="title">订单</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/order">订单</el-menu-item>
                  <el-menu-item index="/allOrders">全部订单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-view"></i>
                  <span slot="title">统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">全店情况</el-menu-item>
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
          width: 300px;
          background: #545c64;
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
