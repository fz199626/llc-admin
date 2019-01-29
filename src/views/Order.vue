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
      <div class="noTableData" v-if="tableData.length == 0">暂无订单</div>
      <div class="order-cont-list" v-else>
        <div class="order-cont-list-li" v-for="(item,index) in tableData" :key="item.id">
          <div class="order-cont-list-li-cont">
            <div class="order-cont-list-li-head">
              <span class="head-left head-left2" v-if="item.way == 1" @click="cancel(item.id,4)">自取</span>
              <span class="head-left" v-else @click="cancel(item.id,4)">外卖</span>
              <span class="head-content">订单号：{{item.order_num}}</span>
              <span class="head-right" v-if="item.way == 1">{{item.meal_code}}</span>
              <span class="head-right" v-if="item.way == 2 && nowStatus != 1" @click="rider(item.order_num)">骑手信息</span>
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
          <div class="all-list" @click="allList(item)">查看全部订单</div>
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
                  <span class="call" @click="callRider(item.id)" v-if="item.way == 1">通知取餐</span>
                  <span class="notice" @click="callRider(item.id)" v-else>呼叫配送员</span>
                </div>
                <div v-else>
                  <span class="call" v-if="item.way == 1" @click="cancel(item.id,4)">等待取餐</span>
                  <div v-else>
                    <span v-if="item.is_cancel == 1" class="notice" @click="callRider(item.id)">重新呼叫</span>
                    <span v-else class="notice" @click="cancelRider(item.order_num)">取消呼叫</span>
                  </div>
                </div>
              </div>
              <div class="cancel" @click="cancel(item.id,6)">取消订单</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-show="isPopup" @click="popupHide">
      <div class="rider" v-show="isRider">
        <p>订单状态：{{riderArr.statusMsg}}</p>
        <p>骑手姓名：{{riderArr.transporterName}}</p>
        <p>骑手电话：{{riderArr.transporterPhone}}</p>
        <p>骑手经度：{{riderArr.transporterLng}}</p>
        <p>骑手纬度：{{riderArr.transporterLat}}</p>
        <p>配送费：{{riderArr.deliveryFee}}</p>
        <p>小费：{{riderArr.tips}}</p>
        <p>保价费：{{riderArr.insuranceFee}}</p>
        <p>配送距离：{{riderArr.distance}}</p>
        <p>收货码：{{riderArr.orderFinishCode}}</p>
        <p>发单时间：{{riderArr.cancelTime}}</p>
        <p>接单时间：{{riderArr.acceptTime}}</p>
        <p>取货时间：{{riderArr.fetchTime}}</p>
        <p>送达时间：{{riderArr.finishTime}}</p>
        <p>取消时间：{{riderArr.createTime}}</p>
      </div>
      <div class="allOrderList" v-show="isAllOrderList">
        <ul class="order-list">
          <li v-for="item in allListData" :key="item.id">
            <div class="li-left">
              <span class="title">{{item.goods_info.name}}</span>
            </div>
            <div class="num-price">
              <span>x{{item.num}}</span>
              <span class="unit-price">￥{{item.goods_info.price}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {"title": "新订单","status": "1","count": "0","bj": "#f64045","img": require("./../assets/newOrder.png")},
        {"title": "待配送","status": "2","count": "0","bj": "#d333be","img": require("./../assets/dispatching.png")},
        {"title": "配送中","status": "3","count": "0","bj": "#ee8800","img": require("./../assets/distribution.png")},
        // {"title": "已完成","status": "4","count": "0","bj": "#0ebf38","img": require("./../assets/finish.png")},
      ],
      nowStatus: 1,
      tableData: [],
      isPlaying: false,
      isPopup: false,
      isRider: false,
      isAllOrderList: false,
      allListData: [],
      riderArr: []
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
    },
    callRider(id){
      let callRiderUrl = "http://linlinchi-admin.auteng.cn/order/order-add"
      let data = {
        order_id: id
      }
      this.axios.post(callRiderUrl, data).then( res => {
        this.orders(10, 1, this.nowStatus)
      })
    },
    cancelRider(order_num){
      let cancelRiderUrl = "http://linlinchi-admin.auteng.cn/order/formal-cancel"
      let data = {
        order_num: order_num
      }
      this.axios.post(cancelRiderUrl, data).then( res => {
        this.orders(10, 1, this.nowStatus)
      })
    },
    cancel(id,status){
      let cancelUrl = "http://linlinchi-admin.auteng.cn/order/cancel-order"
      let data = {
        order_id: id,
        status: status
      }
      this.axios.post(cancelUrl, data).then( res => {
        this.orders(10, 1, this.nowStatus)
      })
    },
    rider(order_num){
      let riderUrl = "http://linlinchi-admin.auteng.cn/order/status-query"
      let data = {
        order_num: order_num
      }
      this.axios.post(riderUrl, data).then( res => {
        if(res.data.success){
          this.riderArr = res.data.data
          this.isPopup = true
          this.isRider = true
        }
      })
    },
    allList(item){
      this.allListData = item.orderDetails
      this.isPopup = true
      this.isAllOrderList = true
    },
    popupHide(){
      this.isPopup = false
      this.isRider = false
      this.isAllOrderList = false
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
        width: 16%;
        min-width: 150px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 2%;
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
      position: relative;
      .noTableData{
        color: #666;
        position: absolute;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        top: 50%;
        left: 50%;
        margin-top: -100px;
        margin-left: -50px;
      }
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
            height: 50%;
            .order-cont-list-li-head{
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              align-items: center;
              .head-left,.head-right{
                display: inline-block;
                width: 60px;
                height: 45px;
                background: #f64045;
                border-bottom-left-radius: 6px;
                border-bottom-right-radius: 6px;
                text-align: center;
                line-height: 45px;
                color: #fff;
                font-weight: bold;
              }
              .head-left2{
                background: #0ebf38;
              }
              .head-right{
                color: #ee8800;
                background: #fff;
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
          .all-list{
            height: 5%;
            width: 50%;
            color: #fff;
            font-size: 14px;
            background: #ee8800;
            margin: auto;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .order-cont-list-li-bon{
            height: 45%;
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
              margin-top: 10px;
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
                  background: #0ebf38;
                }
                .notice{
                  background: #f64045;
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
    .popup{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,.5);
      z-index: 9;
      display: flex;
      justify-content: center;
      align-items: center;
      .rider{
        width: 340px;
        height: 500px;
        padding: 30px;
        border-radius: 10px;
        background: #fff;
        color: #333;
        p{
          margin: 10px 0;
        }
      }
      .allOrderList{
        width: 340px;
        height: 440px;
        padding: 30px;
        border-radius: 10px;
        background: #fff;
        color: #333;
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
    }
  }
  @media (max-height: 1000px) {
    .order-cont-list-li-cont{
      height: 35%;
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
