<template>
  <div class="MySQLJuniorSelect">
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
            MySQL 查询数据 (基础)
          </h1>
          MySQL 数据库使用SQL SELECT语句来查询数据。 <br>

          你可以通过 mysql> 命令提示窗口中在数据库中查询数据<br>
          <h3>语法 </h3>
          以下为在MySQL数据库中查询数据通用的 SELECT 语法：<br>
           <div class="info">
                <br>
               SELECT column_name,column_name<br>
                FROM table_name<br>
                [WHERE Clause]<br>
                [LIMIT N][ OFFSET M]<br><br>
               
               </div><br><br>

                1. 查询语句中你可以使用一个或者多个表，表之间使用逗号(,)分割，并使用WHERE语句来设定查询条件。 <br><br>
                2. SELECT 命令可以读取一条或者多条记录。<br><br>
                3. 你可以使用星号（*）来代替其他字段，SELECT语句会返回表的所有字段数据<br><br>
                4. 你可以使用 WHERE 语句来包含任何条件。<br><br>
                5. 你可以使用 LIMIT 属性来设定返回的记录数。<br><br>
                6. 你可以通过OFFSET指定SELECT语句开始查询的数据偏移量。默认情况下偏移量为0。<br><br>
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
      .MySQLJuniorSelect .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
      }
      .MySQLJuniorSelect .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
           
        }
        .MySQLJuniorSelect .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorSelect .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorSelect .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>