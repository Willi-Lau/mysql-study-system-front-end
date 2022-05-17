<template>
 <div>
     <HelloWorld></HelloWorld>
     <div class="registerForm">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
              <!-- 姓名 -->
                <el-form-item label="姓名" prop="name" >
                    <el-input v-model="ruleForm.name" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
              <!-- 学号 -->
                 <el-form-item label="学号" prop="studentNumber" >
                    <el-input v-model="ruleForm.studentNumber" placeholder="请输入学号"></el-input>
                </el-form-item>
              <!-- 身份证号 -->
                <el-form-item label="身份证号" prop="identityCardNumber" >
                    <el-input v-model="ruleForm.identityCardNumber" placeholder="请输入身份证号"></el-input>
                </el-form-item>
              <!-- 密码 -->
                <el-form-item label="密码" prop="password"  >
                    <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
              <!-- 确认密码 -->
                <el-form-item label="确认密码" prop="surePassword"  >
                    <el-input v-model="ruleForm.surePassword" placeholder="请再次输入密码" show-password></el-input>
                </el-form-item>
              <!-- 电话 -->
                <el-form-item label="电话号码" prop="phone" >
                    <el-input v-model="ruleForm.phone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
              <!-- 大学 （选择）-->
               <el-form-item label="大学" prop="phone" >
                   <el-select v-model="ruleForm.university" filterable placeholder="请选择">
                        <el-option
                        v-for="item in schoolList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                  </el-form-item>
              <!-- 班级 -->
                <el-form-item label="班级" prop="className" >
                    <el-input v-model="ruleForm.className" placeholder="请输入班级"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button type="success" @click="back">返回</el-button>
                </el-form-item>
      </el-form>
     </div>

    <!-- 提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>身份证号，学号一经注册不可修改，请再次检查</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


 </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';
export default {
  data() {
    {
       var validatePass = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        if (this.ruleForm.surePassword !== '') {
                            this.$refs.ruleForm.validateField('surePassword');
                        }
                        callback();
                    }
                };

                var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.ruleForm.password) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                };

                var checkphone = function (phone) {
                     var pattern =  /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/;   //验证手机号
                    if (!pattern.test(phone)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                //验证手机
                var validatePhone =(rule, value, callback)=>{
                    if (value === '') {
                        callback(new Error('请输入电话号码'));
                    }
                    else if(checkphone(value) === false){
                        callback(new Error('电话号码格式错误!'));
                    }
                    else{
                        callback();
                    }
                };

                 var checkid = function (phone) {
                     var pattern =  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;     
                    if (!pattern.test(phone)) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                //验证身份证号
                var validateid =(rule, value, callback)=>{
                    if (value === '') {
                        callback(new Error('请输入身份证号'));
                    }
                    else if(checkid(value) === false){
                        callback(new Error('身份证号格式错误!'));
                    }
                    else{
                        callback();
                    }
                };
  }
      return {
        dialogVisible: false,
        registerType : 0,
        resultDto:{
                type:'',
                object:'',
                list:[],
                map:{

                }
            },
         schoolList:[{
              id:'',
              name:'',
              createTime:'',
              deadline:'',
              studentNum:''
          }],
        value: '',
        ruleForm: {
          name: '',
          studentNumber:'',
          identityCardNumber:'',
          password:'',
          surePassword:'',
          phone:'',
          university:'',
          className:''

        },
        rules: {
          name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          studentNumber: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
           identityCardNumber: [
                        { required: true , message: '请输入身份证号', trigger: 'blur'},
                        { validator: validateid, trigger: 'blur' }
                    ],
           password: [
                        { required: true , message: '请输入密码名', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' } 
                    ],
           surePassword: [
                         { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
           phone: [  
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
            className: [
            { required: true, message: '请输入班级名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      // socket
            OnMessage(event){
                // alert(event.data)
                 this.$notify({
                    title: '提示',
                    message: event.data,
                    duration: 0,
                    type: 'success'
                    
                    });
            },
            OnOpen(){},
            OnError(){},
      submitForm(formName) {
        if(this.registerType === 0){
          this.dialogVisible = true;
          this.registerType = 1;
        }
        else{
           this.$refs[formName].validate((valid) => {
          // 登录验证部分
            if (valid) {
                //向后台查找，返回关于这个选手的所有信息，包括选手表和图库信息       selectcandidateimages
              this.$axios.post('RegisterController/register',
                  this.ruleForm
              ).then(response=>{      //返回值部分
                  this.resultDto = response.data;
                  var resp = this.resultDto.type;
                if(resp === false){
                    this.loginErrorNull(this.resultDto.object);
                }
                else{
                  //创建自带user 表

                    this.$alert('注册成功', 'success', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'success',
                            message: `注册成功`
                            });
                        }
                        });
                    this.$router.push({
                        path:'/' ,               	//目标URL，为注册的路由
                        })
                }
              }).catch(error=>{
                  console.log(error)
              });

          }
        });
        }
       
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      back(){
           this.$router.push({
              path:'/' ,               	//目标URL，为注册的路由
            })
      }
      ,
      loginErrorNull(s){
            this.$alert('注册失败'+s, 'error', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'error',
                  message: `注册失败`+s
                });
              }
            });
      },
      loginErrorNotMatching(){
            this.$alert('登陆失败，账户密码错误', 'error', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'error',
                  message: `登录失败: 请重新登陆`
                });
              }
            });
      }
    },
  name: 'Register',
 components: { HelloWorld }
  ,
  created(){
   var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;

         this.$axios.post("ManagerController/getSchoolListTimeOut", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.schoolList = info.map.schoolList;
                        // for(var i = 0 ; i < schoolList.length ; i ++){
                                
                        //         schoolOptions[i].label = schoolList[i].name;
                        //         schoolOptions[i].value = schoolList[i].name;
                               
                        // }
                        console.log(this.schoolList);
                    }).catch(error => {
                        console.log(error);
                    });
 }
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