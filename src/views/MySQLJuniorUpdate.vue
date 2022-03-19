<template>
  <div class="MySQLJuniorUpdate">
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
           MySQL UPDATE 更新
          </h1>
         如果我们需要修改或更新 MySQL 中的数据，我们可以使用 SQL UPDATE 命令来操作。 <br>

          <h3>语法 </h3>
          以下是 UPDATE 命令修改 MySQL 数据表数据的通用 SQL 语法：<br>
           <div class="info">
                <br>
               UPDATE table_name SET field1=new-value1, field2=new-value2<br>
                [WHERE Clause]<br>
               <br>
               
               </div><br><br>
              1.  你可以同时更新一个或多个字段。 <br><br>
               2.  你可以在 WHERE 子句中指定任何条件。<br><br>
               3.  你可以在一个单独表中同时更新数据。<br><br>

              当你需要更新数据表中指定行的数据时 WHERE 子句是非常有用的。 <br><br>
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
      .MySQLJuniorUpdate .homeTitle2{
          position: absolute;
          
          background-color:rgba(66,66,66);
            top: 100px;
            left: 0px;  
            width: 100px;  
            height: 1800px;
            bottom:0px;
      }
      .MySQLJuniorUpdate .homeBottom1{
            position: relative;
            top: 1850px;
            
            background-color: rgba(225,225,225);
            height: 100px;
            left: -20px;
            /* right: 0px; */
            width: 102%;
           
        }
        .MySQLJuniorUpdate .homeBottom1 .text{
          position: relative;
          top: 40px;
          color: rgb(200, 150, 102);
          font-size: small;
        }
      /* over */
   .MySQLJuniorUpdate .d1{
      float: left;
      text-align: left;
      position: relative;
      left:100px;
      height: 170px;

      /* border-bottom: solid 1px #484a50; */
    }
   .MySQLJuniorUpdate .mysql-change-1{
      position: absolute;
      left: 300px;
      top: 100px;
      right: 200px;
      bottom:0px;
      
    }
</style>