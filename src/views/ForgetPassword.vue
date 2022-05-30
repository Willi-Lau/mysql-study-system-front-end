<template>
  <div class="forgetPassword">
    <HelloWorld></HelloWorld>
    <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="status">
            <el-input v-model="ruleForm.status" placeholder="请输入验证码"></el-input>  
          </el-form-item>
           <el-form-item label="新密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入新密码"></el-input>
          </el-form-item>
           <el-form-item label="确认密码" prop="password2">
            <el-input v-model="ruleForm.password2" placeholder="再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm">提交</el-button>
            <el-button type="info" @click="back">返回</el-button>
          </el-form-item>
      </el-form>

      <div class="spark">
         <el-button type="primary" @click="spark">获取验证码</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import HelloWorld from '../components/HelloWorld.vue';
export default {
  data() {
      return{
            token:this.$route.query.token,
            ruleForm:{
              phone:'',
              status:'',
              password:'',
              password2:''
            }
      }
    },
    methods:{
      submitForm(){
        if(this.ruleForm.password === this.ruleForm.password2){
          //向后台查找，返回关于这个选手的所有信息，包括选手表和图库信息       selectcandidateimages
                    this.$axios.post("FrogetPasswordController/changePassword", this.$qs.stringify({
                        phone: this.ruleForm.phone,
                        password: this.ruleForm.password
                    })).then(response => {
                        this.resultDto = response.data;
                        console.log(this.resultDto)
                        var resp = this.resultDto.type;
                        if (resp === false) {
                            //登录失败
                           const h = this.$createElement;
                           this.$alert('手机号不存在，请重新输入', 'error', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'error',
                                message: `手机号不存在，请重新输入`
                                });
                            }
                            });
                        }
                        else {
                          const h = this.$createElement;
                          this.$notify({
                            title: '修改密码成功',
                            message: h('i', { style: 'color: teal'}, '修改密码成功')
                          });
                            //设置token
                             this.token = this.resultDto.token;
                             this.$router.push({
                                path: "/", //目标URL，为注册的路由
                                query:{
                                    token:this.TOKEN
                                }
                            });
                            //登陆成功
                           
                        }
                    }).catch(error => {
                        console.log(error);
                    });
        }
        else{
           this.$alert('两次密码不一致', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `两次密码不一致`
                            });
                        }
                        });
        }
          
      },
        back(){
          this.$router.push({
                                path: "/", //目标URL，为注册的路由
                                query:{
                                    token:this.token
                                }
            });
        },
        spark(){
          const h = this.$createElement;
          this.$notify({
            title: '发送成功',
            message: h('i', { style: 'color: teal'}, '验证码发送成功')
          });
        }
    },
    
  name: 'ForgetPassword',
 components: { HelloWorld }
}
</script>
<style>
    .forgetPassword .demo-ruleForm{
      position: absolute;
      top: 250px;
      left: 450px;
      right:550px;
    }

    .spark{
      position: absolute;
      top: 310px;
      left: 1000px;
      
    }
 

</style>