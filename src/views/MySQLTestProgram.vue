<template >
  <div class="MySQTestProgram" >
    <!-- 公共部分 -->
      <div class="homeTitle2" >
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="rgba(66,66,66)"
                @open="handleOpen"
                text-color="#fff"
                @close="handleClose">
                
                
                <el-menu-item index="4"  @click="mineProgram">
                    <i class="el-icon-user"></i>
                    <span slot="title">自我编程</span>
                </el-menu-item>
                <el-menu-item index="1"  @click="testProgram">
                    <i class="el-icon-setting"></i>
                    <span slot="title">做题编程</span>
                </el-menu-item>
            </el-menu>
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
      <!-- <Mysql></Mysql> -->
    <!-- over -->
    <div class="alltable"  >
                 <el-row class="tac">
                    <el-col :span="12">
                        
                            <h5>题目列表</h5>
                            <el-menu
                            default-active="0"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            unique-opened = true
                            collapse-transition = false
                            
                            >
                            
                                <!-- 准备 -->
                                <!-- <el-submenu index="1" >
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>数据表列表</span>
                                    </template>
                                        <el-menu-item v-for="items in allTables" :key="items" :label="items" :prop="items" @click="do1(items)" >{{items}}</el-menu-item>
                                </el-submenu> -->
                                <v-for v-for="(items,index) in allTables" :key="items" :label="items" :prop="items"  index>
                                    <el-menu-item :index="index" @click="changeTest(items)">
                                        <i class="el-icon-date"></i>
                                        <span slot="title">{{items}}</span>
                                    </el-menu-item>
                                </v-for>
                               
                                

                            </el-menu>
                        </el-col>
                    </el-row>
    </div>
    <!-- 题目描述 -->
    <div class="test_discribe">
        <h5>题目描述</h5>
            <!-- 题目描述 -->
          <el-input
          :disabled="true"
            type="textarea"
            :rows="8"
            placeholder="请输入内容"
            v-model="discribe">
            </el-input>

        <h5>数据表结构</h5>
         <el-table
            :data="tableColumn"
            border
             stripe
             height="235"
            style="width: 100%">
            <el-table-column
            prop="columnDiscribe"
            label="列名"
            width="130">
            </el-table-column>
            <el-table-column
            prop="columnAttribute"
            label="属性"
            width="130">
            </el-table-column>
        </el-table>
    </div>
    <div class="mysql-change-1" >
      <div>
                <!-- <el-button  @click="MySQLProgram1">编程主页</el-button> -->
                <!-- 规则 -->
                <h5>SQL输入</h5><br><br>
                <div class="loginForm">
                    <!-- 输入SQL语句   &nbsp;&nbsp;&nbsp;&nbsp;(多表连接请书写完整join on)<br><br> -->
                    <el-form :model="sqlForm"  ref="sqlForm" label-width="  0px" class="demo-ruleForm">
                        <el-form-item label="" prop="username" width="300px">
                            <el-input
                                        
                                       class="textarea111"
                                       v-model="sqlForm.sql"
                                       placeholder="请输入SQL语句" 
                                       type="textarea" 
                                       :rows="18" clearable></el-input>
                        </el-form-item>
                         <el-form-item class="button">
                              <el-button type="primary" @click="trueSQL()">查看答案</el-button>
                             <el-button type="success" @click="doSQL()">执行SQL</el-button>
                             <el-button type = "danger" @click="resetForm()">重置SQL</el-button>
                         </el-form-item>
                    </el-form>
                </div>

                <!-- 期望结果   :header-cell-style="{background:'rgb(103,194,58)',color:'rgb(38,50,56)'}"-->
                <div class="sqlresult2">
                     <h5>期望结果</h5>
                    <el-table
                        :data="trueSQLResult"
                        
                        width="260"
                        height="250"
                        border
                         stripe
                        
                        >
                       <el-table-column v-for="items in sqlColum" :key="items" :label="items" :prop="items" class="sqlresultcolumn">
                            <!-- <template slot-scope="scope">	
                                //这里items是分类数组中其中一个
                                <span>{{ items }}</span> 
                            </template> -->
                        </el-table-column>
                    </el-table>
                </div>
               <!-- 用户结果 -->
                <div class="sqlresult">
                      <h5>用户结果</h5>
                    <el-table
                        :data="userSQlResult"
                       
                        width="260"
                        height="250"
                        border
                         stripe
                         
                        >
                       <el-table-column v-for="items in sqlColum" :key="items" :label="items" :prop="items" class="sqlresultcolumn">
                            <!-- <template slot-scope="scope">	
                                //这里items是分类数组中其中一个
                                <span>{{ items }}</span> 
                            </template> -->
                        </el-table-column>
                    </el-table>
                </div>
      </div>       
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
  data() {
      return{
          currentTestId:'1',
          discribe:"adsasdasddasasdadsasdasdsadasdasddasasdadasddsasda",
          tableColumn:[{
              columnDiscribe:'',
              columnAttribute:''
          }],
          trueSQL1:"",

          token:"1234",
           sqlForm: {
                sql: "",
            },
            logForm:{
                log: ""
            },
            sqlColum:["1","2","3","4","5"],
            allTables:["1","2","3","4","5"],
            // sqlColum:[],
            trueSQLResult:[
                {
                    "1":"null",
                    "2":"null",
                    "3":"null",
                    "4":"null",
                    "5":"null"
                }
            ],
            userSQlResult:[
                {
                    "1":"null",
                    "2":"null",
                    "3":"null",
                    "4":"null",
                    "5":"null"
                }
            ],
      }
    },
    methods:{
        doSQL(){
             if(this.token === "1234"){
                     this.$alert('请登录', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `失败，请登录在执行`
                            });
                        }
                    });
                    // 跳转登录
                    this.$router.push({
                        path:'/' ,               	//目标URL，为注册的路由
                    })
             }
             else{
                   // 筛选 只允许执行select语句
             this.$axios.post("SqlController/runSQL", this.$qs.stringify({
                      token:this.token,
                      userSQL:this.sqlForm.sql,
                      testId: this.currentTestId
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        if(info.type === true){
                            this.userSQlResult = info.map.userResult;
                        }
                        else{
                            this.$alert('失败，此处只能写入select', 'error', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                type: 'error',
                                message: `SQL语句有问题请检查`
                                });
                            }
                            });
                        }
                         
                    }).catch(error => {
                        console.log(error);
                    });
             }
          
        },
        trueSQL(){
            this.sqlForm.sql = this.trueSQL1;
        },
        //根据题号获取题目信息
        changeTest(value){
            this.currentTestId = value;
           this.$axios.post("SqlController/getTestDiscribe", this.$qs.stringify({
                      id:value
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        this.discribe = info.map.discribe;
                        this.tableColumn = info.map.column;
                        this.trueSQL1 = info.map.trueSQL;
                        for(let i = 0 ; i < this.tableColumn.length ; i++){
                            this.sqlColum[i] = this.tableColumn[i].columnDiscribe;
                        }
                         this.trueSQLResult = info.map.trueResult;
                    }).catch(error => {
                        console.log(error);
                    });
                    this.sqlForm.sql = ""
                    this.userSQlResult = ""
        },
          mineProgram(){
            this.$router.push({
                path: "/MySQLProgram", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
        testProgram(){
this.$router.push({
                path: "/MySQLTestProgram", //目标URL，为注册的路由
                query:{
                      token:this.token
                      }
            });
        },
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
        //点击获取表内容
        do1(i){
            // this.$axios.post("SqlController/executeSql", this.$qs.stringify({
            //             sql: "select * from "+i,
            //             token: this.token
            //         })).then(response => {
            //             var info = response.data;
            //             console.log(info);
            //             // Vue.set(this.logForm,log,response.data.object);
            //             this.logForm.log = info.object;
            //             if(this.logForm.log === "sql success"){
            //                 this.sqlColum = info.map.column;
            //                 this.sqlResult = info.map.result;
                            
            //             }
            //             else{
            //                 this.sqlColum = "";
            //                 this.sqlResult = "";
            //             }
                        


            //         }).catch(error => {
            //             console.log(error);
            //         });
        },
        flushTableList(){
             if(this.token === "1234"){
                     this.$alert('请登录', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `失败，请登录在执行`
                            });
                        }
                    });
                    // 跳转登录
                    this.$router.push({
                        path:'/' ,               	//目标URL，为注册的路由
                    })
             }
             else{
                this.$axios.post("SqlController/executeSql", this.$qs.stringify({
                        sql: "show tables;",
                        token: this.token
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        // Vue.set(this.logForm,log,response.data.object);
                        this.logForm.log = info.object;
                        if(this.logForm.log === "sql success"){
                            // this.sqlColum = info.map.column;
                            // this.sqlResult = info.map.result;
                            this.allTables = info.map.table;
                        }
                        else{
                            this.sqlColum = "";
                            this.sqlResult = "";
                        }
                        


                    }).catch(error => {
                        console.log(error);
                    });
             }
        },
         resetForm() {
            this.sqlForm.sql = ""
         },
        //获取例子
        getExample(){
              if(this.token === "1234"){
                     this.$alert('请登录', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `失败，请登录在执行`
                            });
                        }
                    });
                    // 跳转登录
                    this.$router.push({
                        path:'/' ,               	//目标URL，为注册的路由
                    })
             }
             else{
                 this.$axios.post("SqlController/getExampleSql", this.$qs.stringify({
        
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        // Vue.set(this.logForm,log,response.data.object);
                        this.logForm.log = info.object;
                        if(this.logForm.log === "sql success"){
                            this.sqlColum = info.map.column;
                            this.sqlResult = info.map.result;
                            
                        }
                        else{
                            this.sqlColum = "";
                            this.sqlResult = "";
                        }
                        


                    }).catch(error => {
                        console.log(error);
                    });
                
                }
        },
        //执行查询
         submitForm() {
             if(this.token === "1234"){
                     this.$alert('请登录', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `失败，请登录在执行`
                            });
                        }
                    });
                    // 跳转登录
                    this.$router.push({
                        path:'/' ,               	//目标URL，为注册的路由
                    })
             }
             else{
                if(this.isSql(this.sqlForm.sql)){
                    this.$axios.post("SqlController/executeSql", this.$qs.stringify({
                        sql: this.sqlForm.sql,
                        token: this.token,
                        isMySql:1
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        // Vue.set(this.logForm,log,response.data.object);
                        this.logForm.log = info.object;
                        if(this.logForm.log === "sql success"){
                            this.sqlColum = info.map.column;
                            this.sqlResult = info.map.result;
                            
                        }
                        else{
                            this.sqlColum = "";
                            this.sqlResult = "";
                        }
                        


                    }).catch(error => {
                        console.log(error);
                    });
                }
                else{
                   this.$alert('失败，SQL语句有问题请检查', 'error', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'error',
                            message: `SQL语句有问题请检查`
                            });
                        }
                        });
                }
             }
         
              
          
      },
      isSql(sql){
          //去除sql左边的空格
         sql = this.trimLeft(sql);
          var patt1 =/^select.+from.+/;
          var patt2 = /^update.+set.+/;
          var patt3 = /^insert.+into.+/;
           var patt4 = /^delete.+/;
           var patt5 = /^create.+/;
           var patt6 = /^alter.+/;
           var patt7 = /^show.+/;
           var patt8 = /^explain.+/;
          return  patt1.test(sql) || patt2.test(sql)|| patt3.test(sql)|| patt4.test(sql)|| patt5.test(sql)|| patt6.test(sql)|| patt7.test(sql)|| patt8.test(sql);
      }
        
        
    ,
     trimLeft(s){  
            if(s == null) {  
                return "";  
            }  
            var whitespace = new String(" \t\n\r");  
            var str = new String(s);  
            if (whitespace.indexOf(str.charAt(0)) != -1) {  
                var j=0, i = str.length;  
                while (j < i && whitespace.indexOf(str.charAt(j)) != -1){  
                    j++;  
                }  
                str = str.substring(j, i);  
            }  
            return str;  
        }  
        },
    created(){
        // alert(this.token)
        var m1 = this.$route.query.token;
        //获取table list
        if(Object.keys(m1).length >0){
            this.token = m1;
            //获取所有题目列表
               this.$axios.post("SqlController/getAllId", this.$qs.stringify({
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                       this.allTables = info.map.result;
                    }).catch(error => {
                        console.log(error);
                    });
            //获取第一题信息
               
        }
        // else{
        //     alert("jajajaj")
        // }
             this.$axios.post("SqlController/getTestDiscribe", this.$qs.stringify({
                      id:1
                    })).then(response => {
                        var info = response.data;
                        console.log(info);
                        this.discribe = info.map.discribe;
                        this.tableColumn = info.map.column;
                        this.trueSQL1 = info.map.trueSQL;
                    for(let i = 0 ; i < this.tableColumn.length ; i++){
                            this.sqlColum[i] = this.tableColumn[i].columnDiscribe;
                        }
                         this.trueSQLResult = info.map.trueResult;
                    }).catch(error => {
                        console.log(error);
                    });
    
   var source = new EventSource("http://127.0.0.1:9999/subscribe");
        source.onopen = this.OnOpen;
        source.onmessage = this.OnMessage;
        source.onerror = this.OnError;

        
        
    },
    
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
        
      .MySQTestProgram .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 150px;  
            height: 750px;
            bottom:0px;
            z-index: 10;
      }
      .MySQTestProgram .homeBottom1{
            position: relative;
            top: 800px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQTestProgram .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQTestProgram .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQTestProgram .mysql-change-1{
      /* position: absolute;
      left: -300px;
      top: -150px;
      right: 800px;
      bottom:200px;
      /* background-color: aqua; */
      /* z-index: 1; */ 
    }
    .MySQTestProgram .loginForm{
        position: absolute;
      left: 550px;
      top: 170px;
      right: 570px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

     .MySQTestProgram .sqllog{
        position: absolute;
      left: 850px;
      top: 580px;
      right: 100px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

    .MySQTestProgram .sqlresult{
         position: absolute;
      left: 1000px;
      top: 410px;
      right: 20px;
      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
    }

    .MySQTestProgram .sqlresult2{
    position: absolute;
      left: 1000px;
      top: 110px;
      right: 20px;
      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
    }

    .MySQTestProgram .alltable{
         position: absolute;
      left: 150px;
      top: 120px;

      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
      width: 200px;
        
    }
    .test_discribe{
        
        position: absolute;
        left:250px;
        top: 110px;
        bottom: 0px;
        right: 1000px;
        z-index: 500;
    }
     .el-textarea__inner{
 font-family:"Monaco" !important;

 font-size:20px !important;
 color: rgb(195,232,141);
 background-color: rgb(38,50,56);
}


</style>
<style scoped>
.textarea111 >>> .el-textarea__inner{
 font-family:"Monaco" !important;

 font-size:20px !important;
 color: rgba(255, 255, 255, 0.784);
 background-color: rgb(43,43,43);
}
.textarea112 >>> .el-textarea__inner{
 font-family:"Monaco" !important;

 font-size:20px !important;


}
.sqlresultcolumn>>> .el-table-column__inner{
 font-family:"Monaco" !important;

 font-size:20px !important;
 color: red;

}

</style>


