<template>
  <div class="ManagerSpread">
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
            <h3>用户实时广播发送模块</h3>

            <el-input
                maxlength="255"
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="textarea">
            </el-input>

            <br><br>
            
            <el-select v-model="value" placeholder="快捷输入">
            <el-option
             width="300px"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
           &nbsp;&nbsp;&nbsp;
           <el-button type="primary" @click="save()">快捷填入</el-button>
            
            
             <el-button type="success" @click="spread()">发送</el-button>
              <el-button type="danger" @click="clear()">清空</el-button>
       </div>
  </div>
</template>
<script>



import HelloWorld from '../components/HelloWorld.vue';
import Mysql from '../components/Mysql.vue';

export default {
    
  data() {
      return{
          options: [{
          value: '请注意，今日23时到次日4时服务器更新',
          label: '请注意，今日23时到次日4时服务器更新'
        }, {
          value: '祝各位节日快乐',
          label: '祝各位节日快乐'
        }, {
          value: '紧急通知，服务器出现漏洞，本网站将紧急关闭',
          label: '紧急通知，服务器出现漏洞，本网站将紧急关闭'
        }, {
          value: '本网站在线编程模块临时关闭',
          label: '本网站在线编程模块临时关闭'
        }, {
          value: '注意，近期有不法分子盗取用户信息',
          label: '注意，近期有不法分子盗取用户信息'
        }],
        value: '',
          msg: 'Welcome to Your Vue.js App',
          token:this.$route.query.token,
          textarea: ''

      }
    },
    methods:{
        save(){
            this.textarea = this.textarea + this.value;
            this.value = ""
      },
        clear(){
          this.textarea = ""
        },
        //发送广播:
        spread(){
            //subscribe
            // this.$axios.post('/subscribe',this.$qs.stringify(
            //         {
            //         }
            //          )).then(response=>{      //返回值部分
            //          }).catch(error=>{
            //         console.log(error)
            //         });
            if(this.textarea.length === 0){
                   this.$notify({
                        title: '提示',
                        message: "发送失败，请输入内容",
                        type: 'error'
            })
            }
            else{
              this.$axios.post('ManagerSendMessageController/sendMeaasge',this.$qs.stringify(
                    {
                        //刚开始查询第一页
                        content:this.textarea,
                        token:this.token
                    }
                     )).then(response=>{      //返回值部分
                       
                       this.$notify({
                        title: '提示',
                        message: "发送成功",
                        type: 'success'
                        
                    });

                     }).catch(error=>{
                    console.log(error)
                    });
                    this.clear();
            }
             
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
                        // for(var i = 0 ; i < schoolList.length ; i ++){
                                
                        //         schoolOptions[i].label = schoolList[i].name;
                        //         schoolOptions[i].value = schoolList[i].name;
                               
                        // }
                        console.log(this.schoolList);
                        var schoolObject =  {id:'',
                                            name:'查询所有',
                                            createTime:'',
                                            deadline:'',
                                            studentNum:''}
                        this.schoolList.unshift(schoolObject)
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
    .ManagerSpread .homeTitle3{
         position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 50px;  
            width: 180px;  
            height: 600px;
            bottom:0px;
    }
    .ManagerSpread .homeTitle{
        background-color: black;
        z-index: 100;
    }
      .ManagerSpread .homeTitle2{
          position: absolute;
          
          background-color:rgb(43, 39, 39);
            top: 100px;
            left: 0px;  
            width: 50px;  
            height: 600px;
            bottom:0px;
      }
      .ManagerSpread .homeBottom1{
            position: relative;
            top: 650px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index : 101;
           
        }
      .ManagerSpread .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .ManagerSpread .d1{
      float: left;
      text-align: left;
      position: relative;
      left:70px;
      height: 170px;
      top:50px;

      border-bottom: solid 1px #484a50;
    }
   .ManagerSpread .mysql-change-1{
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
  .ManagerSpread .el-menu-vertical-demo{
      width: 180px;
  }
  .ManagerSpread .context{
      color: white;
      font-size: 40px;
  }

</style>