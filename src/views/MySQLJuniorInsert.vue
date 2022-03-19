<template>
  <div class="MySQLJuniorInsert">
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
            MySQL 插入数据
          </h1>
          MySQL 表中使用 INSERT INTO SQL语句来插入数据 <br>

          你可以通过 mysql> 命令提示窗口中在数据库中查询数据<br>
          <h3>语法 </h3>
          以下为在MySQL数据库中查询数据通用的 INSERT 语法：<br>
           <div class="info">
                <br>
               INSERT INTO table_name ( field1, field2,...fieldN )<br>
                 VALUES<br>
                ( value1, value2,...valueN );<br>
               <br>
               
               </div><br><br>

               如果数据是字符型，必须使用单引号或者双引号，如："value"。 <br><br>
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
          token:this.$route.query.token,
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
      .MySQLJuniorInsert .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
      }
      .MySQLJuniorInsert .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
           
        }
        .MySQLJuniorInsert .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorInsert .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorInsert .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>