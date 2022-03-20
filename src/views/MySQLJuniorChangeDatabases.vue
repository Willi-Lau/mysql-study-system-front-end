<template>
  <div class="juniorchangedatabases">
    <!-- 公共部分 -->
      <div class="homeTitle2">
          
      </div>
      <div class="homeBottom1">
        <div class="text">
            Legal Policies | Your Privacy Rights | Terms of Use | Trademark Policy | Contributor Agreement | Cookie 喜好设置
        </div>
        
      </div>
      <HelloWorld></HelloWorld>
      <Mysql></Mysql>
    <!-- over -->
    <div class="mysql-change-1">
      <div>
        
      </div>  
       <div class="d1">
          <h1>
            MySQL 创建数据库 
          </h1>
          我们可以在登陆 MySQL 服务后，使用 create 命令创建数据库，语法如下:<br><br>
          <div class="info">CREATE DATABASE 数据库名;</div><br><br>
          设置字符集并判断是否能存在:<br><br>
          <div class="info">CREATE DATABASE IF NOT EXISTS 数据库名 DEFAULT CHARSET utf8 COLLATE utf8_general_ci;</div><br><br>
      </div>    
      <div class="d2">
          <h1>
            MySQL 删除数据库
          </h1>
          使用普通用户登陆 MySQL 服务器，你可能需要特定的权限来创建或者删除 MySQL 数据库，所以我们这边使用 root 用户登录，root 用户拥有最高权限。<br><br>
          <div class="info">drop database 数据库名;</div><br><br>
          设置字符集并判断是否能存在:<br><br>
        
      </div> 
      <div class="d3">
          <h1>
            MySQL 选择数据库
          </h1>
          在你连接到 MySQL 数据库后，可能有多个可以操作的数据库，所以你需要选择你要操作的数据库<br><br>
          <div class="info">use 数据库名;</div><br><br>
          设置字符集并判断是否能存在:<br><br>
        
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
        token:this.$route.query.token
      }
    },
    methods:{

    },
  name: 'Register',
 components: { HelloWorld,Mysql }
}
</script>
<style>
/* 公共部分 */
      .juniorchangedatabases .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
            z-index: 1;
      }
      .juniorchangedatabases .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
            z-index: 100;
           
        }
        .juniorchangedatabases .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .juniorchangedatabases .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 330px;

      /* border-bottom: solid 1px #484a50; */
    }
    .juniorchangedatabases .d2{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 270px;

      /* border-bottom: solid 1px #484a50; */
    }
    .juniorchangedatabases .d3{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .juniorchangedatabases .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>