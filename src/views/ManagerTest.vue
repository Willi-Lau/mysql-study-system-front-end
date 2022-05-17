<template>
  <div class="ManagerTest">
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
      
      class="el-menu-vertical-demo"
       background-color="rgba(66,66,66)"
      @open="handleOpen"
      text-color="#fff"
      @close="handleClose">
     
      
      <el-menu-item index="1"  @click="userInfo">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理页</span>
      </el-menu-item>
      <el-menu-item index="2"  @click="managerTest">
        <i class="el-icon-setting"></i>
        <span slot="title">题目管理</span>
      </el-menu-item>
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
            <h3>题目管理</h3>
            <h5>如练习需新建表格请联系后台运维人员处理：QQ 13548569654</h5>
            id:
            <el-input v-model="testCondition.id" placeholder="请输入id" style="width:200px"   clearable>
            </el-input>
            &nbsp;
            题目描述：
             <el-input v-model="testCondition.describe" placeholder="请输入描述：支持模糊查询" style="width:300px"   clearable>
            </el-input>
            &nbsp;
            所属表：
             <el-input v-model="testCondition.table" placeholder="请输入表" style="width:200px"   clearable>
            </el-input>
            &nbsp;
            <el-button type="success" @click="selectByCondition()">查找</el-button>
            <el-button type="warning" @click="clearCondition">清空所有</el-button>
            <br> <br>
             <el-table
            :data="tableData"
            height="400"
            border
            style="width: 100%">
                <el-table-column
                prop="id"
                label="id"
                width="180">
                </el-table-column>
                <el-table-column
                prop="titleDiscribe"
                label="题目描述"
                width="280">
                </el-table-column>
                 <el-table-column
                prop="tableName"
                label="所属表"
                width="180">
                </el-table-column>
                 <el-table-column
                prop="trueSQL"
                label="正确SQL"
                width="330">
                
                </el-table-column>
                  <el-table-column
                prop="trueSql"
                label="操作"
                width="200">
                <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index,scope.row.id)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <!-- 修改对话框 -->
        <el-dialog
            title="修改"
            :visible.sync="updateDialogVisible"
            width="30%"
            :before-close="handleClose">
                <el-form ref="form" :model="updateTempporary" label-width="80px">
                    <el-form-item label="题目描述">
                        <el-input v-model="updateTempporary.titleDiscribe" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="所属表">
                        <el-select v-model="updateTempporary.tableName" placeholder="请选择所属表">
                            <el-option
                            v-for="item in this.tableNameList"
                            :key="item.tableName"
                            :label="item.tableName"
                            :value="item.tableName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正确SQL">
                        <el-input type="textarea" :rows="8" v-model="updateTempporary.trueSQL"></el-input>
                    </el-form-item>
                   
                     <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateTest()">确 定</el-button>
                </el-form>
            
        </el-dialog>
        <!-- 新增对话框 -->
        <el-dialog
            title="新增题目"
            :visible.sync="insertDialogVisible"
            width="30%"
            :before-close="handleClose">
           
                  <el-form ref="form" :model="updateTempporary" label-width="80px">
                    <el-form-item label="题目描述">
                        <el-input v-model="updateTempporary.titleDiscribe" type="textarea" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="所属表">
                        <el-select v-model="updateTempporary.tableName" placeholder="请选择所属表">
                            <el-option
                            v-for="item in this.tableNameList"
                            :key="item.tableName"
                            :label="item.tableName"
                            :value="item.tableName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正确SQL">
                        <el-input type="textarea" :rows="8" v-model="updateTempporary.trueSQL"></el-input>
                    </el-form-item>
                   
                     <el-button @click="updateDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insertTest()">确 定</el-button>
                </el-form>
           
        </el-dialog>

            <br><br>
            
             <el-button type="success" @click="create()">新建题目</el-button>
            
       </div>
  </div>
</template>
<script>



