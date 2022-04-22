<template>
  <div class="ManagerCooperationSchool">
      <div class="homeTitle">
          <div class="context">MySQL 学习平台管理界面 </div>
      </div>
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
         <!-- <HelloWorld></HelloWorld> -->
     
    <!-- over -->
     <div class="homeTitle3">
            <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
       background-color="rgba(66,66,66)"
      @open="handleOpen"
      text-color="#fff"
      @close="handleClose">
     
      
      <el-menu-item index="1"  @click="userInfo">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理页</span>
      </el-menu-item>
      <!-- <el-menu-item index="2"  @click="managerInfo">
        <i class="el-icon-setting"></i>
        <span slot="title">管理员管理页</span>
      </el-menu-item> -->
      <el-menu-item index="3"  @click="userSpread">
        <i class="el-icon-setting"></i>
        <span slot="title">用户广播发送页</span>
      </el-menu-item>
     
       <el-menu-item index="4"  @click="cooperationSchool">
        <i class="el-icon-setting"></i>
        <span slot="title">合作学校</span>
      </el-menu-item>
        <el-menu-item index="5"  @click="login">
        <i class="el-icon-setting"></i>
        <span slot="title">登录界面</span>
      </el-menu-item>
    </el-menu>
  </el-col>
      </div>
     
      <!-- 正文部分 -->
       <div class="mysql-change-1">
               <!-- 根据学校名字查找 -->
            <el-input v-model="schoolName" placeholder="请输入学校名字" style="width:300px">

            </el-input>
            &nbsp;
            <el-button type="primary" @click="getSchoolByName()">指定名字查找</el-button>
            <el-button type="warning" @click="getAllSchool()">获取全部学校</el-button>
           <el-button type="success" @click="dialogFormVisible = true">新增学校</el-button>
            <br><br><br>
            <!-- 新增学校 -->
            <el-dialog title="新增学校" :visible.sync="dialogFormVisible">

              <el-form :model="registerSchool">
                <el-form-item label="学校名称" :label-width="formLabelWidth">
                  <el-input v-model="registerSchool.name" autocomplete="off" style="width:500px"></el-input>
                </el-form-item>

                <el-form-item label="过期时间" :label-width="formLabelWidth">
                   <el-date-picker
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    style="width:500px"
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click=insertSchool>创 建</el-button>
              </div>
          </el-dialog>
            <!-- 合作学校列表 -->
              <el-table
               ref="multipleTable"  
              :data="schoolList"
              @selection-change="handleSelectionChange"
              border
               height="350"
              style="width: 100%">


               <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="id"
                label="id"
                width="100">
              </el-table-column>
               <el-table-column
                prop="name"
                label="名字"
                width="200">
              </el-table-column>
               <el-table-column
                prop="createTime"
                label="创建时间"
                width="220">
              </el-table-column>
               <el-table-column
                prop="deadline"
                label="过期时间"
                width="220">
              </el-table-column>
               <el-table-column
                prop="studentNum"
                label="注册学生数量"
                width="180">
              </el-table-column>

               <el-table-column 
               fixed="right"
               label="查看续费历史" 
               width="160">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="getRenewHistory(scope.row.name, scope.row.id)">选择</el-button>
         
                </template>
            </el-table-column>
            
            </el-table>
            <br><br>
            <span>续费时长</span>
            &nbsp;&nbsp;&nbsp;
            <el-select v-model="value" placeholder="请选择续费单位默认为年">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          &nbsp;&nbsp;&nbsp;
            <el-input v-model="duration" placeholder="请输入续费时长" style="width:300px">

            </el-input>
          &nbsp;&nbsp;&nbsp;
             <el-button type="danger" @click="toggleSelection()">取消选择</el-button>
              <el-button type="success" @click="renew()">续期</el-button>
      <br><br><br>
       <el-table
               ref="multipleTable"  
              :data="renewHistory"
              border
               height="350"
              style="width: 100%">


               <el-table-column
                prop="id"
                label="id"
                width="227">
              </el-table-column>
              <el-table-column
                prop="managerId"
                label="操作管理员id"
                width="220">
              </el-table-column>
              <el-table-column
                prop="schoolId"
                label="学校名称"
                width="220">
              </el-table-column>
              <el-table-column
                prop="renewDurationDay"
                label="续费时长（天）"
                width="250">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="操作时间"
                width="250">
              </el-table-column>
             
       </el-table>
        </div>
  </div>
