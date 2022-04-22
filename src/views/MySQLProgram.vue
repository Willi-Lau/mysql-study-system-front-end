<template>
  <div class="MySQProgram">
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
      <!-- <Mysql></Mysql> -->
    <!-- over -->
    <div class="alltable" >
                 <el-row class="tac">
                    <el-col :span="12">
                        <h5>Table List</h5>

                            <el-menu
                            default-active="2"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            unique-opened = true
                            collapse-transition = false

                            >
                            
                                <!-- 准备 -->
                                <el-submenu index="1"  >
                                    <template slot="title">
                                        <i class="el-icon-location"></i>
                                        <span>表</span>
                                    </template>
                                        <el-menu-item v-for="items in allTables" :key="items" :label="items" :prop="items" @click="do1(items)" >{{items}}</el-menu-item>
                                </el-submenu>

                            </el-menu>
                        </el-col>
                    </el-row>
    </div>
    <div class="mysql-change-1">
      <div>
                <!-- <el-button  @click="MySQLProgram1">编程主页</el-button> -->
                <!-- 规则 -->
                
                <div class="loginForm">
                    输入SQL语句   &nbsp;&nbsp;&nbsp;&nbsp;(多表连接请书写完整join on)<br><br>
                    <el-form :model="sqlForm"  ref="sqlForm" label-width="  0px" class="demo-ruleForm">
                        <el-form-item label="" prop="username" width="300px">
                            <el-input v-model="sqlForm.sql" placeholder="请输入SQL语句" type="textarea" :rows="18" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                             <el-button type="primary" @click="flushTableList()">刷新表列表</el-button>
                             <el-button type="success" @click="submitForm()">执行SQL</el-button>
                             <el-button type="warning" @click="getExample()">获取例子</el-button>
                             <el-button type = "danger" @click="resetForm()">重置SQL</el-button>
                        </el-form-item>
                    </el-form>
                </div>


                <div class="sqllog">
                    <el-form :model="logForm" ref="logForm" label-width="  0px" class="demo-ruleForm">
                        <el-form-item label="" prop="username" width="100px">
                            <el-input v-model="logForm.log" placeholder="" type="textarea" :rows="3" disabled></el-input>
                        </el-form-item>
                    </el-form>
                </div> 
                <div class="sqlresult">
                     返回结果&nbsp;&nbsp;&nbsp;( 例： 表名user 字段名id 返回结果 userId)<br><br>
                    <el-table
                        :data="sqlResult"
                        style="width: 100%"
                        width="300"
                        height="390"
                        border
                         stripe
                        >
                       <el-table-column v-for="items in sqlColum" :key="items" :label="items" :prop="items">
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
          token:"1234",
           sqlForm: {
                sql: "",
            },
            logForm:{
                log: ""
            },
            sqlColum:["1","2","3","4","5"],
            allTables:[],
            // sqlColum:[],
            sqlResult:[
                {
                    "1-1":"123",
                    "2":"234",
                    "3":"345",
                    "4":"456",
                    "5":"123"
                }
            ]
      }
    },
    methods:{
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
            this.$axios.post("SqlController/executeSql", this.$qs.stringify({
                        sql: "select * from "+i,
                        token: this.token
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
         
              
            //   this.$axios.post('RegisterController/register',
            //       this.ruleForm
            //   ).then(response=>{      //返回值部分
            //       this.resultDto = response.data;
            //       var resp = this.resultDto.type;
            //     if(resp === false){
            //         this.loginErrorNull(this.resultDto.object);
            //     }
            //     else{
            //         this.$alert('注册成功', 'success', {
            //             confirmButtonText: '确定',
            //             callback: action => {
            //                 this.$message({
            //                 type: 'success',
            //                 message: `注册成功`
            //                 });
            //             }
            //             });
            //         this.$router.push({
            //             path:'/' ,               	//目标URL，为注册的路由
            //             })
            //     }
            //   }).catch(error=>{
            //       console.log(error)
            //   });
            // alert(this.sqlForm.sql)
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
        // else{
        //     alert("jajajaj")
        // }
         
    
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
      .MySQProgram .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 700px;
            bottom:0px;
            z-index: 10;
      }
      .MySQProgram .homeBottom1{
            position: relative;
            top: 750px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .MySQProgram .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQProgram .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQProgram .mysql-change-1{
      /* position: absolute;
      left: -300px;
      top: -150px;
      right: 800px;
      bottom:200px;
      /* background-color: aqua; */
      /* z-index: 1; */ 
    }
    .MySQProgram .loginForm{
        position: absolute;
      left: 350px;
      top: 150px;
      right: 700px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

     .MySQProgram .sqllog{
        position: absolute;
      left: 850px;
      top: 580px;
      right: 100px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

    .MySQProgram .sqlresult{
         position: absolute;
      left: 850px;
      top: 150px;
      right: 100px;
      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
    }

    .alltable{
         position: absolute;
      left: 100px;
      top: 150px;

      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
      width: 400px;
    }
</style>