import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
    
  data() {
      return{
          testCondition:{
            id:'',
            describe:'',
            table:''
          },
          updateTempporary:{
              id:'',
              titleDiscribe:'',
              tableName:'',
             trueSQL:''
          },
          currentTestId:'',
        updateDialogVisible: false,
        insertDialogVisible: false,
         tableData: [{
          id:'',
          titleDiscribe:'',
          tableName:'',
          trueSQL:''
        }],
        tableNameList:[{
            tableName:'',
            tableColumn:'',
            id:''
        }],
        value: '',
          msg: 'Welcome to Your Vue.js App',
          token:this.$route.query.token,
          textarea: ''

      }
    },
    methods:{
        selectByCondition(){
             this.$axios.post("ManagerController/selectByCondition", this.$qs.stringify({
                        id:this.testCondition.id,
                        describe:this.testCondition.describe,
                        table:this.testCondition.table,
                    })).then(response => {
                         this.tableData = response.data.map.result;
                    }).catch(error => {
                        console.log(error);
                    });
                    
        },
        clearCondition(){
            this.testCondition.id = ""
            this.testCondition.describe = ""
            this.testCondition.table = ""
        },
        insertTest(){
            this.insertDialogVisible = false;
            //发送数据到后端
            this.$axios.post("ManagerController/insertTest", this.$qs.stringify({
                        titleDiscribe:this.updateTempporary.titleDiscribe,
                        tableName:this.updateTempporary.tableName,
                        trueSQL:this.updateTempporary.trueSQL,
                    })).then(response => {
                    }).catch(error => {
                        console.log(error);
                    });
                     location.reload();
        },
        create(){
            this.insertDialogVisible = true;
        },
        updateTest(){
            this.updateDialogVisible = false;
            //发送数据到后端
            this.$axios.post("ManagerController/updateTest", this.$qs.stringify({
                        id:this.currentTestId,
                        titleDiscribe:this.updateTempporary.titleDiscribe,
                        tableName:this.updateTempporary.tableName,
                        trueSQL:this.updateTempporary.trueSQL,
                    })).then(response => {
                    }).catch(error => {
                        console.log(error);
                    });
                     location.reload();
            //修改前端数据
            // this.tableData[index].titleDiscribe = this.updateTempporary.titleDiscribe;
            // this.tableData[index].tableName = this.updateTempporary.tableName;
            // this.tableData[index].trueSQL = this.updateTempporary.trueSQL;
             
            
        },
        //删除按钮
        handleDelete(index,id){
            this.$axios.post("ManagerController/deleteTest", this.$qs.stringify({
                        id:id,
                    })).then(response => {
                    }).catch(error => {
                        console.log(error);
                    });
        },
        //编辑按钮
        handleEdit(index,id){
           
            this.currentTestId = id;
            
            this.updateDialogVisible = true;
            this.updateTempporary.id = this.currentTestId;
            this.updateTempporary.titleDiscribe = this.tableData[index].titleDiscribe;
            this.updateTempporary.tableName =  this.tableData[index].tableName;
            this.updateTempporary.trueSQL =  this.tableData[index].trueSQL;
        },
        save(){
            this.textarea = this.textarea + this.value;
            this.value = ""
      },
        clear(){
          this.textarea = ""
        },
       
            //跳转界面：
        managerTest(){
            this.$router.push({
                    path: "/ManagerTest", //目标URL，为注册的路由
                    query:{
                         token:this.token
                     }
                });
        },
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
            //获取所有的练习
          this.$axios.post("ManagerController/getAllTest", this.$qs.stringify({
                 
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        this.tableData = info.map.result;
                         
                    }).catch(error => {
                        console.log(error);
                    });
        
            //获取所有的联系表
            this.$axios.post("ManagerController/getAllTableColumnAttribute", this.$qs.stringify({
                 
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        this.tableNameList = info.map.result;
                        
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
    .ManagerTest .homeTitle3{
         position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 50px;  
            width: 180px;  
            height: 800px;
            bottom:0px;
    }
    .ManagerTest .homeTitle{
        background-color: black;
        z-index: 100;
    }
      .ManagerTest .homeTitle2{
          position: absolute;
          
          background-color:rgb(43, 39, 39);
            top: 100px;
            left: 0px;  
            width: 50px;  
            height: 800px;
            bottom:0px;
      }
      .ManagerTest .homeBottom1{
            position: relative;
            top: 850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index : 101;
           
        }
      .ManagerTest .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .ManagerTest .d1{
      float: left;
      text-align: left;
      position: relative;
      left:70px;
      height: 170px;
      top:50px;

      border-bottom: solid 1px #484a50;
    }
   .ManagerTest .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 50px;
      bottom:0px;
      
    }
    .el-table .warning-row {
    background: rgb(214, 130, 109);
  }

  .el-table .success-row {
    background: #aee292;
  }
  .ManagerTest .el-menu-vertical-demo{
      width: 180px;
  }
  .ManagerTest .context{
      color: white;
      font-size: 40px;
  }

</style>