</template>
<script>



import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
    
  data() {
      return{
        renewHistory:[{
          id:'',
          managerId:'',
          schoolId:'',
          renewDurationDay:'',
          createTime:''
        }],
        formLabelWidth: '120px',
        registerSchool:{
          name:'',
          deadline:''
        },
        schoolName:'',
        duration:"",
         pickerOptions: {
          shortcuts: [{
            text: '一个月后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', date);
            }
          }, {
            text: '一年后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit('pick', date);
            }
          }, {
            text: '三年后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24  * 365 * 3);
              picker.$emit('pick', date);
            }
          }]
        },
        value2: '',
         options: [{
          value: '年',
          label: '年'
        }, {
          value: '月',
          label: '月'
        }, {
          value: '日',
          label: '日'
        }],
        value: '',
          schoolList:[
            {
              id:'',
              name:'',
              createTime:'',
              deadLine:'',
              studentNum:''
            }
          ],
          multipleTable:[],
          msg: 'Welcome to Your Vue.js App',
          token:this.$route.query.token,
          dialogFormVisible: false,
         

      }
    },
    methods:{
      getRenewHistory(name,schoolId){
          
            this.$axios.post("ManagerController/getSchoolRenewHistory", this.$qs.stringify({
                          schoolId:schoolId
              })).then(response => {
                           this.renewHistory = response.data.map.renewHistoryList;
                           for(let i = 0 ; i < this.renewHistory.length ; i++){
                             this.renewHistory[i].schoolId = name;
                           }
              }).catch(error => {
                            console.log(error);
              });
      },
      //续期
      renew(){
        console.log(this.multipleSelection)
        //转换续费时间为天单位
        var renewDuration = 0;
        var schoolIdList = [];
        for(let i = 0 ; i < this.multipleSelection.length ; i++ ){
          schoolIdList[i] = this.multipleSelection[i].id;
        }
        if(this.duration === "" || this.multipleSelection.length === 0 || schoolIdList.length === 0){
            this.$alert("登陆失败，请按照正确格式输入账户密码", "error", {
                confirmButtonText: "确定",
                callback: action => {
                    this.$message({
                        type: "error",
                        message: `登录失败: 请重新登陆`
                    });
                }
            });
            return false;
        }
        else{
            if(this.value === "年"){
              renewDuration = this.duration * 365;
            }
            else if(this.value === "月"){
              renewDuration = this.duration * 30;
            }
            else if(this.value === "日"){
              renewDuration = this.duration;
            }
            else{
              renewDuration = this.duration * 365;
            }
            
            this.$axios.post("ManagerController/renewSchool", this.$qs.stringify({
                          token:this.token,
                          schoolIdList : JSON.stringify(schoolIdList),
                          renewDuration : renewDuration
              })).then(response => {
                            location.reload();
                            this.duration = ""
              }).catch(error => {
                            console.log(error);
              });
        }
       
                    
        
      },
      //取消选择
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
            //跳转界面：
        userInfo(){
            this.$router.push({
                    path: "/ManagerHome", //目标URL，为注册的路由
                    query:{
                          token:this.token
                     }
                });
        },
        userSpread(){
             this.$router.push({
                    path: "/ManagerSpread", //目标URL，为注册的路由
                    query:{
                         token:this.token
                     }
                });
        },
        cooperationSchool(){
                this.$router.push({
                    path: "/ManagerCooperationSchool", //目标URL，为注册的路由
                    query:{
                          token:this.token
                     }
                });
        },
        login(){
                this.$router.push({
                    path: "/", //目标URL，为注册的路由
                    query:{
                         token:this.token
                     }
                });
        },
        getAllSchool(){
           this.$axios.post("ManagerController/getSchoolList", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.schoolList = info.map.schoolList;
                        console.log(this.schoolList);
                      
                    }).catch(error => {
                        console.log(error);
                    });
        },
        getSchoolByName(){
           this.$axios.post("ManagerController/getSchoolByName", this.$qs.stringify({
                        name:this.schoolName
                    })).then(response => {
                        var info = response.data;
                        this.schoolList = info.map.schoolList;
                        console.log(this.schoolList);
                      
                    }).catch(error => {
                        console.log(error);
                    });
        }
        ,
        insertSchool(){
            this.dialogFormVisible = false
         
            if(this.registerSchool.name === "" || this.registerSchool.deadLine === ""){
                this.$alert("请正确填写注册信息", "error", {
                              confirmButtonText: "确定",
                              callback: action => {
                                  this.$message({
                                      type: "error",
                                      message: `创建失败`
                                  });
                              }
                          });
            }
            else{
               this.$axios.post("ManagerController/insertSchool", this.$qs.stringify({
                        name:this.registerSchool.name,
                        deadline:this.value2
                    })).then(response => {
                        var info = response.data;
                        if(info.type === false){
                          this.$alert("创建失败，此学校已经注册", "error", {
                              confirmButtonText: "确定",
                              callback: action => {
                                  this.$message({
                                      type: "error",
                                      message: `创建失败`
                                  });
                              }
                          });
                        }
                        else{
                          this.$notify({
                            title: '成功',
                            message: "创建成功",
                            type: 'success'
                            
                            });
                            location.reload();
                        }
                      
                    }).catch(error => {
                        console.log(error);
                    });
            }
            
        }
    },
    mounted(){
        this.drawLine();
    }
    ,
    created(){
        // socket
        var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;

         var m1 = this.$route.query.token;
        //获取table list

        // else{
        //     alert("jajajaj")
        // }
        

                     this.$axios.post("ManagerController/getUserList", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.userList = info.map.userList;
                        console.log(this.userList);
                    }).catch(error => {
                        console.log(error);
                    });

                    this.$axios.post("ManagerController/getSchoolList", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        this.schoolList = info.map.schoolList;
                        console.log(this.schoolList);
                      
                    }).catch(error => {
                        console.log(error);
                    });
    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
    .ManagerCooperationSchool .homeTitle3{
         position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 50px;  
            width: 180px;  
            height: 1500px;
            bottom:0px;
    }
    .ManagerCooperationSchool .homeTitle{
        background-color: black;
        z-index: 100;
    }
      .ManagerCooperationSchool .homeTitle2{
          position: absolute;
          
          background-color:rgb(43, 39, 39);
            top: 100px;
            left: 0px;  
            width: 50px;  
            height: 1500px;
            bottom:0px;
      }
      .ManagerCooperationSchool .homeBottom1{
            position: relative;
            top: 1550px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index : 101;
           
        }
      .ManagerCooperationSchool .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .ManagerCooperationSchool .d1{
      float: left;
      text-align: left;
      position: relative;
      left:70px;
      height: 170px;
      top:50px;

      border-bottom: solid 1px #484a50;
    }
   .ManagerCooperationSchool .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 150px;
      right: 50px;
      bottom:0px;
      
    }
    .el-table .warning-row {
    background: rgb(214, 130, 109);
  }

  .el-table .success-row {
    background: #aee292;
  }
  .ManagerCooperationSchool .el-menu-vertical-demo{
      width: 180px;
  }
  .ManagerCooperationSchool .context{
      color: white;
      font-size: 40px;
  }

</style>