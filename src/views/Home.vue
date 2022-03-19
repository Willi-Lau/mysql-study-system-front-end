
<template>

  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <HelloWorld></HelloWorld>
    <div class="titleValue">
        MySQL在线学习系统
    </div>
    <div class="loginForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="账户" prop="username" >
            <el-input v-model="ruleForm.username" placeholder="请输入学号/身份证号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="info" @click="register">注册</el-button>
            <el-button type="info" @click="forgetPassword">忘记密码</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '../components/HelloWorld.vue';

export default {
    data() {
        return {
            token:this.$route.query.token,
            resultDto:{
                type:'',
                object:'',
                list:[],
                map:{

                }
            },
            ruleForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    { required: true, message: "请输入账户", trigger: "blur" },
                    { min: 1, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 1, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                // 登录验证部分
                if (valid) {
                    //向后台查找，返回关于这个选手的所有信息，包括选手表和图库信息       selectcandidateimages
                    this.$axios.post("LoginController/login", this.$qs.stringify({
                        username: this.ruleForm.username,
                        password: this.ruleForm.password
                    })).then(response => {
                        this.resultDto = response.data;
                        console.log(this.resultDto)
                        var resp = this.resultDto.type;
                        if (resp === false) {
                            //登录失败
                            this.loginErrorNotMatching();
                            return false;
                        }
                        else {
                            //设置token
                             this.token = this.resultDto.token;
                             this.$router.push({
                                path: "/MySQLPrePareIntroduce", //目标URL，为注册的路由
                                query:{
                                    token:this.resultDto.object
                                }
                            });
                            //登陆成功
                            return true;
                        }
                    }).catch(error => {
                        console.log(error);
                    });
                }
                else {
                    //有空白项
                    this.loginErrorNull;
                    return false;
                }
            });
        },
        register() {
            this.$router.push({
                path: "/Register", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
        forgetPassword(){
            this.$router.push({
                path: "/ForgetPassword", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
        loginErrorNull() {
            this.$alert("登陆失败，请按照正确格式输入账户密码", "error", {
                confirmButtonText: "确定",
                callback: action => {
                    this.$message({
                        type: "error",
                        message: `登录失败: 请重新登陆`
                    });
                }
            });
        },
        loginErrorNotMatching() {
            this.$alert("登陆失败，账户密码错误", "error", {
                confirmButtonText: "确定",
                callback: action => {
                    this.$message({
                        type: "error",
                        message: `登录失败: 请重新登陆`
                    });
                }
            });
        }
    },
    name: "Home",
    components: { HelloWorld }
}
</script>

<style>
  .homeTitle{
      background-color: black;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100px;
      right: 0px;
  }
  .loginForm{
    position: absolute;
    top:300px;
    left:450px;
    right:550px;
    height: 200px;
  }
  .titleValue{
    color: black;
    font-size: 40px;
    position: absolute;
    top:200px;
    left:550px;
    right:550px;
    height: 200px;
  }
</style>