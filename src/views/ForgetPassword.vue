<template>
  <div class="">
    <HelloWorld></HelloWorld>
    <div>
       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
         <el-form-item label="姓名" prop="username" >
            <el-input v-model="ruleForm.username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="username" >
            <el-input v-model="ruleForm.username" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')">提交</el-button>
            <el-button type="info" @click="register">返回</el-button>
          </el-form-item>
      </el-form>
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
              username:'',
              password:''
            }
      }
    },
    methods:{
        register(){
         // window.sessionStorage.setItem("token","kafka")
          this.token = window.sessionStorage.getItem("token");
          alert(this.token);
        }
    },
    
  name: 'ForgetPassword',
 components: { HelloWorld }
}
</script>
<style>
    .registerForm{
        position:absolute;
        left: 400px;
        right: 500px;
        top:150px;
    }

</style>