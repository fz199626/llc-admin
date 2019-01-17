<template>
  <div class="order">
    <div class="order-nav">
      <div class="nav-li" v-for="tab in tabs" :key="tab.status" @click="tabClick(tab.status)" :style="{ background: tab.bj }">
        <div class="order-tips">
          <div>{{tab.title}}</div>
          <div class="order-num">{{tab.count}}</div>
        </div>
        <img :src="tab.img"/>
      </div>
    </div>
    <div class="order-cont">
      <div class="order-cont-list">
        <div class="order-cont-list-li" v-for="item in tableData" :key="item.id">
          <div class="order-cont-list-li-cont">
            <div class="order-cont-list-li-head">
              <span class="head-left"><span v-if="item.way == 1">自取</span><span v-else>外卖</span></span>
              <span class="head-content">订单号：{{item.order_num}}</span>
            </div>
            <ul class="order-list">
              <li v-for="good in item.orderDetails" :key="good.id">
                <div class="li-left">
                  <span class="title">{{good.goods_info.name}}</span>
                </div>
                <div class="num-price">
                  <span>x{{good.num}}</span>
                  <span class="unit-price">￥{{good.goods_info.price}}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="order-cont-list-li-bon">
            <div class="discount">
              <p><span>配送费</span><span>￥{{item.distribution_fee}}</span></p>
              <p><span>优惠折扣</span><span>￥0</span></p>
            </div>
            <div class="balance">
              <span>{{item.create_time}}</span>
              <div><span>x{{item.num}}</span><span>￥{{item.total_price}}</span></div>
            </div>
            <div class="remarks">{{item.remarks}}</div>
            <div class="bottom-btn" v-if="nowStatus == 1 || nowStatus == 2">
              <div class="btns">
                <div v-if="nowStatus == 1">
                  <span class="call" v-if="item.way == 1">通知取餐</span>
                  <span class="notice" v-else>呼叫配送员</span>
                </div>
                <div v-else>
                  <span class="call" v-if="item.way == 1">已配送27分钟</span>
                  <span class="notice" v-else>已通知27分钟</span>
                </div>
              </div>
              <div class="cancel">取消订单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {"title": "新订单","status": "1","count": "0","bj": "#666","img": require("./../assets/logo.png")},
        {"title": "配送中","status": "2","count": "0","bj": "#999","img": require("./../assets/logo.png")},
        {"title": "已完成","status": "3","count": "0","bj": "#ccc","img": require("./../assets/logo.png")},
        // {"title": "已取消","status": "4","count": "0","bj": "#999","img": require("./../assets/logo.png")},
      ],
      nowStatus: 1,
      tableData: []
    }
  },
  mounted() {
    this.orders(10, 1, 1)
  },
  methods: {
    tabClick(status){
      this.nowStatus = status
      this.orders(10, 1, status)
    },
    orders(pagesize, currentPage, status) {
      let ordersUrl = "http://linlinchi-admin.auteng.cn/order/list?limit=" + pagesize + "&current_page=" + currentPage + "&status=" + status
      this.axios.get(ordersUrl).then( res => {
        this.tableData = res.data.data.items
        this.tabs[0].count = res.data.data.other_count[0]
        this.tabs[1].count = res.data.data.other_count[1]
        this.tabs[2].count = res.data.data.other_count[2]
      })
    }
  }
}
</script>

<style scoped lang="less">
  .order{
    height: 100%;
    .order-nav{
      color: #fff;
      height: 18%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;
      .nav-li{
        background: #999;
        width: 18%;
        min-width: 150px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 1%;
        font-size: 20px;
        .order-tips{
          text-align: center;
          .order-num{
            font-size: 60px;
          }
        }
        img{
          width: 50px;
          height: 50px;
        }
      }
    }
    .order-cont{
      height: 80%;
      width: 100%;
      cursor: pointer;
      .order-cont-list{
        height: 100%;
        white-space: nowrap;
        overflow-x: auto;
        display: -webkit-box;
        .order-cont-list-li{
          width: 380px;
          height: 97%;
          padding: 0 20px 1%;
          margin-left: 20px;
          background: #fff;
          border-radius: 10px;
          &:nth-child(1){
            margin-left: 0;
          }
          .order-cont-list-li-cont{
            height: 60%;
            .order-cont-list-li-head{
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              align-items: center;
              .head-left,.head-right{
                display: inline-block;
                width: 60px;
                height: 45px;
                background: #999;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                text-align: center;
                line-height: 45px;
                color: #fff;
                font-weight: bold;
              }
              .head-content{
                flex: 1;
                padding-left: 10px;
              }
            }
            .order-list{
              padding: 15px 5px;
              li{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                align-items: center;
                color: #666;
                margin-bottom: 15px;
                .li-left{
                  width: 50%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  text-align: left;
                  color: #666;
                  font-size: 13px;
                  .title{
                    font-size: 15px;
                    font-weight: bold;
                    color: #555;
                  }
                }
                .num-price{
                  width: 30%;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .unit-price{
                    font-size: 15px;
                    color: #555;
                  }
                }
              }
            }

          }
          .order-cont-list-li-bon{
            height: 40%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .discount{
              width: 100%;
              font-size: 15px;
              p{
                display: flex;
                justify-content: space-between;
              }
              p:nth-child(1){
                color: #444;
                margin-bottom: 10px;
              }
              p:nth-child(2){
                color: burlywood;
              }
            }
            .balance{
              display: flex;
              justify-content: space-between;
              width: 100%;
              font-size: 13px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 5px;
              align-items: center;
              div{
                width: 30%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span:nth-child(2){
                  font-size: 20px;
                  color: #000;
                }
              }
            }
            .remarks{
              height: 60px;
              border-radius: 5px;
              background: #eee;
              width: 96%;
              color: #666;
              padding: 10px 2%;
              font-size: 13px;
              white-space:normal;
              word-break:break-all;
              word-wrap:break-word;
            }
            .bottom-btn{
              width: 100%;
              color: #fff;
              font-size: 18px;
              display: flex;
              justify-content: space-between;
              div{
                height: 50px;
                border-radius: 8px;
                line-height: 50px;
                text-align: center;
                span{
                  display: inline-block;
                  width: 100%;
                  border-radius: 8px;
                }
                .call{
                  background: green;
                }
                .notice{
                  background: green;
                }
              }
              .btns{
                width: 55%;
              }
              .cancel{
                width: 40%;
                background: #ccc;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width:980px){
    order-cont-list::-webkit-scrollbar{
    width:0;
    height:0;
    display: none;
    }
  }
</style>
