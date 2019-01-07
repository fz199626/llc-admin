<template>
  <div class="login">
    <p>灵灵柒007</p>
    <p>特工密码入口</p>
    <div class="login-input">
      <el-input type="text" placeholder="请输入特工编号" v-model="userName"></el-input>
      <div>--</div>
      <el-input type="password" placeholder="请输入接头暗号" v-model="password" readonly onfocus="this.removeAttribute('readonly')" ></el-input>
    </div>
    <p class="tips">[各位特工，在确定周围环境安全不被跟着的情况下，输入暗号]</p>
    <div class="enter" @click="enter">确认进入</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    methods: {
      enter() {
        let loginUrl = "http://linlinchi-admin.auteng.cn/site/login"
        let data = {admin_name: this.userName, admin_pass: this.password}
        this.axios.post(loginUrl, data).then( res => {
          if(res.data.success){
            sessionStorage.setItem('login',res.data.success);
            this.$router.push('/');
          }else {
            this.$message({showClose: true, message: '登陆失败！', type: 'error'})
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .login{
    font-family: "宋体-繁";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top: 80px;
    color: #fff;
    text-align: center;
    background: url("./../assets/login-bj.png");
    background-size: cover;
    p{
      font-size: 32px;
      margin-bottom: 20px;
      letter-spacing: 3px;
    }
    .login-input{
      display: flex;
      width: 400px;
      margin: 40px auto;
      /deep/ .el-input__inner{
        background: rgba(0,0,0,0);
        color: rgba(255,255,255,.9);
      }
      div{
        padding: 0 10px;
      }
    }
    .tips{
      font-size: 14px;
      color: #999;
      margin: 30px;
      letter-spacing: 1px;
    }
    .enter{
      background-color: #eb0049;
      color: #fff;
      width: 160px;
      height: 45px;
      line-height: 45px;
      border-radius: 30px;
      margin: auto;
      cursor: pointer;
      letter-spacing: 2px;
      font-size: 17px;
    }
  }
</style>
