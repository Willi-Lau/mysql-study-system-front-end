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
    <div class="mysql-change-1">
      <div>
                <!-- <el-button  @click="MySQLProgram1">编程主页</el-button> -->
                <!-- 规则 -->
                <div class="loginForm">
                    <el-form :model="sqlForm" :rules="rules" ref="sqlForm" label-width="  0px" class="demo-ruleForm">
                        <el-form-item label="" prop="username" width="300px">
                            <el-input v-model="sqlForm.sql" placeholder="请输入SQL语句" type="textarea" :rows="18"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="submitForm()">执行</el-button>
                        </el-form-item>
                    </el-form>
                </div>


                <div class="sqllog">
                    <el-form :model="logForm" ref="logForm" label-width="  0px" class="demo-ruleForm">
                        <el-form-item label="" prop="username" width="100px">
                            <el-input v-model="logForm.log" placeholder="" type="textarea" :rows="5"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="sqlresult">
                    <el-table
                        :data="sqlResult"
                        style="width: 100%"
                        height="400"
                        border
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
                log: "",
            },
            sqlColum:["1","2","3","4","5"],
            sqlResult:[
                {
                    "1":"123",
                    "2":"234",
                    "3":"345",
                    "4":"456",
                    "5":"123"
                }
            ]
      }
    },
    methods:{
         submitForm() {
          // 登录验证部分
                if(this.isSql(this.sqlForm.sql)){
                    alert("true")
                }
                else{
                    alert("false")
                }
                //向后台查找，返回关于这个选手的所有信息，包括选手表和图库信息       selectcandidateimages
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
          var patt1 =/^select.+from.+/;
          var patt2 = /^update.+set.+/;
          var patt3 = /^insert.+into.+/;
           var patt4 = /^delete.+/;
           var patt5 = /^create.+/;
           var patt6 = /^alter.+/;
          return  patt1.test(sql) || patt2.test(sql)|| patt3.test(sql)|| patt4.test(sql)|| patt5.test(sql)|| patt6.test(sql);
      }
        
        
    },
    created(){
        // alert(this.token)
        var m1 = this.$route.query.token;
   
        if(Object.keys(m1).length >0){
            this.token = m1;
        }
        // else{
        //     alert("jajajaj")
        // }
        
        
        
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
            height: 2500px;
            bottom:0px;
            z-index: 10;
      }
      .MySQProgram .homeBottom1{
            position: relative;
            top: 2550px;
            
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
      left: 170px;
      top: 150px;
      right: 850px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

     .MySQProgram .sqllog{
        position: absolute;
      left: 800px;
      top: 550px;
      right: 100px;
      bottom:0px;
      /* background-color: aqua; */
      z-index: 10;
    }

    .MySQProgram .sqlresult{
         position: absolute;
      left: 800px;
      top: 150px;
      right: 100px;
      /* bottom:0px; */
      /* background-color: aqua; */
      z-index: 10;
    }
</style>