<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="login" :loading="logining">登录</el-button>
    </el-form-item>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="4"><el-button type="text" size="small" @click.native.prevent="forget">忘记密码</el-button></el-col>
      <el-col :span="2"><el-button type="text" size="small" @click.native.prevent="register">注册</el-button></el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { requestLogin } from '../../api/api';
  import {checkEmail} from '../../common/utils/rule'
  import qs from 'qs'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '2287266007@qq.com',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { validator: checkEmail }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {

      forget:function() {
          console.log('forget');
          this.$router.push({ path: '/forget' });
      },
      register:function() {
          var _this = this;
          console.log('register');
          _this.$router.push({path:'/register'});
      },
      login(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            console.log(qs.stringify(loginParams));
            requestLogin(qs.stringify(loginParams)).then(result => {
              console.log("www1234")
              this.logining = false;
              let { errCode, errMsg, data } = result;
              console.log(errCode);
              console.log(errMsg)
              if (errCode !== 0) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(result));
                this.$router.push({ path: '/new_bill' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>