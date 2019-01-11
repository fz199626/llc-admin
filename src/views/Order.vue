<template>
  <div class="order">
    <div class="order-nav">
      <div class="nav-li" v-for="(item,index) in meun" :key="item.title" @click="tabNameClick(index)">
        <div class="order-tips">
          <div>{{item.title}}</div>
          <div class="order-num">10</div>
        </div>
        <img src="./../assets/logo.png"/>
      </div>
    </div>
    <div class="order-cont">
      <div class="order-cont-list" v-for="(item,index) in meun" :key="item.title" v-if="index == tabIndex">
        <div class="order-cont-list-li">
          <div class="order-cont-list-li-cont">
            <div class="order-cont-list-li-head">
              <span class="head-left" style="">外卖</span>
              <span class="head-content">订单：16766767678</span>
              <span class="head-right">外卖</span>
            </div>
            <ul class="order-list">
              <li>
                <div class="li-left">
                  <span class="title">奶茶</span><br />
                  <span>大/热/无糖</span>
                </div>
                <div class="num-price">
                  <span>x1</span>
                  <span class="unit-price">￥19</span>
                </div>
              </li>
              <li>
                <div class="li-left">
                  <span class="title">奶茶</span><br />
                  <span>大/热/无糖</span>
                </div>
                <div class="num-price">
                  <span>x1</span>
                  <span class="unit-price">￥19</span>
                </div>
              </li>
              <li>
                <div class="li-left">
                  <span class="title">奶茶</span><br />
                  <span>大/热/无糖</span>
                </div>
                <div class="num-price">
                  <span>x1</span>
                  <span class="unit-price">￥19</span>
                </div>
              </li>
              <li>
                <div class="li-left">
                  <span class="title">奶茶</span><br />
                  <span>大/热/无糖</span>
                </div>
                <div class="num-price">
                  <span>x1</span>
                  <span class="unit-price">￥19</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="order-cont-list-li-bon">
            <div class="discount">
              <p><span>配送费</span><span>￥5</span></p>
              <p><span>优惠折扣</span><span>￥5</span></p>
            </div>
            <div class="balance">
              <span>2017.12.10 7:45:36</span>
              <div><span>x3</span><span>￥0</span></div>
            </div>
            <div class="remarks">
              备注信息备注信息备注信息备注信息备注信息
              备注信息备注信息备注信息备注信息备注信息
              备注信息备注信息备注信息备注信息备注信息
            </div>
            <div class="cancel">取消呼叫配送员</div>
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
      meun: [
        {"title":"新外卖订单","content":"可使用"},
        {"title":"外卖订单","content":"已使用"},
        {"title":"配送中","content":"已过期"},
        {"title":"取消订单","content":"已过期"},
      ],
      tabIndex: '',
    }
  },
  methods: {
    tabNameClick(index){
      this.tabIndex = index;
    },
  }
}
</script>

<style scoped lang="less">
  .order{
    height: 100%;
    min-width: 980px;
    .order-nav{
      color: #fff;
      height: 18%;
      margin-bottom: 2%;
      display: flex;
      justify-content: space-between;
      .nav-li{
        background: #999;
        width: 16%;
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
            .cancel{
              width: 90%;
              background: #ccc;
              margin: auto;
              height: 40px;
              border-radius: 8px;
              text-align: center;
              line-height: 40px;
              color: #fff;
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
