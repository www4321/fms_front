<template>
  <el-form :model="ruleForm3" :rules="rules2" ref="ruleForm3" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">重置密码</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm3.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
    import { requestLogin } from '../../api/api';
    import {checkEmail} from '../../common/utils/rule'
    export default {
        data() {
            return {
                logining: false,
                ruleForm3: {
                    account: '2287266007@qq.com',
                    checkPass: '123456',
                    checkPass2:''
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
                console.log('register');
                this.$router.push('/register' );
            },
            login(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            //NProgress.done();
                            let { msg, code, user } = data;
                            if (code !== 200) {
                                this.$message({
                                    message: msg,
                                    type: 'error'
                                });
                            } else {
                                sessionStorage.setItem('user', JSON.stringify(user));
                                this.$router.push({ path: '/table' });
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